import React, { useEffect } from 'react';
import { BookmarkX, Heart, ShoppingBag, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { productsData } from '../../data/products';
import { useApp } from '../../context/AppContext';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlistIds,
    toggleWishlist,
    clearWishlist,
    setSelectedProduct,
    addToCart,
    t,
  } = useApp();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWishlistOpen) {
        setIsWishlistOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWishlistOpen, setIsWishlistOpen]);

  // Lock scroll
  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isWishlistOpen]);

  if (!isWishlistOpen) return null;

  const wishlistProducts = productsData.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToCart = (product: any) => {
    addToCart(product, product.colors[0], product.sizes[0] || 42, 1);
    toggleWishlist(product.id);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex justify-end"
        role="dialog"
        aria-modal="true"
        aria-label={t.wishlist.title}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsWishlistOpen(false)}
          className="fixed inset-0 bg-[#111111]"
          aria-hidden="true"
        />

        {/* Slide-out Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-50 flex h-full w-full max-w-md flex-col justify-between border-l border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-2xl overflow-y-auto"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-[var(--accent)] fill-[var(--accent)]" />
                <h3 className="font-editorial text-xl font-medium text-[var(--text-primary)]">
                  {t.wishlist.title}
                </h3>
                <span className="text-xs font-mono text-[var(--accent)]">
                  ({wishlistProducts.length})
                </span>
              </div>

              <button
                id="close-wishlist-drawer-btn"
                onClick={() => setIsWishlistOpen(false)}
                className="flex h-8 w-8 items-center justify-center border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors focus-ring"
                aria-label="Close wishlist"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* List */}
            {wishlistProducts.length > 0 ? (
              <div className="py-4 space-y-4">
                {wishlistProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 border border-[var(--border-subtle)] bg-[var(--surface-hover)] p-3"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onClick={() => {
                        setIsWishlistOpen(false);
                        setSelectedProduct(product);
                      }}
                      className="h-20 w-16 object-cover border border-[var(--border-subtle)] cursor-pointer"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                          {product.brand}
                        </span>
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            setSelectedProduct(product);
                          }}
                          className="font-editorial text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] cursor-pointer transition-colors"
                        >
                          {product.name}
                        </h4>
                        <span className="font-ui text-xs font-semibold text-[var(--text-primary)]">
                          ₹{product.price}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[var(--accent)] hover:underline font-semibold focus-ring"
                        >
                          <ShoppingBag className="h-3 w-3" />
                          <span>{t.wishlist.moveToCart}</span>
                        </button>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-[var(--text-muted)] hover:text-red-400 p-1 focus-ring"
                          aria-label={`Remove ${product.name} from wishlist`}
                          title={t.wishlist.remove}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Empty Wishlist */
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <BookmarkX className="h-12 w-12 text-[var(--border-strong)] stroke-1" />
                <h4 className="font-editorial text-lg font-normal text-[var(--text-primary)]">
                  {t.wishlist.emptyTitle}
                </h4>
                <p className="max-w-xs text-xs text-[var(--text-muted)] font-ui">
                  {t.wishlist.emptyDesc}
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="border border-[var(--accent)] bg-[var(--accent)] px-6 py-2.5 text-xs uppercase tracking-widest text-[#111111] hover:bg-transparent hover:text-[var(--accent)] transition-colors focus-ring"
                >
                  {t.wishlist.exploreCatalog}
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="border-t border-[var(--border-subtle)] pt-4">
              <button
                onClick={clearWishlist}
                className="w-full border border-[var(--border-strong)] py-2 text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors focus-ring"
              >
                {t.wishlist.clearAll}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
