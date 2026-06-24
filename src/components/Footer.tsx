"use client";

import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;
  const nav = t[lang].nav;

  return (
    <footer className="bg-stone-950 text-stone-400 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10 pb-10 border-b border-stone-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.jpg"
                alt="La Granja Ecológica Lindero"
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
              <div>
                <div className="text-white font-serif font-bold text-lg leading-none">
                  La Granja Lindero
                </div>
                <div className="text-green-500 text-[10px] uppercase tracking-[0.2em]">
                  Ecológica
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{tx.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <div className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
              {lang === "es" ? "Explorar" : "Explore"}
            </div>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/#nosotros", label: nav.about },
                { href: "/#experiencias", label: nav.experiences },
                { href: "/#hospedaje", label: nav.accommodation },
                { href: "/#restaurante", label: nav.restaurant },
                { href: "/#tienda", label: nav.store },
                { href: "/#galeria", label: nav.gallery },
                { href: "/#contacto", label: nav.contact },
                { href: "/faq", label: tx.faq },
                { href: "/voluntarios", label: tx.volunteer },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
              {lang === "es" ? "Contacto" : "Contact"}
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <a
                  href="https://www.google.com/maps/place/Granja+Lindero/@-10.095147,-76.2092745,17z/data=!3m1!4b1!4m6!3m5!1s0x91a7eef3fa94d67d:0x418753c3617cf802!8m2!3d-10.095147!4d-76.2066996!16s%2Fg%2F11c1sz4fr8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Carretera a Ambo km 2, Huánuco, Perú
                </a>
              </li>
              <li>
                <a href="tel:+51966721057" className="hover:text-white transition-colors">
                  +51 966 721 057
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/GranjaLindero/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook · GranjaLindero
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-stone-600">
          © {new Date().getFullYear()} La Granja Ecológica Lindero · {tx.rights}
        </div>
      </div>
    </footer>
  );
}
