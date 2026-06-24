"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-stone-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { lang } = useLang();
  const tx = t[lang].testimonials;
  const items = tx.items;

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % items.length);
  }, [items.length]);

  const prev = () => {
    setCurrent((c) => (c - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  // Reset index when language changes
  useEffect(() => {
    setCurrent(0);
  }, [lang]);

  return (
    <section className="py-20 md:py-28 bg-stone-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {tx.label}
          </span>
          <h2 className="font-serif text-white text-4xl md:text-5xl font-bold leading-tight">
            {tx.title}
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card */}
          <div className="relative min-h-[220px] flex items-center">
            {items.map((item, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col items-center text-center px-4 md:px-16 transition-all duration-500 ${
                  i === current
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <Stars count={item.stars} />
                <p className="mt-6 text-stone-200 text-lg md:text-xl leading-relaxed font-light italic max-w-3xl">
                  &ldquo;{item.text}&rdquo;
                </p>
                <p className="mt-6 text-green-400 font-semibold text-sm uppercase tracking-widest">
                  — {item.name}
                </p>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-stone-700 hover:border-green-500 text-stone-400 hover:text-green-400 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-green-400 w-6" : "bg-stone-600 hover:bg-stone-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-stone-700 hover:border-green-500 text-stone-400 hover:text-green-400 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
