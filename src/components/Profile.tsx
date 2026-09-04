"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Reveal from "./Reveal";

export default function Profile() {
    return (
        <section className="px-6 py-20 bg-brand-deep-grey border-y border-white/5">
            <div className="max-w-4xl mx-auto">
                <Reveal className="text-center mb-12">
                    <h2 className="text-primary text-2xl font-black uppercase tracking-widest glow-text">Tu defensor ante el sistema financiero</h2>
                    <div className="h-0.5 w-24 bg-primary mx-auto mt-4 rounded-full opacity-30"></div>
                </Reveal>

                <div className="flex flex-col items-center gap-10">

                    {/* Imagen de firma — landscape card */}
                    <Reveal className="relative w-full group">
                        <motion.div
                            className="absolute inset-0 bg-primary/10 rounded-2xl blur-3xl group-hover:bg-primary/20 transition-colors duration-700"
                            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 5, repeat: 2, ease: "easeInOut" }}
                        ></motion.div>
                        <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden border border-primary/20 shadow-2xl">
                            <Image
                                src="/images/firma-toro-legal.webp"
                                alt="Toro Legal Abogados — Firma jurídica especialista en Insolvencia Colombia"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 896px, 1024px"
                                className="object-cover object-center grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                priority={false}
                            />
                            {/* Badge verificado */}
                            <div className="absolute bottom-4 right-4 bg-primary text-black px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                <span className="material-symbols-outlined font-black text-base">verified</span>
                                <span className="text-xs font-black uppercase tracking-widest">Firma Certificada</span>
                            </div>
                        </div>
                    </Reveal>

                    {/* Nombre y descripción */}
                    <Reveal className="text-center space-y-6 w-full" delay={60}>
                        <h3 className="text-primary text-3xl lg:text-4xl font-extrabold tracking-tight relative inline-block">TORO LEGAL
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/30"></span>
                        </h3>
                        <div className="space-y-4 text-white text-base leading-relaxed font-light px-2 lg:px-0 text-justify">
                            <p>Somos una <span className="text-primary font-bold">firma jurídica de élite</span>, integrada por un equipo multidisciplinario de especialistas con amplia trayectoria en el sector público y privado. Nuestra firma ha consolidado su prestigio a través de la representación legal en entidades como la <span className="text-primary font-bold">Gobernación de Caldas</span> y diversas alcaldías municipales, fortaleciendo una gestión jurídica de alto nivel.</p>
                            <p>En <span className="text-primary font-bold">TORO LEGAL ABOGADOS S.A.S</span>, contamos con departamentos especializados en <span className="text-primary font-bold">Derecho Civil</span>, <span className="text-primary font-bold">Derecho de Familia</span> y <span className="text-primary font-bold">Derecho Comercial</span>, brindando un respaldo integral a personas y empresas que buscan seguridad jurídica.</p>
                            <p>Nuestra firma cuenta con <span className="text-primary font-bold">más de 5 años de experiencia</span> liderando <span className="text-primary font-bold">procesos de insolvencia a nivel nacional</span>. Hemos asesorado a cientos de clientes en la reorganización de sus deudas, logrando la recuperación de su estabilidad financiera y transformando realidades económicas complejas en nuevas oportunidades.</p>
                            <p>Nuestro enfoque institucional se basa en la <span className="text-primary font-bold">transparencia absoluta</span>, el acompañamiento corporativo cercano y la ejecución de estrategias legales precisas para quienes necesitan una <span className="text-primary font-bold">nueva oportunidad financiera</span>.</p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
