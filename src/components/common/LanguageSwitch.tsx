import React from 'react';
import { Languages } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LanguageSwitchProps {
  collapsed?: boolean;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ collapsed = false }) => {
  const { language, setLanguage } = useApp();

  const handleToggle = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <button
      id="lang-toggle-btn"
      onClick={handleToggle}
      className={`group flex items-center gap-3 w-full px-3 py-2.5 text-xs tracking-wider border border-transparent hover:border-[var(--border-strong)] bg-transparent hover:bg-[var(--surface-hover)] text-[var(--text-primary)] transition-all focus-ring rounded-none ${
        collapsed ? 'justify-center px-0' : 'justify-between'
      }`}
      aria-label={`Current language: ${language === 'en' ? 'English' : 'தமிழ்'}. Switch language.`}
      title={language === 'en' ? 'மாற்றவும் தமிழ்' : 'Switch to English'}
    >
      <div className="flex items-center gap-3">
        <Languages className="h-4 w-4 text-[var(--accent)] shrink-0" />
        {!collapsed && (
          <span className="font-ui text-xs tracking-widest uppercase">
            {language === 'en' ? 'English' : 'தமிழ்'}
          </span>
        )}
      </div>

      {!collapsed && (
        <span className="text-[10px] px-1.5 py-0.5 border border-[var(--border-subtle)] text-[var(--accent)] font-medium">
          {language === 'en' ? 'தமிழ்' : 'EN'}
        </span>
      )}
    </button>
  );
};
