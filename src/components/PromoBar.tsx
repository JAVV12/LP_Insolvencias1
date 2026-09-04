import { PROMO } from "@/lib/promo";

/**
 * Franja fija superior con la promoción vigente.
 *
 * Sustituye al contador de 10 minutos: la vigencia ahora es una fecha real, y
 * quien vuelve a la página días después no se encuentra con una oferta caducada.
 *
 * Al no tener estado ni temporizador, es un componente de servidor.
 */
export default function PromoBar() {
    return (
        <div className="sticky-promo z-50">
            <p className="text-black text-[10px] font-black uppercase tracking-[0.2em] text-center text-balance">
                Asesoría sin costo &middot; {PROMO.mes}
            </p>
        </div>
    );
}
