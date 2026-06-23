"use client";

import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang].hero;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/paisaje_campo_huanuco.jpg')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/40 to-stone-900/80" />

      {/* Floating badge */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 bg-green-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full">
        Tomaykichwa · Huánuco · Perú
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 drop-shadow-2xl">
          {tx.tagline}
        </h1>
        <p className="text-stone-200 text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          {tx.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#experiencias"
            className="bg-green-600 hover:bg-green-500 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl"
          >
            {tx.ctaExperience}
          </a>
          <a
            href="#hospedaje"
            className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            {tx.ctaRoom}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40" />
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </section>
  );
}
