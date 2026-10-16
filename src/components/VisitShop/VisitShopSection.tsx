import React from 'react';
import {
  Clock,
  Compass,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Sparkles,
} from 'lucide-react';
import { businessData } from '../../data/business';
import { useApp } from '../../context/AppContext';

export const VisitShopSection: React.FC = () => {
  const { language, t } = useApp();

  const address = language === 'ta' ? businessData.addressTa : businessData.address;
  const weekdays = language === 'ta' ? businessData.openingHours.weekdaysTa : businessData.openingHours.weekdays;
  const weekends = language === 'ta' ? businessData.openingHours.weekendsTa : businessData.openingHours.weekends;

  return (
    <section
      id="visit-shop-section"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-main)] py-16 md:py-24"
      aria-label="Visit Fullstop Shoe Mall"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="font-ui text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-semibold">
            {businessData.name}
          </span>
          <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[var(--text-primary)]">
            {t.visitShop.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] font-ui font-light">
            {t.visitShop.subtitle}
          </p>
        </div>

        {/* 2-Column Luxury Atelier Store Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-6 flex flex-col justify-between border border-[var(--border-subtle)] bg-[var(--surface)] p-8 sm:p-10 space-y-8">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--accent)] bg-[var(--surface-hover)] text-[var(--accent)]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-medium text-[var(--text-primary)]">
                    {t.visitShop.addressHeading}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)] font-ui leading-relaxed">
                    {address}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] font-ui">
                    {businessData.city}
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--accent)] bg-[var(--surface-hover)] text-[var(--accent)]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-medium text-[var(--text-primary)]">
                    {t.visitShop.hoursHeading}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-primary)] font-ui">
                    {weekdays}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] font-ui">
                    {weekends}
                  </p>
                  <p className="mt-2 text-[11px] text-[var(--accent)] italic">
                    {t.visitShop.appointmentNote}
                  </p>
                </div>
              </div>

              {/* Direct Lines */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--accent)] bg-[var(--surface-hover)] text-[var(--accent)]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-medium text-[var(--text-primary)]">
                    {t.visitShop.contactHeading}
                  </h3>
                  <div className="mt-1 space-y-1 text-sm font-ui">
                    <p>
                      <span className="text-[var(--text-muted)]">Telephone: </span>
                      <a
                        href={`tel:${businessData.phone}`}
                        className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                      >
                        {businessData.phone}
                      </a>
                    </p>
                    <p>
                      <span className="text-[var(--text-muted)]">WhatsApp Concierge: </span>
                      <a
                        href={`https://wa.me/${businessData.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#25D366] hover:underline"
                      >
                        {businessData.displayWhatsapp}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs: Get Directions & WhatsApp Message */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--border-subtle)]">
              <a
                id="get-directions-btn"
                href={businessData.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 border border-[var(--accent)] bg-[var(--accent)] py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] hover:bg-transparent hover:text-[var(--accent)] transition-colors focus-ring"
              >
                <Navigation className="h-4 w-4" />
                <span>{t.visitShop.getDirections}</span>
              </a>

              <a
                id="visit-shop-whatsapp-btn"
                href={`https://wa.me/${businessData.whatsapp}?text=${encodeURIComponent('Hello Fullstop Shoe Mall, I would like to enquire about footwear availability and wholesale pricing.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-[#25D366] py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#25D366] hover:bg-[#25D366] hover:text-[#111111] transition-colors focus-ring"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{t.visitShop.messageAtelier}</span>
              </a>
            </div>
          </div>

          {/* Right Map Preview Card */}
          <div className="lg:col-span-6 relative flex flex-col overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)]">
            {/* Styled Map Silhouette / Visual Illustration */}
            <div className="relative h-full min-h-[340px] flex flex-col justify-between p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--surface-elevated)] via-[var(--surface)] to-[var(--bg-main)]">
              {/* Top status */}
              <div className="flex items-center justify-between z-10">
                <div className="inline-flex items-center gap-2 bg-[var(--surface)]/90 border border-[var(--accent-border)] px-3 py-1 text-[11px] uppercase tracking-widest text-[var(--accent)]">
                  <Compass className="h-3.5 w-3.5 animate-spin-slow" />
                  <span>Store Location</span>
                </div>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  {businessData.coordinates.lat}° N, {Math.abs(businessData.coordinates.lng)}° E
                </span>
              </div>

              {/* Visual Map Pin Centered Representation */}
              <div className="my-auto flex flex-col items-center justify-center text-center p-6 z-10">
                <div className="relative mb-4">
                  <div className="h-16 w-16 rounded-full border border-[var(--accent)]/40 flex items-center justify-center animate-ping absolute inset-0 opacity-25" />
                  <div className="relative h-16 w-16 rounded-full border-2 border-[var(--accent)] bg-[var(--surface)] flex items-center justify-center shadow-xl">
                    <MapPin className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                </div>
                <h4 className="font-editorial text-2xl font-medium text-[var(--text-primary)]">
                  {businessData.name}
                </h4>
                <p className="mt-1 text-xs text-[var(--text-muted)] font-ui max-w-xs">
                  {address}, {businessData.city}
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
                  Footwear Wholesale • Store Enquiries
                </p>
              </div>

              {/* Bottom Quick Action */}
              <div className="z-10 border-t border-[var(--border-subtle)] pt-4 flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>Location: Tiruchirappalli, Tamil Nadu</span>
                <a
                  href={businessData.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline uppercase tracking-wider font-medium inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <Navigation className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
