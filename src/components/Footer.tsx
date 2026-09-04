/**
 * Identificación del prestador del servicio.
 *
 * Los mismos datos van en el JSON-LD de `layout.tsx`, para que Google pueda
 * vincular la página con la firma real y considerarla en resultados locales.
 */
export default function Footer() {
    return (
        <footer className="bg-brand-deep-grey border-t border-white/5 px-6 pt-12 pb-14 text-center">
            <div className="mx-auto max-w-md">
                <p className="text-primary text-xs font-black uppercase tracking-[0.2em]">
                    Toro Legal Abogados S.A.S.
                </p>

                <div className="mx-auto my-5 h-px w-16 bg-primary/30"></div>

                <address className="not-italic text-slate-400 text-sm leading-relaxed">
                    <span className="tabular-nums">NIT 902.066.320-8</span>
                    <br />
                    Pereira, Risaralda &mdash; Colombia
                </address>

                <p className="mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                    &copy; 2026 Defensa Legal Insolvencia &bull; JAVV Corp
                </p>
            </div>
        </footer>
    );
}
