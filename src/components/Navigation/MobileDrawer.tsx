import React, { useEffect } from 'react';
import {
  Compass,
  Heart,
  Home,
  Instagram,
  MapPin,
  MessageCircle,
  Package,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { businessData } from '../../data/business';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { LanguageSwitch } from '../common/LanguageSwitch';
import { ThemeToggle } from '../common/ThemeToggle';

export const MobileDrawer: React.FC = () => {
  const {
    mobileNavOpen,
    setMobileNavOpen,
    activeSection,
    setActiveSection,
    setActiveBrand,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsCartOpen,
    setIsOrderModalOpen,
    wishlistIds,
    cartTotalCount,
    t,
  } = useApp();

  // Escape key listener to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileNavOpen, setMobileNavOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  const handleNavClick = (section: 'home' | 'collections' | 'visit-shop') => {
    setActiveSection(section);
    if (section === 'collections') {
      setActiveBrand(null);
    }
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      id: 'm-nav-home',
      label: t.nav.home,
      icon: Home,
      action: () => handleNavClick('home'),
      active: activeSection === 'home',
      badge: null,
    },
    {
      id: 'm-nav-collections',
      label: t.nav.collections,
      icon: Compass,
      action: () => handleNavClick('collections'),
      active: activeSection === 'collections',
      badge: null,
    },
    {
      id: 'm-nav-search',
      label: t.nav.search,
      icon: Search,
      action: () => {
        setMobileNavOpen(false);
        setIsSearchOpen(true);
      },
      active: false,
      badge: null,
    },
    {
      id: 'm-nav-wishlist',
      label: t.nav.wishlist,
      icon: Heart,
      action: () => {
        setMobileNavOpen(false);
        setIsWishlistOpen(true);
      },
      active: false,
      badge: wishlistIds.length > 0 ? wishlistIds.length : null,
    },
    {
      id: 'm-nav-cart',
      label: t.nav.cart,
      icon: ShoppingBag,
      action: () => {
        setMobileNavOpen(false);
        setIsCartOpen(true);
      },
      active: false,
      badge: cartTotalCount > 0 ? cartTotalCount : null,
    },
    {
      id: 'm-nav-orders',
      label: t.nav.orders,
      icon: Package,
      action: () => {
        setMobileNavOpen(false);
        setIsOrderModalOpen(true);
      },
      active: false,
      badge: null,
    },
    {
      id: 'm-nav-visit-shop',
      label: t.nav.visitShop,
      icon: MapPin,
      action: () => handleNavClick('visit-shop'),
      active: activeSection === 'visit-shop',
      badge: null,
    },
  ];

  return (
    <AnimatePresence>
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 bg-[#111111]"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-50 flex h-full w-[85%] max-w-[340px] flex-col justify-between border-r border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-2xl overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
                <BrandLogo onClick={() => handleNavClick('home')} />
                <button
                  id="mobile-drawer-close-btn"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex h-9 w-9 items-center justify-center border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] focus-ring"
                  aria-label={t.nav.closeMenu}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-col py-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      id={item.id}
                      onClick={item.action}
                      className={`flex items-center justify-between w-full px-4 py-3.5 text-xs uppercase tracking-widest transition-colors focus-ring ${
                        item.active
                          ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border-l-2 border-[var(--accent)] font-semibold'
                          : 'text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="h-4 w-4 text-[var(--accent)]" />
                        <span>{item.label}</span>
                      </div>

                      {item.badge !== null && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-[10px] font-bold text-[#111111]">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col border-t border-[var(--border-subtle)] pt-6 space-y-4">
              {/* WhatsApp and Instagram links */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  id="m-drawer-whatsapp-btn"
                  href={`https://wa.me/${businessData.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-[var(--border-subtle)] py-2.5 px-2 text-[11px] uppercase tracking-wider text-[var(--text-primary)] hover:border-[#25D366] hover:text-[#25D366] transition-colors focus-ring"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
                <a
                  id="m-drawer-instagram-btn"
                  href={businessData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-[var(--border-subtle)] py-2.5 px-2 text-[11px] uppercase tracking-wider text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors focus-ring"
                >
                  <Instagram className="h-4 w-4 text-[var(--accent)]" />
                  <span>Instagram</span>
                </a>
              </div>

              {/* Toggles */}
              <div className="flex flex-col space-y-2">
                <LanguageSwitch />
                <ThemeToggle />
              </div>

              <div className="text-center pt-2">
                <p className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase font-ui">
                  {businessData.address}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
