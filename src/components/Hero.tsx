"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Hero() {
    const [isVslPlaying, setIsVslPlaying] = useState(false);

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
                    <div className="absolute inset-0 bg-black z-20 flex items-center justify-center">
                        <video
                            src="/videos/vsl-optimized.mp4"
                            poster="/videos/poster.jpg"
                            autoPlay
                            controls
                            playsInline
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                )}
            </motion.div>

            <motion.button
                className="w-full bg-primary text-black font-black py-5 rounded-xl uppercase tracking-widest text-sm relative overflow-hidden"
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
            </motion.button>
        </motion.header>
    );
}
