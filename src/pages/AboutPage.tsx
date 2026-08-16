import React from 'react';
import { Link } from 'react-router-dom';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { TeachyLogo } from '../components/TeachyLogo';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from '../components/GithubIcon';
import { Sparkles, Heart, Users, Target, ArrowRight, Code2, Mail, Phone } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8">
      <DecorativeBackground showRibbon={true} />

      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teachy-lavender text-teachy-purple text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('about.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-teachy-dark">
            {t('about.title')} <span className="text-teachy-purple">teachy</span>
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Brand Story Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
            <TeachyLogo size="xl" />
            <div>
              <h2 className="text-2xl font-serif font-bold text-teachy-dark">
                {t('about.cardTitle')}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {t('about.projectInfo')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
            <p>
              {t('about.p1')}
            </p>
            <p>
              {t('about.p2')}
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
              <Users className="w-5 h-5 text-teachy-purple mb-2" />
              <h3 className="font-bold text-xs text-teachy-dark">{t('about.pillar1.title')}</h3>
              <p className="text-[11px] text-gray-500 mt-1">{t('about.pillar1.desc')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100">
              <Heart className="w-5 h-5 text-teachy-pink mb-2" />
              <h3 className="font-bold text-xs text-teachy-dark">{t('about.pillar2.title')}</h3>
              <p className="text-[11px] text-gray-500 mt-1">{t('about.pillar2.desc')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <Target className="w-5 h-5 text-emerald-600 mb-2" />
              <h3 className="font-bold text-xs text-teachy-dark">{t('about.pillar3.title')}</h3>
              <p className="text-[11px] text-gray-500 mt-1">{t('about.pillar3.desc')}</p>
            </div>
          </div>
        </div>

        {/* Creator & Contact Card */}
        <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-purple-800/60">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <Code2 className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Mohammed El Baraka</h3>
                <p className="text-xs text-purple-200 mt-0.5">
                  Creator &amp; Lead Engineer • UM6P / EMINES School of Industrial Management
                </p>
              </div>
            </div>

            <a
              href="https://github.com/mohammed-el-baraka/teachy-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-teachy-dark hover:bg-purple-50 text-xs font-bold px-4 py-2 rounded-full transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <a
              href="tel:0666774426"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 transition-all text-purple-100"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-[10px] text-purple-300 uppercase font-bold tracking-wider">Phone</p>
                <p className="font-mono font-bold text-white text-sm">0666774426</p>
              </div>
            </a>

            <a
              href="mailto:mohammed.elbaraka@emines.um6p.ma"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 transition-all text-purple-100"
            >
              <Mail className="w-4 h-4 text-pink-400" />
              <div>
                <p className="text-[10px] text-purple-300 uppercase font-bold tracking-wider">Email</p>
                <p className="font-mono font-bold text-white text-xs truncate">mohammed.elbaraka@emines.um6p.ma</p>
              </div>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-teachy-pink hover:bg-teachy-pink-hover text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-pink-500/25 transition-all transform hover:scale-105"
          >
            <span>{t('about.joinBtn')}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Link>
        </div>

      </div>
    </div>
  );
};
