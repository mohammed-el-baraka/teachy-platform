import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

const languagesList: { code: Language; label: string; flag: string; nativeName: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'fr', label: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'ar', label: 'Arabic', flag: '🇲🇦', nativeName: 'العربية' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
];

export const LanguageSwitcher: React.FC<{ variant?: 'nav' | 'footer' | 'pill' }> = ({ variant = 'nav' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = languagesList.find((l) => l.code === language) || languagesList[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 transition-all duration-200 ${
          variant === 'footer'
            ? 'bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-teachy-purple px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold'
            : 'bg-teachy-lavender/60 hover:bg-teachy-lavender text-teachy-purple px-3 py-1.5 rounded-full text-xs font-bold border border-purple-200/70 shadow-sm'
        }`}
        aria-label="Change Language"
      >
        <span className="text-sm">{current.flag}</span>
        <span className="font-medium">{current.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-auto mt-2 w-44 bg-white rounded-2xl shadow-xl border border-purple-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[10px] uppercase font-black tracking-wider text-gray-400 border-b border-gray-100 flex items-center gap-1">
            <Globe className="w-3 h-3 text-teachy-purple" />
            <span>Select Language</span>
          </div>
          {languagesList.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setLanguage(item.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left ${
                language === item.code
                  ? 'bg-purple-50 text-teachy-purple font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{item.flag}</span>
                <span>{item.nativeName}</span>
              </div>
              {language === item.code && <Check className="w-3.5 h-3.5 text-teachy-purple" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
