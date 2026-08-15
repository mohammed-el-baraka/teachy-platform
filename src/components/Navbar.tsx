import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { TeachyLogo } from './TeachyLogo';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setAccountMenuOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 py-1.5 px-3 rounded-full ${
      isActive
        ? 'text-teachy-purple font-semibold bg-teachy-lavender/50'
        : 'text-teachy-dark/80 hover:text-teachy-purple hover:bg-teachy-lavender/30'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-100/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Left */}
          <div className="flex-shrink-0">
            <TeachyLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {isAuthenticated ? (
              <>
                <NavLink to="/" className={navLinkClass} end>
                  Home
                </NavLink>
                <NavLink to="/courses" className={navLinkClass}>
                  Courses
                </NavLink>
                <NavLink to="/course" className={navLinkClass}>
                  Live Session
                </NavLink>
                <NavLink to="/mypath" className={navLinkClass}>
                  My path
                </NavLink>
                <NavLink to="/history" className={navLinkClass}>
                  History
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" className={navLinkClass} end>
                  Home
                </NavLink>
                <NavLink to="/courses" className={navLinkClass}>
                  Courses
                </NavLink>
                <NavLink to="/blog" className={navLinkClass}>
                  Blog
                </NavLink>
                <NavLink to="/about" className={navLinkClass}>
                  About
                </NavLink>
              </>
            )}
          </nav>

          {/* Right Action Button / Account Pill */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center space-x-2 bg-teachy-purple hover:bg-teachy-purple-dark text-white px-4 py-2 rounded-full text-sm font-medium shadow-md shadow-purple-500/20 transition-all duration-200 transform hover:scale-[1.02]"
                  aria-label="User Account Menu"
                >
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </span>
                  <span>my account</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${accountMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Account Dropdown Modal */}
                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-purple-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-bold text-teachy-dark">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs font-medium text-teachy-purple bg-teachy-lavender px-2.5 py-1 rounded-lg">
                        <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{user.streakDays} Day Streak 🔥</span>
                      </div>
                    </div>

                    <div className="px-2 py-2 space-y-1">
                      <Link
                        to="/course"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-teachy-lavender/50 rounded-xl transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-teachy-purple" />
                        <span>English Course (Live)</span>
                      </Link>
                      <Link
                        to="/mypath"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-teachy-lavender/50 rounded-xl transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-teachy-purple" />
                        <span>My Learning Path</span>
                      </Link>
                      <Link
                        to="/history"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-teachy-lavender/50 rounded-xl transition-colors"
                      >
                        <Award className="w-4 h-4 text-teachy-purple" />
                        <span>Session History & Feedback</span>
                      </Link>
                    </div>

                    <div className="px-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-teachy-dark hover:text-teachy-purple px-4 py-2 rounded-full transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-teachy-purple hover:bg-teachy-purple-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-purple-500/20 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-purple-500/30"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-teachy-purple hover:bg-teachy-lavender/50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-100 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-base font-medium text-gray-800 hover:bg-teachy-lavender"
                >
                  Home
                </Link>
                <Link
                  to="/courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-base font-medium text-gray-800 hover:bg-teachy-lavender"
                >
                  Courses
                </Link>
                <Link
                  to="/course"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-base font-medium text-teachy-purple font-semibold bg-teachy-lavender/40"
                >
                  Live Session (Call)
                </Link>
                <Link
                  to="/mypath"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-base font-medium text-gray-800 hover:bg-teachy-lavender"
                >
                  My path
                </Link>
                <Link
                  to="/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-base font-medium text-gray-800 hover:bg-teachy-lavender"
                >
                  History
                </Link>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-teachy-purple" />
                    <span className="text-sm font-semibold">{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-rose-600 font-semibold px-3 py-1.5 rounded-lg bg-rose-50"
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-base font-medium text-gray-800 hover:bg-teachy-lavender"
                >
                  Home
                </Link>
                <Link
                  to="/courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-base font-medium text-gray-800 hover:bg-teachy-lavender"
                >
                  Courses
                </Link>
                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-base font-medium text-gray-800 hover:bg-teachy-lavender"
                >
                  Blog
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-base font-medium text-gray-800 hover:bg-teachy-lavender"
                >
                  About
                </Link>
                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-full border border-purple-200 text-sm font-semibold text-teachy-purple"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-full bg-teachy-purple text-white text-sm font-semibold shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
