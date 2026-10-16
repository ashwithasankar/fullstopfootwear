import React, { useEffect, useState } from 'react';
import {
  Check,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { ColorOption, Product } from '../../types';
import { createSingleProductWhatsAppUrl } from '../../utils/whatsapp';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    language,
    t,
  } = useApp();

  const [activeColor, setActiveColor] = useState<ColorOption | null>(null);
  const [activeSize, setActiveSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Initialize selections whenever selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      setActiveColor(selectedProduct.colors[0]);
      setActiveSize(selectedProduct.sizes[0] || 42);
      setQuantity(1);
      setActiveImageIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, setSelectedProduct]);

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);
  const currentColor = activeColor || selectedProduct.colors[0];
  const currentSize = activeSize || selectedProduct.sizes[0] || 42;

  const description = language === 'ta' && selectedProduct.descriptionTa
    ? selectedProduct.descriptionTa
    : selectedProduct.description;

  const craftsmanship = language === 'ta' && selectedProduct.craftsmanshipTa
    ? selectedProduct.craftsmanshipTa
    : selectedProduct.craftsmanship;

  const materials = language === 'ta' && selectedProduct.materialsTa
    ? selectedProduct.materialsTa
    : selectedProduct.materials;

  const handleAddToCart = () => {
    addToCart(selectedProduct, currentColor, currentSize, quantity);
    setSelectedProduct(null);
  };

  const handleWhatsAppOrder = () => {
    const url = createSingleProductWhatsAppUrl(
      selectedProduct,
      currentColor.name,
      currentSize,
      quantity
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-[#111111]"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-50 flex flex-col lg:flex-row w-full max-w-5xl max-h-[92vh] overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)] shadow-2xl"
        >
          {/* Close button */}
          <button
            id="close-product-modal-btn"
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] focus-ring transition-colors"
            aria-label="Close product details"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left: Product Images & Gallery */}
          <div className="lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-6 sm:p-8">
            {/* Main Active Image Frame */}
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)]">
              <img
                src={currentColor.imageUrl || selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={`${selectedProduct.name} main view`}
                className="h-full w-full object-cover object-center transition-all duration-500"
              />

              <div className="absolute top-3 left-3 bg-[var(--surface)]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] border border-[var(--border-subtle)]">
                {selectedProduct.brand}
              </div>
            </div>

            {/* Thumbnail selector */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1" aria-label="Product thumbnails">
                {selectedProduct.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden border transition-all focus-ring ${
                      activeImageIndex === idx
                        ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]'
                        : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`Show image view ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${selectedProduct.name} view ${idx + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="lg:w-1/2 flex flex-col justify-between overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="space-y-6">
              {/* Brand & Category */}
              <div className="flex items-center justify-between">
                <span className="font-ui text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-semibold">
                  {selectedProduct.brand} • {selectedProduct.category}
                </span>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors focus-ring"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isFavorited ? 'fill-[var(--accent)] text-[var(--accent)]' : ''
                    }`}
                  />
                  <span>{isFavorited ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* Title & Price */}
              <div>
                <h2
                  id="product-detail-modal-title"
                  className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-[var(--text-primary)]"
                >
                  {selectedProduct.name}
                </h2>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-ui text-2xl font-semibold text-[var(--text-primary)]">
                    ₹{selectedProduct.price}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="font-ui text-sm text-[var(--text-muted)] line-through">
                      ₹{selectedProduct.originalPrice}
                    </span>
                  )}
                  <span className="font-ui text-[11px] uppercase tracking-wider text-[var(--accent)] ml-2">
                    {t.productDetail.inStockStatus}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[var(--text-muted)] font-ui font-light">
                {description}
              </p>

              {/* Color Options */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider">
                  <span className="text-[var(--text-muted)]">{t.productDetail.selectColor}:</span>
                  <span className="font-semibold text-[var(--text-primary)]">{currentColor.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {selectedProduct.colors.map((color) => {
                    const isSelected = currentColor.hex === color.hex;
                    return (
                      <button
                        key={color.hex}
                        onClick={() => setActiveColor(color)}
                        className={`group relative flex items-center gap-2 border px-3 py-1.5 text-xs transition-all focus-ring ${
                          isSelected
                            ? 'border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent)]'
                            : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-strong)]'
                        }`}
                        aria-label={`Select color ${color.name}`}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-[var(--border-strong)]"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                        {isSelected && <Check className="h-3 w-3 text-[var(--accent)]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Options */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider">
                  <span className="text-[var(--text-muted)]">{t.productDetail.selectSize}:</span>
                  <span className="font-semibold text-[var(--text-primary)]">EU {currentSize}</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {selectedProduct.sizes.map((size) => {
                    const isSelected = currentSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setActiveSize(size)}
                        className={`py-2 text-xs font-mono font-medium border transition-all focus-ring ${
                          isSelected
                            ? 'border-[var(--accent)] bg-[var(--accent)] text-[#111111] font-bold shadow-xs'
                            : 'border-[var(--border-subtle)] bg-[var(--surface-hover)] text-[var(--text-primary)] hover:border-[var(--accent)]'
                        }`}
                        aria-label={`Size EU ${size}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-[var(--text-muted)] font-ui italic">
                  {t.productDetail.sizeGuide}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  {t.productDetail.quantity}:
                </span>
                <div className="flex items-center border border-[var(--border-strong)] bg-[var(--surface-hover)]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-9 w-9 items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] focus-ring"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-semibold text-[var(--text-primary)]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-9 w-9 items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] focus-ring"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Craftsmanship & Materials Specs */}
              <div className="border-t border-[var(--border-subtle)] pt-4 space-y-3 text-xs">
                <div>
                  <h4 className="font-ui uppercase tracking-wider font-semibold text-[var(--accent)] flex items-center gap-2">
                    <Sparkles className="h-3 w-3" />
                    {t.productDetail.craftsmanship}
                  </h4>
                  <p className="mt-1 text-[var(--text-muted)] leading-relaxed">
                    {craftsmanship}
                  </p>
                </div>

                <div>
                  <h4 className="font-ui uppercase tracking-wider font-semibold text-[var(--accent)] flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3" />
                    {t.productDetail.materials}
                  </h4>
                  <ul className="mt-1 list-disc list-inside text-[var(--text-muted)] space-y-0.5">
                    {materials.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to Bag + Order via WhatsApp */}
            <div className="border-t border-[var(--border-subtle)] pt-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Add to Bag */}
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 border border-[var(--accent)] bg-[var(--accent)] py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] hover:bg-transparent hover:text-[var(--accent)] transition-colors focus-ring"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>{t.productDetail.addToBag}</span>
                </button>

                {/* WhatsApp Direct Ordering */}
                <button
                  id="modal-order-whatsapp-btn"
                  onClick={handleWhatsAppOrder}
                  className="flex items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#25D366] hover:bg-[#25D366] hover:text-[#111111] transition-colors focus-ring"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{t.productDetail.orderWhatsApp}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)] font-ui pt-1">
                <Truck className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>{t.productDetail.freeShipping}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
