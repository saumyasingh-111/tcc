import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

export const GalleryPage: React.FC = () => {
  const { galleryItems } = useData();
  const [filter, setFilter] = useState<string>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Visible items only
  const visibleItems = galleryItems.filter((i) => i.isVisible !== false);

  const categories = [
    "All",
    ...Array.from(new Set(visibleItems.map((item) => item.category))),
  ];

  const filteredImages = visibleItems.filter(
    (item) => filter === "All" || item.category === filter
  );

  const openLightbox = (index: number) => setLightboxIdx(index);
  const closeLightbox = () => setLightboxIdx(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx + 1) % filteredImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#F8F5ED] min-h-screen">
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-12">
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#078F96] block mb-2">
          Visual Journal
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-normal text-[#064F50] tracking-tight mb-3">
          THE GALLERY
        </h1>
        <div className="w-12 h-0.5 bg-[#E8C45A] mx-auto mb-4" />
        <p className="font-serif italic text-lg sm:text-2xl text-[#594235] max-w-lg mx-auto leading-relaxed">
          &ldquo;Glimpses of daily bakes, warm corners, and shared moments.&rdquo;
        </p>
      </section>

      {/* Category Filter Chips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center gap-2 py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setLightboxIdx(null);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? "bg-[#064F50] text-[#F8F5ED] shadow-sm"
                  : "bg-white text-[#594235] hover:text-[#064F50] hover:bg-[#EFE9DE] border border-[#E8DFD3]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Masonry Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DFD3] max-w-sm mx-auto p-6">
            <p className="font-display text-lg text-[#064F50]">No photos in this category yet</p>
            <button
              onClick={() => setFilter("All")}
              className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#078F96] underline cursor-pointer"
            >
              View All Photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id || img.url + idx}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#EFE9DE] border border-[#E8DFD3] shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`overflow-hidden ${img.aspect === "landscape" ? "aspect-16/11" : "aspect-4/5"}`}>
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Hover Reveal Card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#E8C45A] bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                      {img.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg text-white font-medium drop-shadow-xs">
                    {img.caption}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && filteredImages[lightboxIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-hero-fade"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Lightbox Image & Caption */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIdx].url}
              alt={filteredImages[lightboxIdx].caption}
              className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-xs text-[#E8C45A] uppercase tracking-widest block mb-1">
                {filteredImages[lightboxIdx].category}
              </span>
              <p className="font-serif text-lg font-light text-white/90">
                {filteredImages[lightboxIdx].caption}
              </p>
              <span className="text-[11px] text-white/50 mt-1 block">
                {lightboxIdx + 1} of {filteredImages.length}
              </span>
            </div>
          </div>

          {/* Navigation Next */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
