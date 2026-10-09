import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { VegBadge } from "./VegBadge";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const { cafeInfo } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Our Story", path: "/our-story" },
    { name: "Gallery", path: "/gallery" },
    { name: "Visit Us", path: "/visit-us" },
  ];

  return (
    <footer className="bg-[#1C241E] text-[#FAF7F2] border-t border-white/10 pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-[0.16em] uppercase text-white">
                THE CLASSIC CRUSH
              </span>
              <VegBadge size="sm" />
            </div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#D8B774]">
              BAKERY &amp; CAFE
            </p>
            <p className="font-serif italic text-base text-[#E5DBCA]/80">
              Freshly made everyday ♡
            </p>
            <p className="text-xs text-[#E5DBCA]/60 font-light max-w-sm leading-relaxed">
              Your neighbourhood pure vegetarian hangout for warm bakery bites, thick shakes, artisan pizzas, and sweet chocolate cravings.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D8B774]">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#E5DBCA]/80 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D8B774]">
              Connect With Us
            </h4>
            <div className="flex flex-col space-y-2.5">
              <a
                href={cafeInfo.instagramUrl || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-[#E5DBCA]/80 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 text-[#D8B774] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Instagram: {cafeInfo.instagramHandle || "@theclassiccrush"}</span>
              </a>

              <a
                href={`https://wa.me/${cafeInfo.whatsappNumber}?text=${encodeURIComponent("Hi! I would like to enquire about The Classic Crush Bakery & Cafe.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-[#E5DBCA]/80 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {cafeInfo.whatsappDisplay || cafeInfo.whatsappNumber}</span>
              </a>

              <a
                href={`tel:${cafeInfo.phone}`}
                className="inline-flex items-center gap-2.5 text-sm text-[#E5DBCA]/80 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D8B774] shrink-0" />
                <span>Call: {cafeInfo.phoneDisplay || cafeInfo.phone}</span>
              </a>
            </div>

            {/* Pure Veg Assurance */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#E5DBCA]/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Strictly 100% Pure Vegetarian &amp; Eggless</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5DBCA]/50">
          <p>
            &copy; {new Date().getFullYear()} The Classic Crush Bakery &amp; Cafe. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
