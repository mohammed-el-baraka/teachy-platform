import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SquiggleUnderline } from '../components/SquiggleUnderline';
import { PlusGrid } from '../components/PlusGrid';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { signup } = useAuth();
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
        
        {/* Left Side: Pitch Branding Copy (Slide 11 Exact Representation) */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-teachy-dark tracking-tight leading-[1.15]">
            Join Our{' '}
            <SquiggleUnderline color="#FBBF24">Online</SquiggleUnderline>{' '}
            <span className="text-teachy-purple block mt-1">Language Courses</span>
            <span className="text-teachy-purple-dark text-3xl sm:text-4xl font-serif font-normal block mt-2">
              en teachy
            </span>
          </h1>

          <p className="text-base text-gray-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Create your account in seconds and unlock live 1-on-1 conversation sessions with native speakers worldwide.
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

        {/* Right Side: Rounded Lavender Card (Slide 11 Exact Representation) */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end relative">
          
          <div className="w-full max-w-md bg-teachy-lavender rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-purple-200/70 relative z-10 transition-all">
            
            {/* Card Header with Squiggle Underline */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-teachy-dark font-display tracking-tight">
                Create New{' '}
                <SquiggleUnderline color="#FBBF24">Account</SquiggleUnderline>
              </h2>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                Start your language fluency journey today
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
              <div className="mb-5 p-3 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>Account created! Redirecting to live classroom...</span>
              </div>
            )}

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-white border border-purple-100 text-teachy-dark text-sm focus:outline-none focus:ring-2 focus:ring-teachy-purple focus:border-transparent transition-all shadow-sm"
                />
              </div>

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
                  placeholder="Create a strong password"
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
                  <span>{loading ? 'Creating Account...' : 'Sign Up'}</span>
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </form>

            {/* Bottom Link: Already Registered? Login */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-xs font-semibold text-teachy-purple hover:underline"
              >
                Already Registered? <span className="font-bold">Login</span>
              </Link>
            </div>
          </div>

          {/* Plus Grid Decoration at Bottom of Form (Slide 11) */}
          <div className="mt-4 -mr-4 z-0">
            <PlusGrid rows={2} cols={6} color="#F472B6" size="sm" />
          </div>

        </div>

      </div>
    </div>
  );
};
