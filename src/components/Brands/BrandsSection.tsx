import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { brandsData } from '../../data/brands';
import { useApp } from '../../context/AppContext';

export const BrandsSection: React.FC = () => {
  const { activeBrand, setActiveBrand, setActiveSection, language, t } = useApp();

  const handleBrandSelect = (brandName: string) => {
    if (activeBrand === brandName) {
      setActiveBrand(null);
    } else {
      setActiveBrand(brandName);
      setActiveSection('collections');
    }

    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="brands-section"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-main)] py-16 md:py-24"
      aria-label="Curated Ateliers & Brands"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="font-ui text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-semibold">
              {t.brands.selectedBrandBadge}
            </span>
            <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[var(--text-primary)]">
              {t.brands.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] font-ui font-light">
              {t.brands.subheading}
            </p>
          </div>

          {activeBrand && (
            <button
              id="clear-brand-filter-btn"
              onClick={() => setActiveBrand(null)}
              className="inline-flex items-center gap-2 self-start md:self-end border border-[var(--accent)] px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#111111] transition-colors focus-ring"
            >
              <span>{t.brands.clearFilter}</span>
            </button>
          )}
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandsData.map((brand) => {
            const isSelected = activeBrand === brand.name;
            const description = language === 'ta' ? brand.descriptionTa : brand.description;
            const tagline = language === 'ta' ? brand.taglineTa : brand.tagline;

            return (
              <div
                key={brand.id}
                id={`brand-card-${brand.id}`}
                onClick={() => handleBrandSelect(brand.name)}
                className={`group relative flex flex-col justify-between overflow-hidden border p-7 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[var(--accent)] bg-[var(--surface-elevated)] shadow-lg ring-1 ring-[var(--accent)]'
                    : 'border-[var(--border-subtle)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBrandSelect(brand.name);
                  }
                }}
                aria-pressed={isSelected}
                aria-label={`Select brand ${brand.name}`}
              >
                {/* Top: Brand origin & selection indicator */}
                <div className="flex items-center justify-between">
                  <span className="font-ui text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {brand.origin}
                  </span>
                  
                  {isSelected ? (
                    <span className="flex h-6 w-6 items-center justify-center bg-[var(--accent)] text-[#111111]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-[var(--accent)] opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  )}
                </div>

                {/* Middle: Brand name & tagline */}
                <div className="my-6">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                    {brand.name}
                  </h3>
                  <p className="mt-1 font-ui text-xs tracking-wider uppercase text-[var(--accent)]">
                    {tagline}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)] line-clamp-2">
                    {description}
                  </p>
                </div>

                {/* Bottom: Count & action */}
                <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-xs font-ui">
                  <span className="text-[var(--text-muted)]">
                    {brand.productCount} {t.brands.productsCount}
                  </span>
                  <span className={`text-[11px] uppercase tracking-widest font-semibold transition-colors ${
                    isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent)]'
                  }`}>
                    {isSelected ? 'Filtered' : 'View Atelier'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
