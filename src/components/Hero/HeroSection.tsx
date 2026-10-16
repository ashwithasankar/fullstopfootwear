import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';

export const HeroSection: React.FC = () => {
  const { setActiveSection, setActiveBrand, t } = useApp();

  const handleExplore = () => {
    setActiveSection('collections');
    setActiveBrand(null);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrands = () => {
    const brandsElement = document.getElementById('brands-section');
    if (brandsElement) {
      brandsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-main)]"
      aria-label="Hero Section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-6 md:space-y-8"
          >
            {/* Subtle Atelier Badge */}
            <div className="inline-flex items-center gap-2 self-start border border-[var(--accent-border)] bg-[var(--surface)] px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-[var(--accent)]">
              <Sparkles className="h-3 w-3" />
              <span>{t.hero.pretitle}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[var(--text-primary)]">
              {t.hero.title}
            </h1>

            {/* Supporting Subtitle */}
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[var(--text-muted)] font-ui font-light">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-primary-cta"
                onClick={handleExplore}
                className="group relative inline-flex items-center justify-center gap-3 border border-[var(--accent)] bg-[var(--accent)] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] transition-all hover:bg-transparent hover:text-[var(--accent)] focus-ring rounded-none cursor-pointer"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={handleBrands}
                className="inline-flex items-center justify-center border border-[var(--border-strong)] bg-transparent px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-primary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] focus-ring rounded-none cursor-pointer"
              >
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Trust / Craftsmanship Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                {t.hero.craftBadge}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                Limited Production Runs
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                WhatsApp Store Enquiry
              </span>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with editorial frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold corner accent */}
              <div className="absolute -top-3 -right-3 h-16 w-16 border-t-2 border-r-2 border-[var(--accent)] pointer-events-none z-10" />
              <div className="absolute -bottom-3 -left-3 h-16 w-16 border-b-2 border-l-2 border-[var(--accent)] pointer-events-none z-10" />

              {/* Main Image Frame */}
              <div className="relative overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)] shadow-xl aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85"
                  alt="FULLSTOP SHOE MALL Luxury Handcrafted Footwear Showcase"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter saturate-[0.95]"
                />

                {/* Subtle gradient vignette at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 via-transparent to-transparent opacity-70" />

                {/* Overlaid floating badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 border border-[var(--accent-border)] bg-[var(--surface)]/95 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
                        Flagship Featured
                      </p>
                      <h3 className="font-editorial text-lg font-medium text-[var(--text-primary)]">
                        Kuro Double Monk Strap
                      </h3>
                    </div>
                    <span className="font-ui text-sm font-semibold text-[var(--accent)]">
                      ₹580
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
