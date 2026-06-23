"use client";

import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

const PHONE = "51966721057";

const pillarImages = [
  "/images/grupos_actividades.jpg",
  "/images/grupos_colegio1.jpg",
  "/images/grupos_colegio2.jpg",
];

export default function Groups() {
  const { lang } = useLang();
  const tx = t[lang].groups;

  const waMessage = encodeURIComponent(
    lang === "es"
      ? "Hola, me interesa reservar para un grupo. ¿Pueden darme más información?"
      : "Hi, I'm interested in booking for a group. Can you give me more information?"
  );
  const waUrl = `https://wa.me/${PHONE}?text=${waMessage}`;

  return (
    <section id="grupos" className="bg-stone-950 text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-400 mb-4">
            {tx.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-5 leading-tight">
            {tx.title}
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {tx.subtitle}
          </p>
        </div>

        {/* Three pillars */}
        <div className="mb-20">
          <p className="text-center text-sm font-semibold tracking-widest uppercase text-stone-500 mb-10">
            {tx.pillarsTitle}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {tx.pillars.map((pillar, i) => (
              <div
                key={pillar.id}
                className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-green-600/60 transition-all duration-300"
              >
                {/* Photo */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={pillarImages[i]}
                    alt={pillar.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent" />
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="text-3xl mb-3">{pillar.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities + Group types side by side */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">

          {/* Activities */}
          <div className="bg-stone-900 rounded-2xl border border-stone-800 p-8">
            <h3 className="text-lg font-bold text-white mb-6">{tx.activitiesTitle}</h3>
            <div className="grid grid-cols-2 gap-3">
              {tx.activities.map((a) => (
                <div
                  key={a.label}
                  className="flex items-center gap-3 bg-stone-800/60 rounded-xl px-4 py-3"
                >
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-stone-200 text-sm font-medium">{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group types */}
          <div className="bg-stone-900 rounded-2xl border border-stone-800 p-8">
            <h3 className="text-lg font-bold text-white mb-6">{tx.groupsTitle}</h3>
            <div className="grid grid-cols-2 gap-3">
              {tx.groupTypes.map((g) => (
                <div
                  key={g.label}
                  className="flex items-center gap-3 bg-stone-800/60 rounded-xl px-4 py-3"
                >
                  <span className="text-2xl">{g.icon}</span>
                  <span className="text-stone-200 text-sm font-medium">{g.label}</span>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className="mt-6 text-stone-500 text-sm border-t border-stone-800 pt-4">
              {tx.note}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-semibold text-base px-8 py-4 rounded-full transition-colors shadow-lg shadow-green-900/30"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.215a.75.75 0 00.918.937l5.523-1.451A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.953-1.355l-.355-.212-3.68.967.984-3.594-.232-.371A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
            </svg>
            {tx.ctaWhatsapp}
          </a>
        </div>

      </div>
    </section>
  );
}
