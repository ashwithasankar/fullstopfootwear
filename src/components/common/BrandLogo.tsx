import React from 'react';

interface BrandLogoProps {
  collapsed?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false, className = '', onClick }) => {
  return (
    <button
      id="brand-logo-btn"
      onClick={onClick}
      className={`group flex items-center gap-3 text-left focus-ring transition-opacity ${className}`}
      aria-label="Fullstop Shoe Mall Homepage"
    >
      {/* Monogram / Icon mark */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] transition-transform duration-300 group-hover:border-[var(--accent)]">
        <span className="font-editorial text-lg tracking-widest font-semibold">F</span>
        <span className="absolute -bottom-1 -right-1 h-1.5 w-1.5 bg-[var(--accent)]" />
      </div>

      {!collapsed && (
        <div className="flex flex-col">
          <span className="font-editorial text-lg font-semibold tracking-[0.2em] text-[var(--text-primary)] leading-tight">
            FULLSTOP
          </span>
          <span className="font-ui text-[9px] uppercase tracking-[0.3em] text-[var(--accent)]">
            SHOE MALL
          </span>
        </div>
      )}
    </button>
  );
};
