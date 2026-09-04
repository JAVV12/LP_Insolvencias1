"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { PROMO } from "@/lib/promo";

export default function CTA() {
    return (
        <section className="px-6 py-20 bg-brand-deep-grey border-t border-white/5">
            <div className="text-center mb-10">
                <Reveal className="p-6 sm:p-8 rounded-3xl bg-black border border-primary/30 text-center relative overflow-hidden mb-12 shadow-2xl">
                    <motion.div
                        className="absolute -top-10 -right-10 size-32 bg-primary/20 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    ></motion.div>

                    <h2 className="text-white text-2xl font-black mb-4 uppercase tracking-tight relative z-10">No esperes a que el embargo sea irreversible.</h2>
                    <p className="text-slate-400 text-base leading-relaxed mb-8 font-light relative z-10">
                        Cada día que pasa los intereses te hunden más. Toma acción hoy mismo y asegura tu espacio para la consulta especializada.
                    </p>
                    <div className="flex flex-col items-center gap-1 mb-8 relative z-10">
                        {/* «Sin costo» a text-4xl para que quepa en una línea a 375 px. */}
                        <span className="text-primary text-4xl sm:text-5xl font-black glow-text leading-tight uppercase">
                            Sin costo
                        </span>
                        <p className="text-white/60 text-[10px] mt-4 font-medium uppercase tracking-widest">
                            Asesoría por este mes de {PROMO.mes}
                        </p>
                    </div>

                    {/* text-sm hasta sm: «AGENDAR MI ASESORÍA» parte en dos líneas a 320 px si va a text-base. */}
                    <motion.a
                        href="https://wa.link/fspjz8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-primary text-black font-black py-6 rounded-2xl uppercase tracking-[0.06em] sm:tracking-[0.1em] text-sm sm:text-base relative overflow-hidden z-10 flex items-center justify-center"
                        whileHover={{ scale: 1.02, boxShadow: "0px 15px 40px rgba(232, 193, 82, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            boxShadow: ["0px 0px 0px rgba(232,193,82,0)", "0px 0px 25px rgba(232,193,82,0.8)", "0px 0px 0px rgba(232,193,82,0)"]
                        }}
                        transition={{ boxShadow: { duration: 1.5, repeat: Infinity } }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-white opacity-30"
                            initial={{ x: "-100%", skewX: -20 }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                        />
                        <span className="relative z-10">AGENDAR MI ASESORÍA</span>
                    </motion.a>
                </Reveal>

                <Reveal delay={60}>
                    <motion.div
                        className="p-8 rounded-3xl bg-black/40 border border-white/10 text-center relative overflow-hidden shadow-xl"
                        whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)" }}
                    >
                        <div className="absolute -top-10 -right-10 size-32 bg-primary/5 rounded-full blur-3xl"></div>
                        <motion.span
                            className="material-symbols-outlined text-primary text-6xl mb-4"
                            initial={{ rotate: -10 }}
                            animate={{ rotate: 10 }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        >
                            verified_user
                        </motion.span>
                        <h3 className="text-white text-2xl font-extrabold mb-4 uppercase relative z-10">GARANTÍA DE CONFIDENCIALIDAD</h3>
                        <p className="text-white text-sm leading-relaxed font-light relative z-10">
                            Toda la información compartida está protegida por el <span className="text-primary font-bold">secreto profesional abogado-cliente</span>. Tu privacidad es nuestra máxima prioridad.
                        </p>
                    </motion.div>
                </Reveal>
            </div>
        </section>
    );
}
