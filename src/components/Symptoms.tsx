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

const symptoms = [
    { icon: "sentiment_very_dissatisfied", text: "«Siento pánico con números desconocidos...»" },
    { icon: "no_accounts", text: "«Me da vergüenza que mi familia se entere...»" },
    { icon: "home_pin", text: "«Imagino perder mi casa...»" },
    { icon: "trending_down", text: "«Siento que desaparezco mientras los intereses crecen...»" }
];

export default function Symptoms() {
    return (
        <motion.section
            className="px-6 py-16 bg-brand-deep-grey"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
        >
            <motion.div variants={fadeUp} className="text-center mb-12">
                <h2 className="text-primary text-2xl font-black tracking-tight mb-4 uppercase">¿Tus deudas te están robando el sueño y la dignidad?</h2>
                <div className="h-0.5 w-20 bg-primary mx-auto rounded-full"></div>
            </motion.div>
            <div className="space-y-6">
                {symptoms.map((item, i) => (
                    <motion.div key={i} variants={fadeUp} whileHover={{ x: 5, borderColor: "rgba(232, 193, 82, 0.4)" }} className="p-6 rounded-2xl bg-black/40 border border-primary/10 italic flex gap-4 transition-colors cursor-default">
                        <span className="material-symbols-outlined text-primary shrink-0">{item.icon}</span>
                        <p className="text-slate-300 leading-relaxed">{item.text}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
