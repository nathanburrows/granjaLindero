"use client";

import { LangProvider } from "@/lib/LangContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experiences from "@/components/Experiences";
import Packages from "@/components/Packages";
import Accommodation from "@/components/Accommodation";
import Restaurant from "@/components/Restaurant";
import FarmStore from "@/components/FarmStore";
import Groups from "@/components/Groups";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experiences />
        <Packages />
        <Accommodation />
        <Restaurant />
        <FarmStore />
        <Groups />
        <Gallery />
        <Location />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
