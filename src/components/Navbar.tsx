"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import BookNowModal from "@/components/BookNowModal";

export default function Navbar() {
  const { lang, setLang } = useLang();
  const tx = t[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showBookModal, setShowBookModal] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

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

  // Close More dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const primaryLinks = [
    { href: "#experiencias", label: tx.experiences },
    { href: "#paquetes", label: tx.packages },
    { href: "#hospedaje", label: tx.accommodation },
    { href: "#restaurante", label: tx.restaurant },
    { href: "#grupos", label: tx.groups },
    { href: "#contacto", label: tx.contact },
  ];

  const faqLabel = lang === "en" ? "FAQ" : "Preguntas frecuentes";

  const moreLinks = [
    { href: "#nosotros", label: tx.about },
    { href: "#tienda", label: tx.store },
    { href: "#galeria", label: tx.gallery },
    { href: "/faq", label: faqLabel, isPage: true },
    { href: "/voluntarios", label: tx.volunteer, isPage: true },
  ];

  const allMobileLinks = [
    { href: "#nosotros", label: tx.about },
    { href: "#experiencias", label: tx.experiences },
    { href: "#paquetes", label: tx.packages },
    { href: "#hospedaje", label: tx.accommodation },
    { href: "#restaurante", label: tx.restaurant },
    { href: "#tienda", label: tx.store },
    { href: "#grupos", label: tx.groups },
    { href: "#galeria", label: tx.gallery },
    { href: "#contacto", label: tx.contact },
    { href: "/faq", label: faqLabel },
    { href: "/voluntarios", label: tx.volunteer },
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
        <a href="/" className="flex items-center group flex-shrink-0">
          <Image
            src="/images/logo.jpg"
            alt="La Granja Ecológica Lindero"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </a>

        {/* Desktop primary links */}
        <div className="hidden md:flex items-center gap-6">
          {primaryLinks.map((l) => {
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

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1 text-sm font-medium text-stone-300 hover:text-white transition-colors"
            >
              {tx.more}
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {moreOpen && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-stone-900/98 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden">
                {moreLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMoreOpen(false)}
                    className={`block px-5 py-3 text-sm transition-colors hover:bg-white/10 ${
                      l.isPage ? "text-green-400 font-medium" : "text-stone-300 hover:text-white"
                    }`}
                  >
                    {l.label}
                    {l.isPage && <span className="ml-1 opacity-60">↗</span>}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
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
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-stone-900/98 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          {allMobileLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-stone-200 text-base font-medium py-2.5 border-b border-white/5 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-4">
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
              onClick={() => { setMobileOpen(false); setShowBookModal(true); }}
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
