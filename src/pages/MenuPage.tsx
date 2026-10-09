import React, { useState, useMemo } from "react";
import { type MenuCategoryId, type MenuItem } from "../data/menuData";
import { VegBadge } from "../components/VegBadge";
import { useOrder } from "../context/OrderContext";
import { useData } from "../context/DataContext";
import { Search, Plus, Minus, Sparkles, MessageCircle } from "lucide-react";

export const MenuPage: React.FC = () => {
  const { menuItems, categories, cafeInfo } = useData();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem, updateQuantity, items: orderItems } = useOrder();

  const getItemQuantity = (id: string) => {
    const found = orderItems.find((i) => i.item.id === id);
    return found ? found.quantity : 0;
  };

  // Filtered categories and items
  const activeCategories = useMemo(() => {
    if (selectedCategory === "all") {
      return categories.filter((c) => c.id !== "all");
    }
    return categories.filter((c) => c.id === selectedCategory);
  }, [categories, selectedCategory]);

  const matchesSearch = (item: MenuItem) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
  };

  const whatsappOrderLink = `https://wa.me/${cafeInfo.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${cafeInfo.name}! I would like to place a custom / bulk order.`
  )}`;

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen">
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14">
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#755546] block mb-2">
          The Full Spread
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C241E] tracking-tight mb-3">
          OUR MENU
        </h1>
        <div className="w-12 h-0.5 bg-[#C59F54] mx-auto mb-4" />
        <p className="font-serif italic text-lg sm:text-2xl text-[#59605C] max-w-lg mx-auto">
          &ldquo;Something sweet, something savoury, something for everyone.&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-[#767E7A] mt-2 font-light">
          100% Pure Vegetarian &amp; Eggless • Baked &amp; Prepared Fresh Daily
        </p>
      </section>

      {/* Sticky Category Bar & Search */}
      <div className="sticky top-16 sm:top-[68px] z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-y border-[#E8DFD3] py-3 shadow-2xs mb-10 sm:mb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="overflow-x-auto no-scrollbar flex items-center gap-2 py-0.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id as MenuCategoryId | "all");
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#26332A] text-[#FAF7F2] shadow-xs"
                      : "bg-white text-[#575E5B] hover:text-[#1C241E] hover:bg-[#EFE9DE] border border-[#E8DFD3]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Minimal Search Input */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 bg-white border border-[#E5DBCA] rounded-full text-xs text-[#1C241E] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#26332A]"
            />
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#767E7A] hover:text-black cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Menu Listing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {activeCategories.map((category) => {
          const categoryItems = menuItems.filter(
            (item) => item.category === category.id && matchesSearch(item)
          );

          if (categoryItems.length === 0) return null;

          // Select first available item or bestseller as category visual feature highlight
          const featureItem =
            categoryItems.find((i) => i.isBestseller && i.isAvailable !== false) ||
            categoryItems.find((i) => i.isAvailable !== false) ||
            categoryItems[0];
          const standardItems = categoryItems.filter((i) => i.id !== featureItem.id);

          const isFeatureAvail = featureItem.isAvailable !== false;

          return (
            <section key={category.id} className="scroll-mt-36">
              {/* Category Header */}
              <div className="border-b border-[#E8DFD3] pb-3 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C241E] tracking-tight">
                    {category.label}
                  </h2>
                  {category.description && (
                    <p className="text-xs text-[#755546] font-light mt-0.5">
                      {category.description}
                    </p>
                  )}
                </div>
                <span className="text-xs text-[#8C938E] font-medium">
                  {categoryItems.length} {categoryItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Sophisticated layout: 1 Image-led Feature Hero Card + Clean Text-Based Rows */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Feature Spotlight Card (Image-led) */}
                <div className="lg:col-span-5 bg-white rounded-2xl overflow-hidden border border-[#E8DFD3] shadow-xs group">
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EFE9DE]">
                    <img
                      src={featureItem.image}
                      alt={featureItem.name}
                      className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
                        !isFeatureAvail ? "grayscale contrast-75 opacity-75" : ""
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-1.5 rounded-md shadow-2xs">
                      <VegBadge size="sm" />
                    </div>

                    {!isFeatureAvail ? (
                      <div className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                        Currently unavailable
                      </div>
                    ) : (
                      <>
                        {featureItem.isBestseller && (
                          <div className="absolute top-3 right-3 bg-[#26332A] text-white text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                            <Sparkles className="w-2.5 h-2.5 text-[#D8B774]" />
                            <span>Bestseller</span>
                          </div>
                        )}
                        <div className="absolute bottom-3 right-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-[#1C241E] shadow-2xs">
                          {featureItem.priceDisplay || `₹${featureItem.price}`}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-xl font-bold text-[#1C241E]">
                        {featureItem.name}
                      </h3>
                      <span className="font-serif font-bold text-base text-[#1C241E]">
                        {featureItem.priceDisplay || `₹${featureItem.price}`}
                      </span>
                    </div>

                    <p className="text-xs text-[#575E5B] mt-1.5 font-light leading-relaxed">
                      {featureItem.description}
                    </p>

                    <div className="pt-4 mt-3 border-t border-[#EFE9DE] flex items-center justify-between">
                      <span className="text-[11px] text-[#755546] font-medium">
                        {featureItem.prepNote || "Chef's Recommendation"}
                      </span>

                      {isFeatureAvail ? (
                        getItemQuantity(featureItem.id) === 0 ? (
                          <button
                            onClick={() => addItem(featureItem)}
                            className="inline-flex items-center gap-1 px-3.5 py-1 bg-[#26332A] text-white hover:bg-[#1C241E] rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-2 bg-[#26332A] text-white px-2 py-1 rounded-full text-xs font-bold">
                            <button
                              onClick={() => updateQuantity(featureItem.id, -1)}
                              className="p-0.5 hover:text-[#D8B774] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="min-w-3 text-center">{getItemQuantity(featureItem.id)}</span>
                            <button
                              onClick={() => updateQuantity(featureItem.id, 1)}
                              className="p-0.5 hover:text-[#D8B774] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      ) : (
                        <span className="text-xs text-rose-600 font-medium">
                          Sold Out
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Elegant Text-Based Cafe Menu Rows */}
                <div className="lg:col-span-7 space-y-3.5">
                  {standardItems.length === 0 ? (
                    <div className="p-6 bg-white/50 rounded-xl border border-dashed border-[#E8DFD3] text-center text-xs text-[#767E7A]">
                      Explore our other categories for more flavours!
                    </div>
                  ) : (
                    standardItems.map((item) => {
                      const qty = getItemQuantity(item.id);
                      const isAvail = item.isAvailable !== false;

                      return (
                        <div
                          key={item.id}
                          className={`rounded-xl p-4 border transition-all flex items-center justify-between gap-4 ${
                            isAvail
                              ? "bg-white/80 hover:bg-white border-[#E8DFD3] hover:border-[#D5C7B5] hover:shadow-2xs"
                              : "bg-[#F7F3EC]/80 border-stone-300 opacity-60"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <VegBadge size="sm" />
                              <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C241E]">
                                {item.name}
                              </h4>
                              {item.isBestseller && isAvail && (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-[#92400E] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                                  Popular
                                </span>
                              )}
                              {!isAvail && (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                                  Unavailable
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-[#575E5B] mt-1 font-light line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>

                            {item.prepNote && (
                              <span className="inline-block text-[10px] text-[#755546] font-medium mt-1">
                                • {item.prepNote}
                              </span>
                            )}
                          </div>

                          {/* Price & Add */}
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-serif text-base font-bold text-[#1C241E]">
                              {item.priceDisplay || `₹${item.price}`}
                            </span>

                            {isAvail ? (
                              qty === 0 ? (
                                <button
                                  onClick={() => addItem(item)}
                                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#F7F3EC] hover:bg-[#26332A] text-[#26332A] hover:text-white rounded-full text-xs font-semibold transition-all cursor-pointer border border-[#E5DBCA]"
                                  aria-label={`Add ${item.name} to order`}
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add</span>
                                </button>
                              ) : (
                                <div className="inline-flex items-center gap-1.5 bg-[#26332A] text-white px-2 py-1 rounded-full text-xs font-bold">
                                  <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="p-0.5 hover:text-[#D8B774] cursor-pointer"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="min-w-3 text-center">{qty}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="p-0.5 hover:text-[#D8B774] cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              )
                            ) : (
                              <span className="text-[11px] text-rose-600 font-medium">
                                Sold Out
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* WhatsApp Custom Order Notice */}
      <section className="max-w-3xl mx-auto px-4 mt-20 text-center bg-[#FCFAF7] border border-[#E8DFD3] rounded-2xl p-8 shadow-xs">
        <h3 className="font-serif text-2xl font-normal text-[#1C241E] mb-2">
          Ordering for a group or party?
        </h3>
        <p className="text-xs sm:text-sm text-[#575E5B] font-light max-w-md mx-auto mb-6">
          We take custom celebration cakes, patty boxes, and bulk snack parcels directly on WhatsApp. Let us know a few hours ahead!
        </p>
        <a
          href={whatsappOrderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-[#20ba5a] transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat on WhatsApp</span>
        </a>
      </section>
    </div>
  );
};
