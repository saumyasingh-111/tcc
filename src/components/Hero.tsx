import { getWhatsAppLink } from "../data/cafeConfig";
import { VegBadge } from "./VegBadge";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuEl = document.getElementById("menu");
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1816]"
    >
      {/* Background Image with Slow Subtle Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=2200&q=85"
          alt="The Classic Crush Bakery & Cafe freshly baked treats"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] duration-[12000ms] opacity-90 transition-transform"
          loading="eager"
        />

        {/* Elegant Natural Vignette / Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[#291D17]/30 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Hero Content — Centered, Minimal, and Editorial */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center text-[#FAF7F2]">
        {/* Subtle Pure Veg Badge pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[#EFE9DE] mb-6 sm:mb-8 text-xs font-medium tracking-widest uppercase">
          <VegBadge size="sm" />
          <span>100% Vegetarian Bakery & Cafe</span>
        </div>

        {/* Primary Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.14em] uppercase leading-[1.08] text-white drop-shadow-sm mb-3 sm:mb-4">
          THE CLASSIC CRUSH
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm md:text-base font-semibold tracking-[0.38em] uppercase text-[#D8B774] mb-6 sm:mb-8">
          BAKERY & CAFE
        </p>

        {/* Signature Tagline */}
        <p className="font-serif italic text-lg sm:text-2xl md:text-3xl font-light text-[#F4EFEA]/95 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed">
          &ldquo;Freshly made. Comfortingly familiar.&rdquo;
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 max-w-md mx-auto">
          <button
            onClick={scrollToMenu}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF7F2] text-[#1C241E] text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all duration-300 hover:shadow-lg hover:shadow-black/20 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>View Menu</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#26332A]/90 hover:bg-[#1C241E] text-[#FAF7F2] border border-[#755546]/40 text-xs font-semibold uppercase tracking-[0.2em] rounded-full backdrop-blur-xs transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group"
          >
            <MessageCircle className="w-4 h-4 text-[#D8B774]" />
            <span>Order on WhatsApp</span>
          </a>
        </div>

        {/* Student-friendly micro-note */}
        <p className="text-[11px] sm:text-xs text-[#EFE9DE]/70 tracking-wider font-light mt-6 sm:mt-8">
          Honest prices • Fresh daily bakes • Cozy student hangout
        </p>
      </div>

      {/* Tiny Scroll Down Indicator */}
      <a
        href="#info-strip"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("info-strip")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer group"
        aria-label="Scroll down to explore"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-white/70 group-hover:text-white" />
      </a>
    </section>
  );
};
