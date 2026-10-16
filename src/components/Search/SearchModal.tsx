import React, { useEffect, useMemo, useRef } from 'react';
import { ArrowRight, Search, Tag, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { productsData } from '../../data/products';
import { useApp } from '../../context/AppContext';
import { logger } from '../../utils/logger';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    setSelectedProduct,
    t,
  } = useApp();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Filter products by search query
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    logger.info('Search performed', { query: q });
    return productsData.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: any) => {
    setIsSearchOpen(false);
    setSelectedProduct(product);
  };

  const handlePopularSearchClick = (keyword: string) => {
    setSearchQuery(keyword);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={t.search.title}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-[#111111]"
          aria-hidden="true"
        />

        {/* Search Dialog */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative z-50 w-full max-w-3xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)] shadow-2xl mt-4 sm:mt-12"
        >
          {/* Input Header */}
          <div className="flex items-center border-b border-[var(--border-subtle)] px-6 py-4">
            <Search className="h-5 w-5 text-[var(--accent)] shrink-0 mr-4" />
            <input
              ref={inputRef}
              id="main-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="w-full bg-transparent text-base sm:text-lg font-ui text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
              aria-label="Search footwear by silhouette, brand, or style"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] px-2 mr-2 focus-ring"
              >
                {t.search.clear}
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="flex h-8 w-8 items-center justify-center border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors focus-ring"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
            {/* Popular Searches when no query is typed */}
            {!searchQuery.trim() && (
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
                  <Tag className="h-3.5 w-3.5" />
                  <span>{t.search.popularSearches}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {t.search.popularItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => handlePopularSearchClick(item)}
                      className="border border-[var(--border-subtle)] bg-[var(--surface-hover)] px-3 py-1.5 text-xs text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors focus-ring"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results Count */}
            {searchQuery.trim() && (
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border-subtle)] pb-2">
                <span>{t.search.resultsCount.replace('{count}', String(searchResults.length))}</span>
              </div>
            )}

            {/* Results List */}
            {searchResults.length > 0 && (
              <div className="space-y-3">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="group flex items-center justify-between border border-[var(--border-subtle)] bg-[var(--surface-hover)] p-3 hover:border-[var(--accent)] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-16 w-14 object-cover border border-[var(--border-subtle)] shrink-0"
                      />
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                          {product.brand} • {product.category}
                        </span>
                        <h4 className="font-editorial text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                          {product.name}
                        </h4>
                        <span className="font-ui text-xs font-semibold text-[var(--text-primary)]">
                          ₹{product.price}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity mr-2" />
                  </div>
                ))}
              </div>
            )}

            {/* No Results Empty State */}
            {searchQuery.trim() && searchResults.length === 0 && (
              <div className="text-center py-10 space-y-2">
                <p className="font-editorial text-xl text-[var(--text-primary)]">
                  {t.search.noResults.replace('{query}', searchQuery)}
                </p>
                <p className="text-xs text-[var(--text-muted)] font-ui">
                  {t.search.tryDifferent}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
