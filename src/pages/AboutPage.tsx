import React from 'react';
import { Link } from 'react-router-dom';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { TeachyLogo } from '../components/TeachyLogo';
import { Sparkles, Heart, Users, Target, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8">
      <DecorativeBackground showRibbon={true} />

      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teachy-lavender text-teachy-purple text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Our Vision & Mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-teachy-dark">
            About <span className="text-teachy-purple">teachy</span>
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Teachy facilitates language learning by connecting ambitious learners with certified native speakers for personalized, interactive verbal immersion.
          </p>
        </div>

        {/* Brand Story Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
            <TeachyLogo size="xl" />
            <div>
              <h2 className="text-2xl font-serif font-bold text-teachy-dark">
                Born to Solve the Real Spoken Language Barrier
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Acte d&apos;Entreprendre Project • UM6P / EMINES School of Industrial Management
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
            <p>
              Traditional language learning often traps students in repetitive grammar drills and passive vocabulary lists. When it comes time to speak in real life — during interviews, travel, or international collaboration — learners freeze up due to lack of spontaneous practice.
            </p>
            <p>
              Teachy bridges this gap by making 1-on-1 native conversation practice as intuitive and accessible as a single tap. Our expert curriculum ensures every minute spent in class directly compounds your verbal confidence and natural accent.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
              <Users className="w-5 h-5 text-teachy-purple mb-2" />
              <h3 className="font-bold text-xs text-teachy-dark">Learner-Centric</h3>
              <p className="text-[11px] text-gray-500 mt-1">Tailored conversation topics adapted to your unique professional &amp; personal interests.</p>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100">
              <Heart className="w-5 h-5 text-teachy-pink mb-2" />
              <h3 className="font-bold text-xs text-teachy-dark">Native Immersion</h3>
              <p className="text-[11px] text-gray-500 mt-1">Live speaking with verified native speakers who provide constructive, friendly feedback.</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <Target className="w-5 h-5 text-emerald-600 mb-2" />
              <h3 className="font-bold text-xs text-teachy-dark">Measurable Fluency</h3>
              <p className="text-[11px] text-gray-500 mt-1">Detailed pronunciation scores, vocabulary notes, and CEFR roadmap tracking.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-6">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-teachy-pink hover:bg-teachy-pink-hover text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-pink-500/25 transition-all transform hover:scale-105"
          >
            <span>Join Teachy Today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
