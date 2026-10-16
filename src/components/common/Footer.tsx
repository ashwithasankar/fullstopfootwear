import React from 'react';
import { ArrowUp, Instagram, MessageCircle } from 'lucide-react';
import { businessData } from '../../data/business';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { setActiveSection, setActiveBrand, t } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCollectionsClick = () => {
    setActiveSection('collections');
    setActiveBrand(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVisitShopClick = () => {
    setActiveSection('visit-shop');
    const elem = document.getElementById('visit-shop-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="main-footer"
      className="border-t border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-primary)] py-16"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[var(--border-subtle)]">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo onClick={scrollToTop} />
            <p className="max-w-sm text-xs sm:text-sm text-[var(--text-muted)] font-ui font-light leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="pt-2 text-xs text-[var(--text-muted)] font-ui space-y-1">
              <p>{businessData.address}</p>
              <p>{businessData.city}</p>
              <p className="text-[var(--accent)] font-mono">{businessData.phone}</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-editorial text-base font-normal tracking-wide text-[var(--text-primary)]">
              Footwear Collections
            </h4>
            <ul className="space-y-2 text-xs font-ui uppercase tracking-wider text-[var(--text-muted)]">
              <li>
                <button
                  onClick={handleCollectionsClick}
                  className="hover:text-[var(--accent)] transition-colors focus-ring"
                >
                  {t.nav.collections}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveSection('collections');
                    setActiveBrand('Aureline');
                  }}
                  className="hover:text-[var(--accent)] transition-colors focus-ring"
                >
                  Aureline Firenze
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveSection('collections');
                    setActiveBrand('Velour');
                  }}
                  className="hover:text-[var(--accent)] transition-colors focus-ring"
                >
                  Velour Milano
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveSection('collections');
                    setActiveBrand('North & Sole');
                  }}
                  className="hover:text-[var(--accent)] transition-colors focus-ring"
                >
                  North & Sole Copenhagen
                </button>
              </li>
              <li>
                <button
                  onClick={handleVisitShopClick}
                  className="hover:text-[var(--accent)] transition-colors focus-ring"
                >
                  {t.nav.visitShop}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Concierge & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-editorial text-base font-normal tracking-wide text-[var(--text-primary)]">
              Store Enquiries
            </h4>
            <p className="text-xs text-[var(--text-muted)] font-ui leading-relaxed">
              Contact us on WhatsApp for footwear availability, bulk orders, and dispatch enquiries.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                id="footer-whatsapp-btn"
                href={`https://wa.me/${businessData.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#25D366] px-4 py-2 text-xs uppercase tracking-wider text-[#25D366] hover:bg-[#25D366] hover:text-[#111111] transition-colors focus-ring"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>

              <a
                id="footer-instagram-btn"
                href={businessData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[var(--accent)] px-4 py-2 text-xs uppercase tracking-wider text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#111111] transition-colors focus-ring"
              >
                <Instagram className="h-4 w-4" />
                <span>{businessData.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-xs text-[var(--text-muted)] font-ui">
          <p>
            © {new Date().getFullYear()} {businessData.name}. {t.footer.rights}
          </p>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors focus-ring"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
