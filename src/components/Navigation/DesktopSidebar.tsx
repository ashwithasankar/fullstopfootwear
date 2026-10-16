import React from 'react';
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
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { motion } from 'motion/react';
import { businessData } from '../../data/business';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { LanguageSwitch } from '../common/LanguageSwitch';
import { ThemeToggle } from '../common/ThemeToggle';

export const DesktopSidebar: React.FC = () => {
  const {
    sidebarCollapsed,
    toggleSidebar,
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

  const handleNavClick = (section: 'home' | 'collections' | 'visit-shop') => {
    setActiveSection(section);
    if (section === 'collections') {
      setActiveBrand(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      id: 'nav-home',
      label: t.nav.home,
      icon: Home,
      action: () => handleNavClick('home'),
      active: activeSection === 'home',
      badge: null,
    },
    {
      id: 'nav-collections',
      label: t.nav.collections,
      icon: Compass,
      action: () => handleNavClick('collections'),
      active: activeSection === 'collections',
      badge: null,
    },
    {
      id: 'nav-search',
      label: t.nav.search,
      icon: Search,
      action: () => setIsSearchOpen(true),
      active: false,
      badge: null,
    },
    {
      id: 'nav-wishlist',
      label: t.nav.wishlist,
      icon: Heart,
      action: () => setIsWishlistOpen(true),
      active: false,
      badge: wishlistIds.length > 0 ? wishlistIds.length : null,
    },
    {
      id: 'nav-cart',
      label: t.nav.cart,
      icon: ShoppingBag,
      action: () => setIsCartOpen(true),
      active: false,
      badge: cartTotalCount > 0 ? cartTotalCount : null,
    },
    {
      id: 'nav-orders',
      label: t.nav.orders,
      icon: Package,
      action: () => setIsOrderModalOpen(true),
      active: false,
      badge: null,
    },
    {
      id: 'nav-visit-shop',
      label: t.nav.visitShop,
      icon: MapPin,
      action: () => handleNavClick('visit-shop'),
      active: activeSection === 'visit-shop',
      badge: null,
    },
  ];

  return (
    <motion.aside
      id="desktop-sidebar"
      animate={{ width: sidebarCollapsed ? 76 : 264 }}
      transition={{ duration: 0.22, ease: 'easeInOut' }}
      className="hidden md:flex fixed top-0 left-0 bottom-0 z-40 flex-col justify-between border-r border-[var(--border-subtle)] bg-[var(--surface)] select-none overflow-x-hidden overflow-y-auto"
      aria-label="Desktop Navigation"
    >
      {/* Top Section: Logo & Primary Nav */}
      <div className="flex flex-col">
        {/* Header / Logo */}
        <div className={`flex items-center border-b border-[var(--border-subtle)] py-6 ${sidebarCollapsed ? 'justify-center px-2' : 'px-6'}`}>
          <BrandLogo
            collapsed={sidebarCollapsed}
            onClick={() => handleNavClick('home')}
          />
        </div>

        {/* Primary Menu Items */}
        <nav className="flex flex-col py-4 px-3 space-y-1" aria-label="Main menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="relative group">
                <button
                  id={item.id}
                  onClick={item.action}
                  className={`flex items-center w-full px-3 py-3 text-xs tracking-wider transition-colors duration-200 focus-ring ${
                    item.active
                      ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border-l-2 border-[var(--accent)] font-semibold'
                      : 'text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--accent)]'
                  } ${sidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
                  aria-label={item.label}
                  aria-current={item.active ? 'page' : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                    {!sidebarCollapsed && (
                      <span className="font-ui uppercase tracking-widest text-[11px]">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {/* Badge */}
                  {item.badge !== null && (
                    <span
                      className={`flex h-4 min-w-4 items-center justify-center px-1 text-[10px] font-bold tracking-tight rounded-full ${
                        item.active
                          ? 'bg-[var(--accent)] text-[#111111]'
                          : 'bg-[var(--accent)] text-[#111111]'
                      } ${sidebarCollapsed ? 'absolute -top-1 -right-1 ring-2 ring-[var(--surface)]' : ''}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>

                {/* Tooltip in collapsed mode */}
                {sidebarCollapsed && (
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:flex items-center z-50">
                    <div className="bg-[#111111] text-[#F5F1E8] border border-[var(--accent)] px-2.5 py-1 text-[10px] uppercase tracking-widest whitespace-nowrap shadow-md">
                      {item.label}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Socials, Toggles & Collapse Button */}
      <div className="flex flex-col border-t border-[var(--border-subtle)] pt-3 pb-4 px-3 space-y-2">
        {/* External Social Actions: WhatsApp & Instagram */}
        <div className="flex flex-col space-y-1">
          <a
            id="sidebar-whatsapp-link"
            href={`https://wa.me/${businessData.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center px-3 py-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-colors focus-ring ${
              sidebarCollapsed ? 'justify-center px-0' : 'justify-between'
            }`}
            aria-label="Direct WhatsApp Concierge"
            title={t.nav.whatsapp}
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366] group-hover:scale-110 transition-transform" />
              {!sidebarCollapsed && (
                <span className="font-ui text-[11px] uppercase tracking-widest">
                  {t.nav.whatsapp}
                </span>
              )}
            </div>
            {!sidebarCollapsed && (
              <span className="text-[9px] text-[var(--text-muted)] font-mono">LIVE</span>
            )}
          </a>

          {businessData.instagram !== '#' && (
          <a
            id="sidebar-instagram-link"
            href={businessData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center px-3 py-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-colors focus-ring ${
              sidebarCollapsed ? 'justify-center px-0' : 'justify-between'
            }`}
            aria-label="Instagram Atelier Profile"
            title={t.nav.instagram}
          >
            <div className="flex items-center gap-3">
              <Instagram className="h-4 w-4 shrink-0 text-[var(--accent)] group-hover:scale-110 transition-transform" />
              {!sidebarCollapsed && (
                <span className="font-ui text-[11px] uppercase tracking-widest">
                  {t.nav.instagram}
                </span>
              )}
            </div>
            {!sidebarCollapsed && (
              <span className="text-[9px] text-[var(--text-muted)] font-mono">{businessData.instagramHandle}</span>
            )}
          </a>
          )}
        </div>

        <div className="border-t border-[var(--border-subtle)] my-1" />

        {/* Language switch */}
        <LanguageSwitch collapsed={sidebarCollapsed} />

        {/* Theme switch */}
        <ThemeToggle collapsed={sidebarCollapsed} />

        {/* Collapse toggle button */}
        <button
          id="sidebar-collapse-toggle-btn"
          onClick={toggleSidebar}
          className={`group flex items-center w-full px-3 py-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-colors focus-ring border border-transparent ${
            sidebarCollapsed ? 'justify-center px-0' : 'justify-between'
          }`}
          aria-label={sidebarCollapsed ? t.nav.expand : t.nav.collapse}
          title={sidebarCollapsed ? t.nav.expand : t.nav.collapse}
        >
          <div className="flex items-center gap-3">
            {sidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4 text-[var(--accent)] shrink-0" />
            ) : (
              <PanelLeftClose className="h-4 w-4 text-[var(--accent)] shrink-0" />
            )}
            {!sidebarCollapsed && (
              <span className="font-ui text-[11px] uppercase tracking-widest">
                {t.nav.collapse}
              </span>
            )}
          </div>
        </button>
      </div>
    </motion.aside>
  );
};
