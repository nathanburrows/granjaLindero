"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { waUrl, PHONE_DISPLAY } from "@/lib/contact";

const bgImages = [
  "/images/animales_alpacas.jpg",
  "/images/actividades_cosecha_huerto.jpg",
  "/images/paisaje_sendero_montana.jpg",
  "/images/experiencias_jardin_gazebo.jpg",
  "/images/experiencias_fogon_noche.jpg",
];

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Experiences() {
  const { lang } = useLang();
  const tx = t[lang].experiences;

  const [selected, setSelected] = useState<number | null>(null);
  const [bookDate, setBookDate] = useState("");
  const [bookPeople, setBookPeople] = useState(2);

  // Keyboard close
  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected]);

  const selectedItem = selected !== null ? tx.items[selected] : null;

  return (
    <section id="experiencias" className="py-24 md:py-32 bg-white">
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

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {tx.items.map((item, i) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
              onClick={() => setSelected(i)}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${bgImages[i]}')` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent group-hover:from-stone-900/95 transition-colors duration-300" />

              {/* Content */}
              <div className="relative z-10 p-6 h-80 flex flex-col">
                {/* Description + button — float above title on hover */}
                <div className="flex-1 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pb-3">
                  <p className="text-stone-300 text-sm leading-relaxed mb-3 line-clamp-3">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-white text-xs font-semibold px-4 py-2 rounded-full w-fit">
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    {tx.bookCta}
                  </span>
                </div>
                {/* Title — always anchored to bottom */}
                <div>
                  <div className="text-green-400 text-xs font-bold uppercase tracking-widest mb-1">
                    {item.subtitle}
                  </div>
                  <h3 className="font-serif text-white text-xl font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-14 text-center">
          <a
            href={waUrl("")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <WhatsAppIcon />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Booking modal */}
      {selected !== null && selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Photo header */}
            <div
              className="relative h-52 bg-cover bg-center"
              style={{ backgroundImage: `url('${bgImages[selected]}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-1">
                  {selectedItem.subtitle}
                </p>
                <h3 className="font-serif text-white text-2xl font-bold">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-stone-600 leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              {/* Booking form */}
              <div className="bg-stone-50 rounded-2xl p-4 mb-5 space-y-4">
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                    {tx.formDate}
                  </label>
                  <input
                    type="date"
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* People */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-600">{tx.formPeople}</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBookPeople((p) => Math.max(1, p - 1))}
                      className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors disabled:opacity-40"
                      disabled={bookPeople <= 1}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                    </button>
                    <span className="w-6 text-center font-semibold text-stone-800">{bookPeople}</span>
                    <button
                      type="button"
                      onClick={() => setBookPeople((p) => Math.min(50, p + 1))}
                      className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-stone-400 text-sm mb-4">{tx.bookSubtitle}</p>
              <a
                href={waUrl(
                  `Me gustaría reservar la experiencia: ${selectedItem.title}` +
                  (bookDate ? `\nFecha: ${bookDate}` : "") +
                  `\nPersonas: ${bookPeople}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3.5 rounded-full transition-all duration-300 hover:scale-105"
                onClick={() => setSelected(null)}
              >
                <WhatsAppIcon />
                {tx.bookCta}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
