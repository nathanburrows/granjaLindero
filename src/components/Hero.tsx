"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

const FADE_MS = 3000;

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang].hero;

  const vidA = useRef<HTMLVideoElement>(null);
  const vidB = useRef<HTMLVideoElement>(null);
  const [aOnTop, setAOnTop] = useState(true); // true = A is foreground
  const busy = useRef(false);

  useEffect(() => {
    const a = vidA.current;
    const b = vidB.current;
    if (!a || !b) return;

    function crossfade(from: HTMLVideoElement, to: HTMLVideoElement, toOnTop: boolean) {
      if (busy.current) return;
      busy.current = true;
      to.currentTime = 0;
      to.play();
      setAOnTop(toOnTop);
      setTimeout(() => {
        from.pause();
        busy.current = false;
      }, FADE_MS);
    }

    function onATime() {
      if (!a!.duration) return;
      if ((a!.duration - a!.currentTime) * 1000 <= FADE_MS) crossfade(a!, b!, false);
    }

    function onBTime() {
      if (!b!.duration) return;
      if ((b!.duration - b!.currentTime) * 1000 <= FADE_MS) crossfade(b!, a!, true);
    }

    a.addEventListener("timeupdate", onATime);
    b.addEventListener("timeupdate", onBTime);
    return () => {
      a.removeEventListener("timeupdate", onATime);
      b.removeEventListener("timeupdate", onBTime);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        ref={vidA}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${aOnTop ? "opacity-100 z-0" : "opacity-0 -z-10"}`}
        src="/video/hero-bg.mp4"
        autoPlay
        muted
        playsInline
      />
      <video
        ref={vidB}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${aOnTop ? "opacity-0 -z-10" : "opacity-100 z-0"}`}
        src="/video/hero-bg.mp4"
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/40 to-stone-900/80" />

      <div className="absolute top-32 left-1/2 -translate-x-1/2 bg-green-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full">
        Tomaykichwa · Huánuco · Perú
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 drop-shadow-2xl">
          {tx.tagline}
        </h1>
        <p className="text-stone-200 text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          {tx.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#experiencias" className="bg-green-600 hover:bg-green-500 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl">
            {tx.ctaExperience}
          </a>
          <a href="#hospedaje" className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105">
            {tx.ctaRoom}
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40" />
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
