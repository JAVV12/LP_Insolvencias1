"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(10 * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    return (
        <div className="sticky-countdown z-50">
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
    );
}
