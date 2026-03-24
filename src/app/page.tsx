"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  // Countdown logic: 10 minutes
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [isVslPlaying, setIsVslPlaying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const fadeUp = {
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

  return (
    <>
      <div className="sticky-countdown">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-black text-sm">timer</span>
          <p className="text-[10px] font-black tracking-[0.2em] text-black uppercase">CUPOS LIMITADOS PARA ASESORÍA:</p>
          <span className="text-black font-black tracking-widest text-sm">{minutes}:{seconds}</span>
        </div>
        <div className="relative w-32 h-[1px] bg-black/20 rounded-full mt-1 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-black/40"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        </div>
      </div>

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
              <img alt="Legal Consultation Video" className="w-full h-full object-cover opacity-50 transition-opacity duration-1000" src="/videos/poster.jpg" />
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
          {[
            { icon: "sentiment_very_dissatisfied", text: "«Siento pánico con números desconocidos...»" },
            { icon: "no_accounts", text: "«Me da vergüenza que mi familia se entere...»" },
            { icon: "home_pin", text: "«Imagino perder mi casa...»" },
            { icon: "trending_down", text: "«Siento que desaparezco mientras los intereses crecen...»" }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ x: 5, borderColor: "rgba(232, 193, 82, 0.4)" }} className="p-6 rounded-2xl bg-black/40 border border-primary/10 italic flex gap-4 transition-colors cursor-default">
              <span className="material-symbols-outlined text-primary shrink-0">{item.icon}</span>
              <p className="text-slate-300 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

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
          {[
            { icon: "gavel", title: "Protección Judicial", desc: "Frena embargos, remates y procesos ejecutivos activos desde el momento de la admisión." },
            { icon: "handshake", title: "Negociación Real", desc: "Negocia tus deudas de acuerdo a tu capacidad real de pago, no a las exigencias de los bancos." },
            { icon: "restart_alt", title: "Reinicio Financiero", desc: "Obtén la oportunidad de rehabilitarte financieramente y volver al sistema económico." }
          ].map((item, i) => (
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
                  alt="Andrés Toro - Abogado"
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
          {[
            { step: "01", title: "Paso 1: Agenda tu evaluación", desc: "Reserva el espacio que mejor se adapte a tu horario para una evaluación inicial confidencial." },
            { step: "02", title: "Paso 2: Sesión de diagnóstico", desc: "Analizamos tu situación de deuda actual y determinamos si eres apto para la Ley de Insolvencia." },
            { step: "03", title: "Paso 3: Trazamos la hoja de ruta legal", desc: "Diseñamos la estrategia jurídica personalizada para detener embargos y negociar con tus acreedores." }
          ].map((item, i) => (
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

      <motion.section
        className="px-6 py-20 bg-brand-deep-grey border-t border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="text-center mb-10">
          <div className="p-8 rounded-3xl bg-black border border-primary/30 text-center relative overflow-hidden mb-12 shadow-2xl">
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
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">VALOR CONSULTA LEGAL: $150.000 COP</span>
              <span className="text-primary text-5xl font-black glow-text leading-tight uppercase flex items-center justify-center gap-2">
                50.000 COP
                <motion.span className="material-symbols-outlined text-3xl" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>local_fire_department</motion.span>
              </span>
              <p className="text-white/60 text-[10px] mt-4 font-medium uppercase tracking-widest">OFERTA POR TIEMPO LIMITADO</p>
            </div>

            <motion.button
              className="w-full bg-primary text-black font-black py-6 rounded-2xl uppercase tracking-[0.1em] text-base relative overflow-hidden z-10"
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
              <span className="relative z-10 w-full flex items-center justify-center gap-2">
                AGENDAR ASESORÍA
                <motion.span className="material-symbols-outlined text-xl" animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>bolt</motion.span>
              </span>
            </motion.button>
          </div>

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
        </div>

        <div className="mt-20 text-center pb-12">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">© 2026 DEFENSA LEGAL INSOLVENCIA • JAVV CORP</p>
        </div>
      </motion.section>
    </>
  );
}
