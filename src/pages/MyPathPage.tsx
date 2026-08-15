import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { DecorativeBackground } from '../components/DecorativeBackground';
import {
  Flame,
  Clock,
  Award,
  CheckCircle2,
  Lock,
  TrendingUp,
  Target,
  Sparkles,
  Play
} from 'lucide-react';

export const MyPathPage: React.FC = () => {
  const { user, selectedCourse, activeTutor } = useAuth();

  const milestones = [
    { level: 'A1', title: 'Foundational Basics', status: 'completed', desc: 'Greetings, survival phrases, phonetic pronunciation.' },
    { level: 'A2', title: 'Elementary Dialogue', status: 'completed', desc: 'Daily routines, ordering food, basic social exchanges.' },
    { level: 'B1', title: 'Intermediate Fluency', status: 'completed', desc: 'Narrating experiences, describing plans, spontaneous discussions.' },
    { level: 'B2', title: 'Upper-Intermediate Fluency', status: 'in-progress', desc: 'Complex arguments, colloquial idioms, natural speech rhythm.' },
    { level: 'C1', title: 'Advanced Articulation', status: 'locked', desc: 'Nuanced expressions, professional debates, rapid native listening.' },
    { level: 'C2', title: 'Near-Native Mastery', status: 'locked', desc: 'Effortless colloquial mastery and accent perfection.' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-10 px-4 sm:px-6 lg:px-8">
      <DecorativeBackground showRibbon={false} />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Learner Dashboard Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teachy-purple text-white flex items-center justify-center text-2xl font-bold font-serif shadow-md shadow-purple-500/20">
              {user?.name.charAt(0) || 'M'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-teachy-dark">{user?.name || 'Learner'}&apos;s Learning Path</h1>
                <span className="text-xs bg-purple-100 text-teachy-purple font-bold px-2.5 py-0.5 rounded-full">
                  Level B2
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Target Language: <span className="font-semibold text-teachy-dark">English</span> • Native Language: <span className="font-semibold text-teachy-dark">Arabic</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center text-amber-500 font-bold">
                <Flame className="w-4 h-4 fill-amber-500" />
                <span className="text-lg font-black">{user?.streakDays || 14}</span>
              </div>
              <p className="text-[11px] text-gray-500">Day Streak</p>
            </div>

            <div className="text-center">
              <div className="flex items-center gap-1 justify-center text-teachy-purple font-bold">
                <Clock className="w-4 h-4" />
                <span className="text-lg font-black">{user?.hoursPracticed || 28.5}h</span>
              </div>
              <p className="text-[11px] text-gray-500">Live Speaking</p>
            </div>

            <div className="text-center">
              <div className="flex items-center gap-1 justify-center text-emerald-600 font-bold">
                <Award className="w-4 h-4" />
                <span className="text-lg font-black">{user?.completedLessons || 18}</span>
              </div>
              <p className="text-[11px] text-gray-500">Sessions Done</p>
            </div>
          </div>
        </div>

        {/* Next Live Session Card */}
        <div className="bg-gradient-to-r from-purple-700 via-teachy-purple to-pink-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              Next Live 1-on-1 Class Ready
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">
              {selectedCourse.title}: Conversation Practice
            </h2>
            <p className="text-xs text-purple-100">
              Tutor: <span className="font-bold">{activeTutor.name}</span> ({activeTutor.accent}) • Today&apos;s Topic: Idioms &amp; Pronunciation
            </p>
          </div>

          <Link
            to="/course"
            className="inline-flex items-center gap-2 bg-white hover:bg-purple-50 text-teachy-purple font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            <Play className="w-4 h-4 fill-teachy-purple" />
            <span>Enter Live Classroom</span>
          </Link>
        </div>

        {/* CEFR Fluency Roadmap */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md space-y-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-teachy-dark">
              CEFR Fluency Roadmap
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Your step-by-step progression from beginner conversation to near-native mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  m.status === 'completed'
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : m.status === 'in-progress'
                    ? 'bg-teachy-lavender/70 border-teachy-purple shadow-md ring-2 ring-purple-300'
                    : 'bg-gray-50/80 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-md ${
                    m.status === 'completed'
                      ? 'bg-emerald-200 text-emerald-800'
                      : m.status === 'in-progress'
                      ? 'bg-teachy-purple text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {m.level}
                  </span>

                  {m.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {m.status === 'in-progress' && <Sparkles className="w-4 h-4 text-teachy-purple animate-spin" />}
                  {m.status === 'locked' && <Lock className="w-4 h-4 text-gray-400" />}
                </div>

                <h4 className="font-bold text-sm text-teachy-dark mb-1">{m.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Accuracy & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-md space-y-4">
            <h3 className="text-base font-bold text-teachy-dark flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teachy-purple" />
              <span>Speaking Skill Breakdown</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Pronunciation Accuracy</span>
                  <span className="text-teachy-purple font-bold">92%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-teachy-purple h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Conversational Flow & Rhythm</span>
                  <span className="text-teachy-purple font-bold">88%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-teachy-pink h-2 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Vocabulary Range & Slang</span>
                  <span className="text-teachy-purple font-bold">85%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Listening Comprehension</span>
                  <span className="text-teachy-purple font-bold">94%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-md space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-teachy-dark flex items-center gap-2">
                <Target className="w-4 h-4 text-teachy-pink" />
                <span>Weekly Speaking Goal</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                You committed to 3 live sessions (135 mins) per week.
              </p>
              
              <div className="mt-4 p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-teachy-dark">2 of 3 Sessions Completed</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">1 session left to maintain your 14-day streak</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-teachy-purple">66%</span>
                </div>
              </div>
            </div>

            <Link
              to="/course"
              className="w-full text-center bg-teachy-purple hover:bg-teachy-purple-dark text-white text-xs font-bold py-3 rounded-full shadow-md transition-all block"
            >
              Start Final Session of the Week
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
