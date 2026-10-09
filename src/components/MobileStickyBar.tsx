import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { getWhatsAppLink } from "../data/cafeConfig";
import { MessageCircle, ShoppingBag, UtensilsCrossed } from "lucide-react";

export const MobileStickyBar: React.FC = () => {
  const { totalCount, totalAmount, openDrawer } = useOrder();
  const location = useLocation();

  const isMenuPage = location.pathname === "/menu";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E8DFD3] px-4 py-2.5 shadow-lg shadow-black/10">
      <div className="flex items-center gap-2.5 justify-between">
        {/* Quick Menu Link */}
        <Link
          to="/menu"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors cursor-pointer ${
            isMenuPage
              ? "text-[#1C241E] font-bold"
              : "text-[#575E5B] hover:text-[#1C241E]"
          }`}
          aria-label="View menu page"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span className="text-[10px] uppercase font-semibold tracking-wider mt-0.5">
            Menu
          </span>
        </Link>

        {/* Bag Button if items present */}
        {totalCount > 0 ? (
          <button
            onClick={openDrawer}
            className="flex-1 py-2.5 px-4 bg-[#26332A] text-white rounded-xl flex items-center justify-between text-xs font-semibold shadow-xs cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#D8B774]" />
              <span>{totalCount} {totalCount === 1 ? "Item" : "Items"}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <span>₹{totalAmount}</span>
              <span className="text-[10px] text-[#D8B774] uppercase">View Bag →</span>
            </div>
          </button>
        ) : (
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 bg-[#25D366] text-white rounded-xl flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Order on WhatsApp</span>
          </a>
        )}
      </div>
    </div>
  );
};
