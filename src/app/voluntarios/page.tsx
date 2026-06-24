"use client";

import { LangProvider, useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { waUrl } from "@/lib/contact";

function VolunteerContent() {
  const { lang } = useLang();
  const tx = t[lang].volunteer;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero banner */}
      <div className="bg-stone-900 pt-32 pb-16 px-6 text-center">
        <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
          {tx.label}
        </span>
        <h1 className="font-serif text-white text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl mx-auto">
          {tx.title}
        </h1>
        <p className="text-stone-400 text-lg max-w-xl mx-auto mb-8">{tx.subtitle}</p>

        {/* Andemos badge */}
        <a
          href={tx.andemos_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl px-6 py-3 transition-colors"
        >
          <div className="text-left">
            <div className="text-xs text-green-400 font-bold uppercase tracking-widest">{tx.andemosSub}</div>
            <div className="font-semibold text-sm">{tx.andemos} ↗</div>
          </div>
        </a>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Roles grid */}
        <section>
          <h2 className="font-serif text-stone-900 text-2xl md:text-3xl font-bold mb-8">{tx.whyCta}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {tx.roles.map((role) => (
              <div key={role.title} className="bg-white rounded-2xl border border-stone-200 p-6">
                <div className="text-3xl mb-3">{role.icon}</div>
                <h3 className="font-semibold text-stone-900 text-base mb-2">{role.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Offer + Requirements side by side */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 rounded-2xl p-7">
            <h2 className="font-serif text-stone-900 text-xl font-bold mb-5">{tx.offerTitle}</h2>
            <ul className="space-y-3">
              {tx.offers.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-stone-700">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-stone-100 rounded-2xl p-7">
            <h2 className="font-serif text-stone-900 text-xl font-bold mb-5">{tx.requireTitle}</h2>
            <ul className="space-y-3">
              {tx.requires.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-stone-700">
                  <span className="mt-0.5 w-5 h-5 rounded-full border-2 border-stone-400 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Apply CTA */}
        <section className="bg-white rounded-3xl border border-stone-200 p-10 text-center">
          <h2 className="font-serif text-stone-900 text-2xl font-bold mb-3">{tx.applyTitle}</h2>
          <p className="text-stone-500 text-sm leading-relaxed max-w-lg mx-auto mb-8">{tx.applyBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waUrl(lang === "es" ? "Hola, me interesa el voluntariado en La Granja Ecológica Lindero." : "Hi, I'm interested in volunteering at La Granja Ecológica Lindero.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {tx.applyWhatsApp}
            </a>
            <a
              href={tx.andemos_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              {tx.applyAndemos} ↗
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}

export default function VolunteerPage() {
  return (
    <LangProvider>
      <Navbar />
      <VolunteerContent />
      <Footer />
    </LangProvider>
  );
}
