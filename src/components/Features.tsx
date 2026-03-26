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

const features = [
    { icon: "gavel", title: "Protección Judicial", desc: "Frena embargos, remates y procesos ejecutivos activos desde el momento de la admisión." },
    { icon: "handshake", title: "Negociación Real", desc: "Negocia tus deudas de acuerdo a tu capacidad real de pago, no a las exigencias de los bancos." },
    { icon: "restart_alt", title: "Reinicio Financiero", desc: "Obtén la oportunidad de rehabilitarte financieramente y volver al sistema económico." }
];

export default function Features() {
    return (
        <motion.section
            className="px-6 py-16 text-center bg-brand-black"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
        >
            <motion.h2 variants={fadeUp} className="text-white text-3xl font-black mb-6 leading-tight">
                La Ley de Insolvencia: <span className="text-primary italic relative">Tu derecho legal<motion.span className="absolute bottom-0 left-0 w-full h-1 bg-primary/40 -z-10" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: 0.5, duration: 0.8 }}></motion.span></span> a empezar de nuevo.
            </motion.h2>
            <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-brand-deep-grey border border-primary/20 text-left mb-12 relative overflow-hidden group hover:border-primary/50 transition-all">
                <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/20 transition-all duration-700"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                ></motion.div>
                <p className="text-slate-200 text-lg leading-relaxed font-light relative z-10">
                    La ley no se hizo solo para empresas; se hizo para protegerte. Es un <span className="text-primary font-bold">borrón y cuenta nueva</span> que detiene procesos judiciales de inmediato.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 text-left">
                {features.map((item, i) => (
                    <motion.div key={i} variants={fadeUp} whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(232,193,82,0.15)" }} className="flex items-start gap-5 p-6 rounded-2xl bg-brand-deep-grey border border-white/5 transition-all cursor-default">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 glow-shadow">
                            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                        </div>
                        <div>
                            <h3 className="text-primary font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
