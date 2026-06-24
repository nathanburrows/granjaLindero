"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

// ─── Pick your background style ───────────────────────────────────────────────
// 1 = Ken Burns   — single image slowly zooming & panning on the right panel
// 2 = Slideshow   — images crossfade every 4 s on the right panel
// 3 = Parallax    — full-bleed background that drifts on scroll (text goes white)
const BG_STYLE: 1 | 2 | 3 = 1;
// ──────────────────────────────────────────────────────────────────────────────

const SLIDESHOW_IMAGES = [
  "/images/hospedaje_hamaca_jardin.jpg",
  "/images/animales_alpacas.jpg",
  "/images/actividades_cosecha_huerto.jpg",
  "/images/paisaje_campo_huanuco.jpg",
  "/images/experiencias_jardin_gazebo.jpg",
];

type AboutTx = typeof t["es"]["about"];

function MissionModal({ onClose, tx }: { onClose: () => void; tx: AboutTx }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-stone-100">
          <div>
            <h3 className="font-serif text-stone-900 text-2xl font-bold">La Granja Ecológica Lindero</h3>
            <p className="text-stone-400 text-sm mt-0.5">{tx.missionLabel} & {tx.visionLabel}</p>
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
        <div className="px-7 py-6 space-y-6">
          <div className="border-l-2 border-green-600 pl-4">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">{tx.missionLabel}</p>
            <p className="text-stone-600 text-sm leading-relaxed">
              {tx.mission.split(tx.missionLinkText).map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <a
                      href={tx.missionLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 font-semibold underline underline-offset-2 hover:text-green-600 transition-colors"
                    >
                      {tx.missionLinkText}
                    </a>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </p>
          </div>
          <div className="bg-green-50 rounded-2xl px-5 py-4 flex items-center gap-4">
            <div className="text-3xl font-serif font-bold text-green-700 flex-shrink-0">30%</div>
            <p className="text-green-800 text-sm leading-snug">{tx.impactNote}</p>
          </div>
          <div className="border-l-2 border-stone-200 pl-4">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">{tx.visionLabel}</p>
            <p className="text-stone-600 text-sm leading-relaxed">{tx.vision}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Option 1: Ken Burns right panel ───────────────────────────────────────────
function KenBurnsPanel() {
  return (
    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center animate-kenburns"
        style={{ backgroundImage: "url('/images/hospedaje_hamaca_jardin.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
    </div>
  );
}

// ── Option 2: Crossfade slideshow right panel ─────────────────────────────────
function SlideshowPanel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % SLIDESHOW_IMAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
      {SLIDESHOW_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === idx ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
      {/* Dot indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
        {SLIDESHOW_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Option 3: Full-bleed parallax background ──────────────────────────────────
function ParallaxSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current || !bgRef.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offset = rect.top * 0.35;
      bgRef.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="nosotros" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-[-20%] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/paisaje_campo_huanuco.jpg')" }}
      />
      <div className="absolute inset-0 bg-stone-900/70" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export default function About() {
  const { lang } = useLang();
  const tx = t[lang].about;
  const [showModal, setShowModal] = useState(false);

  const isParallax = BG_STYLE === 3;

  const textContent = (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <span className={`inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4 ${isParallax ? "text-green-400" : "text-green-700"}`}>
            {tx.label}
          </span>
          <h2 className={`font-serif text-4xl md:text-5xl font-bold leading-tight mb-6 ${isParallax ? "text-white" : "text-stone-900"}`}>
            {tx.title}
          </h2>
          <p className={`text-lg leading-relaxed mb-8 ${isParallax ? "text-stone-300" : "text-stone-600"}`}>
            {tx.body}
          </p>

          <button
            onClick={() => setShowModal(true)}
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors mb-10 group ${
              isParallax ? "text-green-400 hover:text-green-300" : "text-green-700 hover:text-green-600"
            }`}
          >
            <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              isParallax ? "border-green-400 group-hover:border-green-300" : "border-green-600 group-hover:border-green-500"
            }`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            {tx.missionLabel} & {tx.visionLabel}
          </button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: tx.stat1, label: tx.stat1Label },
              { value: tx.stat2, label: tx.stat2Label },
              { value: tx.stat3, label: tx.stat3Label },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-3xl font-bold text-green-400">{s.value}</div>
                <div className={`text-sm mt-1 ${isParallax ? "text-stone-400" : "text-stone-500"}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        {BG_STYLE === 1 && <KenBurnsPanel />}
        {BG_STYLE === 2 && <SlideshowPanel />}
        {BG_STYLE === 3 && (
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center">
              <p className="text-white/40 text-sm italic">Background fills the whole section</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isParallax) {
    return (
      <>
        <ParallaxSection>{textContent}</ParallaxSection>
        {showModal && <MissionModal onClose={() => setShowModal(false)} tx={tx} />}
      </>
    );
  }

  return (
    <section id="nosotros" className="py-24 md:py-32 bg-stone-50">
      {textContent}
      {showModal && <MissionModal onClose={() => setShowModal(false)} tx={tx} />}
    </section>
  );
}
