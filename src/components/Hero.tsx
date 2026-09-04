"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    const [started, setStarted] = useState(false);
    const [muted, setMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(percentage);
        }
    };

    /**
     * Arranca la reproducción.
     *
     * El navegador solo permite sonido si `play()` se llama de forma síncrona
     * dentro de un gesto real del usuario (un clic): por eso el botón de play
     * llama esto directamente en su `onClick`, sin pasar por un cambio de
     * estado que remonte el <video> — eso era lo que obligaba a pulsar play
     * dos veces, porque el intento de reproducción automática ya no ocurría
     * dentro del gesto de clic original y el navegador lo bloqueaba.
     *
     * El scroll no cuenta como gesto de usuario, así que ese camino arranca en
     * silencio; el botón de sonido dentro del reproductor deja activarlo.
     */
    const iniciarReproduccion = useCallback((conSonido: boolean) => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !conSonido;
        setMuted(!conSonido);
        setStarted(true);
        video.play().catch(() => {
            // Si el navegador aun así lo bloquea, el usuario puede pulsar
            // sobre el video para intentarlo de nuevo.
        });
    }, []);

    // Arranca el video en cuanto el visitante empieza a desplazarse, para que
    // ver la VSL no dependa de que encuentre y pulse el botón de play.
    useEffect(() => {
        if (started) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const alPrimerScroll = () => iniciarReproduccion(false);
        window.addEventListener("scroll", alPrimerScroll, { once: true, passive: true });
        return () => window.removeEventListener("scroll", alPrimerScroll);
    }, [started, iniciarReproduccion]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    };

    const alternarSonido = () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setMuted(video.muted);
    };

    // El hero no lleva animación de entrada a propósito: es lo primero que se
    // pinta, y cualquier `initial` de Framer Motion se serializa como
    // `opacity: 0` en el HTML del servidor, retrasando el LCP.
    return (
        <header className="pt-10 md:pt-14 pb-16 px-6 text-center overflow-hidden relative">
            <div className="relative w-20 h-20 md:w-28 md:h-28 mx-auto mb-6">
                <Image src="/images/logo.webp" alt="Toro Legal Logo" fill className="object-contain drop-shadow-2xl" priority />
            </div>
            <div className="mb-8 inline-block">
                <p className="text-white text-xs font-black uppercase tracking-[0.4em] border-b border-primary/40 pb-2">DEFENSA LEGAL FINANCIERA</p>
            </div>
            <div className="max-w-[95%] mx-auto mb-8 relative">
                <motion.div
                    className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-[60px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <h1 className="text-white text-3xl md:text-4xl font-extrabold leading-tight relative z-10">
                    Recupera tu vida y <span className="text-primary glow-text italic">borra tus deudas</span> legalmente con la Ley de Insolvencia.
                </h1>
            </div>
            <p className="text-slate-300 text-base md:text-lg mb-10 leading-relaxed font-light">
                No tienes que vivir escondiéndote de los bancos. Existe un camino jurídico para frenar embargos y obtener el reinicio financiero que mereces.
            </p>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 vsl-border shadow-2xl bg-brand-deep-grey group">
                {/*
                    El <video> está siempre montado, incluso antes de arrancar.
                    Así el ref ya existe cuando se pulsa play, y `.play()` se
                    puede llamar de forma síncrona dentro del clic — condición
                    que exige el navegador para permitir sonido.
                */}
                <video
                    ref={videoRef}
                    src="/videos/vsl-optimized.mp4"
                    poster="/videos/poster.jpg"
                    playsInline
                    muted={muted}
                    onClick={started ? togglePlay : undefined}
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onContextMenu={(e) => e.preventDefault()}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${started ? "opacity-100 cursor-pointer" : "opacity-50"}`}
                />

                {!started ? (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                        <motion.button
                            type="button"
                            onClick={() => iniciarReproduccion(true)}
                            aria-label="Reproducir video"
                            className="size-20 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/40 cursor-pointer group"
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(232, 193, 82, 0.2)" }}
                            whileTap={{ scale: 0.9 }}
                            animate={{ boxShadow: ["0px 0px 0px rgba(232,193,82,0)", "0px 0px 20px rgba(232,193,82,0.4)", "0px 0px 0px rgba(232,193,82,0)"] }}
                            transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                        >
                            <span aria-hidden="true" className="material-symbols-outlined text-primary text-5xl translate-x-1 group-hover:drop-shadow-[0_0_8px_rgba(232,193,82,0.8)] transition-all">play_arrow</span>
                        </motion.button>
                    </div>
                ) : (
                    <>
                        {/* Barra de progreso */}
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 overflow-hidden pointer-events-none">
                            <motion.div
                                className="h-full bg-primary glow-button"
                                style={{ width: `${progress}%` }}
                                transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                            />
                        </div>

                        {/* Icono de play/pausa al pasar el cursor */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <motion.div
                                className="size-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                                animate={{ scale: isPlaying ? 0.8 : 1 }}
                            >
                                <span aria-hidden="true" className="material-symbols-outlined text-white text-4xl">
                                    {isPlaying ? "pause" : "play_arrow"}
                                </span>
                            </motion.div>
                        </div>

                        {/* El video pudo haber arrancado sin sonido (por scroll);
                            este control deja activarlo con un toque. */}
                        <button
                            type="button"
                            onClick={alternarSonido}
                            aria-label={muted ? "Activar sonido" : "Silenciar video"}
                            className="absolute bottom-4 right-4 z-10 size-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white"
                        >
                            <span aria-hidden="true" className="material-symbols-outlined text-xl">
                                {muted ? "volume_off" : "volume_up"}
                            </span>
                        </button>
                    </>
                )}
            </div>

            <motion.a
                href="https://wa.link/fspjz8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary text-black font-black py-5 rounded-xl uppercase tracking-widest text-sm relative overflow-hidden flex items-center justify-center"
                whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(232, 193, 82, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            >
                <motion.div
                    className="absolute inset-0 bg-white opacity-20"
                    initial={{ x: "-100%", skewX: -20 }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative z-10">AGENDAR MI ASESORÍA</span>
            </motion.a>
        </header>
    );
}
