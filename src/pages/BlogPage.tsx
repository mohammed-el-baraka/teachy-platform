import React from 'react';
import { Link } from 'react-router-dom';
import { DecorativeBackground } from '../components/DecorativeBackground';
import { Sparkles, Calendar, Clock, ArrowRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const articles = [
    {
      id: 1,
      title: 'How 15 Minutes of Daily Native Conversation Beats 1 Year of Grammar Apps',
      category: 'Fluency Science',
      date: 'May 12, 2024',
      readTime: '4 min read',
      excerpt: 'Research from cognitive linguistics proves that real-time vocal feedback creates faster neuro-pathways than passive flashcard taps.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 2,
      title: 'Breaking the Fear of Making Mistakes When Speaking a Foreign Language',
      category: 'Speaking Confidence',
      date: 'May 8, 2024',
      readTime: '5 min read',
      excerpt: 'Practical psychological techniques to quiet your inner perfectionist and start communicating with ease and humor.',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 3,
      title: 'The Top 10 Everyday English Idioms Native Speakers Use Constantly',
      category: 'Vocabulary & Slang',
      date: 'April 29, 2024',
      readTime: '3 min read',
      excerpt: 'Master expressions like "hit the nail on the head", "under the weather", and "cut corners" to sound authentically natural.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-10 px-4 sm:px-6 lg:px-8">
      <DecorativeBackground showRibbon={false} />

      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teachy-lavender text-teachy-purple text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Teachy Learning Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-teachy-dark">
            Language Tips &amp; Stories
          </h1>
          <p className="text-sm text-gray-600">
            Actionable advice, conversational science, and learning strategies curated by our native tutors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-teachy-purple text-[11px] font-bold px-3 py-1 rounded-full">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {art.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {art.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-teachy-dark group-hover:text-teachy-purple transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{art.excerpt}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teachy-purple group-hover:text-teachy-pink transition-colors"
                >
                  <span>Practice with a tutor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
