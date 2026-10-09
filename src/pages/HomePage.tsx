import React from "react";
import { Link } from "react-router-dom";
import { VegBadge } from "../components/VegBadge";
import { useOrder } from "../context/OrderContext";
import { useData } from "../context/DataContext";
import { ArrowRight, MessageCircle, Navigation, Plus } from "lucide-react";

export const HomePage: React.FC = () => {
  const { addItem } = useOrder();
  const { homepageContent, featuredItemIds, menuItems, cafeInfo } = useData();

  // Dynamically resolve featured items in their admin-configured order
  const signatureItems = featuredItemIds
    .map((id) => menuItems.find((i) => i.id === id))
    .filter(Boolean);

  const whatsappLink = `https://wa.me/${cafeInfo.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${cafeInfo.name}! 👋 I am visiting your website and would like to order.`
  )}`;

  return (
    <div className="bg-[#FAF7F2]">
      {/* ==================================================
          1. HERO SECTION (Cafecito inspiration)
          Large atmospheric photograph, minimal text, image does visual work
          ================================================== */}
      <section className="relative min-h-[94vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#2FA4B8]">
        {/* Full-width Indian cafe flat-lay photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src={homepageContent.heroImage}
            alt={`${homepageContent.heroTitle} cafe table flat-lay`}
            className="w-full h-full object-cover object-center"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/hero-indian-cafe.jpg";
            }}
          />

          {/* Gentle center-focused radial vignette to keep the food vibrant & bright while ensuring center text readability */}
          <div className="absolute inset-0 bg-radial from-black/45 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        </div>

        {/* Hero Content — Centered, minimal, elegant right over the turquoise table */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-28 text-center text-white">
          {/* Subtle Pure Veg pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white mb-4 sm:mb-6 text-[11px] font-medium tracking-[0.22em] uppercase shadow-sm">
            <VegBadge size="sm" />
            <span>100% Pure Vegetarian</span>
          </div>

          {/* Brand Heading — Cafecito organic elegance */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.14em] uppercase leading-[1.05] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] mb-2">
            {homepageContent.heroTitle}
          </h1>

          {/* Subheading */}
          <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase text-[#FDE68A] drop-shadow-sm mb-4 sm:mb-6">
            {homepageContent.heroSubtitle}
          </p>

          {/* Tagline */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl font-light text-white/95 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            &ldquo;{homepageContent.heroDescription}&rdquo;
          </p>

          {/* Cafecito-style pill outline buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <Link
              to="/menu"
              className="w-full sm:w-auto px-7 py-3 bg-white/90 hover:bg-white text-[#1C241E] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>View Menu</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 bg-black/40 hover:bg-black/60 text-white border-2 border-white/80 hover:border-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full backdrop-blur-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#FDE68A]" />
              <span>Order Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================
          2. SMALL BRAND INTRO
          "GOOD FOOD. GOOD MOOD."
          Short 1–2 sentence introduction
          ================================================== */}
      <section className="py-16 sm:py-24 border-b border-[#E8DFD3] bg-[#FCFAF7]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#755546] block mb-3">
            Welcome to the neighbourhood
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C241E] tracking-tight mb-5">
            GOOD FOOD. GOOD MOOD.
          </h2>
          <div className="w-10 h-0.5 bg-[#C59F54] mx-auto mb-6" />
          <p className="text-base sm:text-lg text-[#575E5B] font-light leading-relaxed">
            A cozy corner for warm oven bakes, chocolate cravings, and conversations that linger long after the last sip. Everything here is 100% vegetarian, prepared fresh to order, and made to feel comfortingly familiar.
          </p>
        </div>
      </section>

      {/* ==================================================
          3. SIGNATURES
          Dynamic featured items selected from Admin Panel
          ================================================== */}
      <section className="py-20 sm:py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#755546] block mb-2">
                House Signatures
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C241E] tracking-tight">
                A few things we&apos;re loved for.
              </h2>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#1C241E] hover:text-[#755546] transition-colors group"
            >
              <span>Explore The Menu</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Dynamic Signature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {signatureItems.map((item) => {
              if (!item) return null;
              const isAvailable = item.isAvailable !== false;

              return (
                <div
                  key={item.id}
                  className="group bg-[#FCFAF7] rounded-xl overflow-hidden border border-[#E8DFD3] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 flex flex-col justify-between"
                >
                  {/* Large Editorial Photography */}
                  <div>
                    <div className="relative aspect-4/3 sm:aspect-square w-full overflow-hidden bg-[#EFE9DE]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 ${
                          !isAvailable ? "grayscale contrast-75 opacity-75" : ""
                        }`}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/dark-white-delight.jpg";
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-1.5 rounded-md shadow-2xs">
                        <VegBadge size="sm" />
                      </div>

                      {/* Availability badge or Price chip */}
                      {!isAvailable ? (
                        <div className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs">
                          Sold Out
                        </div>
                      ) : (
                        <div className="absolute bottom-3 right-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-[#1C241E] shadow-2xs">
                          {item.priceDisplay || `₹${item.price}`}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <h3 className="font-serif text-xl font-semibold text-[#1C241E] leading-snug group-hover:text-[#26332A] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#767E7A] mt-1 line-clamp-2 font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer / Action */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-[#EFE9DE] flex items-center justify-between">
                      <span className="text-sm font-serif font-bold text-[#1C241E]">
                        {item.priceDisplay || `₹${item.price}`}
                      </span>

                      {isAvailable ? (
                        <button
                          onClick={() => addItem(item)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-[#EFE9DE] hover:bg-[#26332A] text-[#26332A] hover:text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-rose-600 font-medium">
                          Currently unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Button leading to /menu */}
          <div className="text-center mt-12 sm:mt-16">
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#26332A] text-[#FAF7F2] hover:bg-[#1C241E] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-xs group"
            >
              <span>Explore The Menu</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. SMALL CAFE IMAGE / STORY TEASER
          One beautiful image + tiny introduction
          "Made for good food & good company."
          Button: OUR STORY →
          ================================================== */}
      <section className="py-20 sm:py-28 bg-[#F7F3EC] border-y border-[#E8DFD3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
            {/* One Large Cafe Editorial Image */}
            <div className="md:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E8DFD3] bg-[#EFE9DE]">
                <img
                  src={homepageContent.storyImage}
                  alt="Cozy ambient corner at The Classic Crush Cafe"
                  className="w-full h-[340px] sm:h-[420px] object-cover object-center"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#26332A] flex items-center gap-2">
                  <VegBadge size="sm" />
                  <span>Strictly 100% Pure Vegetarian</span>
                </div>
              </div>
            </div>

            {/* Tiny Introduction & CTA */}
            <div className="md:col-span-6 space-y-5">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#755546] block">
                The Story Behind
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C241E] leading-tight">
                {homepageContent.storyHeading}
              </h2>
              <p className="text-sm sm:text-base text-[#575E5B] font-light leading-relaxed">
                {homepageContent.storyDescription}
              </p>
              <div className="pt-2">
                <Link
                  to="/our-story"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#1C241E] border-b-2 border-[#1C241E] pb-1 hover:text-[#755546] hover:border-[#755546] transition-colors group"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. SMALL FINAL CTA
          "COME GRAB A BITE."
          ORDER NOW / GET DIRECTIONS
          ================================================== */}
      <section className="py-20 sm:py-24 bg-[#FAF7F2] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#755546] block mb-2">
            Always Ready For You
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C241E] tracking-tight mb-4">
            COME GRAB A BITE.
          </h2>
          <p className="text-sm sm:text-base text-[#575E5B] font-light mb-8 max-w-md mx-auto leading-relaxed">
            Open daily: {cafeInfo.timings.hours}. Drop by for a quick parcel, a quiet table, or message us directly on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xs sm:max-w-md mx-auto">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-full transition-all duration-300 shadow-xs flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Order Now</span>
            </a>

            <Link
              to="/visit-us"
              className="w-full sm:w-auto px-7 py-3 bg-[#FAF7F2] hover:bg-[#EFE9DE] text-[#1C241E] border border-[#D5C7B5] text-xs font-semibold uppercase tracking-[0.18em] rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5 text-[#755546]" />
              <span>Get Directions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
