"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

type AboutTx = typeof t["es"]["about"];

function MissionModal({ onClose, tx }: { onClose: () => void; tx: AboutTx }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
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

        {/* Body */}
        <div className="px-7 py-6 space-y-6">
          <div className="border-l-2 border-green-600 pl-4">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">{tx.missionLabel}</p>
            <p className="text-stone-600 text-sm leading-relaxed">{tx.mission}</p>
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

export default function About() {
  const { lang } = useLang();
  const tx = t[lang].about;
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="nosotros" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-block text-green-700 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              {tx.label}
            </span>
            <h2 className="font-serif text-stone-900 text-4xl md:text-5xl font-bold leading-tight mb-6">
              {tx.title}
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              {tx.body}
            </p>

            {/* Mission/Vision trigger */}
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 text-green-700 text-sm font-semibold hover:text-green-600 transition-colors mb-10 group"
            >
              <span className="w-6 h-6 rounded-full border-2 border-green-600 group-hover:border-green-500 flex items-center justify-center flex-shrink-0 transition-colors">
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
                  <div className="font-serif text-3xl font-bold text-green-700">{s.value}</div>
                  <div className="text-stone-500 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage — three static cards */}
          <div className="relative h-[500px]">
            {/* Back card — bottom-right, llamas */}
            <div
              className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-2xl shadow-xl border-4 border-stone-50 overflow-hidden"
              style={{ zIndex: 2, backgroundImage: "url('/images/animales_alpacas.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            />

            {/* Front card — top-left, hammock */}
            <div
              className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl shadow-2xl overflow-hidden"
              style={{ zIndex: 3, backgroundImage: "url('/images/hospedaje_hamaca_jardin.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            />

            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-100 rounded-2xl -z-10" />
          </div>
        </div>
      </div>

      {showModal && <MissionModal onClose={() => setShowModal(false)} tx={tx} />}
    </section>
  );
}
