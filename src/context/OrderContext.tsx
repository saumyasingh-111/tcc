import React, { createContext, useContext, useState, useEffect } from "react";
import type { MenuItem } from "../data/menuData";
import { useData } from "./DataContext";

export interface OrderItem {
  item: MenuItem;
  quantity: number;
}

interface OrderContextType {
  items: OrderItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearOrder: () => void;
  totalCount: number;
  totalAmount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  generateWhatsAppUrl: () => string;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cafeInfo } = useData();

  const [items, setItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem("classic_crush_order");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("classic_crush_order", JSON.stringify(items));
    } catch {
      // storage quota or private mode
    }
  }, [items]);

  const addItem = (item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.item.id === itemId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const clearOrder = () => setItems([]);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.item.price * i.quantity, 0);

  const generateWhatsAppUrl = () => {
    const cafeName = cafeInfo.name || "The Classic Crush";
    const waNumber = cafeInfo.whatsappNumber || "919876543210";

    if (items.length === 0) {
      const msg = `Hi ${cafeName}! 👋 I am visiting your website and would like to order or check today's specials.`;
      return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    }

    const lines: string[] = [
      `Hi ${cafeName}! 👋`,
      `I would like to place an order from your website:`,
      "",
    ];

    items.forEach((i) => {
      lines.push(`• ${i.quantity}x ${i.item.name} — ₹${i.item.price * i.quantity}`);
    });

    lines.push("");
    lines.push(`Estimated Total: ₹${totalAmount}`);
    lines.push("");
    lines.push("Order Details:");
    lines.push("Name: ");
    lines.push("Type (Dine-in / Takeaway / Delivery): ");
    lines.push("Note / instructions (if any): ");

    const text = lines.join("\n");
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearOrder,
        totalCount,
        totalAmount,
        isDrawerOpen,
        setIsDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        generateWhatsAppUrl,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
