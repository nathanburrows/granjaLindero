"use client";

import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import { waUrl } from "@/lib/contact";

interface Booking {
  mode: "dates" | "nights";
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  breakfast: boolean;
}

function addDays(dateStr: string, days: number): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Stepper({ value, min = 0, max = 20, onChange }: { value: number; min?: number; max?: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors disabled:opacity-40"
        disabled={value <= min}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
      </button>
      <span className="w-6 text-center font-semibold text-stone-800 text-sm">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors disabled:opacity-40"
        disabled={value >= max}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      </button>
    </div>
  );
}

function RoomCard({ room, breakfastAddon, cta, booking, effectiveCheckOut, datesValid }: {
  room: { id: string; building: string; title: string; description: string; features: string[]; img: string };
  breakfastAddon: string;
  cta: string;
  booking: Booking;
  effectiveCheckOut: string;
  datesValid: boolean;
}) {
  const lines = [
    `Edificio: ${room.building}`,
    `Habitación: ${room.title}`,
    booking.checkIn      ? `Llegada: ${booking.checkIn}`      : "",
    effectiveCheckOut    ? `Salida: ${effectiveCheckOut}`      : "",
    booking.mode === "nights" ? `Noches: ${booking.nights}`   : "",
    `Huéspedes: ${booking.adults} adultos${booking.children > 0 ? `, ${booking.children} niños` : ""}`,
    booking.breakfast ? "Desayuno: Sí" : "",
  ].filter(Boolean).join("\n");

  const roomWaUrl = waUrl("Me gustaría consultar disponibilidad para:\n" + lines);

  return (
    <div className="rounded-2xl overflow-hidden border border-stone-200 flex flex-col group">
      <div
        className="h-44 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url('${room.img}')` }}
      />
      <div className="p-5 flex flex-col flex-1">
        <h5 className="font-serif text-stone-900 font-bold mb-1">{room.title}</h5>
        <p className="text-stone-500 text-xs leading-relaxed mb-3">{room.description}</p>
        <ul className="space-y-1 mb-3">
          {room.features.map((f) => (
            <li key={f} className="flex items-center gap-1.5 text-stone-600 text-xs">
              <span className="text-green-600 flex-shrink-0"><CheckIcon /></span>
              {f}
            </li>
          ))}
        </ul>
        <div className="text-xs text-amber-600 font-medium mb-4">{breakfastAddon}</div>
        {datesValid ? (
          <a
            href={roomWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-full text-xs transition-all duration-300 hover:scale-105"
          >
            <WhatsAppIcon /> {cta}
          </a>
        ) : (
          <div className="mt-auto inline-flex items-center justify-center gap-2 bg-stone-200 text-stone-400 font-semibold px-4 py-2 rounded-full text-xs cursor-not-allowed select-none">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {cta}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Accommodation() {
  const { lang } = useLang();
  const tx = t[lang].accommodation;

  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking>({
    mode: "dates", checkIn: "", checkOut: "", nights: 2, adults: 2, children: 0, breakfast: false,
  });

  const building = tx.buildings[activeIdx];
  const primaryRooms   = tx.rooms.filter((r) => r.buildingId === selectedBuildingId);
  const secondaryRooms = tx.rooms.filter((r) => r.buildingId !== selectedBuildingId);
  const otherBuilding  = tx.buildings.find((b) => b.id !== selectedBuildingId);

  const effectiveCheckOut = booking.mode === "nights"
    ? addDays(booking.checkIn, booking.nights)
    : booking.checkOut;
  const datesValid = booking.mode === "nights"
    ? !!booking.checkIn
    : !!booking.checkIn && !!booking.checkOut;

  return (
    <>
      <section id="hospedaje" className="py-24 md:py-32 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main panel */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div className="relative order-2 md:order-1">
              <div
                key={building.id}
                className="rounded-3xl overflow-hidden h-[500px] bg-cover bg-center shadow-2xl transition-all duration-500"
                style={{ backgroundImage: `url('${building.img}')` }}
              />
              <div className="absolute -bottom-6 -right-6 bg-green-600 text-white rounded-2xl px-6 py-4 shadow-xl">
                <div className="text-sm font-semibold">{building.name}</div>
                <div className="text-green-200 text-xs">Huánuco, Perú</div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                {tx.label}
              </span>
              <h2 className="font-serif text-white text-4xl md:text-5xl font-bold leading-tight mb-2">
                {building.name}
              </h2>
              <p className="text-stone-400 text-xl font-light mb-6">{building.subtitle}</p>
              <p className="text-stone-300 text-lg leading-relaxed mb-8">{building.description}</p>
              <ul className="grid grid-cols-2 gap-3 mb-10">
                {building.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-stone-300">
                    <span className="text-green-400 flex-shrink-0"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedBuildingId(building.id)}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
              >
                {tx.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Building selector */}
          <div className="grid grid-cols-2 gap-4">
            {tx.buildings.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setActiveIdx(i)}
                className={`relative rounded-2xl overflow-hidden h-48 bg-cover bg-center text-left transition-all duration-300 ${
                  i === activeIdx ? "ring-4 ring-green-500 shadow-xl shadow-green-900/40" : "opacity-50 hover:opacity-80"
                }`}
                style={{ backgroundImage: `url('${b.img}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <div className="text-white font-serif font-bold text-xl">{b.name}</div>
                  <div className="text-stone-300 text-sm mt-0.5">{b.subtitle}</div>
                </div>
                {i === activeIdx && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {lang === "es" ? "Seleccionado" : "Selected"}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Availability modal */}
      {selectedBuildingId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setSelectedBuildingId(null)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-stone-900 text-2xl font-bold">
                  {tx.buildings.find((b) => b.id === selectedBuildingId)?.name}
                </h3>
                <p className="text-stone-500 text-sm mt-0.5">La Granja Ecológica Lindero · Huánuco, Perú</p>
              </div>
              <button
                onClick={() => setSelectedBuildingId(null)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Booking form */}
            <div className="px-6 py-5 bg-stone-50 border-b border-stone-100 space-y-4">
              {/* Mode toggle */}
              <div className="flex gap-1 bg-stone-200 rounded-xl p-1 w-fit">
                {(["dates", "nights"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setBooking((b) => ({ ...b, mode }))}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      booking.mode === mode
                        ? "bg-white text-stone-800 shadow-sm"
                        : "text-stone-500 hover:text-stone-700"
                    }`}
                  >
                    {mode === "dates" ? tx.formByDates : tx.formByNights}
                  </button>
                ))}
              </div>

              {/* Date inputs */}
              {booking.mode === "dates" ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">{tx.formCheckin}</label>
                    <input
                      type="date"
                      value={booking.checkIn}
                      onChange={(e) => setBooking((b) => ({ ...b, checkIn: e.target.value, checkOut: b.checkOut && b.checkOut <= e.target.value ? "" : b.checkOut }))}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">{tx.formCheckout}</label>
                    <input
                      type="date"
                      value={booking.checkOut}
                      min={booking.checkIn || undefined}
                      onChange={(e) => setBooking((b) => ({ ...b, checkOut: e.target.value }))}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3 items-end">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">{tx.formCheckin}</label>
                    <input
                      type="date"
                      value={booking.checkIn}
                      onChange={(e) => setBooking((b) => ({ ...b, checkIn: e.target.value }))}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">{tx.formNights}</label>
                    <Stepper value={booking.nights} min={1} max={30} onChange={(v) => setBooking((b) => ({ ...b, nights: v }))} />
                    {effectiveCheckOut && (
                      <p className="text-xs text-stone-400 mt-1.5">{tx.formCheckout}: {effectiveCheckOut}</p>
                    )}
                  </div>
                </div>
              )}

              {!datesValid && (
                <p className="text-xs text-amber-600 font-medium">{tx.formSelectDates}</p>
              )}

              {/* Guests */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-stone-600">{tx.formAdults}</span>
                  <Stepper value={booking.adults} min={1} onChange={(v) => setBooking((b) => ({ ...b, adults: v }))} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-stone-600">{tx.formChildren}</span>
                  <Stepper value={booking.children} min={0} onChange={(v) => setBooking((b) => ({ ...b, children: v }))} />
                </div>
              </div>

              {/* Breakfast toggle */}
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <div
                  onClick={() => setBooking((b) => ({ ...b, breakfast: !b.breakfast }))}
                  className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                    booking.breakfast ? "bg-green-500" : "bg-stone-300"
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    booking.breakfast ? "translate-x-5" : "translate-x-1"
                  }`} />
                </div>
                <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors">
                  {tx.formBreakfast}
                  <span className="text-stone-400 font-normal ml-1 text-xs">— {tx.breakfastAddon.replace("+ ", "")}</span>
                </span>
              </label>
            </div>

            <div className="p-6 space-y-8">
              {/* Primary building rooms */}
              <div className="grid sm:grid-cols-2 gap-4">
                {primaryRooms.map((room) => (
                  <RoomCard key={room.id} room={room} breakfastAddon={tx.breakfastAddon} cta={tx.formBookCta} booking={booking} effectiveCheckOut={effectiveCheckOut} datesValid={datesValid} />
                ))}
              </div>

              {/* Other building rooms */}
              {otherBuilding && (
                <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-50">
                  <div
                    className="relative h-24 bg-cover bg-center"
                    style={{ backgroundImage: `url('${otherBuilding.img}')` }}
                  >
                    <div className="absolute inset-0 bg-stone-900/60" />
                    <div className="absolute inset-0 flex flex-col justify-center px-5">
                      <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-0.5">
                        {tx.alsoAvailable}
                      </p>
                      <h4 className="text-white font-serif font-bold text-xl">{otherBuilding.name}</h4>
                      <p className="text-white/60 text-xs mt-0.5">{otherBuilding.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-4 grid sm:grid-cols-2 gap-4">
                    {secondaryRooms.map((room) => (
                      <RoomCard key={room.id} room={room} breakfastAddon={tx.breakfastAddon} cta={tx.formBookCta} booking={booking} effectiveCheckOut={effectiveCheckOut} datesValid={datesValid} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
