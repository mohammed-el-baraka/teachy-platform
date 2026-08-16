import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SquiggleUnderline } from '../components/SquiggleUnderline';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { signup } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/course');
      }, 1000);
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <DecorativeBackground showRibbon={true} />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Pitch Branding Copy */}
        <div className={`lg:col-span-6 space-y-6 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-teachy-dark tracking-tight leading-[1.15]">
            {t('hero.title.join')}{' '}
            <SquiggleUnderline color="#FBBF24">{t('hero.title.online')}</SquiggleUnderline>{' '}
            <span className="text-teachy-purple block mt-1">{t('hero.title.courses')}</span>
          </h1>

          <p className="text-base text-gray-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
            {t('auth.signUpDesc')}
          </p>

          <div className="hidden lg:flex items-center gap-6 pt-4 text-xs font-semibold text-gray-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free 15-min trial class
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant tutor matching
            </span>
          </div>
        </div>

        {/* Right Side: Rounded Lavender Card */}
        <div className={`lg:col-span-6 flex flex-col items-center ${isRTL ? 'lg:items-start' : 'lg:items-end'} relative`}>
          
          <div className="w-full max-w-md bg-teachy-lavender rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-purple-200/70 relative z-10 transition-all">
            
            {/* Card Header with Squiggle Underline */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-teachy-dark font-display tracking-tight">
                {t('auth.createAccount')}
              </h2>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                {t('auth.signUpDesc')}
              </p>
            </div>

            {/* Error & Success Feedback */}
            {error && (
              <div className="mb-5 p-3 rounded-2xl bg-rose-100 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-5 p-3 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Account created! Redirecting to classroom...</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-teachy-dark uppercase tracking-wider mb-1.5">
                  {t('auth.fullName')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mohammed El Baraka"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-purple-200 text-sm text-teachy-dark focus:outline-none focus:ring-2 focus:ring-teachy-purple shadow-inner transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-teachy-dark uppercase tracking-wider mb-1.5">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mohammed.elbaraka@emines.um6p.ma"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-purple-200 text-sm text-teachy-dark focus:outline-none focus:ring-2 focus:ring-teachy-purple shadow-inner transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-teachy-dark uppercase tracking-wider mb-1.5">
                  {t('auth.password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-purple-200 text-sm text-teachy-dark focus:outline-none focus:ring-2 focus:ring-teachy-purple shadow-inner transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-teachy-pink hover:bg-teachy-pink-hover text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-200 transform hover:-translate-y-0.5 text-sm disabled:opacity-50"
              >
                {loading ? 'Creating...' : t('auth.submitSignUp')}
              </button>
            </form>

            {/* Footer link to login */}
            <div className="text-center mt-6 text-xs text-gray-600">
              <span>{t('auth.haveAccount')} </span>
              <Link to="/login" className="font-bold text-teachy-purple hover:underline">
                {t('nav.signIn')}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
