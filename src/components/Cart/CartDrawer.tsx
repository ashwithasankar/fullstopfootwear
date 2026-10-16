import React, { useEffect } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from '../../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotalCount,
    cartSubtotal,
    setIsOrderModalOpen,
    setSelectedProduct,
    t,
  } = useApp();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock scroll
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleProceedToEnquiry = () => {
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex justify-end"
        role="dialog"
        aria-modal="true"
        aria-label={t.cart.title}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsCartOpen(false)}
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
                <ShoppingBag className="h-4 w-4 text-[var(--accent)]" />
                <h3 className="font-editorial text-xl font-medium text-[var(--text-primary)]">
                  {t.cart.title}
                </h3>
                <span className="text-xs font-mono text-[var(--accent)]">
                  ({cartTotalCount})
                </span>
              </div>

              <button
                id="close-cart-drawer-btn"
                onClick={() => setIsCartOpen(false)}
                className="flex h-8 w-8 items-center justify-center border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors focus-ring"
                aria-label="Close bag"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Cart Items List */}
            {cart.length > 0 ? (
              <div className="py-4 space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 border border-[var(--border-subtle)] bg-[var(--surface-hover)] p-3"
                  >
                    <img
                      src={item.selectedColor.imageUrl || item.product.images[0]}
                      alt={item.product.name}
                      onClick={() => {
                        setIsCartOpen(false);
                        setSelectedProduct(item.product);
                      }}
                      className="h-24 w-20 object-cover border border-[var(--border-subtle)] cursor-pointer shrink-0"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                          {item.product.brand}
                        </span>
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            setSelectedProduct(item.product);
                          }}
                          className="font-editorial text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] cursor-pointer transition-colors"
                        >
                          {item.product.name}
                        </h4>

                        <div className="mt-1 flex items-center gap-3 text-[11px] text-[var(--text-muted)] font-ui">
                          <span>
                            {t.cart.color}: <strong className="text-[var(--text-primary)] font-normal">{item.selectedColor.name}</strong>
                          </span>
                          <span>•</span>
                          <span>
                            {t.cart.size}: <strong className="text-[var(--text-primary)] font-normal">EU {item.selectedSize}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
                        {/* Qty controller */}
                        <div className="flex items-center border border-[var(--border-strong)] bg-[var(--surface)]">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="flex h-6 w-6 items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] focus-ring"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center font-mono text-xs font-semibold text-[var(--text-primary)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="flex h-6 w-6 items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] focus-ring"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center gap-3">
                          <span className="font-ui text-xs font-semibold text-[var(--text-primary)]">
                            ₹{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[var(--text-muted)] hover:text-red-400 p-1 focus-ring"
                            aria-label={`Remove ${item.product.name} from bag`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Empty Cart State */
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <ShoppingBag className="h-12 w-12 text-[var(--border-strong)] stroke-1" />
                <h4 className="font-editorial text-lg font-normal text-[var(--text-primary)]">
                  {t.cart.emptyTitle}
                </h4>
                <p className="max-w-xs text-xs text-[var(--text-muted)] font-ui">
                  {t.cart.emptyDesc}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="border border-[var(--accent)] bg-[var(--accent)] px-6 py-2.5 text-xs uppercase tracking-widest text-[#111111] hover:bg-transparent hover:text-[var(--accent)] transition-colors focus-ring"
                >
                  {t.cart.exploreBtn}
                </button>
              </div>
            )}
          </div>

          {/* Footer with Totals and Order Inquiry CTA */}
          {cart.length > 0 && (
            <div className="border-t border-[var(--border-subtle)] pt-4 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] uppercase tracking-wider">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-ui text-base font-semibold text-[var(--text-primary)]">
                    ₹{cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px] text-[var(--text-muted)] italic font-ui">
                  {t.cart.notes}
                </p>
              </div>

              <button
                id="cart-proceed-order-btn"
                onClick={handleProceedToEnquiry}
                className="w-full flex items-center justify-center gap-2 border border-[var(--accent)] bg-[var(--accent)] py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] hover:bg-transparent hover:text-[var(--accent)] transition-colors focus-ring"
              >
                <span>{t.cart.proceedOrder}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-[10px] uppercase tracking-widest text-[var(--text-muted)] hover:text-red-400 transition-colors focus-ring py-1"
              >
                {t.cart.clearCart}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
