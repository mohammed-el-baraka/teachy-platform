import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CourseCard } from '../components/CourseCard';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { Search, Filter, Sparkles, BookOpen } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { courses } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const languages = ['All', 'English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filtered = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.language.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLanguage =
      selectedLanguage === 'All' || course.language.toLowerCase() === selectedLanguage.toLowerCase();

    const matchesLevel =
      selectedLevel === 'All' || course.level === selectedLevel || course.level === 'All Levels';

    return matchesSearch && matchesLanguage && matchesLevel;
  });

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-10 px-4 sm:px-6 lg:px-8">
      <DecorativeBackground showRibbon={false} />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teachy-lavender text-teachy-purple text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Interactive Curriculum</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-teachy-dark">
            Explore All Language Courses
          </h1>
          <p className="text-sm text-gray-600">
            From foundational pronunciation to advanced business fluency, choose your path and practice live with certified native tutors.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-purple-100 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses, topics, keywords..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-purple-100 text-xs text-teachy-dark focus:outline-none focus:ring-2 focus:ring-teachy-purple"
              />
            </div>

            {/* Language Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    selectedLanguage === lang
                      ? 'bg-teachy-purple text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-teachy-lavender'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100 text-xs">
            <span className="font-semibold text-gray-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Proficiency Level:
            </span>
            <div className="flex gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedLevel === lvl
                      ? 'bg-purple-100 text-teachy-purple font-bold'
                      : 'text-gray-500 hover:text-teachy-purple'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-purple-100 p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-700">No matching courses found</h3>
            <p className="text-xs text-gray-500">Try adjusting your search terms or filter selections.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLanguage('All');
                setSelectedLevel('All');
              }}
              className="mt-2 text-xs font-bold text-teachy-purple hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
