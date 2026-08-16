import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SquiggleUnderline } from '../components/SquiggleUnderline';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { AlertCircle, CheckCircle2, Zap } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/course');
      }, 700);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setEmail('mohammed.elbaraka@emines.um6p.ma');
    setPassword('demo123456');
    setLoading(true);
    await login('mohammed.elbaraka@emines.um6p.ma', 'demo123456');
    setSuccess(true);
    setTimeout(() => {
      navigate('/course');
    }, 500);
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
            {t('auth.signInDesc')}
          </p>

          <div className="pt-2">
            <button
              onClick={handleQuickDemo}
              className="inline-flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-teachy-purple px-4 py-2 rounded-full text-xs font-bold transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>1-Click Demo Login</span>
            </button>
          </div>
        </div>

        {/* Right Side: Rounded Lavender Card */}
        <div className={`lg:col-span-6 flex flex-col items-center ${isRTL ? 'lg:items-start' : 'lg:items-end'} relative`}>
          
          <div className="w-full max-w-md bg-teachy-lavender rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-purple-200/70 relative z-10 transition-all">
            
            {/* Card Header with Squiggle Underline */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-teachy-dark font-display tracking-tight leading-snug">
                {t('nav.signIn')}{' '}
                <SquiggleUnderline color="#FBBF24">to</SquiggleUnderline>{' '}
                Teachy
              </h2>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                {t('auth.welcomeBack')}
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
                <span>Successfully authenticated! Launching classroom...</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-teachy-dark uppercase tracking-wider mb-1.5">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
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
                className="w-full mt-4 bg-teachy-purple hover:bg-teachy-purple-dark text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200 transform hover:-translate-y-0.5 text-sm disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : t('auth.submitSignIn')}
              </button>
            </form>

            {/* Footer link to sign up */}
            <div className="text-center mt-6 text-xs text-gray-600">
              <span>{t('auth.noAccount')} </span>
              <Link to="/signup" className="font-bold text-teachy-purple hover:underline">
                {t('nav.getStarted')}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
