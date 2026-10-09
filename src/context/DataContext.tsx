import React, { createContext, useContext, useState, useEffect } from "react";
import { MENU_ITEMS, MENU_CATEGORIES, type MenuItem, type MenuCategory } from "../data/menuData";
import { CAFE_CONFIG, type CafeConfig } from "../data/cafeConfig";
import { IMAGES } from "../data/images";

export type OrderStatus = "Pending" | "Confirmed" | "Preparing" | "Ready" | "Completed" | "Cancelled";
export type ReservationStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface OrderRecord {
  id: string; // e.g. "1042"
  customerName: string;
  customerPhone: string;
  items: { id: string; name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  orderType: "Dine-in" | "Takeaway" | "Delivery";
  note?: string;
}

export interface ReservationRecord {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  status: ReservationStatus;
  note?: string;
}

export interface GalleryRecord {
  id: string;
  url: string;
  caption: string;
  category: string;
  aspect: "landscape" | "portrait";
  isVisible: boolean;
}

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  storyHeading: string;
  storyDescription: string;
  storyImage: string;
}

export interface AdminSettings {
  email: string;
  passwordHash: string; // Plain / base64 for local admin demo
  isMaintenanceMode: boolean;
}

interface DataContextType {
  // Menu
  menuItems: MenuItem[];
  categories: MenuCategory[];
  addMenuItem: (item: Omit<MenuItem, "id"> & { id?: string }) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  duplicateMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;

  // Categories
  addCategory: (category: MenuCategory) => void;
  updateCategory: (category: MenuCategory) => void;
  deleteCategory: (id: string) => { success: boolean; message?: string };
  reorderCategories: (categories: MenuCategory[]) => void;

  // Featured
  featuredItemIds: string[];
  updateFeaturedItemIds: (ids: string[]) => void;
  toggleFeaturedItem: (id: string) => void;

  // Gallery
  galleryItems: GalleryRecord[];
  addGalleryItem: (item: Omit<GalleryRecord, "id">) => void;
  updateGalleryItem: (item: GalleryRecord) => void;
  deleteGalleryItem: (id: string) => void;
  toggleGalleryVisibility: (id: string) => void;

  // Homepage
  homepageContent: HomepageContent;
  updateHomepageContent: (content: Partial<HomepageContent>) => void;

  // Cafe Info
  cafeInfo: CafeConfig;
  updateCafeInfo: (info: Partial<CafeConfig>) => void;

  // Orders
  orders: OrderRecord[];
  addOrder: (order: Omit<OrderRecord, "id" | "createdAt">) => OrderRecord;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Reservations
  reservations: ReservationRecord[];
  addReservation: (reservation: Omit<ReservationRecord, "id">) => void;
  updateReservationStatus: (id: string, status: ReservationStatus) => void;
  deleteReservation: (id: string) => void;

  // Settings
  settings: AdminSettings;
  updateSettings: (settings: Partial<AdminSettings>) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = "classic_crush_store_v2";

const initialGallery: GalleryRecord[] = IMAGES.gallery.map((g, idx) => ({
  id: `gal-${idx + 1}`,
  url: g.url,
  caption: g.caption,
  category: g.category,
  aspect: (g.aspect === "landscape" ? "landscape" : "portrait") as "landscape" | "portrait",
  isVisible: true,
}));

const initialOrders: OrderRecord[] = [
  {
    id: "1042",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    items: [
      { id: "cheese-sandwich", name: "Cheese Sandwich", quantity: 2, price: 59 },
      { id: "cold-coffee", name: "Cold Coffee", quantity: 1, price: 49 },
    ],
    totalAmount: 167,
    status: "Preparing",
    createdAt: "2:14 PM",
    orderType: "Dine-in",
    note: "Extra chili flakes on sandwich please",
  },
  {
    id: "1041",
    customerName: "Ananya Roy",
    customerPhone: "+91 98111 22334",
    items: [{ id: "paneer-pizza", name: "Paneer Pizza", quantity: 1, price: 69 }],
    totalAmount: 69,
    status: "Completed",
    createdAt: "1:42 PM",
    orderType: "Takeaway",
  },
  {
    id: "1040",
    customerName: "Vikram Malhotra",
    customerPhone: "+91 99222 33445",
    items: [
      { id: "dark-and-white-delight", name: "Dark & White Delight", quantity: 1, price: 59 },
      { id: "oreo-dark-crunch", name: "Oreo Dark Crunch", quantity: 1, price: 69 },
    ],
    totalAmount: 128,
    status: "Completed",
    createdAt: "1:15 PM",
    orderType: "Dine-in",
  },
  {
    id: "1039",
    customerName: "Priya Singh",
    customerPhone: "+91 97333 44556",
    items: [
      { id: "cheese-momos", name: "Cheese Momos", quantity: 1, price: 69 },
      { id: "masala-patties", name: "Masala Patties", quantity: 2, price: 25 },
    ],
    totalAmount: 119,
    status: "Ready",
    createdAt: "12:50 PM",
    orderType: "Takeaway",
  },
  {
    id: "1038",
    customerName: "Sameer Joshi",
    customerPhone: "+91 98444 55667",
    items: [
      { id: "veg-burger", name: "Veg Burger", quantity: 2, price: 49 },
      { id: "peri-peri-fries", name: "Peri Peri Fries", quantity: 1, price: 49 },
      { id: "mojito", name: "Virgin Mojito", quantity: 1, price: 49 },
    ],
    totalAmount: 196,
    status: "Confirmed",
    createdAt: "12:30 PM",
    orderType: "Dine-in",
  },
  {
    id: "1037",
    customerName: "Neha Kapoor",
    customerPhone: "+91 99555 66778",
    items: [
      { id: "chocolate-pastry", name: "Chocolate Pastry", quantity: 2, price: 49 },
      { id: "hot-coffee", name: "Hot Coffee", quantity: 1, price: 30 },
    ],
    totalAmount: 128,
    status: "Pending",
    createdAt: "12:10 PM",
    orderType: "Delivery",
    note: "Room 304, Girls Hostel",
  },
];

const initialReservations: ReservationRecord[] = [
  {
    id: "R-101",
    name: "Rohit & Friends",
    phone: "+91 98765 11223",
    guests: 4,
    date: "Today",
    time: "7:30 PM",
    status: "Confirmed",
    note: "Window table requested",
  },
  {
    id: "R-102",
    name: "Sneha Patel",
    phone: "+91 98222 44556",
    guests: 6,
    date: "Today",
    time: "8:15 PM",
    status: "Pending",
    note: "Birthday treat celebration",
  },
  {
    id: "R-103",
    name: "Aman Gupta",
    phone: "+91 97111 88990",
    guests: 2,
    date: "Yesterday",
    time: "6:00 PM",
    status: "Completed",
  },
];

const initialHomepage: HomepageContent = {
  heroTitle: "THE CLASSIC CRUSH",
  heroSubtitle: "BAKERY & CAFE",
  heroDescription: "Freshly made. Comfortingly familiar.",
  heroImage: "/hero-indian-cafe.jpg",
  storyHeading: "Made for good food & good company.",
  storyDescription:
    "We created The Classic Crush for anyone looking for genuinely delicious bakery treats and hearty savory bites without pretentious dining prices. From steaming morning chai and flaky patties to midnight chocolate cravings with college friends.",
  storyImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80",
};

const initialSettings: AdminSettings = {
  email: "admin@classiccrush.cafe",
  passwordHash: "admin123",
  isMaintenanceMode: false,
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load or initialize state
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_menu`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return MENU_ITEMS.map((item) => ({ ...item, isAvailable: item.isAvailable !== false }));
  });

  const [categories, setCategories] = useState<MenuCategory[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_categories`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return MENU_CATEGORIES;
  });

  const [featuredItemIds, setFeaturedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_featured`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ["dark-and-white-delight", "paneer-pizza", "cheese-sandwich", "cold-coffee"];
  });

  const [galleryItems, setGalleryItems] = useState<GalleryRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_gallery`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialGallery;
  });

  const [homepageContent, setHomepageContent] = useState<HomepageContent>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_homepage`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialHomepage;
  });

  const [cafeInfo, setCafeInfo] = useState<CafeConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_cafe_info`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return CAFE_CONFIG;
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialOrders;
  });

  const [reservations, setReservations] = useState<ReservationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_reservations`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialReservations;
  });

  const [settings, setSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialSettings;
  });

  // Sync to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_menu`, JSON.stringify(menuItems));
    } catch {}
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_categories`, JSON.stringify(categories));
    } catch {}
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_featured`, JSON.stringify(featuredItemIds));
    } catch {}
  }, [featuredItemIds]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(galleryItems));
    } catch {}
  }, [galleryItems]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_homepage`, JSON.stringify(homepageContent));
    } catch {}
  }, [homepageContent]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_cafe_info`, JSON.stringify(cafeInfo));
    } catch {}
  }, [cafeInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_reservations`, JSON.stringify(reservations));
    } catch {}
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // MENU OPERATIONS
  const addMenuItem = (item: Omit<MenuItem, "id"> & { id?: string }) => {
    const newId = item.id || item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4);
    const fullItem: MenuItem = {
      ...item,
      id: newId,
      isAvailable: item.isAvailable !== false,
      isVegetarian: true, // Always vegetarian
    };
    setMenuItems((prev) => [fullItem, ...prev]);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((i) => i.id !== id));
    // also remove from featured if it was featured
    setFeaturedItemIds((prev) => prev.filter((fid) => fid !== id));
  };

  const duplicateMenuItem = (id: string) => {
    const existing = menuItems.find((i) => i.id === id);
    if (!existing) return;
    const copy: MenuItem = {
      ...existing,
      id: `${existing.id}-copy-${Date.now().toString().slice(-3)}`,
      name: `${existing.name} (Copy)`,
      isBestseller: false,
      isFeatured: false,
    };
    setMenuItems((prev) => [copy, ...prev]);
  };

  const toggleItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isAvailable: !(i.isAvailable !== false) } : i))
    );
  };

  // CATEGORY OPERATIONS
  const addCategory = (category: MenuCategory) => {
    setCategories((prev) => [...prev, category]);
  };

  const updateCategory = (category: MenuCategory) => {
    setCategories((prev) => prev.map((c) => (c.id === category.id ? category : c)));
  };

  const deleteCategory = (id: string): { success: boolean; message?: string } => {
    if (id === "all") {
      return { success: false, message: "Cannot delete the default 'All' category." };
    }
    const hasItems = menuItems.some((item) => item.category === id);
    if (hasItems) {
      return {
        success: false,
        message: `Cannot delete this category because items are currently assigned to it. Please reassign or delete those items first.`,
      };
    }
    setCategories((prev) => prev.filter((c) => c.id !== id));
    return { success: true };
  };

  const reorderCategories = (newOrder: MenuCategory[]) => {
    setCategories(newOrder);
  };

  // FEATURED ITEMS
  const updateFeaturedItemIds = (ids: string[]) => {
    setFeaturedItemIds(ids);
  };

  const toggleFeaturedItem = (id: string) => {
    setFeaturedItemIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 6) {
        return prev; // capped at 6
      }
      return [...prev, id];
    });
  };

  // GALLERY OPERATIONS
  const addGalleryItem = (item: Omit<GalleryRecord, "id">) => {
    const newRecord: GalleryRecord = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    setGalleryItems((prev) => [newRecord, ...prev]);
  };

  const updateGalleryItem = (item: GalleryRecord) => {
    setGalleryItems((prev) => prev.map((g) => (g.id === item.id ? item : g)));
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
  };

  const toggleGalleryVisibility = (id: string) => {
    setGalleryItems((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isVisible: !g.isVisible } : g))
    );
  };

  // HOMEPAGE
  const updateHomepageContent = (content: Partial<HomepageContent>) => {
    setHomepageContent((prev) => ({ ...prev, ...content }));
  };

  // CAFE INFO
  const updateCafeInfo = (info: Partial<CafeConfig>) => {
    setCafeInfo((prev) => ({ ...prev, ...info }));
  };

  // ORDERS
  const addOrder = (order: Omit<OrderRecord, "id" | "createdAt">): OrderRecord => {
    const newId = (1000 + orders.length + 1).toString();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const fullOrder: OrderRecord = {
      ...order,
      id: newId,
      createdAt: timeStr,
    };
    setOrders((prev) => [fullOrder, ...prev]);
    return fullOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // RESERVATIONS
  const addReservation = (reservation: Omit<ReservationRecord, "id">) => {
    const newRecord: ReservationRecord = {
      ...reservation,
      id: `R-${100 + reservations.length + 1}`,
    };
    setReservations((prev) => [newRecord, ...prev]);
  };

  const updateReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const deleteReservation = (id: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  // SETTINGS
  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setMenuItems(MENU_ITEMS.map((item) => ({ ...item, isAvailable: item.isAvailable !== false })));
    setCategories(MENU_CATEGORIES);
    setFeaturedItemIds(["dark-and-white-delight", "paneer-pizza", "cheese-sandwich", "cold-coffee"]);
    setGalleryItems(initialGallery);
    setHomepageContent(initialHomepage);
    setCafeInfo(CAFE_CONFIG);
    setOrders(initialOrders);
    setReservations(initialReservations);
    setSettings(initialSettings);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        menuItems,
        categories,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        duplicateMenuItem,
        toggleItemAvailability,

        addCategory,
        updateCategory,
        deleteCategory,
        reorderCategories,

        featuredItemIds,
        updateFeaturedItemIds,
        toggleFeaturedItem,

        galleryItems,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        toggleGalleryVisibility,

        homepageContent,
        updateHomepageContent,

        cafeInfo,
        updateCafeInfo,

        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,

        reservations,
        addReservation,
        updateReservationStatus,
        deleteReservation,

        settings,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
