"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { waUrl } from "@/lib/contact";

type PkgItem = (typeof t)["es"]["packages"]["items"][number];

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const packageVisuals: Record<string, { src: string; label: string }[]> = {
  halfday: [
    { src: "/images/animales_alpacas.jpg", label: "Animal Friends" },
    { src: "/images/restaurant_juane_plato.jpg", label: "Almuerzo" },
  ],
  fullday: [
    { src: "/images/animales_ternero_biberon.jpg", label: "Animal Friends" },
    { src: "/images/paisaje_sendero_montana.jpg", label: "Circuito Ecológico" },
    { src: "/images/restaurant_juane_plato.jpg", label: "Almuerzo" },
  ],
  "2d1n": [
    { src: "/images/animales_alpacas.jpg", label: "Animal Friends" },
    { src: "/images/actividades_cosecha_huerto.jpg", label: "Taller Verde" },
    { src: "/images/hospedaje_cabana_bosque.jpg", label: "Hospedaje" },
    { src: "/images/experiencias_fogon_noche.jpg", label: "Fogón" },
  ],
  "3d2n": [
    { src: "/images/animales_ternero_biberon.jpg", label: "Animal Friends" },
    { src: "/images/actividades_cosecha_huerto.jpg", label: "Taller Verde" },
    { src: "/images/hospedaje_cabana_bosque.jpg", label: "Hospedaje" },
    { src: "/images/paisaje_campo_huanuco.jpg", label: "Hacienda" },
  ],
};

function BookingModal({
  pkg,
  visuals,
  tx,
  lang,
  onClose,
}: {
  pkg: PkgItem;
  visuals: { src: string; label: string }[];
  tx: (typeof t)["es"]["packages"];
  lang: "es" | "en";
  onClose: () => void;
}) {
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(pkg.minPeople ?? 2);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const message =
    lang === "es"
      ? [
          `Hola, me interesa reservar el Paquete ${pkg.name} (${pkg.price}/persona).`,
          date ? `Fecha de llegada: ${date}` : "",
          `Número de personas: ${people}`,
          "¿Pueden confirmar disponibilidad?",
        ].filter(Boolean).join("\n")
      : [
          `Hi, I'd like to book the ${pkg.name} Package (${pkg.price}/person).`,
          date ? `Arrival date: ${date}` : "",
          `Number of people: ${people}`,
          "Can you confirm availability?",
        ].filter(Boolean).join("\n");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Photo strip header */}
        {visuals.length > 0 && (
          <div className="relative flex h-36 overflow-hidden">
            {visuals.map((v, i) => (
              <div key={i} className="relative flex-1 overflow-hidden">
                <Image src={v.src} alt={v.label} fill className="object-cover" sizes="200px" />
                {i < visuals.length - 1 && (
                  <div className="absolute top-0 right-0 bottom-0 w-px bg-white/40" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-stone-100">
          <div>
            <h3 className="font-serif text-stone-900 text-2xl font-bold">{pkg.name}</h3>
            <p className="text-stone-400 text-sm mt-0.5">
              {pkg.price} / {tx.perPerson}
              {pkg.minPeople > 1 && ` · ${tx.minPeople.replace("{n}", String(pkg.minPeople))}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="px-7 py-5 space-y-5">
          {/* Date */}
          <div className="bg-stone-50 rounded-2xl p-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                {tx.formDate}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* People */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-600">{tx.formPeople}</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPeople((p) => Math.max(pkg.minPeople ?? 1, p - 1))}
                  disabled={people <= (pkg.minPeople ?? 1)}
                  className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors disabled:opacity-40"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-6 text-center font-semibold text-stone-800">{people}</span>
                <button
                  type="button"
                  onClick={() => setPeople((p) => Math.min(200, p + 1))}
                  className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <p className="text-stone-400 text-sm">{tx.formSubtitle}</p>

          <a
            href={waUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3.5 rounded-full transition-colors"
            onClick={onClose}
          >
            <WhatsAppIcon />
            {tx.formSend}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Packages() {
  const { lang } = useLang();
  const tx = t[lang].packages;
  const [selected, setSelected] = useState<number | null>(null);

  const selectedPkg = selected !== null ? tx.items[selected] : null;
  const selectedVisuals = selected !== null ? (packageVisuals[tx.items[selected].id] ?? []) : [];

  return (
    <section id="paquetes" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-green-700 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {tx.tag}
          </span>
          <h2 className="font-serif text-stone-900 text-4xl md:text-5xl font-bold leading-tight mb-4">
            {tx.title}
          </h2>
          <p className="text-stone-500 text-lg">{tx.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {tx.items.map((pkg, i) => {
            const visuals = packageVisuals[pkg.id] ?? [];
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl flex flex-col overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  pkg.highlight
                    ? "bg-green-700 border-green-600 text-white shadow-lg shadow-green-900/20"
                    : "bg-white border-stone-200 text-stone-900"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-300" />
                )}

                {/* Photo strip */}
                {visuals.length > 0 && (
                  <div className="flex h-28 overflow-hidden">
                    {visuals.map((v, vi) => (
                      <div
                        key={vi}
                        className="relative flex-1 overflow-hidden"
                        style={{ flexBasis: `${100 / visuals.length}%` }}
                      >
                        <Image src={v.src} alt={v.label} fill className="object-cover" sizes="200px" />
                        {vi < visuals.length - 1 && (
                          <div className="absolute top-0 right-0 bottom-0 w-px bg-white/30" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Top */}
                <div className={`px-6 pt-6 pb-5 border-b ${pkg.highlight ? "border-green-600/50" : "border-stone-100"}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1.5 ${pkg.highlight ? "text-green-300" : "text-green-700"}`}>
                    {pkg.tagline}
                  </p>
                  <h3 className={`font-serif text-2xl font-bold mb-3 ${pkg.highlight ? "text-white" : "text-stone-900"}`}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-end gap-1.5">
                    <span className={`font-serif text-5xl font-bold leading-none ${pkg.highlight ? "text-white" : "text-stone-900"}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-sm mb-1 ${pkg.highlight ? "text-green-200" : "text-stone-500"}`}>
                      / {tx.perPerson}
                    </span>
                  </div>
                  {pkg.minPeople > 1 && (
                    <p className={`text-xs mt-2 ${pkg.highlight ? "text-green-300" : "text-stone-400"}`}>
                      {tx.minPeople.replace("{n}", String(pkg.minPeople))}
                    </p>
                  )}
                </div>

                {/* Includes */}
                <div className="px-6 py-5 flex-1">
                  <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${pkg.highlight ? "text-green-300" : "text-stone-400"}`}>
                    {tx.includes}
                  </p>
                  <ul className="space-y-2.5">
                    {pkg.includes.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2.5">
                        <svg
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.highlight ? "text-green-300" : "text-green-600"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`text-sm leading-snug ${pkg.highlight ? "text-green-100" : "text-stone-600"}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <button
                    onClick={() => setSelected(i)}
                    className={`flex items-center justify-center gap-2 w-full font-semibold text-sm py-3.5 rounded-full transition-all duration-200 ${
                      pkg.highlight
                        ? "bg-white text-green-700 hover:bg-green-50"
                        : "bg-green-600 hover:bg-green-500 text-white"
                    }`}
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    {tx.ctaBook}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fine print */}
        <p className="text-center text-stone-400 text-sm mt-10">{tx.note}</p>
      </div>

      {selected !== null && selectedPkg && (
        <BookingModal
          pkg={selectedPkg}
          visuals={selectedVisuals}
          tx={tx}
          lang={lang}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
