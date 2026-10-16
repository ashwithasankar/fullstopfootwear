import React from 'react';
import { motion } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { DesktopSidebar } from './components/Navigation/DesktopSidebar';
import { MobileHeader } from './components/Navigation/MobileHeader';
import { MobileDrawer } from './components/Navigation/MobileDrawer';
import { HeroSection } from './components/Hero/HeroSection';
import { BrandsSection } from './components/Brands/BrandsSection';
import { ProductGrid } from './components/Products/ProductGrid';
import { ProductDetailModal } from './components/Products/ProductDetailModal';
import { SearchModal } from './components/Search/SearchModal';
import { WishlistDrawer } from './components/Wishlist/WishlistDrawer';
import { CartDrawer } from './components/Cart/CartDrawer';
import { OrderInquiryModal } from './components/Orders/OrderInquiryModal';
import { VisitShopSection } from './components/VisitShop/VisitShopSection';
import { Footer } from './components/common/Footer';

const AppContent: React.FC = () => {
  const { sidebarCollapsed } = useApp();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col font-ui selection:bg-[var(--accent)] selection:text-[#111111]">
      {/* Desktop Left-Side Collapsible Navigation */}
      <DesktopSidebar />

      {/* Mobile Top Navigation Header */}
      <MobileHeader />

      {/* Mobile Slide-over Drawer */}
      <MobileDrawer />

      {/* Main Content Area: dynamically offset by sidebar width on desktop */}
      <motion.div
        animate={{
          marginLeft: typeof window !== 'undefined' && window.innerWidth >= 768 ? (sidebarCollapsed ? 76 : 264) : 0,
        }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className="flex-1 flex flex-col min-w-0 transition-[margin] duration-200"
      >
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {/* Hero Section */}
          <HeroSection />

          {/* Brands & Ateliers Exploration */}
          <BrandsSection />

          {/* Footwear Catalog & Filtering */}
          <ProductGrid />

          {/* Visit Atelier Store Section */}
          <VisitShopSection />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>

      {/* Overlays, Modals & Drawers */}
      <ProductDetailModal />
      <SearchModal />
      <WishlistDrawer />
      <CartDrawer />
      <OrderInquiryModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
