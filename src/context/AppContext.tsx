import React, { createContext, useContext, useEffect, useState } from 'react';
import { brandsData } from '../data/brands';
import { productsData } from '../data/products';
import { en } from '../translations/en';
import { ta } from '../translations/ta';
import { CartItem, ColorOption, Language, Product, ThemeMode } from '../types';
import { logger } from '../utils/logger';

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof en;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  
  // Navigation & filters
  activeSection: 'home' | 'collections' | 'visit-shop';
  setActiveSection: (sec: 'home' | 'collections' | 'visit-shop') => void;
  activeBrand: string | null;
  setActiveBrand: (brandName: string | null) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  
  // Modals & Drawers
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color: ColorOption, size: number, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('noir_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('noir_lang');
    return saved === 'ta' ? 'ta' : 'en';
  });

  // Sidebar collapsed state
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('noir_sidebar_collapsed');
    return saved === 'true';
  });

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'collections' | 'visit-shop'>('home');
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Drawers
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('noir_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('noir_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Synchronize theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('noir_theme', theme);
    logger.info('Theme changed', { theme });
  }, [theme]);

  // Synchronize language to document
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('noir_lang', language);
    logger.info('Language changed', { language });
  }, [language]);

  // Synchronize sidebar state
  useEffect(() => {
    localStorage.setItem('noir_sidebar_collapsed', String(sidebarCollapsed));
    logger.info('Sidebar toggled', { collapsed: sidebarCollapsed });
  }, [sidebarCollapsed]);

  // Save wishlist
  useEffect(() => {
    localStorage.setItem('noir_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Save cart
  useEffect(() => {
    localStorage.setItem('noir_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const t = language === 'ta' ? ta : en;

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      logger.info('Wishlist updated', { productId, added: !exists, total: next.length });
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const clearWishlist = () => {
    setWishlistIds([]);
    logger.info('Wishlist cleared');
  };

  // Cart actions
  const addToCart = (product: Product, color: ColorOption, size: number, quantity: number = 1) => {
    const itemKey = `${product.id}-${color.hex}-${size}`;
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
        },
      ];
    });
    logger.info('Cart updated (item added)', { product: product.name, color: color.name, size, quantity });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    logger.info('Cart item removed', { cartItemId });
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
    logger.info('Cart cleared');
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        sidebarCollapsed,
        toggleSidebar,
        mobileNavOpen,
        setMobileNavOpen,
        activeSection,
        setActiveSection,
        activeBrand,
        setActiveBrand,
        activeCategory,
        setActiveCategory,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCartOpen,
        setIsCartOpen,
        isOrderModalOpen,
        setIsOrderModalOpen,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
