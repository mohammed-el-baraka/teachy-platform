import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DecorativeBackground } from '../components/DecorativeBackground';
import {
  Award,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  Star,
  Sparkles
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { history } = useAuth();
  const [selectedSessionId, setSelectedSessionId] = useState(history[0]?.id);

  const selectedSession = history.find((h) => h.id === selectedSessionId) || history[0];

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-10 px-4 sm:px-6 lg:px-8">
      <DecorativeBackground showRibbon={false} />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teachy-lavender text-teachy-purple text-xs font-bold mb-2">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Session History & Feedback</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-teachy-dark">
              Past Live Conversation Sessions
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Review detailed tutor feedback, pronunciation notes, and vocabulary suggestions from your 1-on-1 calls.
            </p>
          </div>
        </div>

        {/* Layout: Left List + Right Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Session List */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Completed Classes ({history.length})
            </h2>

            <div className="space-y-3">
              {history.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                    selectedSessionId === session.id
                      ? 'bg-white border-teachy-purple shadow-md ring-2 ring-purple-200'
                      : 'bg-white/80 hover:bg-white border-purple-100 hover:shadow-sm'
                  }`}
                >
                  <img
                    src={session.tutorAvatar}
                    alt={session.tutorName}
                    className="w-12 h-12 rounded-xl object-cover border border-purple-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-teachy-dark truncate">
                        {session.courseTitle}
                      </h3>
                      <span className="text-xs">{session.flag}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium mt-0.5">
                      Tutor: {session.tutorName}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {session.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {session.duration}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Detailed Tutor Report */}
          {selectedSession && (
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedSession.flag}</span>
                  <div>
                    <h2 className="text-xl font-bold text-teachy-dark">{selectedSession.courseTitle}</h2>
                    <p className="text-xs text-gray-500">
                      Topic: <span className="font-medium text-teachy-purple">{selectedSession.topic}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100">
                    <span className="text-[10px] text-gray-500 font-semibold block">Pronunciation</span>
                    <span className="text-sm font-black text-teachy-purple">{selectedSession.pronunciationScore}%</span>
                  </div>
                  <div className="text-center bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                    <span className="text-[10px] text-gray-500 font-semibold block">Fluency</span>
                    <span className="text-sm font-black text-emerald-600">{selectedSession.fluencyScore}%</span>
                  </div>
                </div>
              </div>

              {/* Tutor Feedback */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teachy-dark flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-teachy-purple" />
                  <span>Tutor Assessment ({selectedSession.tutorName})</span>
                </h3>
                <div className="p-4 bg-teachy-lavender/50 rounded-2xl border border-purple-100 text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  &quot;{selectedSession.feedback}&quot;
                </div>
              </div>

              {/* Notes & Key Takeaways */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teachy-dark flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Key Points & Corrections</span>
                </h3>
                <div className="space-y-2">
                  {selectedSession.notes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-700 flex items-start gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => alert('Lesson summary downloaded as PDF.')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-purple-200 text-teachy-purple font-bold hover:bg-teachy-lavender transition-colors"
                >
                  Download Lesson Report (PDF)
                </button>

                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>Session Rating: 5/5 Stars</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
