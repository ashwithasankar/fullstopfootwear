import React from 'react';
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';

export const MobileHeader: React.FC = () => {
  const {
    setMobileNavOpen,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsCartOpen,
    wishlistIds,
    cartTotalCount,
    setActiveSection,
    t,
  } = useApp();

  return (
    <header
      id="mobile-header"
      className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-3"
      aria-label="Mobile Navigation Bar"
    >
      {/* Left: Hamburger button */}
      <button
        id="mobile-menu-btn"
        onClick={() => setMobileNavOpen(true)}
        className="flex h-10 w-10 items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] focus-ring"
        aria-label={t.nav.openMenu}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Center: Brand Logo */}
      <BrandLogo onClick={() => setActiveSection('home')} />

      {/* Right: Search, Wishlist & Cart buttons */}
      <div className="flex items-center gap-1">
        <button
          id="mobile-search-btn"
          onClick={() => setIsSearchOpen(true)}
          className="flex h-10 w-10 items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] focus-ring"
          aria-label={t.nav.search}
        >
          <Search className="h-4 w-4" />
        </button>

        <button
          id="mobile-wishlist-btn"
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex h-10 w-10 items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] focus-ring"
          aria-label={t.nav.wishlist}
        >
          <Heart className="h-4 w-4" />
          {wishlistIds.length > 0 && (
            <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-[#111111]">
              {wishlistIds.length}
            </span>
          )}
        </button>

        <button
          id="mobile-cart-btn"
          onClick={() => setIsCartOpen(true)}
          className="relative flex h-10 w-10 items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] focus-ring"
          aria-label={t.nav.cart}
        >
          <ShoppingBag className="h-4 w-4" />
          {cartTotalCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-[#111111]">
              {cartTotalCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
