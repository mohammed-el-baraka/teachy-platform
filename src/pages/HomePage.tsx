import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SquiggleUnderline } from '../components/SquiggleUnderline';
import { PlusGrid } from '../components/PlusGrid';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { CourseCard } from '../components/CourseCard';
import { TutorCard } from '../components/TutorCard';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Phone,
  ArrowRight,
  Sparkles,
  Video,
  CheckCircle2,
  Play,
  Award
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { courses, tutors, isAuthenticated } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [activeLanguageFilter, setActiveLanguageFilter] = useState('All');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const languages = ['All', 'English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic'];

  const filteredCourses = activeLanguageFilter === 'All'
    ? courses
    : courses.filter((c) => c.language.toLowerCase() === activeLanguageFilter.toLowerCase());

  return (
    <div className="relative min-h-screen">
      <DecorativeBackground showRibbon={true} />

      {/* HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px]">
            
            {/* Left Column: Copy & Actions */}
            <div className={`lg:col-span-6 space-y-6 sm:space-y-8 z-10 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teachy-lavender border border-purple-200/80 text-xs font-bold text-teachy-purple animate-pulse-subtle">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('hero.badge')}</span>
              </div>

              {/* Main Headline with Squiggle Underline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-teachy-dark tracking-tight leading-[1.15]">
                {t('hero.title.join')}{' '}
                <SquiggleUnderline color="#FBBF24">{t('hero.title.online')}</SquiggleUnderline>{' '}
                <span className="text-teachy-purple block sm:inline">{t('hero.title.courses')}</span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('hero.subtitle')}
              </p>

              {/* Action Button & Contact Info */}
              <div className="space-y-4 pt-2">
                <div className={`flex flex-col sm:flex-row items-center justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} gap-4`}>
                  <Link
                    to={isAuthenticated ? "/course" : "/signup"}
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-teachy-pink hover:bg-teachy-pink-hover text-white text-base font-bold px-8 py-4 rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02]"
                  >
                    <span>{t('hero.cta.register')}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Link>

                  <Link
                    to="/course"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-teachy-lavender/60 text-teachy-purple border border-purple-200 text-sm font-bold px-6 py-4 rounded-full shadow-sm transition-all"
                  >
                    <Play className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} fill-teachy-purple`} />
                    <span>{t('hero.cta.watchDemo')}</span>
                  </Link>
                </div>

                {/* Instant Demo Phone Line */}
                <div className="pt-2">
                  <a
                    href="tel:0666774426"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-teachy-purple transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-teachy-purple group-hover:text-white transition-colors">
                      <Phone className="w-3.5 h-3.5 text-teachy-purple group-hover:text-white" />
                    </div>
                    <span>{t('hero.demoPhoneText')}</span>
                    <span className="text-teachy-purple font-mono font-bold text-sm tracking-wide">
                      0666774426
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Student & Floating Flags */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Background Plus Grid */}
              <div className="absolute -top-4 right-10 z-0">
                <PlusGrid rows={5} cols={5} color="#F472B6" size="md" />
              </div>

              {/* Student Photo Card / Container */}
              <div className="relative z-10 max-w-md w-full flex justify-center">
                
                {/* Student Hero Image */}
                <div className="relative group">
                  <img
                    src="./assets/hero_student_clean.png"
                    alt="Teachy Student Learning Languages"
                    className="w-full max-w-[340px] sm:max-w-[400px] h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800";
                    }}
                  />

                  {/* Live Tutor Match Floating Card */}
                  <div className={`absolute -bottom-6 ${isRTL ? '-right-2 sm:-right-6' : '-left-2 sm:-left-6'} bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-purple-100 flex items-center gap-3 animate-pulse-subtle`}>
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <p className="text-xs font-bold text-teachy-dark">{t('hero.liveTutorsReady')}</p>
                      </div>
                      <p className="text-[11px] text-gray-500">{t('hero.instantPractice')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Plus Grid Motif */}
              <div className="absolute -bottom-10 left-12 z-0 opacity-60">
                <PlusGrid rows={4} cols={5} color="#A78BFA" size="sm" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS & CREDIBILITY BAR */}
      <section className="py-8 bg-white/80 border-y border-purple-100/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-teachy-purple font-serif">10,000+</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mt-1">{t('stats.learners')}</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-teachy-purple font-serif">500+</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mt-1">{t('stats.tutors')}</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-teachy-purple font-serif">50,000+</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mt-1">{t('stats.hours')}</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-teachy-purple font-serif">98%</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mt-1">{t('stats.satisfaction')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TEACHY WORKS - 3 STEP INTERACTIVE METHOD */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teachy-purple mb-2">
              {t('method.badge')}
            </h2>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-teachy-dark">
              {t('method.title')}
            </h3>
            <p className="text-sm text-gray-600 mt-3">
              {t('method.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm hover:shadow-lg transition-all relative group">
              <div className="w-12 h-12 rounded-2xl bg-teachy-lavender text-teachy-purple flex items-center justify-center font-black text-lg mb-6 group-hover:bg-teachy-purple group-hover:text-white transition-colors">
                1
              </div>
              <h4 className="text-xl font-bold text-teachy-dark mb-2">{t('method.card1.title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('method.card1.desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm hover:shadow-lg transition-all relative group">
              <div className="w-12 h-12 rounded-2xl bg-teachy-lavender text-teachy-purple flex items-center justify-center font-black text-lg mb-6 group-hover:bg-teachy-purple group-hover:text-white transition-colors">
                2
              </div>
              <h4 className="text-xl font-bold text-teachy-dark mb-2">{t('method.card2.title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('method.card2.desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm hover:shadow-lg transition-all relative group">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-teachy-pink flex items-center justify-center font-black text-lg mb-6 group-hover:bg-teachy-pink group-hover:text-white transition-colors">
                3
              </div>
              <h4 className="text-xl font-bold text-teachy-dark mb-2">{t('method.card3.title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('method.card3.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LANGUAGE COURSES EXPLORER */}
      <section className="py-16 bg-gradient-to-b from-transparent via-purple-50/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teachy-purple">
                {t('courses.home.badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-teachy-dark mt-1">
                {t('courses.home.title')}
              </h2>
            </div>

            {/* Language filter pills */}
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguageFilter(lang)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeLanguageFilter === lang
                      ? 'bg-teachy-purple text-white shadow-md shadow-purple-500/20'
                      : 'bg-white text-gray-700 hover:bg-teachy-lavender border border-purple-100'
                  }`}
                >
                  {lang === 'All' ? t('courses.filter.all') : lang}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-teachy-purple hover:underline"
            >
              <span>{t('courses.viewAll')}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* LIVE TUTORS SPOTLIGHT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t('tutors.home.badge')}
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-teachy-dark">
                {t('tutors.home.title')}
              </h2>
            </div>
            <p className="text-xs text-gray-500 max-w-sm">
              {t('tutors.home.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE FLUENCY QUICK CHECK */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teachy-purple to-teachy-purple-dark text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            {/* Background sparkle motifs */}
            <div className="absolute top-4 right-6 opacity-20 pointer-events-none">
              <PlusGrid rows={5} cols={5} color="#FFFFFF" size="sm" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-4 backdrop-blur-sm">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('quiz.badge')}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3">
                {t('quiz.title')}
              </h3>
              <p className="text-sm text-purple-100 mb-6">
                {t('hero.subtitle')}
              </p>

              {/* Quiz Buttons */}
              <div className="space-y-3">
                {[
                  t('quiz.opt1'),
                  t('quiz.opt2'),
                  t('quiz.opt3'),
                  t('quiz.opt4'),
                ].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuizAnswer(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl text-sm font-medium transition-all flex items-center justify-between ${
                      quizAnswer === idx
                        ? 'bg-white text-teachy-purple font-bold shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <span>{option}</span>
                    {quizAnswer === idx && <CheckCircle2 className="w-5 h-5 text-teachy-purple flex-shrink-0" />}
                  </button>
                ))}
              </div>

              {quizAnswer !== null && (
                <div className="mt-6 p-4 rounded-2xl bg-white/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    🎯 {t('quiz.result')}
                  </p>
                  <button
                    onClick={() => navigate('/signup')}
                    className="mt-3 inline-flex items-center gap-2 bg-teachy-pink hover:bg-teachy-pink-hover text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all"
                  >
                    <span>{t('quiz.cta')}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-20 text-center relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-teachy-dark leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-teachy-pink hover:bg-teachy-pink-hover text-white text-base font-bold px-8 py-4 rounded-full shadow-lg shadow-pink-500/25 transition-all transform hover:scale-[1.02]"
            >
              <span>{t('cta.button')}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Link>
            <a
              href="tel:0666774426"
              className="text-sm font-semibold text-gray-700 hover:text-teachy-purple flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-teachy-purple" />
              <span>0666774426</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
