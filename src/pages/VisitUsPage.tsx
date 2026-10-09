import React from "react";
import { useData } from "../context/DataContext";
import { MapPin, Clock, Phone, Navigation, MessageCircle, ExternalLink } from "lucide-react";

export const VisitUsPage: React.FC = () => {
  const { cafeInfo } = useData();

  const callLink = `tel:${cafeInfo.phone}`;
  const whatsappLink = `https://wa.me/${cafeInfo.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${cafeInfo.name}! I am visiting your cafe website and have a query.`
  )}`;

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen">
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#755546] block mb-2">
          Location &amp; Timings
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C241E] tracking-tight mb-3">
          COME FIND US.
        </h1>
        <div className="w-12 h-0.5 bg-[#C59F54] mx-auto mb-4" />
        <p className="font-serif italic text-lg sm:text-2xl text-[#59605C] max-w-lg mx-auto leading-relaxed">
          &ldquo;Step into a warm seat, order your favourite bite, and stay awhile.&rdquo;
        </p>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Cafe Details & Quick Contact */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Address Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EFE9DE] flex items-center justify-center shrink-0 text-[#26332A]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-serif text-lg font-bold text-[#1C241E]">
                    Our Address
                  </h2>
                  <p className="text-sm text-[#3E4340] leading-relaxed font-light">
                    {cafeInfo.address.street}
                  </p>
                  <p className="text-sm text-[#3E4340] font-light">
                    {cafeInfo.address.area}
                  </p>
                  <p className="text-sm font-medium text-[#755546]">
                    {cafeInfo.address.city}
                  </p>
                  {cafeInfo.address.landmark && (
                    <p className="text-xs text-[#767E7A] italic pt-1">
                      Landmark: {cafeInfo.address.landmark}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Opening Hours Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EFE9DE] flex items-center justify-center shrink-0 text-[#26332A]">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-serif text-lg font-bold text-[#1C241E]">
                    Opening Hours
                  </h2>
                  <p className="text-sm font-semibold text-[#26332A]">
                    {cafeInfo.timings.days}
                  </p>
                  <p className="text-sm text-[#3E4340] font-light">
                    {cafeInfo.timings.hours}
                  </p>
                  {cafeInfo.timings.kitchenCloses && (
                    <p className="text-xs text-[#755546] italic pt-1">
                      {cafeInfo.timings.kitchenCloses}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact & Phone */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EFE9DE] flex items-center justify-center shrink-0 text-[#26332A]">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-serif text-lg font-bold text-[#1C241E]">
                    Phone &amp; Enquiries
                  </h2>
                  <p className="text-xs text-[#575E5B] font-light">
                    For takeout parcel status or group table seating:
                  </p>
                  <a
                    href={callLink}
                    className="inline-block text-base font-bold text-[#26332A] hover:underline pt-1"
                  >
                    {cafeInfo.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons: Get Directions & Order on WhatsApp */}
            <div className="space-y-3 pt-2">
              <a
                href={cafeInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#26332A] hover:bg-[#1C241E] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.18em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group"
              >
                <Navigation className="w-4 h-4 text-[#D8B774]" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E8DFD3] shadow-sm relative min-h-[400px] lg:min-h-full bg-[#EFE9DE]">
            <iframe
              title={`${cafeInfo.name} Location Map`}
              src={cafeInfo.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[15%] contrast-[105%]"
            />

            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#E8DFD3] shadow-xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold text-[#1C241E]">
                Open Today ({cafeInfo.timings.hours})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
