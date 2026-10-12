import React from "react";
import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { VegBadge } from "../components/VegBadge";
import { useData } from "../context/DataContext";
import { useOrder } from "../context/OrderContext";
import {
  ArrowRight,
  Gift,
  Clock,
  MapPin,
  Navigation,
  MessageCircle,
} from "lucide-react";

export const HomePage: React.FC = () => {
  const { cafeInfo, giftProducts, galleryItems } = useData();
  const { openDrawer } = useOrder();

  // Curated gift items for Gifting Teaser
  const teaserGifts = giftProducts.filter((p) => p.isFeatured).slice(0, 3);

  // Curated photos for horizontal gallery strip
  const previewGallery = galleryItems.slice(0, 5);

  const categories = [
    {
      id: "signature-desserts",
      title: "Signature Desserts",
      subtitle: "Sweet cravings, always a good idea",
      description: "Warm molten chocolate delights, Oreo dark crunches, and house specialties.",
      image: "/dark-white-delight.jpg",
      startingPrice: "₹49",
      tag: "Iconic Bakes",
      colSpan: "lg:col-span-8",
      aspect: "aspect-16/10",
    },
    {
      id: "beverages",
      title: "Beverages",
      subtitle: "Hot, cold, always a good idea",
      description: "Kadak Assam tea, thick blended cold coffee, fruit shakes, and sparkling coolers.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
      startingPrice: "₹15",
      tag: "Fresh Sips",
      colSpan: "lg:col-span-4",
      aspect: "aspect-4/3 lg:aspect-auto lg:h-full",
    },
    {
      id: "sandwiches-maggie",
      title: "Sandwiches & Maggie",
      subtitle: "Comfort in every bite",
      description: "Crispy grilled triple-cheese sandwiches and steaming hot masala noodles.",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
      startingPrice: "₹39",
      tag: "Comfort Food",
      colSpan: "lg:col-span-4",
      aspect: "aspect-4/3",
    },
    {
      id: "burgers-fries",
      title: "Burgers & Fries",
      subtitle: "Classic done right",
      description: "Crispy vegetable patties, grilled paneer burgers, and shaker peri-peri fries.",
      image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
      startingPrice: "₹39",
      tag: "Crunchy Bites",
      colSpan: "lg:col-span-4",
      aspect: "aspect-4/3",
    },
    {
      id: "momo",
      title: "Momos",
      subtitle: "A bite of goodness",
      description: "Steamed, crispy fried, kurkure crunch, and molten cheese momos with spicy dip.",
      image: "/momos-platter.jpg",
      startingPrice: "₹49",
      tag: "Student Craving",
      colSpan: "lg:col-span-4",
      aspect: "aspect-4/3",
    },
    {
      id: "quick-bites",
      title: "Quick Bites",
      subtitle: "Simple bites, big hapiness",
      description: "Flaky golden bakery puff patties, garlic Korean buns, and stone-baked pizzas.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      startingPrice: "₹20",
      tag: "Daily Fresh",
      colSpan: "lg:col-span-12",
      aspect: "aspect-21/9 sm:aspect-16/7",
    },
  ];

  return (
    <div className="bg-[#F8F5ED]">
      {/* ==================================================
          1. SHOWSTOPPER HERO SECTION
          ================================================== */}
      <Hero />

      {/* ==================================================
          A. SIGNATURE CRAVINGS
          Asymmetrical editorial layouts linking to menu sections
          ================================================== */}
      <section id="signature-cravings" className="py-20 sm:py-28 bg-[#F8F5ED] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#078F96] block mb-2">
                Curated Flavours
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#064F50] tracking-tight">
                SIGNATURE CRAVINGS
              </h2>
              <p className="text-xs sm:text-sm text-[#594235]/80 font-light mt-2 max-w-xl">
                Freshly prepared comfort food made with honest ingredients. 100% pure vegetarian, baked fresh every single morning.
              </p>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#064F50] hover:text-[#078F96] transition-colors group shrink-0"
            >
              <span>VIEW FULL MENU</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Asymmetrical Editorial Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`${cat.colSpan} group relative rounded-2xl overflow-hidden bg-white border border-[#E8DFD3] shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between`}
              >
                {/* Image Container with Editorial Zoom */}
                <Link
                  to={`/menu?category=${cat.id}`}
                  className={`relative w-full ${cat.aspect} overflow-hidden bg-[#EFE9DE] block`}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#064F50] shadow-xs">
                      {cat.tag}
                    </span>
                    <VegBadge size="sm" />
                  </div>

                  <div className="absolute top-3.5 right-3.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-white/95 border border-white/20">
                    From {cat.startingPrice}
                  </div>

                  {/* Bottom Text in Image for Wide Cards */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#E8C45A] font-semibold block mb-1">
                      {cat.subtitle}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wide">
                      {cat.title}
                    </h3>
                  </div>
                </Link>

                {/* Card Bottom Strip */}
                <div className="p-4 sm:p-5 flex items-center justify-between bg-white border-t border-[#F2ECE1]">
                  <p className="text-xs text-[#594235]/85 line-clamp-1 font-light pr-3">
                    {cat.description}
                  </p>
                  <Link
                    to={`/menu?category=${cat.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#078F96] group-hover:text-[#064F50] shrink-0"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          B. A LITTLE SOMETHING TO GIFT
          Dedicated gifting section inspired by FNP with TCC palette
          ================================================== */}
      <section className="py-20 sm:py-28 bg-[#FCFAF7] border-y border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#078F96] block mb-2 flex items-center gap-2">
              <Gift className="w-3.5 h-3.5 text-[#078F96]" />
              <span>Gifting by The Classic Crush</span>
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#064F50] tracking-tight leading-tight">
              Make someone&apos;s day a little sweeter.
            </h2>
            <p className="text-sm sm:text-base text-[#594235]/80 font-light mt-3 leading-relaxed">
              Thoughtfully arranged bouquets, artisanal chocolates, warm bakery boxes, and personal handwritten notes for birthdays, anniversaries, or just because.
            </p>
          </div>

          {/* 3 Curated Gifting Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {teaserGifts.map((gift) => (
              <div
                key={gift.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E8DFD3] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EFE9DE]">
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    {gift.occasions[0] && (
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-[#064F50] shadow-xs">
                        {gift.occasions[0]}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-[#064F50]/90 text-white backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                      {gift.priceDisplay || `₹${gift.price}`}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 space-y-2">
                    <h3 className="font-display text-lg font-bold text-[#064F50] group-hover:text-[#078F96] transition-colors">
                      {gift.name}
                    </h3>
                    <p className="text-xs text-[#594235]/80 font-light line-clamp-2 leading-relaxed">
                      {gift.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0 border-t border-[#F2ECE1] mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#078F96] font-medium">
                    Same-day cafe pickup available
                  </span>
                  <Link
                    to={`/gifting/${gift.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#064F50] group-hover:text-[#078F96]"
                  >
                    <span>View Gift</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div className="text-center pt-2">
            <Link
              to="/gifting"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#078F96] hover:bg-[#067B82] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <span>EXPLORE GIFTING</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          C. OUR LITTLE CORNER
          Introduction with beautiful café photograph and link to OUR STORY
          ================================================== */}
      <section className="py-20 sm:py-28 bg-[#F8F5ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Café Editorial Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E8DFD3] bg-[#EFE9DE]">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80"
                  alt="Cozy sunlit table corner at The Classic Crush Bakery & Cafe"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs">
                    <VegBadge size="sm" />
                    <span>100% Pure Vegetarian</span>
                  </div>
                  <span className="text-[11px] text-[#E8C45A] font-semibold tracking-wider uppercase">
                    Daily Fresh Ovens
                  </span>
                </div>
              </div>
            </div>

            {/* Introduction Copy & Link */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#078F96] block">
                Our Little Corner
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#064F50] leading-tight">
                Freshly made. Comfortingly familiar.
              </h2>
              <div className="w-12 h-0.5 bg-[#E8C45A]" />
              <p className="text-sm sm:text-base text-[#594235]/90 font-light leading-relaxed">
                The Classic Crush was created for anyone who loves the aroma of freshly baked patties in the morning, thick frothy cold coffee between study sessions, and rich molten chocolate shared with friends.
              </p>
              <p className="text-sm sm:text-base text-[#594235]/90 font-light leading-relaxed">
                Everything we serve is strictly 100% vegetarian, prepared fresh to order, and crafted with genuine care. No pretentious dining rules, no overcomplicated menus — just delicious café comfort that feels like home.
              </p>

              <div className="pt-2">
                <Link
                  to="/our-story"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#064F50] border-b-2 border-[#064F50] pb-1 hover:text-[#078F96] hover:border-[#078F96] transition-colors group"
                >
                  <span>OUR STORY</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          D. A GLIMPSE INSIDE
          Curated horizontal gallery strip with authentic photographs
          ================================================== */}
      <section className="py-20 sm:py-24 bg-[#FCFAF7] border-t border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#078F96] block mb-2">
                Visual Diary
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#064F50] tracking-tight">
                A GLIMPSE INSIDE
              </h2>
              <p className="text-xs sm:text-sm text-[#594235]/80 font-light mt-1 max-w-md">
                A preview of daily bakes, cool sips, warm tables, and handcrafted bouquets.
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#064F50] hover:text-[#078F96] transition-colors group shrink-0"
            >
              <span>VIEW THE GALLERY</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Horizontal Gallery Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-10">
            {previewGallery.map((item, idx) => (
              <Link
                key={item.id || idx}
                to="/gallery"
                className="group relative rounded-xl overflow-hidden aspect-4/5 bg-[#EFE9DE] border border-[#E8DFD3] shadow-2xs hover:shadow-lg transition-all duration-500"
              >
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3.5 text-white">
                  <span className="text-[9px] uppercase tracking-wider text-[#E8C45A] font-semibold">
                    {item.category}
                  </span>
                  <p className="text-xs font-serif line-clamp-1">{item.caption}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-7 py-3 border border-[#064F50] text-[#064F50] hover:bg-[#064F50] hover:text-[#F8F5ED] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-2xs"
            >
              <span>VIEW THE GALLERY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          E. COME BY, STAY AWHILE
          Compact visit-us section with address, hours, map embed, and directions
          ================================================== */}
      <section className="py-20 sm:py-28 bg-[#F8F5ED] border-t border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#078F96] block mb-2">
                  Find Our Cafe
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#064F50] tracking-tight">
                  COME BY, STAY AWHILE
                </h2>
                <div className="w-12 h-0.5 bg-[#E8C45A] mt-3 mb-4" />
                <p className="text-sm text-[#594235]/85 font-light leading-relaxed">
                  We look forward to hosting you. Drop in for morning chai and patties, an afternoon cold brew, or late-night dessert cravings.
                </p>
              </div>

              {/* Address card */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8DFD3] shadow-xs space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#EFE9DE] flex items-center justify-center shrink-0 text-[#064F50]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#064F50]">
                      Location &amp; Address
                    </h3>
                    <p className="text-xs text-[#594235] mt-0.5 leading-relaxed">
                      {cafeInfo.address.street}, {cafeInfo.address.area}
                    </p>
                    <p className="text-xs font-medium text-[#078F96]">
                      {cafeInfo.address.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-[#F2ECE1]">
                  <div className="w-9 h-9 rounded-full bg-[#EFE9DE] flex items-center justify-center shrink-0 text-[#064F50]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#064F50]">
                      Opening Hours
                    </h3>
                    <p className="text-xs text-[#594235] mt-0.5">
                      {cafeInfo.timings.days}
                    </p>
                    <p className="text-xs font-semibold text-[#064F50]">
                      {cafeInfo.timings.hours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                <a
                  href={cafeInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3 bg-[#064F50] hover:bg-[#043839] text-[#F8F5ED] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E8C45A]" />
                  <span>GET DIRECTIONS</span>
                </a>

                <button
                  onClick={openDrawer}
                  className="w-full sm:w-auto px-7 py-3 bg-white hover:bg-[#EFE9DE] text-[#064F50] border border-[#064F50] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#078F96]" />
                  <span>ORDER ONLINE</span>
                </button>
              </div>
            </div>

            {/* Right Map Embed Column */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#E8DFD3] bg-white h-[380px] sm:h-[440px] relative">
                <iframe
                  title="The Classic Crush Cafe Location Map"
                  src={cafeInfo.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[0.2] contrast-[1.05]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
