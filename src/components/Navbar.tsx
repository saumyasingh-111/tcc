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
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Our Story", path: "/our-story" },
    { name: "Gallery", path: "/gallery" },
    { name: "Visit Us", path: "/visit-us" },
  ];

  const whatsappLink = `https://wa.me/${cafeInfo.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${cafeInfo.name}! 👋 I am visiting your website and would like to order.`
  )}`;

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD3] shadow-2xs py-3.5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo — Inspired by Cafecito Minimal Editorial Identity */}
            <NavLink
              to="/"
              className="group flex flex-col transition-opacity hover:opacity-90"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#1C241E]">
                  {cafeInfo.name}
                </span>
                <VegBadge size="sm" />
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] font-medium text-[#755546]">
                {cafeInfo.tagline}
              </span>
            </NavLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `text-xs lg:text-sm tracking-[0.16em] uppercase transition-all duration-200 py-1 border-b-2 ${
                      isActive
                        ? "text-[#1C241E] border-[#1C241E] font-semibold"
                        : "text-[#59605C] border-transparent hover:text-[#1C241E]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Order Bag Button */}
              <button
                onClick={openDrawer}
                className="relative p-2.5 rounded-full bg-[#EFE9DE] text-[#1C241E] hover:bg-[#E3D9C9] transition-all duration-200 cursor-pointer"
                title="View your order bag"
                aria-label="View order bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#26332A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF7F2]">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Order Online / WhatsApp — Clean Pill Outline Button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] rounded-full border border-[#26332A] text-[#1C241E] hover:bg-[#26332A] hover:text-[#FAF7F2] transition-all duration-200 shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Order Online</span>
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={openDrawer}
                className="relative p-2 rounded-full text-[#1C241E] bg-[#EFE9DE] cursor-pointer"
                aria-label="Order bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#26332A] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-[#1C241E] cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#FAF7F2] shadow-2xl p-6 flex flex-col justify-between z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DFD3]">
                <div>
                  <h3 className="font-serif text-lg font-bold tracking-widest text-[#1C241E]">
                    {cafeInfo.name}
                  </h3>
                  <p className="text-[10px] tracking-widest text-[#755546] uppercase font-medium">
                    {cafeInfo.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#3E4340] hover:text-black rounded-lg cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-[#2E7D32] bg-[#E8F5E9] px-3 py-1.5 rounded-full w-fit">
                <VegBadge size="sm" />
                <span className="font-medium">100% Pure Vegetarian</span>
              </div>

              <nav className="mt-6 flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-base font-serif py-2 border-b border-[#EFE9DE] transition-colors flex items-center justify-between ${
                        isActive
                          ? "text-[#1C241E] font-bold text-lg"
                          : "text-[#575E5B] hover:text-[#1C241E]"
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <span className="text-xs text-[#C59F54]">→</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E8DFD3] space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#26332A] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
