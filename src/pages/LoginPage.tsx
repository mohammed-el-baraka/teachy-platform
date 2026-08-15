import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SquiggleUnderline } from '../components/SquiggleUnderline';
import { PlusGrid } from '../components/PlusGrid';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
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
    setEmail('mohammed@teachy.com');
    setPassword('demo123456');
    setLoading(true);
    await login('mohammed@teachy.com', 'demo123456');
    setSuccess(true);
    setTimeout(() => {
      navigate('/course');
    }, 500);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <DecorativeBackground showRibbon={true} />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Pitch Branding Copy (Slide 12 Exact Representation) */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-teachy-dark tracking-tight leading-[1.15]">
            Join Our{' '}
            <SquiggleUnderline color="#FBBF24">Online</SquiggleUnderline>{' '}
            <span className="text-teachy-purple block mt-1">Language Courses</span>
          </h1>

          <p className="text-base text-gray-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Welcome back! Log in to continue your live 1-on-1 language lessons with your favorite native tutors.
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

        {/* Right Side: Rounded Lavender Card (Slide 12 Exact Representation) */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end relative">
          
          <div className="w-full max-w-md bg-teachy-lavender rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-purple-200/70 relative z-10 transition-all">
            
            {/* Card Header with Squiggle Underline */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-teachy-dark font-display tracking-tight leading-snug">
                Log in{' '}
                <SquiggleUnderline color="#FBBF24">to your</SquiggleUnderline>{' '}
                account
              </h2>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                Enter your credentials below
              </p>
            </div>

            {/* Feedback Alerts */}
            {error && (
              <div className="mb-5 p-3 rounded-2xl bg-rose-100 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-5 p-3 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>Logging in... Redirecting to course session</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-white border border-purple-100 text-teachy-dark text-sm focus:outline-none focus:ring-2 focus:ring-teachy-purple focus:border-transparent transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-white border border-purple-100 text-teachy-dark text-sm focus:outline-none focus:ring-2 focus:ring-teachy-purple focus:border-transparent transition-all shadow-sm"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teachy-purple hover:bg-teachy-purple-dark text-white font-bold py-4 px-6 rounded-full text-sm shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  <span>{loading ? 'Logging in...' : 'Log in'}</span>
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </form>

            {/* Bottom Link: don't have an account? create it (Slide 12) */}
            <div className="mt-6 text-center">
              <Link
                to="/signup"
                className="text-xs font-semibold text-teachy-purple hover:underline"
              >
                don&apos;t have an account? <span className="font-bold underline">create it</span>
              </Link>
            </div>
          </div>

          {/* Denser Plus Grid Motif at Bottom-Left / Corner of Card (Slide 12 Exact Representation) */}
          <div className="absolute -bottom-8 left-8 sm:left-4 z-0">
            <PlusGrid rows={5} cols={5} color="#F472B6" size="sm" />
          </div>

        </div>

      </div>
    </div>
  );
};
