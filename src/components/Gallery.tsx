"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

const photos = [
  "/images/paisaje_estrellas_noche.jpg",
  "/images/hospedaje_cabana_bosque.jpg",
  "/images/animales_alpacas.jpg",
  "/images/hospedaje_edificio_principal.jpg",
  "/images/animales_ovejas.jpg",
  "/images/experiencias_cuyes_granja.jpg",
  "/images/animales_ternero_biberon.jpg",
  "/images/experiencias_caminata_mirador.jpg",
  "/images/animales_cuyes.jpg",
  "/images/experiencias_fogon_noche.jpg",
  "/images/animales_gallinas_campo.jpg",
  "/images/tienda_kiosco_fridge.jpg",
  "/images/tienda_huevos_frescos.jpg",
  "/images/animales_vaca_comedero.jpg",
  "/images/animales_vacas_comedero.jpg",
  "/images/actividades_cosecha_huerto.jpg",
  "/images/paisaje_sendero_montana.jpg",
  "/images/animales_ternero.jpg",
  "/images/animales_vaca_pastando.jpg",
  "/images/experiencias_jardin_gazebo.jpg",
  "/images/experiencias_fogon_salchichas.jpg",
  "/images/tienda_kiosco_menu.jpg",
  "/images/restaurant_juane_plato.jpg",
  "/images/animales_gallinas_corral.jpg",
  "/images/restaurant_pachamanca.jpg",
  "/images/actividades_arado_bueyes.jpg",
  "/images/tienda_horno_lena.jpg",
  "/images/restaurant_juane_envuelto.jpg",
];

function ChevronLeft() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function Gallery() {
  const { lang } = useLang();
  const tx = t[lang].gallery;

  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % photos.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + photos.length) % photos.length),
    []
  );

  const nextLb = useCallback(
    () => setLightbox((c) => ((c ?? 0) + 1) % photos.length),
    []
  );
  const prevLb = useCallback(
    () => setLightbox((c) => ((c ?? 0) - 1 + photos.length) % photos.length),
    []
  );

  // Auto-advance slideshow
  useEffect(() => {
    if (paused || lightbox !== null) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, lightbox, next]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextLb();
      if (e.key === "ArrowLeft") prevLb();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, nextLb, prevLb]);

  return (
    <section id="galeria" className="py-24 md:py-32 bg-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-green-700 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {tx.label}
          </span>
          <h2 className="font-serif text-stone-900 text-4xl md:text-5xl font-bold mb-3">
            {tx.title}
          </h2>
          <p className="text-stone-500 text-lg">{tx.subtitle}</p>
        </div>

        {/* Main slideshow */}
        <div
          className="relative rounded-3xl overflow-hidden h-[420px] md:h-[560px] shadow-2xl mb-4 cursor-pointer group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onClick={() => setLightbox(current)}
        >
          {/* Photos — stack with opacity transition */}
          {photos.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
              style={{
                backgroundImage: `url('${src}')`,
                opacity: i === current ? 1 : 0,
              }}
            />
          ))}

          {/* Dim overlay on hover + expand hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>

          {/* Prev / Next */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 right-5 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {current + 1} / {photos.length}
          </div>

          {/* Dot indicators (first 10 only to avoid overflow) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.slice(0, 10).map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-white scale-125" : "bg-white/50"
                }`}
              />
            ))}
            {photos.length > 10 && (
              <span className="text-white/50 text-xs leading-none self-end">···</span>
            )}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {photos.map((src, i) => (
            <button
              key={src}
              onClick={() => { setCurrent(i); setLightbox(i); }}
              className={`flex-shrink-0 w-20 h-16 md:w-24 md:h-18 rounded-xl bg-cover bg-center transition-all duration-200 ${
                i === current
                  ? "ring-2 ring-green-500 ring-offset-2 opacity-100"
                  : "opacity-60 hover:opacity-90"
              }`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Image */}
          <img
            src={photos[lightbox]}
            alt=""
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevLb(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextLb(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight />
          </button>

          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full">
            {(lightbox ?? 0) + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
