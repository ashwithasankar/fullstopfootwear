import React, { useEffect, useState } from 'react';
import { CheckCircle2, MessageCircle, Shield, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { businessData } from '../../data/business';
import { useApp } from '../../context/AppContext';
import { OrderCustomerInfo } from '../../types';
import { logger } from '../../utils/logger';
import { createCartOrderWhatsAppUrl } from '../../utils/whatsapp';

export const OrderInquiryModal: React.FC = () => {
  const {
    isOrderModalOpen,
    setIsOrderModalOpen,
    cart,
    clearCart,
    cartSubtotal,
    t,
  } = useApp();

  const [customer, setCustomer] = useState<OrderCustomerInfo>({
    name: '',
    phoneOrWhatsapp: '',
    city: '',
    address: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOrderModalOpen) {
      setSubmitted(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOrderModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOrderModalOpen) {
        setIsOrderModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOrderModalOpen, setIsOrderModalOpen]);

  if (!isOrderModalOpen) return null;

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    logger.info('WhatsApp order initiated', {
      customerName: customer.name,
      itemsCount: cart.length,
      total: cartSubtotal,
    });

    const url = createCartOrderWhatsAppUrl(cart, customer);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleFinish = () => {
    clearCart();
    setIsOrderModalOpen(false);
    setSubmitted(false);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOrderModalOpen(false)}
          className="fixed inset-0 bg-[#111111]"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-50 w-full max-w-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)] shadow-2xl p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            id="close-order-modal-btn"
            onClick={() => setIsOrderModalOpen(false)}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] focus-ring transition-colors"
            aria-label="Close order enquiry"
          >
            <X className="h-4 w-4" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="border-b border-[var(--border-subtle)] pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#25D366] font-semibold">
                  <MessageCircle className="h-4 w-4" />
                  <span>{t.orderModal.title}</span>
                </div>
                <h2
                  id="order-modal-title"
                  className="mt-1 font-editorial text-2xl sm:text-3xl font-normal text-[var(--text-primary)]"
                >
                  Confirm Footwear Enquiry
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)] font-ui font-light">
                  {t.orderModal.subtitle}
                </p>
              </div>

              {/* Order Items Preview */}
              <div className="mb-6 border border-[var(--border-subtle)] bg-[var(--surface-hover)] p-4 max-h-40 overflow-y-auto space-y-2">
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] uppercase tracking-wider pb-1 border-b border-[var(--border-subtle)]">
                  <span>{t.orderModal.itemCount.replace('{count}', String(cart.length))}</span>
                  <span>
                    {t.orderModal.total}:{' '}
                    <strong className="text-[var(--text-primary)] font-semibold">
                      ${cartSubtotal.toLocaleString()}
                    </strong>
                  </span>
                </div>
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs font-ui py-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[var(--text-primary)]">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        ({item.selectedColor.name}, EU {item.selectedSize})
                      </span>
                    </div>
                    <span className="font-mono text-[var(--text-muted)]">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitWhatsApp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="customer-name" className="block text-xs uppercase tracking-wider text-[var(--text-muted)]">
                      {t.orderModal.fullName} *
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      required
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      placeholder={t.orderModal.namePlaceholder}
                      className="w-full border border-[var(--border-subtle)] bg-[var(--surface-hover)] px-3 py-2 text-xs font-ui text-[var(--text-primary)] focus-ring rounded-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="customer-phone" className="block text-xs uppercase tracking-wider text-[var(--text-muted)]">
                      {t.orderModal.phone} *
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      value={customer.phoneOrWhatsapp}
                      onChange={(e) => setCustomer({ ...customer, phoneOrWhatsapp: e.target.value })}
                      placeholder={t.orderModal.phonePlaceholder}
                      className="w-full border border-[var(--border-subtle)] bg-[var(--surface-hover)] px-3 py-2 text-xs font-ui text-[var(--text-primary)] focus-ring rounded-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City */}
                  <div className="space-y-1">
                    <label htmlFor="customer-city" className="block text-xs uppercase tracking-wider text-[var(--text-muted)]">
                      {t.orderModal.city}
                    </label>
                    <input
                      id="customer-city"
                      type="text"
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      placeholder={t.orderModal.cityPlaceholder}
                      className="w-full border border-[var(--border-subtle)] bg-[var(--surface-hover)] px-3 py-2 text-xs font-ui text-[var(--text-primary)] focus-ring rounded-none"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <label htmlFor="customer-address" className="block text-xs uppercase tracking-wider text-[var(--text-muted)]">
                      {t.orderModal.address}
                    </label>
                    <input
                      id="customer-address"
                      type="text"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      placeholder={t.orderModal.addressPlaceholder}
                      className="w-full border border-[var(--border-subtle)] bg-[var(--surface-hover)] px-3 py-2 text-xs font-ui text-[var(--text-primary)] focus-ring rounded-none"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label htmlFor="customer-notes" className="block text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {t.orderModal.notes}
                  </label>
                  <textarea
                    id="customer-notes"
                    rows={2}
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder={t.orderModal.notesPlaceholder}
                    className="w-full border border-[var(--border-subtle)] bg-[var(--surface-hover)] px-3 py-2 text-xs font-ui text-[var(--text-primary)] focus-ring rounded-none resize-none"
                  />
                </div>

                {/* Submission CTA */}
                <div className="pt-2">
                  <button
                    id="submit-order-whatsapp-btn"
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 border border-[#25D366] bg-[#25D366] py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] hover:bg-transparent hover:text-[#25D366] transition-colors focus-ring cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{t.orderModal.submitWhatsApp}</span>
                  </button>
                  <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] text-[var(--text-muted)]">
                    <Shield className="h-3 w-3 text-[var(--accent)]" />
                    <span>Send your footwear enquiry directly to the store on WhatsApp.</span>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Success confirmation screen */
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#25D366]" />
              <h3 className="font-editorial text-2xl font-normal text-[var(--text-primary)]">
                {t.orderModal.successTitle}
              </h3>
              <p className="max-w-md mx-auto text-xs text-[var(--text-muted)] font-ui leading-relaxed">
                {t.orderModal.successDesc}
              </p>
              <div className="border border-[var(--border-subtle)] bg-[var(--surface-hover)] p-4 max-w-sm mx-auto text-left text-xs font-ui space-y-1">
                <p className="text-[var(--accent)] font-semibold uppercase tracking-wider text-[10px]">
                  Concierge Contact:
                </p>
                <p className="text-[var(--text-primary)] font-mono">{businessData.phone}</p>
                <p className="text-[var(--text-muted)]">{businessData.address}</p>
              </div>
              <button
                onClick={handleFinish}
                className="mt-4 border border-[var(--accent)] bg-[var(--accent)] px-8 py-3 text-xs uppercase tracking-widest text-[#111111] hover:bg-transparent hover:text-[var(--accent)] transition-colors focus-ring"
              >
                Return to Footwear Collection
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
