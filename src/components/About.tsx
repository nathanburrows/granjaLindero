"use client";

import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

export default function About() {
  const { lang } = useLang();
  const tx = t[lang].about;

  return (
    <section id="nosotros" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-block text-green-700 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              {tx.label}
            </span>
            <h2 className="font-serif text-stone-900 text-4xl md:text-5xl font-bold leading-tight mb-6">
              {tx.title}
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-10">
              {tx.body}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: tx.stat1, label: tx.stat1Label },
                { value: tx.stat2, label: tx.stat2Label },
                { value: tx.stat3, label: tx.stat3Label },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-serif text-3xl font-bold text-green-700">{s.value}</div>
                  <div className="text-stone-500 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage — three static cards */}
          <div className="relative h-[500px]">
            {/* Back card — bottom-right, llamas */}
            <div
              className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-2xl shadow-xl border-4 border-stone-50 overflow-hidden"
              style={{ zIndex: 2, backgroundImage: "url('/images/animales_alpacas.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            />

            {/* Front card — top-left, hammock */}
            <div
              className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl shadow-2xl overflow-hidden"
              style={{ zIndex: 3, backgroundImage: "url('/images/hospedaje_hamaca_jardin.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            />

            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-100 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
