"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import BookNowModal from "@/components/BookNowModal";

export default function Navbar() {
  const { lang, setLang } = useLang();
  const tx = t[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showBookModal, setShowBookModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["nosotros", "experiencias", "paquetes", "hospedaje", "restaurante", "tienda", "grupos", "galeria", "contacto"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const links = [
    { href: "#nosotros", label: tx.about },
    { href: "#experiencias", label: tx.experiences },
    { href: "#paquetes", label: tx.packages },
    { href: "#hospedaje", label: tx.accommodation },
    { href: "#restaurante", label: tx.restaurant },
    { href: "#tienda", label: tx.store },
    { href: "#grupos", label: tx.groups },
    { href: "#galeria", label: tx.gallery },
    { href: "#contacto", label: tx.contact },
  ];

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-stone-900/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group">
          <Image
            src="/images/logo.jpg"
            alt="La Granja Ecológica Lindero"
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            const isActive = activeSection === l.href.replace("#", "");
            return (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium tracking-wide transition-colors relative pb-0.5 ${
                  isActive
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-green-400"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center bg-white/10 rounded-full p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLang("es")}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === "es"
                  ? "bg-green-600 text-white shadow"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              🇵🇪 ES
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === "en"
                  ? "bg-green-600 text-white shadow"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              🇺🇸 EN
            </button>
          </div>

          <button
            onClick={() => setShowBookModal(true)}
            className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            {tx.reserve}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-stone-900/98 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-stone-200 text-base font-medium py-1"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-white/10">
            <div className="flex items-center bg-white/10 rounded-full p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLang("es")}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  lang === "es" ? "bg-green-600 text-white" : "text-stone-300"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  lang === "en" ? "bg-green-600 text-white" : "text-stone-300"
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => { setOpen(false); setShowBookModal(true); }}
              className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full"
            >
              {tx.reserve}
            </button>
          </div>
        </div>
      )}
    </nav>
    {showBookModal && <BookNowModal onClose={() => setShowBookModal(false)} />}
    </>
  );
}
