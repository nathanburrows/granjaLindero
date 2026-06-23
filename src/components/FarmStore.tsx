"use client";

import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { waUrl } from "@/lib/contact";

const photos = [
  "/images/tienda_kiosco_fridge.jpg",       // hero — store front with fridge
  "/images/tienda_queso.jpg", // cheese
  "/images/tienda_yogurt.jpg", // milk / yogurt
  "/images/tienda_huevos_frescos.jpg",      // farm-fresh eggs
];

export default function FarmStore() {
  const { lang } = useLang();
  const tx = t[lang].store;

  return (
    <section id="tienda" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-green-700 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {tx.label}
          </span>
          <h2 className="font-serif text-stone-900 text-4xl md:text-5xl font-bold leading-tight mb-4">
            {tx.title}
          </h2>
          <p className="text-stone-500 text-lg">{tx.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Photos */}
          <div className="grid grid-cols-3 gap-3">
            {/* Hero — store front, full width */}
            <div
              className="col-span-3 rounded-2xl h-64 bg-cover bg-center shadow-lg"
              style={{ backgroundImage: `url('${photos[0]}')` }}
            />
            {/* Row 2: cheese, milk, eggs */}
            {photos.slice(1).map((src, i) => (
              <div
                key={i}
                className="rounded-2xl h-36 bg-cover bg-center shadow-md"
                style={{ backgroundImage: `url('${src}')` }}
              />
            ))}
          </div>

          {/* Products + CTA */}
          <div>
            <p className="text-stone-600 text-lg leading-relaxed mb-10">
              {tx.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {tx.products.map((p) => (
                <div
                  key={p.name}
                  className="bg-white rounded-xl px-4 py-3 border border-stone-200 shadow-sm"
                >
                  <div className="font-semibold text-stone-800 text-sm">{p.name}</div>
                  <div className="text-stone-400 text-xs mt-0.5">{p.detail}</div>
                </div>
              ))}
            </div>

            <a
              href={waUrl("Me gustaría consultar sobre los productos de la tienda.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {tx.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
