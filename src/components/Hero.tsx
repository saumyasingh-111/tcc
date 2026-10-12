import React from "react";
import { Link } from "react-router-dom";
import { VegBadge } from "./VegBadge";
import { useOrder } from "../context/OrderContext";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";

export const Hero: React.FC = () => {
  const { openDrawer } = useOrder();

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#064F50]"
    >
      {/* Background Image: Overhead turquoise cafe tabletop with Indian cafe food from reference */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-indian-cafe.jpg"
          alt="The Classic Crush signature turquoise cafe table with fresh vegetarian treats, patties, momos and iced coffees"
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000"
          loading="eager"
        />

        {/* Elegant Dark Vignette Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[#064F50]/25 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Hero Content — Centered Editorial Masterpiece */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center text-[#F8F5ED]">
        {/* Vegetarian Badge Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#F8F5ED] mb-6 sm:mb-8 text-xs font-medium tracking-[0.25em] uppercase shadow-md">
          <VegBadge size="sm" />
          <span>100% PURE VEGETARIAN</span>
        </div>

        {/* Oversized Serif Headline Stacked (THE / CLASSIC / CRUSH) */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[102px] font-normal tracking-[0.16em] uppercase leading-[1.04] text-white drop-shadow-md mb-3 sm:mb-4">
          THE<br />
          CLASSIC<br />
          CRUSH
        </h1>

        {/* Subtitle in Golden Accent */}
        <p className="font-sans text-xs sm:text-sm md:text-base font-semibold tracking-[0.42em] uppercase text-[#E8C45A] mb-6 sm:mb-8">
          BAKERY &amp; CAFE
        </p>

        {/* Signature Tagline */}
        <p className="font-serif italic text-lg sm:text-2xl md:text-3xl font-light text-[#F8F5ED]/95 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed drop-shadow-sm">
          &ldquo;Freshly made. Comfortingly familiar.&rdquo;
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 max-w-md mx-auto">
          {/* Primary CTA: VIEW MENU */}
          <Link
            to="/menu"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#064F50] hover:bg-[#F8F5ED] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>VIEW MENU</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary CTA: ORDER NOW */}
          <button
            onClick={openDrawer}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#078F96]/30 hover:bg-[#078F96]/60 text-white border border-white/80 hover:border-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full backdrop-blur-md transition-all duration-300 shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#E8C45A]" />
            <span>ORDER NOW</span>
          </button>
        </div>
      </div>

      {/* Tiny Scroll Down Indicator */}
      <a
        href="#signature-cravings"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("signature-cravings")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer group"
        aria-label="Scroll down to explore"
      >
        <span className="text-[9px] tracking-[0.28em] uppercase font-medium">EXPLORE</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-white/80 group-hover:text-white" />
      </a>
    </section>
  );
};
