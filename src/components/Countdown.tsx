"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DURATION = 10 * 60; // 10 minutos en segundos

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(DURATION);

    useEffect(() => {
        const stored = localStorage.getItem("countdown-start");
        const start = stored ? parseInt(stored) : Date.now();
        if (!stored) localStorage.setItem("countdown-start", String(start));

        const calc = () => {
            const elapsed = Math.floor((Date.now() - start) / 1000);
            return Math.max(0, DURATION - elapsed);
        };

        setTimeLeft(calc());
        const timer = setInterval(() => setTimeLeft(calc()), 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    const progress = (timeLeft / DURATION) * 100;

    return (
        <div className="sticky-countdown z-50">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black shrink-0">
                    <line x1="10" y1="2" x2="14" y2="2" />
                    <line x1="12" y1="14" x2="15" y2="11" />
                    <circle cx="12" cy="14" r="8" />
                </svg>
                <p className="text-[10px] font-black tracking-[0.2em] text-black uppercase">
                    {timeLeft > 0 ? "ASESORÍA GRATUITA POR TIEMPO LIMITADO:" : "OFERTA FINALIZADA —"}
                </p>
                {timeLeft > 0
                    ? <span className="text-black font-black tracking-widest text-sm">{minutes}:{seconds}</span>
                    : <span className="text-black font-black tracking-widest text-sm">AGENDA TU CITA</span>
                }
            </div>
            <div className="relative w-32 h-[1px] bg-black/20 rounded-full mt-1 overflow-hidden">
                <div
                    className="absolute inset-0 bg-black/60 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
