import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from './GithubIcon';
import { ExternalLink, Sparkles } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-purple-950 via-teachy-purple to-pink-900 text-white text-xs py-2 px-4 shadow-inner relative z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] uppercase font-black px-2 py-0.5 rounded-full tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {t('demo.badge')}
          </span>
          <span className="text-purple-100 font-medium text-[11px] sm:text-xs">
            {t('demo.banner')}
          </span>
        </div>

        <a
          href="https://github.com/mohammed-el-baraka/teachy-platform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white text-white hover:text-teachy-dark text-[11px] font-bold px-3 py-1 rounded-full border border-white/25 transition-all duration-200 shadow-sm group whitespace-nowrap"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>{t('demo.viewGithub')}</span>
          <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
        </a>
      </div>
    </div>
  );
};
