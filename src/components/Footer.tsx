import React from 'react';
import { Link } from 'react-router-dom';
import { TeachyLogo } from './TeachyLogo';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { GithubIcon } from './GithubIcon';
import { Phone, Mail, Globe, ExternalLink, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-purple-100/80 pt-16 pb-12 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Demo Version Notification Box */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border border-purple-100/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-teachy-purple text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xs font-bold text-teachy-purple uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded-md">
                  {t('demo.badge')}
                </span>
                <span className="text-xs font-bold text-teachy-dark">
                  Teachy Platform
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                {t('demo.banner')}
              </p>
            </div>
          </div>

          <a
            href="https://github.com/mohammed-el-baraka/teachy-platform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-teachy-dark hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md transition-all transform hover:scale-[1.02] flex-shrink-0"
          >
            <GithubIcon className="w-4 h-4" />
            <span>{t('demo.viewGithub')}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-100">
          {/* Col 1 & 2: Brand Info & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <TeachyLogo size="lg" />
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
              {t('footer.brandDesc')}
            </p>
            
            {/* Direct Contact Details */}
            <div className="space-y-2.5 pt-2 text-sm text-gray-700">
              <a
                href="tel:0666774426"
                className="flex items-center gap-2.5 text-teachy-purple hover:underline font-semibold"
              >
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-teachy-pink flex-shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>0666774426</span>
              </a>

              <a
                href="mailto:mohammed.elbaraka@emines.um6p.ma"
                className="flex items-center gap-2.5 text-gray-700 hover:text-teachy-purple transition-colors font-medium break-all"
              >
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-teachy-purple flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>mohammed.elbaraka@emines.um6p.ma</span>
              </a>

              <div className="flex items-center gap-2.5 text-gray-500 text-xs pt-1">
                <Globe className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t('footer.tutors247')}</span>
              </div>
            </div>

            {/* Language Switcher in Footer */}
            <div className="pt-2">
              <LanguageSwitcher variant="footer" />
            </div>
          </div>

          {/* Col 3: Languages */}
          <div>
            <h4 className="font-semibold text-teachy-dark text-sm tracking-wider uppercase mb-4">
              {t('footer.coursesHeading')}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link to="/courses" className="hover:text-teachy-purple transition-colors flex items-center gap-2">
                  <span>🇺🇸</span> English Fluency
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teachy-purple transition-colors flex items-center gap-2">
                  <span>🇪🇸</span> Spanish Conversation
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teachy-purple transition-colors flex items-center gap-2">
                  <span>🇫🇷</span> French Immersion
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teachy-purple transition-colors flex items-center gap-2">
                  <span>🇩🇪</span> German Mastery
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teachy-purple transition-colors flex items-center gap-2">
                  <span>🇨🇳</span> Mandarin Chinese
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teachy-purple transition-colors flex items-center gap-2">
                  <span>🇲🇦</span> Arabic & Darija
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div>
            <h4 className="font-semibold text-teachy-dark text-sm tracking-wider uppercase mb-4">
              {t('footer.platformHeading')}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link to="/courses" className="hover:text-teachy-purple transition-colors">
                  {t('nav.courses')}
                </Link>
              </li>
              <li>
                <Link to="/course" className="hover:text-teachy-purple transition-colors">
                  {t('nav.liveSession')}
                </Link>
              </li>
              <li>
                <Link to="/mypath" className="hover:text-teachy-purple transition-colors">
                  {t('nav.myPath')}
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-teachy-purple transition-colors">
                  {t('nav.history')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-teachy-purple transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teachy-purple transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Free Class CTA */}
          <div>
            <h4 className="font-semibold text-teachy-dark text-sm tracking-wider uppercase mb-4">
              {t('footer.startSpeakingHeading')}
            </h4>
            <div className="bg-teachy-lavender/60 p-4 rounded-2xl border border-purple-100 space-y-3">
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                {t('footer.freeClassText')}
              </p>
              <Link
                to="/signup"
                className="block text-center bg-teachy-pink hover:bg-teachy-pink-hover text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-sm transition-all transform hover:scale-[1.02]"
              >
                {t('footer.claimFree')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2024 Mohammed El Baraka. {t('footer.rights')}</p>
          
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-teachy-purple transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/about" className="hover:text-teachy-purple transition-colors">
              {t('footer.terms')}
            </Link>
            <a
              href="https://github.com/mohammed-el-baraka/teachy-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teachy-purple hover:underline font-semibold flex items-center gap-1"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>{t('footer.demoFull')}</span>
            </a>
          </div>

          <p className="font-semibold text-teachy-dark bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            {t('footer.madeBy')}
          </p>
        </div>
      </div>
    </footer>
  );
};
