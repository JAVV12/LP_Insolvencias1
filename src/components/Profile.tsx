"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

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

export default function Profile() {
    return (
        <motion.section
            className="px-6 py-20 bg-brand-deep-grey border-y border-white/5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <div className="max-w-4xl mx-auto">
                <motion.div variants={fadeUp} className="text-center mb-12">
                    <h2 className="text-primary text-2xl font-black uppercase tracking-widest glow-text">Tu defensor ante el sistema financiero</h2>
                    <div className="h-0.5 w-24 bg-primary mx-auto mt-4 rounded-full opacity-30"></div>
                </motion.div>

                <div className="flex flex-col items-center gap-10">
                    <motion.div variants={fadeUp} className="relative group">
                        <motion.div
                            className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors duration-700"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        ></motion.div>
                        <div className="relative size-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                            <Image
                                src="/images/perfil-andres.webp"
                                alt="Andrés Toro - Abogado especialista en Insolvencia"
                                fill
                                sizes="(max-width: 768px) 256px, 256px"
                                className="object-cover object-top grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                        </div>
                        <motion.div
                            className="absolute -bottom-2 -right-2 bg-primary text-black p-3 rounded-full shadow-lg"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                        >
                            <span className="material-symbols-outlined font-black text-xl">verified</span>
                        </motion.div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="text-center space-y-6">
                        <h3 className="text-primary text-3xl font-extrabold tracking-tight relative inline-block">Andrés Toro - Abogado
                            <motion.span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/30" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 0.8 }}></motion.span>
                        </h3>
                        <div className="space-y-4 text-white text-base leading-relaxed font-light px-4 text-justify">
                            <p>Egresado de la <span className="text-primary font-bold">Universidad de Manizales</span>, con experiencia en el sector público y privado en diferentes áreas del derecho. Cuenta con trayectoria profesional en el sector público, habiendo prestado sus servicios en la <span className="text-primary font-bold">Gobernación de Caldas</span> (2021) y en la <span className="text-primary font-bold">Alcaldía de Neira</span>, Caldas (2024), donde fortaleció su experiencia en gestión jurídica y procesos administrativos.</p>
                            <p>En el sector privado, se ha desempeñado en las áreas de <span className="text-primary font-bold">Derecho Civil</span>, <span className="text-primary font-bold">Derecho de Familia</span> y <span className="text-primary font-bold">Derecho Comercial</span>, brindando asesoría y acompañamiento legal a personas y empresas.</p>
                            <p>Además, cuenta con <span className="text-primary font-bold">más de 5 años de experiencia</span> acompañando <span className="text-primary font-bold">procesos de insolvencia</span>, donde ha asesorado a múltiples personas en la reorganización de sus deudas y la recuperación de su estabilidad financiera, viendo de primera mano los resultados positivos que este proceso puede generar en la vida de sus clientes.</p>
                            <p>Su enfoque profesional se basa en la transparencia, el acompañamiento cercano y la búsqueda de soluciones legales para quienes necesitan una <span className="text-primary font-bold">nueva oportunidad financiera</span>.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
