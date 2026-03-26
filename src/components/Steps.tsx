"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const steps = [
    { step: "01", title: "Paso 1: Agenda tu evaluación", desc: "Reserva el espacio que mejor se adapte a tu horario para una evaluación inicial confidencial." },
    { step: "02", title: "Paso 2: Sesión de diagnóstico", desc: "Analizamos tu situación de deuda actual y determinamos si eres apto para la Ley de Insolvencia." },
    { step: "03", title: "Paso 3: Trazamos la hoja de ruta legal", desc: "Diseñamos la estrategia jurídica personalizada para detener embargos y negociar con tus acreedores." }
];

export default function Steps() {
    return (
        <motion.section
            className="px-6 py-16 bg-brand-black"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <motion.div variants={fadeUp} className="text-center mb-12">
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 border border-primary/30 bg-primary/5 rounded-full">EL CAMINO A TU LIBERTAD</span>
                <h2 className="text-white text-3xl font-black mt-6 uppercase">CÓMO FUNCIONA TU REINICIO</h2>
            </motion.div>

            <div className="relative ml-4 border-l-2 border-primary/20 pl-10 space-y-12">
                {steps.map((item, i) => (
                    <motion.div key={i} variants={fadeUp} className="relative group">
                        <motion.div
                            className="absolute -left-[53px] top-0 flex size-10 items-center justify-center rounded-full bg-primary text-black text-sm font-black glow-shadow border-4 border-brand-black uppercase transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-amber-600"
                        >{item.step}</motion.div>
                        <h3 className="text-primary font-bold uppercase text-xs tracking-widest mb-2 transition-colors group-hover:text-white">{item.title}</h3>
                        <p className="text-slate-300 text-sm leading-relaxed font-light">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
