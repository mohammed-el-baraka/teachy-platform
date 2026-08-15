import React from 'react';
import { Link } from 'react-router-dom';
import { TeachyLogo } from './TeachyLogo';
import { Phone, Mail, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-purple-100/80 pt-16 pb-12 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-100">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <TeachyLogo size="lg" />
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
              Teachy connects ambitious language learners with certified native speakers for real-time 1-on-1 immersive conversation practice. Expertly designed to transform your verbal fluency.
            </p>
            <div className="space-y-2 pt-2 text-sm text-gray-700">
              <a
                href="tel:+212663181723"
                className="flex items-center gap-2.5 text-teachy-purple hover:underline font-medium"
              >
                <Phone className="w-4 h-4 text-teachy-pink" />
                <span>+212 663-181723 (Instant Demo)</span>
              </a>
              <a
                href="mailto:contact@teachy.com"
                className="flex items-center gap-2.5 text-gray-600 hover:text-teachy-purple"
              >
                <Mail className="w-4 h-4 text-teachy-purple" />
                <span>contact@teachy.com</span>
              </a>
              <div className="flex items-center gap-2.5 text-gray-500">
                <Globe className="w-4 h-4 text-emerald-500" />
                <span>Global 24/7 Live Tutors</span>
              </div>
            </div>
          </div>

          {/* Col 3: Languages */}
          <div>
            <h4 className="font-semibold text-teachy-dark text-sm tracking-wider uppercase mb-4">
              Language Courses
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
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link to="/courses" className="hover:text-teachy-purple transition-colors">
                  Browse All Courses
                </Link>
              </li>
              <li>
                <Link to="/course" className="hover:text-teachy-purple transition-colors">
                  Live Classroom Demo
                </Link>
              </li>
              <li>
                <Link to="/mypath" className="hover:text-teachy-purple transition-colors">
                  Learning Roadmap
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-teachy-purple transition-colors">
                  Session History
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-teachy-purple transition-colors">
                  Learning Blog & Tips
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teachy-purple transition-colors">
                  About Teachy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Free Class CTA */}
          <div>
            <h4 className="font-semibold text-teachy-dark text-sm tracking-wider uppercase mb-4">
              Start Speaking
            </h4>
            <div className="bg-teachy-lavender/60 p-4 rounded-2xl border border-purple-100 space-y-3">
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                Get your first 15-minute live conversation demo session for free with any native tutor.
              </p>
              <Link
                to="/signup"
                className="block text-center bg-teachy-pink hover:bg-teachy-pink-hover text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-sm transition-all transform hover:scale-[1.02]"
              >
                Claim Free Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Teachy Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-teachy-purple transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-teachy-purple transition-colors">
              Terms of Service
            </Link>
            <Link to="/about" className="hover:text-teachy-purple transition-colors">
              Cookie Policy
            </Link>
          </div>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for global learners
          </p>
        </div>
      </div>
    </footer>
  );
};
