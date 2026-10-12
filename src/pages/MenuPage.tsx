import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { type MenuCategoryId, type MenuItem } from "../data/menuData";
import { VegBadge } from "../components/VegBadge";
import { useOrder } from "../context/OrderContext";
import { useData } from "../context/DataContext";
import { Search, Plus, Minus, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get("category") as MenuCategoryId) || "all";

  const { menuItems, categories } = useData();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId | "all">(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem, updateQuantity, items: orderItems, totalCount, totalAmount, openDrawer } = useOrder();

  // Keep state in sync with URL parameter if it changes
  useEffect(() => {
    const cat = searchParams.get("category") as MenuCategoryId;
    if (cat && categories.some((c) => c.id === cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams, categories]);

  const handleSelectCategory = (catId: MenuCategoryId | "all") => {
    setSelectedCategory(catId);
    if (catId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catId);
    }
    setSearchParams(searchParams);
  };

  const getItemQuantity = (id: string) => {
    const found = orderItems.find((i) => i.item.id === id);
    return found ? found.quantity : 0;
  };

  // Filtered categories
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

  return (
    <div className="pt-24 sm:pt-28 pb-28 bg-[#F8F5ED] min-h-screen">
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064F50]/10 text-[#064F50] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          <VegBadge size="sm" />
          <span>100% PURE VEGETARIAN MENU</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-normal text-[#064F50] tracking-tight mb-3">
          OUR MENU
        </h1>
        <div className="w-12 h-0.5 bg-[#E8C45A] mx-auto mb-4" />
        <p className="font-serif italic text-lg sm:text-2xl text-[#594235] max-w-lg mx-auto">
          &ldquo;Good Food. Great Coffee. Better Days.&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-[#594235]/70 mt-2 font-light">
          Prepared fresh to order • Honest prices • Handcrafted with love
        </p>
      </section>

      {/* Sticky Category Filter Tabs & Search Bar */}
      <div className="sticky top-16 sm:top-[68px] z-30 bg-[#F8F5ED]/95 backdrop-blur-md border-y border-[#E8DFD3] py-3 shadow-xs mb-10 sm:mb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Filter Chips */}
          <div className="overflow-x-auto no-scrollbar flex items-center gap-2 py-0.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id as MenuCategoryId | "all")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#064F50] text-[#F8F5ED] shadow-sm"
                      : "bg-white text-[#594235] hover:text-[#064F50] hover:bg-[#EFE9DE] border border-[#E8DFD3]"
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
              placeholder="Search items by name or flavour..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-[#E8DFD3] rounded-full text-xs text-[#2C201A] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#078F96]"
            />
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#594235] hover:text-black cursor-pointer font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Menu Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {activeCategories.map((category) => {
          const categoryItems = menuItems.filter(
            (item) => item.category === category.id && matchesSearch(item)
          );

          if (categoryItems.length === 0) return null;

          // Featured Item in category
          const featureItem =
            categoryItems.find((i) => i.isFeatured && i.isAvailable !== false) ||
            categoryItems.find((i) => i.isBestseller && i.isAvailable !== false) ||
            categoryItems[0];
          const standardItems = categoryItems.filter((i) => i.id !== featureItem.id);

          const isFeatureAvail = featureItem.isAvailable !== false;

          return (
            <section key={category.id} id={category.id} className="scroll-mt-36">
              {/* Category Header */}
              <div className="border-b border-[#E8DFD3] pb-3 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-[#078F96] block mb-1">
                    {category.subtitle || "The Classic Crush"}
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl font-normal text-[#064F50] tracking-tight">
                    {category.label}
                  </h2>
                  {category.description && (
                    <p className="text-xs text-[#594235]/80 font-light mt-1 max-w-xl">
                      {category.description}
                    </p>
                  )}
                </div>
                <span className="text-xs text-[#064F50] font-semibold px-3 py-1 bg-white rounded-full border border-[#E8DFD3]">
                  {categoryItems.length} {categoryItems.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Sophisticated Varied Layout: 1 Image-Led Feature Hero Card + Asymmetrical Grid of Items */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Feature Spotlight Card */}
                <div className="lg:col-span-5 bg-white rounded-2xl overflow-hidden border border-[#E8DFD3] shadow-md group">
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EFE9DE]">
                    <img
                      src={featureItem.image}
                      alt={featureItem.name}
                      className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 ${
                        !isFeatureAvail ? "grayscale contrast-75 opacity-75" : ""
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs p-1.5 rounded-md shadow-xs">
                      <VegBadge size="sm" />
                    </div>

                    {!isFeatureAvail ? (
                      <div className="absolute top-3.5 right-3.5 bg-rose-600 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                        Currently unavailable
                      </div>
                    ) : (
                      <>
                        <div className="absolute top-3.5 right-3.5 bg-[#064F50] text-white text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-2.5 h-2.5 text-[#E8C45A]" />
                          <span>Specialty</span>
                        </div>
                        <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-bold text-[#064F50] shadow-sm">
                          {featureItem.priceDisplay || `₹${featureItem.price}`}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-xl font-bold text-[#064F50]">
                        {featureItem.name}
                      </h3>
                      <span className="font-display font-bold text-lg text-[#064F50]">
                        {featureItem.priceDisplay || `₹${featureItem.price}`}
                      </span>
                    </div>

                    <p className="text-xs text-[#594235]/80 mt-2 font-light leading-relaxed">
                      {featureItem.description}
                    </p>

                    <div className="pt-4 mt-4 border-t border-[#F2ECE1] flex items-center justify-between">
                      <span className="text-[11px] text-[#078F96] font-medium tracking-wide">
                        {featureItem.prepNote || "Prepared fresh to order"}
                      </span>

                      {isFeatureAvail ? (
                        getItemQuantity(featureItem.id) === 0 ? (
                          <button
                            onClick={() => addItem(featureItem)}
                            className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#078F96] hover:bg-[#067B82] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-2 bg-[#064F50] text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                            <button
                              onClick={() => updateQuantity(featureItem.id, -1)}
                              className="p-0.5 hover:text-[#E8C45A] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="min-w-4 text-center">{getItemQuantity(featureItem.id)}</span>
                            <button
                              onClick={() => updateQuantity(featureItem.id, 1)}
                              className="p-0.5 hover:text-[#E8C45A] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )
                      ) : (
                        <span className="text-xs text-rose-600 font-medium">Sold Out</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Grid of Remaining Items in Category */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {standardItems.map((item) => {
                    const qty = getItemQuantity(item.id);
                    const isAvail = item.isAvailable !== false;

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl p-4 border border-[#E8DFD3] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Mini Thumbnail */}
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#EFE9DE] border border-[#E8DFD3]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className={`w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ${
                                !isAvail ? "grayscale opacity-70" : ""
                              }`}
                              loading="lazy"
                            />
                            <div className="absolute top-1 left-1 bg-white/90 p-0.5 rounded-sm">
                              <VegBadge size="sm" />
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="font-display font-bold text-sm text-[#064F50] leading-snug truncate">
                                {item.name}
                              </h4>
                              <span className="font-display font-bold text-sm text-[#064F50] shrink-0">
                                {item.priceDisplay || `₹${item.price}`}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#594235]/75 line-clamp-2 mt-1 font-light leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="mt-3 pt-2.5 border-t border-[#F2ECE1] flex items-center justify-between">
                          <span className="text-[10px] text-[#594235]/60 font-light italic">
                            {item.prepNote || "Vegetarian"}
                          </span>

                          {isAvail ? (
                            qty === 0 ? (
                              <button
                                onClick={() => addItem(item)}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-[#EFE9DE] hover:bg-[#078F96] text-[#064F50] hover:text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add</span>
                              </button>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 bg-[#064F50] text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="p-0.5 hover:text-[#E8C45A] cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="min-w-3 text-center">{qty}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="p-0.5 hover:text-[#E8C45A] cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            )
                          ) : (
                            <span className="text-[10px] text-rose-600 font-medium">Sold Out</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Floating Cart Bar if user has items */}
      {totalCount > 0 && (
        <aside
          aria-label="Current order summary"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#064F50] text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-6 border border-white/20 animate-hero-fade max-w-sm sm:max-w-md w-[92%]"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#078F96] flex items-center justify-center text-white text-xs font-bold">
              {totalCount}
            </div>
            <div>
              <p className="text-[11px] text-[#E8C45A] font-semibold uppercase tracking-wider">
                Your Order
              </p>
              <p className="text-sm font-display font-bold">
                ₹{totalAmount}
              </p>
            </div>
          </div>

          <button
            onClick={openDrawer}
            className="ml-auto inline-flex items-center gap-2 px-5 py-2 bg-white text-[#064F50] hover:bg-[#F8F5ED] text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#078F96]" />
            <span>View Bag</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}
    </div>
  );
};
