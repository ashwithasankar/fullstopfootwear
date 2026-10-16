import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ThemeToggleProps {
  collapsed?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ collapsed = false }) => {
  const { theme, toggleTheme, t } = useApp();

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className={`group flex items-center gap-3 w-full px-3 py-2.5 text-xs tracking-wider uppercase border border-transparent hover:border-[var(--border-strong)] bg-transparent hover:bg-[var(--surface-hover)] text-[var(--text-primary)] transition-all focus-ring rounded-none ${
        collapsed ? 'justify-center px-0' : 'justify-between'
      }`}
      aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
      title={theme === 'dark' ? t.nav.lightTheme : t.nav.darkTheme}
    >
      <div className="flex items-center gap-3">
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 text-[var(--accent)] shrink-0 transition-transform group-hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 text-[var(--accent)] shrink-0 transition-transform group-hover:-rotate-12" />
        )}
        {!collapsed && (
          <span className="font-ui text-xs tracking-widest">
            {theme === 'dark' ? t.nav.lightTheme : t.nav.darkTheme}
          </span>
        )}
      </div>

      {!collapsed && (
        <span className="text-[10px] px-1.5 py-0.5 border border-[var(--border-subtle)] text-[var(--text-muted)] font-mono">
          {theme.toUpperCase()}
        </span>
      )}
    </button>
  );
};
