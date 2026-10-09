import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DataProvider, useData } from "./context/DataContext";
import { AuthProvider, ProtectedAdminRoute } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { OrderProvider } from "./context/OrderContext";
import { ScrollToTop } from "./components/ScrollToTop";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { QuickOrderDrawer } from "./components/QuickOrderDrawer";
import { MobileStickyBar } from "./components/MobileStickyBar";

// Customer Multi-Page Routes
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { OurStoryPage } from "./pages/OurStoryPage";
import { GalleryPage } from "./pages/GalleryPage";
import { VisitUsPage } from "./pages/VisitUsPage";

// Admin Portal Pages
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminMenuPage } from "./pages/admin/AdminMenuPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { AdminFeaturedPage } from "./pages/admin/AdminFeaturedPage";
import { AdminGalleryPage } from "./pages/admin/AdminGalleryPage";
import { AdminHomepagePage } from "./pages/admin/AdminHomepagePage";
import { AdminCafeInfoPage } from "./pages/admin/AdminCafeInfoPage";
import { AdminReservationsPage } from "./pages/admin/AdminReservationsPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";

/**
 * Customer Layout Wrapper
 * Keeps customer navigation, cart, footer, and mobile bars isolated from Admin.
 */
const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useData();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#262A28] flex flex-col font-sans selection:bg-[#E5DBCA] selection:text-[#1C241E]">
      {settings.isMaintenanceMode && (
        <div className="bg-[#755546] text-[#FAF7F2] text-xs text-center py-2 px-4 font-medium tracking-wide">
          Notice: The cafe menu is currently in maintenance mode. Please call or WhatsApp us for instant assistance.
        </div>
      )}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <QuickOrderDrawer />
      <MobileStickyBar />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <ToastProvider>
            <OrderProvider>
              {/* Reset scroll on route changes */}
              <ScrollToTop />

              <Routes>
                {/* ----------------- Customer Website Routes ----------------- */}
                <Route
                  path="/"
                  element={
                    <CustomerLayout>
                      <HomePage />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/menu"
                  element={
                    <CustomerLayout>
                      <MenuPage />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/our-story"
                  element={
                    <CustomerLayout>
                      <OurStoryPage />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/gallery"
                  element={
                    <CustomerLayout>
                      <GalleryPage />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/visit-us"
                  element={
                    <CustomerLayout>
                      <VisitUsPage />
                    </CustomerLayout>
                  }
                />

                {/* ----------------- Admin Portal Routes ----------------- */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />

                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboardPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/menu"
                  element={
                    <ProtectedAdminRoute>
                      <AdminMenuPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedAdminRoute>
                      <AdminOrdersPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/featured"
                  element={
                    <ProtectedAdminRoute>
                      <AdminFeaturedPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/gallery"
                  element={
                    <ProtectedAdminRoute>
                      <AdminGalleryPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/homepage"
                  element={
                    <ProtectedAdminRoute>
                      <AdminHomepagePage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/cafe-info"
                  element={
                    <ProtectedAdminRoute>
                      <AdminCafeInfoPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/reservations"
                  element={
                    <ProtectedAdminRoute>
                      <AdminReservationsPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedAdminRoute>
                      <AdminSettingsPage />
                    </ProtectedAdminRoute>
                  }
                />

                {/* Fallback for invalid admin sub-routes */}
                <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />

                {/* General Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </OrderProvider>
          </ToastProvider>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
