import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { ShoppingBag, UtensilsCrossed, Gift } from "lucide-react";

export const MobileStickyBar: React.FC = () => {
  const { totalCount, totalAmount, openDrawer } = useOrder();
  const location = useLocation();

  const isMenuPage = location.pathname === "/menu";
  const isGiftingPage = location.pathname.startsWith("/gifting");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-[#F8F5ED]/95 backdrop-blur-md border-t border-[#E8DFD3] px-3 py-2 shadow-lg shadow-black/10">
      <div className="flex items-center gap-2 justify-between">
        {/* Quick Menu Link */}
        <Link
          to="/menu"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            isMenuPage
              ? "text-[#064F50] font-bold"
              : "text-[#594235] hover:text-[#064F50]"
          }`}
          aria-label="View menu page"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span className="text-[10px] uppercase font-semibold tracking-wider mt-0.5">
            Menu
          </span>
        </Link>

        {/* Quick Gifting Link */}
        <Link
          to="/gifting"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            isGiftingPage
              ? "text-[#078F96] font-bold"
              : "text-[#594235] hover:text-[#064F50]"
          }`}
          aria-label="View gifting page"
        >
          <Gift className="w-4 h-4" />
          <span className="text-[10px] uppercase font-semibold tracking-wider mt-0.5">
            Gifts
          </span>
        </Link>

        {/* Bag Button if items present */}
        {totalCount > 0 ? (
          <button
            onClick={openDrawer}
            className="flex-1 py-2.5 px-4 bg-[#064F50] text-[#F8F5ED] rounded-xl flex items-center justify-between text-xs font-semibold shadow-xs cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#E8C45A]" />
              <span>{totalCount} {totalCount === 1 ? "Item" : "Items"}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <span>₹{totalAmount}</span>
              <span className="text-[10px] text-[#E8C45A] uppercase">View Bag →</span>
            </div>
          </button>
        ) : (
          <button
            onClick={openDrawer}
            className="flex-1 py-2.5 px-4 bg-[#078F96] hover:bg-[#067B82] text-white rounded-xl flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider shadow-xs cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>Order Online</span>
          </button>
        )}
      </div>
    </div>
  );
};
