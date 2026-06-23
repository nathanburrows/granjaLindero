"use client";

import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

export default function Location() {
  const { lang } = useLang();
  const tx = t[lang].location;

  const mapsUrl =
    "https://www.google.com/maps/place/Granja+Lindero/@-10.095147,-76.2092745,17z/data=!3m1!4b1!4m6!3m5!1s0x91a7eef3fa94d67d:0x418753c3617cf802!8m2!3d-10.095147!4d-76.2066996!16s%2Fg%2F11c1sz4fr8";

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Map embed */}
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[420px] bg-stone-200 relative">
            <iframe
              title="La Granja Lindero location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906!2d-76.2092745!3d-10.095147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a7eef3fa94d67d%3A0x418753c3617cf802!2sGranja+Lindero!5e0!3m2!1ses!2spe!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Info */}
          <div>
            <span className="inline-block text-green-700 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              {tx.label}
            </span>
            <h2 className="font-serif text-stone-900 text-4xl md:text-5xl font-bold leading-tight mb-6">
              {tx.title}
            </h2>

            <div className="space-y-5 mb-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <a
                    href="https://www.google.com/maps/place/Granja+Lindero/@-10.095147,-76.2092745,17z/data=!3m1!4b1!4m6!3m5!1s0x91a7eef3fa94d67d:0x418753c3617cf802!8m2!3d-10.095147!4d-76.2066996!16s%2Fg%2F11c1sz4fr8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-stone-800 hover:text-green-700 transition-colors"
                  >
                    {tx.address}
                  </a>
                  <div className="text-stone-500 text-sm mt-0.5">{tx.directions}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-stone-800">+51 966 721 057</div>
                </div>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {tx.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
