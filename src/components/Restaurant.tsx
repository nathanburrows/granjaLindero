"use client";

import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

export default function Restaurant() {
  const { lang } = useLang();
  const tx = t[lang].restaurant;

  return (
    <section id="restaurante" className="py-24 md:py-32 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-block text-amber-700 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              {tx.label}
            </span>
            <h2 className="font-serif text-stone-900 text-4xl md:text-5xl font-bold leading-tight mb-6">
              {tx.title}
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              {tx.description}
            </p>

            <ul className="space-y-3 mb-10">
              {tx.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-stone-700">
                  <span className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="rounded-2xl overflow-hidden h-64 bg-cover bg-center shadow-lg"
              style={{
                backgroundImage: `url('/images/restaurant_mesa_desayuno.jpg')`,
              }}
            />
            <div
              className="rounded-2xl overflow-hidden h-64 mt-8 bg-cover bg-center shadow-lg"
              style={{
                backgroundImage: `url('/images/restaurant_juane_plato.jpg')`,
              }}
            />
            <div
              className="rounded-2xl overflow-hidden h-48 bg-cover bg-center shadow-lg"
              style={{
                backgroundImage: `url('/images/tienda_kiosco_menu.jpg')`,
              }}
            />
            <div
              className="rounded-2xl overflow-hidden h-48 -mt-4 bg-cover bg-center shadow-lg"
              style={{
                backgroundImage: `url('/images/restaurant_pachamanca.jpg')`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
