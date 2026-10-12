import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { VegBadge } from "./VegBadge";
import { useOrder } from "../context/OrderContext";
import { useData } from "../context/DataContext";
import { Menu, X, ShoppingBag, MessageCircle } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, openDrawer } = useOrder();
  const { cafeInfo } = useData();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "MENU", path: "/menu" },
    { name: "GIFTING", path: "/gifting" },
    { name: "OUR STORY", path: "/our-story" },
    { name: "GALLERY", path: "/gallery" },
    { name: "VISIT US", path: "/visit-us" },
  ];

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#F8F5ED]/95 backdrop-blur-md border-b border-[#E8DFD3] shadow-xs py-3.5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Wordmark: Official TCC Logo + Brand Wordmark + Veg Badge */}
            <NavLink
              to="/"
              className="group flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-95"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img
                src="/tcc-logo.png"
                alt="The Classic Crush"
                className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-display text-base sm:text-lg md:text-xl font-bold tracking-[0.14em] uppercase text-[#064F50] leading-none">
                    THE CLASSIC CRUSH
                  </span>
                  <VegBadge size="sm" className="hidden sm:inline-flex" />
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.32em] font-medium text-[#594235] mt-0.5">
                  BAKERY &amp; CAFE
                </span>
              </div>
            </NavLink>

            {/* Center Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `text-xs lg:text-[13px] tracking-[0.2em] uppercase transition-all duration-200 py-1 border-b-2 font-medium ${
                      isActive
                        ? "text-[#064F50] border-[#078F96] font-semibold"
                        : "text-[#594235]/80 border-transparent hover:text-[#064F50] hover:border-[#D8C7AC]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Shopping Bag Button with Live Item Count */}
              <button
                onClick={openDrawer}
                className="relative p-2.5 rounded-full bg-[#EFE9DE] text-[#064F50] hover:bg-[#D8C7AC]/40 transition-all duration-200 cursor-pointer shadow-2xs"
                title="View your order bag"
                aria-label="View order bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#078F96] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#F8F5ED] shadow-xs">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Order Online / Quick Drawer — Elegant Outlined Button */}
              <button
                onClick={openDrawer}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] rounded-full border border-[#064F50] text-[#064F50] hover:bg-[#064F50] hover:text-[#F8F5ED] transition-all duration-200 shadow-2xs cursor-pointer group"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#078F96] group-hover:text-white transition-colors" />
                <span>ORDER ONLINE</span>
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={openDrawer}
                className="relative p-2 rounded-full bg-[#EFE9DE] text-[#064F50]"
                aria-label="View order bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#078F96] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#F8F5ED]">
                    {totalCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#064F50] hover:bg-[#EFE9DE] transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-30 bg-[#F8F5ED]/98 backdrop-blur-lg flex flex-col justify-between p-6 md:hidden animate-hero-fade">
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD3]">
              <div className="flex items-center gap-2">
                <VegBadge size="sm" />
                <span className="text-xs uppercase tracking-widest text-[#064F50] font-semibold">
                  100% Pure Vegetarian
                </span>
              </div>
              <span className="text-[10px] text-[#594235] tracking-wider uppercase font-medium">
                Daily 11am - 11pm
              </span>
            </div>

            <nav className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-serif tracking-[0.16em] uppercase py-2 transition-colors ${
                      isActive
                        ? "text-[#078F96] font-bold border-l-2 border-[#078F96] pl-3"
                        : "text-[#2C201A] hover:text-[#078F96] pl-1"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pb-8 pt-6 border-t border-[#E8DFD3]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDrawer();
              }}
              className="w-full py-3.5 bg-[#064F50] hover:bg-[#043839] text-[#F8F5ED] text-xs font-semibold uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Order Bag ({totalCount})</span>
            </button>

            <a
              href={`https://wa.me/${cafeInfo.whatsappNumber}?text=${encodeURIComponent(
                `Hi ${cafeInfo.name}! 👋 I am visiting your website and would like to order.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-[#064F50] text-[#064F50] hover:bg-[#EFE9DE] text-xs font-semibold uppercase tracking-[0.18em] rounded-full flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#078F96]" />
              <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
