import React from "react";
import { useData } from "../context/DataContext";
import { VegBadge } from "../components/VegBadge";
import { MapPin, Clock, Phone, Navigation, MessageCircle, ExternalLink } from "lucide-react";

export const VisitUsPage: React.FC = () => {
  const { cafeInfo } = useData();

  const callLink = `tel:${cafeInfo.phone}`;
  const whatsappLink = `https://wa.me/${cafeInfo.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${cafeInfo.name}! 👋 I am visiting your cafe website and would like to ask a question.`
  )}`;

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#F8F5ED] min-h-screen">
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064F50]/10 text-[#064F50] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          <VegBadge size="sm" />
          <span>NEIGHBOURHOOD VEGETARIAN CAFÉ</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-normal text-[#064F50] tracking-tight mb-3">
          VISIT US
        </h1>
        <div className="w-12 h-0.5 bg-[#E8C45A] mx-auto mb-4" />
        <p className="font-serif italic text-lg sm:text-2xl text-[#594235] max-w-lg mx-auto leading-relaxed">
          &ldquo;Step into a warm seat, order your favourite bite, and stay awhile.&rdquo;
        </p>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Cafe Details & Quick Contact */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Address Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#078F96]/10 flex items-center justify-center shrink-0 text-[#078F96]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-display text-lg font-bold text-[#064F50]">
                    Our Address
                  </h2>
                  <p className="text-sm text-[#594235] leading-relaxed font-light">
                    {cafeInfo.address.street}
                  </p>
                  <p className="text-sm text-[#594235] font-light">
                    {cafeInfo.address.area}
                  </p>
                  <p className="text-sm font-semibold text-[#078F96]">
                    {cafeInfo.address.city}
                  </p>
                  {cafeInfo.address.landmark && (
                    <p className="text-xs text-[#594235]/70 italic pt-1">
                      Landmark: {cafeInfo.address.landmark}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Opening Hours Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#078F96]/10 flex items-center justify-center shrink-0 text-[#078F96]">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-display text-lg font-bold text-[#064F50]">
                    Opening Hours
                  </h2>
                  <p className="text-sm font-semibold text-[#064F50]">
                    {cafeInfo.timings.days}
                  </p>
                  <p className="text-sm text-[#594235] font-light">
                    {cafeInfo.timings.hours}
                  </p>
                  {cafeInfo.timings.kitchenCloses && (
                    <p className="text-xs text-[#078F96] italic pt-1">
                      {cafeInfo.timings.kitchenCloses}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact & Phone */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#078F96]/10 flex items-center justify-center shrink-0 text-[#078F96]">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-display text-lg font-bold text-[#064F50]">
                    Contact &amp; Enquiries
                  </h2>
                  <p className="text-xs text-[#594235]/80 font-light">
                    For takeout parcel status or group table seating:
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href={callLink}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F8F5ED] hover:bg-[#EFE9DE] border border-[#E8DFD3] text-[#064F50] rounded-xl text-xs font-semibold tracking-wider transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{cafeInfo.phoneDisplay}</span>
                    </a>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-semibold tracking-wider transition-colors shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions Action */}
            <a
              href={cafeInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#064F50] hover:bg-[#043839] text-[#F8F5ED] text-xs font-semibold uppercase tracking-[0.2em] rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <Navigation className="w-4 h-4 text-[#E8C45A] transition-transform group-hover:scale-110" />
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>

          {/* Right Column: Google Maps Interactive Embed + Photo */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Interactive Map Embed */}
            <div className="bg-white rounded-3xl p-3 border border-[#E8DFD3] shadow-md flex-1 min-h-[380px]">
              <div className="w-full h-full min-h-[360px] rounded-2xl overflow-hidden relative">
                <iframe
                  title="The Classic Crush Cafe Location Map"
                  src={cafeInfo.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[360px] grayscale-[0.15] contrast-[1.05]"
                />
              </div>
            </div>

            {/* Cozy Cafe Ambience Card */}
            <div className="relative rounded-2xl overflow-hidden h-48 border border-[#E8DFD3] shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
                alt="The Classic Crush warm cafe ambiance"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5 text-white">
                <div>
                  <p className="font-display text-base font-bold text-white">
                    Drop by for a warm cup &amp; fresh treats
                  </p>
                  <p className="text-xs text-[#E8C45A] font-light">
                    Walk-ins always welcome • Free high-speed student Wi-Fi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
