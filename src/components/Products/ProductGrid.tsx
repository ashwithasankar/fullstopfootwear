import React, { useMemo, useState } from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { productsData } from '../../data/products';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const {
    activeBrand,
    setActiveBrand,
    activeCategory,
    setActiveCategory,
    t,
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Categories list
  const categories = [
    { id: 'all', label: t.catalog.filterAll },
    { id: 'Formal Shoes', label: t.catalog.filterFormal },
    { id: 'Loafers & Slip-ons', label: t.catalog.filterLoafers },
    { id: 'Sneakers', label: t.catalog.filterSneakers },
    { id: 'Boots', label: t.catalog.filterBoots },
    { id: 'Evening Heels', label: t.catalog.filterHeels },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    // Filter by Brand
    if (activeBrand) {
      list = list.filter((p) => p.brand.toLowerCase() === activeBrand.toLowerCase());
    }

    // Filter by Category
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [activeBrand, activeCategory, sortBy]);

  const resetAllFilters = () => {
    setActiveBrand(null);
    setActiveCategory('all');
    setSortBy('featured');
  };

  return (
    <section
      id="catalog-section"
      className="bg-[var(--bg-main)] py-16 md:py-24"
      aria-label="Footwear Catalog"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[var(--border-subtle)] pb-6">
          <div>
            <span className="font-ui text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-semibold">
              {activeBrand ? `Brand • ${activeBrand}` : 'Footwear Collection'}
            </span>
            <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[var(--text-primary)]">
              {activeBrand ? `${activeBrand} Collection` : t.catalog.heading}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)] font-ui font-light">
              {t.catalog.subheading}
            </p>
          </div>

          {/* Active Filter Indicators */}
          <div className="flex flex-wrap items-center gap-2">
            {activeBrand && (
              <span className="inline-flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent-subtle)] px-3 py-1 text-xs text-[var(--accent)]">
                <span>Brand: {activeBrand}</span>
                <button
                  onClick={() => setActiveBrand(null)}
                  className="hover:text-[#111111] focus-ring"
                  aria-label={`Remove filter for brand ${activeBrand}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-2 border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-primary)]">
                <span>Category: {activeCategory}</span>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="hover:text-[var(--accent)] focus-ring"
                  aria-label={`Remove filter for category ${activeCategory}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Filter Bar & Sorting */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none" role="tablist" aria-label="Shoe Category Filters">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  role="tab"
                  aria-selected={isSelected}
                  className={`shrink-0 px-4 py-2 text-xs uppercase tracking-widest transition-all focus-ring ${
                    isSelected
                      ? 'border-b-2 border-[var(--accent)] text-[var(--accent)] font-semibold bg-[var(--surface)]'
                      : 'border-b-2 border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort selector & Count */}
          <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
            <span className="font-ui text-xs text-[var(--text-muted)] tracking-wider">
              {t.catalog.showingCount.replace('{count}', String(filteredProducts.length))}
            </span>

            <div className="flex items-center gap-2 border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--text-primary)]">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--accent)]" />
              <label htmlFor="sort-dropdown" className="sr-only">
                {t.catalog.sortBy}
              </label>
              <select
                id="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-ui tracking-wider uppercase text-[var(--text-primary)] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[var(--surface)] text-[var(--text-primary)]">
                  {t.catalog.sortFeatured}
                </option>
                <option value="price-asc" className="bg-[var(--surface)] text-[var(--text-primary)]">
                  {t.catalog.sortPriceAsc}
                </option>
                <option value="price-desc" className="bg-[var(--surface)] text-[var(--text-primary)]">
                  {t.catalog.sortPriceDesc}
                </option>
                <option value="rating" className="bg-[var(--surface)] text-[var(--text-primary)]">
                  {t.catalog.sortRating}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Filter State */
          <div className="flex flex-col items-center justify-center border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-12 text-center my-8">
            <Filter className="h-10 w-10 text-[var(--accent)] mb-4 stroke-1" />
            <h3 className="font-editorial text-2xl font-normal text-[var(--text-primary)]">
              {t.catalog.emptyTitle}
            </h3>
            <p className="mt-2 max-w-md text-sm text-[var(--text-muted)] font-ui">
              {t.catalog.emptyDesc}
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-6 border border-[var(--accent)] bg-[var(--accent)] px-6 py-2.5 text-xs uppercase tracking-widest text-[#111111] hover:bg-transparent hover:text-[var(--accent)] transition-colors focus-ring"
            >
              {t.catalog.resetFilters}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
