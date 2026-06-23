"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/LangContext";

interface Props {
  onClose: () => void;
}

export default function BookNowModal({ onClose }: Props) {
  const { lang } = useLang();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const choose = (href: string) => {
    onClose();
    setTimeout(() => {
      document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const options = [
    {
      id: "experiencias",
      img: "/images/animales_alpacas.jpg",
      title: lang === "es" ? "Experiencia" : "Experience",
      desc: lang === "es" ? "Tours, talleres y actividades en la granja" : "Tours, workshops and farm activities",
    },
    {
      id: "hospedaje",
      img: "/images/hospedaje_cabana_bosque.jpg",
      title: lang === "es" ? "Hospedaje" : "Stay",
      desc: lang === "es" ? "Bungalow o Casona con habitaciones disponibles" : "Bungalow or Casona room options",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5">
          <div>
            <h3 className="font-serif text-stone-900 text-2xl font-bold">
              {lang === "es" ? "¿Qué deseas reservar?" : "What would you like to book?"}
            </h3>
            <p className="text-stone-400 text-sm mt-0.5">
              {lang === "es" ? "Selecciona una opción para continuar" : "Select an option to continue"}
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

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 px-7 pb-7">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => choose(opt.id)}
              className="group relative rounded-2xl overflow-hidden h-52 text-left focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {/* Photo */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${opt.img}')` }}
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/20 to-transparent group-hover:from-stone-900/90 transition-colors duration-300" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 p-4">
                <div className="text-white font-serif font-bold text-xl leading-tight">{opt.title}</div>
                <div className="text-stone-300 text-xs mt-1 leading-snug">{opt.desc}</div>
              </div>
              {/* Arrow */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
