"use client";

import { useState, useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Hero() {
    const [isVslPlaying, setIsVslPlaying] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(percentage);
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <motion.header
            className="pt-12 pb-16 px-6 text-center overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
        >
            <div className="mb-10 inline-block">
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

            <motion.div
                className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 vsl-border shadow-2xl bg-brand-deep-grey"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                {!isVslPlaying ? (
                    <>
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                            <motion.div
                                onClick={() => setIsVslPlaying(true)}
                                className="size-20 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/40 cursor-pointer group"
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(232, 193, 82, 0.2)" }}
                                whileTap={{ scale: 0.9 }}
                                animate={{ boxShadow: ["0px 0px 0px rgba(232,193,82,0)", "0px 0px 20px rgba(232,193,82,0.4)", "0px 0px 0px rgba(232,193,82,0)"] }}
                                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                            >
                                <span className="material-symbols-outlined text-primary text-5xl translate-x-1 group-hover:drop-shadow-[0_0_8px_rgba(232,193,82,0.8)] transition-all">play_arrow</span>
                            </motion.div>
                        </div>
                        <Image
                            alt="Legal Consultation Video"
                            className="w-full h-full object-cover opacity-50 transition-opacity duration-1000"
                            src="/videos/poster.jpg"
                            fill
                            priority
                        />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-black z-20 flex items-center justify-center group cursor-pointer" onClick={togglePlay}>
                        <video
                            ref={videoRef}
                            src="/videos/vsl-optimized.mp4"
                            poster="/videos/poster.jpg"
                            autoPlay
                            playsInline
                            onTimeUpdate={handleTimeUpdate}
                            onContextMenu={(e) => e.preventDefault()}
                            className="w-full h-full object-cover"
                        />
                        {/* Custom Progress Bar */}
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 overflow-hidden pointer-events-none">
                            <motion.div
                                className="h-full bg-primary glow-button"
                                style={{ width: `${progress}%` }}
                                transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                            />
                        </div>

                        {/* Overlay Controls (visible on hover) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <motion.div
                                className="size-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                                animate={{ scale: isPlaying ? 0.8 : 1 }}
                            >
                                <span className="material-symbols-outlined text-white text-4xl">
                                    {isPlaying ? 'pause' : 'play_arrow'}
                                </span>
                            </motion.div>
                        </div>
                    </div>
                )}
            </motion.div>

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
                <span className="relative z-10 w-full flex items-center justify-center gap-2">
                    AGENDAR ASESORÍA
                    <motion.span
                        className="material-symbols-outlined text-sm"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        arrow_forward
                    </motion.span>
                </span>
            </motion.a>
        </motion.header>
    );
}
