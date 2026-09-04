"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Proporción del alto de pantalla que debe alcanzar un elemento para revelarse. */
const UMBRAL = 0.88;

/**
 * Estado compartido por todos los <Reveal> de la página: un solo
 * IntersectionObserver y un solo listener de scroll, en lugar de uno por
 * elemento.
 */
const pendientes = new Set<HTMLElement>();
let observador: IntersectionObserver | null = null;
let barridoEnCola = false;

function revelar(el: HTMLElement) {
    if (!pendientes.delete(el)) return;

    observador?.unobserve(el);
    el.dataset.reveal = "visible";

    // Al terminar se retira el atributo para no dejar colgada una transición
    // que interfiera con los estados :hover del elemento.
    el.addEventListener(
        "transitionend",
        () => {
            delete el.dataset.reveal;
            el.style.transitionDelay = "";
        },
        { once: true }
    );

    if (pendientes.size === 0) window.removeEventListener("scroll", alHacerScroll);
}

/**
 * Red de seguridad para los saltos de scroll: restauración al recargar, enlaces
 * con ancla, inercia en móvil.
 *
 * Si el navegador salta de golpe, un elemento puede pasar de estar debajo del
 * pliegue a estar encima sin llegar a intersecar en ningún fotograma, y el
 * IntersectionObserver nunca dispara: se quedaría invisible para siempre. Este
 * barrido revela todo lo que ya haya cruzado el umbral.
 */
function barrer() {
    barridoEnCola = false;
    const limite = window.innerHeight * UMBRAL;
    for (const el of [...pendientes]) {
        if (el.getBoundingClientRect().top < limite) revelar(el);
    }
}

function alHacerScroll() {
    if (barridoEnCola) return;
    barridoEnCola = true;
    requestAnimationFrame(barrer);
}

function obtenerObservador() {
    if (!observador) {
        observador = new IntersectionObserver(
            (entradas) => {
                for (const entrada of entradas) {
                    if (entrada.isIntersecting) revelar(entrada.target as HTMLElement);
                }
            },
            { rootMargin: `0px 0px -${Math.round((1 - UMBRAL) * 100)}% 0px` }
        );
    }
    return observador;
}

type Props = {
    children: ReactNode;
    className?: string;
    /** Retardo en milisegundos, para escalonar elementos hermanos. */
    delay?: number;
};

/**
 * Revela su contenido cuando entra en pantalla.
 *
 * El estado en reposo es visible: el HTML que envía el servidor no lleva
 * `opacity: 0` ni `transform`, así que la página se lee y se pinta sin esperar
 * a JavaScript.
 *
 * La animación se arma después de hidratar y solo para lo que todavía está por
 * debajo del pliegue. Lo que el navegador ya pintó se queda como está: ocultarlo
 * para volver a mostrarlo produciría un parpadeo y retrasaría el LCP.
 */
export default function Reveal({ children, className, delay = 0 }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (el.getBoundingClientRect().top < window.innerHeight) return;

        // Ocultar sin transición: el elemento está fuera de pantalla, así que el
        // salto no se ve. La transición vive solo en el estado "visible".
        el.dataset.reveal = "oculto";
        el.style.transitionDelay = `${delay}ms`;

        pendientes.add(el);
        // Añadir el mismo listener dos veces es un no-op, así que no hace falta
        // comprobar si ya estaba puesto.
        window.addEventListener("scroll", alHacerScroll, { passive: true });
        obtenerObservador().observe(el);

        return () => {
            pendientes.delete(el);
            observador?.unobserve(el);
            if (pendientes.size === 0) window.removeEventListener("scroll", alHacerScroll);
        };
    }, [delay]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
