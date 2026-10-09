import React from "react";
import { useOrder } from "../context/OrderContext";
import { VegBadge } from "./VegBadge";
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag, ArrowRight } from "lucide-react";

export const QuickOrderDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearOrder,
    totalCount,
    totalAmount,
    generateWhatsAppUrl,
  } = useOrder();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E8DFD3] flex items-center justify-between bg-white/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#EFE9DE] flex items-center justify-center text-[#26332A]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1C241E]">
                  Your Order Bag
                </h3>
                <p className="text-xs text-[#755546]">
                  {totalCount} {totalCount === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>

            <button
              onClick={closeDrawer}
              className="p-2 text-[#575E5B] hover:text-black rounded-lg transition-colors cursor-pointer"
              aria-label="Close order bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Items Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#EFE9DE] flex items-center justify-center text-[#755546]">
                  <ShoppingBag className="w-6 h-6 stroke-1" />
                </div>
                <h4 className="font-serif text-lg text-[#1C241E]">Your bag is empty</h4>
                <p className="text-xs text-[#767E7A] max-w-xs font-light">
                  Browse our menu and tap &ldquo;+ Add&rdquo; to prepare a direct WhatsApp order.
                </p>
                <button
                  onClick={() => {
                    closeDrawer();
                    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-2 px-5 py-2 rounded-full bg-[#26332A] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD3]">
                  <span className="text-xs font-semibold text-[#767E7A] uppercase tracking-wider">
                    Selected Items
                  </span>
                  <button
                    onClick={clearOrder}
                    className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear all</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-3 border border-[#E8DFD3] flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <VegBadge size="sm" />
                            <h5 className="font-serif font-bold text-sm text-[#1C241E] truncate">
                              {item.name}
                            </h5>
                          </div>
                          <p className="text-xs text-[#767E7A] font-medium">
                            ₹{item.price} each
                          </p>
                        </div>
                      </div>

                      {/* Stepper & total */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E8DFD3] rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-[#575E5B] hover:text-[#1C241E] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center text-[#1C241E]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-[#575E5B] hover:text-[#1C241E] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold font-serif text-[#1C241E] min-w-[40px] text-right">
                          ₹{item.price * quantity}
                        </span>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#9CA3AF] hover:text-red-600 p-1 cursor-pointer"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with WhatsApp Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8DFD3] bg-white space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#767E7A]">
                  <span>Total Items</span>
                  <span>{totalCount}</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-[#1C241E]">
                  <span>Estimated Total</span>
                  <span className="font-serif text-xl">₹{totalAmount}</span>
                </div>
                <p className="text-[11px] text-[#767E7A] font-light">
                  Pay at cafe upon takeaway or cash/UPI upon pickup.
                </p>
              </div>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDrawer}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2.5 shadow-md shadow-emerald-900/10 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send Order to WhatsApp (₹{totalAmount})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <p className="text-[10px] text-center text-[#8C938E]">
                This formats your order and opens WhatsApp chat directly with our cafe counter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
