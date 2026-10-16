import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ColorOption, Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    setSelectedProduct,
    toggleWishlist,
    isInWishlist,
    addToCart,
    t,
  } = useApp();

  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Use first available size as default for quick-add, or open modal if needs selection
    const defaultSize = product.sizes[0] || 42;
    addToCart(product, selectedColor, defaultSize, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col border border-[var(--border-subtle)] bg-[var(--surface)] transition-all duration-300 hover:border-[var(--accent-border)] hover:shadow-md cursor-pointer"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name} by ${product.brand}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelectedProduct(product);
        }
      }}
    >
      {/* Visual Image Container with fixed luxury aspect ratio 4:5 */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--surface-hover)] select-none">
        <img
          src={selectedColor.imageUrl || product.images[0]}
          alt={`${product.name} in ${selectedColor.name}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges: Brand & New/Featured */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="bg-[var(--surface)]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)] border border-[var(--border-subtle)]">
            {product.brand}
          </span>

          <div className="flex items-center gap-1">
            {product.isNewArrival && (
              <span className="bg-[#111111] text-[#F5F1E8] border border-[var(--accent)] px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold">
                {t.catalog.newArrival}
              </span>
            )}
          </div>
        </div>

        {/* Wishlist Button: Top Right Corner */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center border border-[var(--border-subtle)] bg-[var(--surface)]/90 backdrop-blur-xs text-[var(--text-primary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] focus-ring"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-4 w-4 transition-transform active:scale-125 ${
              isFavorited
                ? 'fill-[var(--accent)] text-[var(--accent)]'
                : 'text-[var(--text-primary)]'
            }`}
          />
        </button>

        {/* Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 z-20 hidden md:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 flex items-center justify-center gap-2 border border-[var(--border-strong)] bg-[var(--surface)]/95 backdrop-blur-xs py-2.5 px-3 text-[11px] uppercase tracking-widest text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors focus-ring"
          >
            <Eye className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>{t.catalog.quickView}</span>
          </button>

          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="flex items-center justify-center border border-[var(--accent)] bg-[var(--accent)] px-3.5 py-2.5 text-[#111111] hover:bg-transparent hover:text-[var(--accent)] transition-colors focus-ring"
            title={t.catalog.addToCart}
            aria-label={`Quick add ${product.name} to cart`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col p-5 space-y-3">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-ui tracking-wider uppercase">
          <span>{product.category}</span>
          <span className="text-[var(--accent)] font-medium">★ {product.rating.toFixed(1)}</span>
        </div>

        {/* Name */}
        <h3 className="font-editorial text-lg font-normal tracking-tight text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--accent)] transition-colors">
          {product.name}
        </h3>

        {/* Price & Original Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-ui text-base font-semibold text-[var(--text-primary)]">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="font-ui text-xs text-[var(--text-muted)] line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-1.5" aria-label="Available color variants">
            {product.colors.map((color) => {
              const isActive = selectedColor.hex === color.hex;
              return (
                <button
                  key={color.hex}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  className={`h-4 w-4 rounded-full border transition-all ${
                    isActive
                      ? 'border-[var(--accent)] scale-110 ring-1 ring-[var(--accent)]'
                      : 'border-[var(--border-strong)] hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select color ${color.name}`}
                  title={color.name}
                />
              );
            })}
          </div>

          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-mono">
            {product.sizes.length} Sizes
          </span>
        </div>

        {/* Mobile-visible action button */}
        <div className="md:hidden pt-2">
          <button
            onClick={handleQuickAdd}
            className="w-full flex items-center justify-center gap-2 border border-[var(--accent)] bg-[var(--accent-subtle)] py-2 text-[11px] uppercase tracking-widest text-[var(--accent)] font-semibold"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>{t.catalog.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
