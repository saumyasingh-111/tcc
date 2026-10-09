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
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen">
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-12">
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#755546] block mb-2">
          Visual Journal
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C241E] tracking-tight mb-3">
          GALLERY
        </h1>
        <div className="w-12 h-0.5 bg-[#C59F54] mx-auto mb-4" />
        <p className="font-serif italic text-lg sm:text-2xl text-[#59605C] max-w-lg mx-auto leading-relaxed">
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
                  ? "bg-[#26332A] text-[#FAF7F2] shadow-xs"
                  : "bg-white text-[#575E5B] hover:text-[#1C241E] hover:bg-[#EFE9DE] border border-[#E8DFD3]"
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
          <div className="text-center py-16 bg-white/60 rounded-2xl border border-[#E8DFD3] max-w-sm mx-auto">
            <p className="font-serif text-lg text-[#1C241E]">No photos in this category yet</p>
            <button
              onClick={() => setFilter("All")}
              className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#26332A] underline cursor-pointer"
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
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#EFE9DE] border border-[#E8DFD3] shadow-xs hover:shadow-md transition-all duration-500"
              >
                <div className={`overflow-hidden ${img.aspect === "landscape" ? "aspect-16/11" : "aspect-4/5"}`}>
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/dark-white-delight.jpg";
                    }}
                  />
                </div>

                {/* Natural Dark Vignette & Caption Reveal */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase font-semibold tracking-[0.22em] text-[#D8B774] mb-1">
                    {img.category}
                  </span>
                  <p className="font-serif text-lg font-normal leading-snug">
                    {img.caption}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-white/80">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Click to expand</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && filteredImages[lightboxIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-all"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2.5 rounded-full bg-black/50 hover:bg-black/80 transition-all cursor-pointer z-60"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-black/80 transition-all cursor-pointer z-60"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-black/80 transition-all cursor-pointer z-60"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Box */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIdx].url}
              alt={filteredImages[lightboxIdx].caption}
              className="max-h-[75vh] w-auto max-w-full rounded-xl shadow-2xl object-contain"
            />
            <div className="mt-4 text-center text-white">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#D8B774] block">
                {filteredImages[lightboxIdx].category}
              </span>
              <p className="font-serif text-lg sm:text-xl font-normal mt-1">
                {filteredImages[lightboxIdx].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
