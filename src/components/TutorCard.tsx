import React, { useState } from 'react';
import { Tutor } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Volume2, VolumeX, CheckCircle, Video } from 'lucide-react';

interface TutorCardProps {
  tutor: Tutor;
}

export const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const { setActiveTutor, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      setIsPlayingAudio(true);
      const textToSpeak = tutor.sampleAudioText.replace(/['"]/g, '');
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Attempt to pick appropriate language voice
      if (tutor.nativeLanguage === 'French') utterance.lang = 'fr-FR';
      else if (tutor.nativeLanguage === 'Spanish') utterance.lang = 'es-ES';
      else if (tutor.nativeLanguage === 'German') utterance.lang = 'de-DE';
      else if (tutor.nativeLanguage === 'Chinese') utterance.lang = 'zh-CN';
      else if (tutor.nativeLanguage === 'Arabic') utterance.lang = 'ar-SA';
      else utterance.lang = 'en-GB';

      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  const handleBook = () => {
    setActiveTutor(tutor);
    if (isAuthenticated) {
      navigate('/course');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm hover:shadow-xl hover:border-teachy-purple/30 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Tutor Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={tutor.avatar}
              alt={tutor.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-100 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 text-base bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
              {tutor.flag}
            </span>
            {tutor.availableNow && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Online now" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-teachy-dark truncate">{tutor.name}</h3>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{tutor.rating}</span>
                <span className="text-gray-400 font-normal">({tutor.reviewsCount})</span>
              </div>
            </div>

            <p className="text-xs text-teachy-purple font-medium mt-0.5">{tutor.accent}</p>
            <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="truncate">{tutor.location}</span>
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">{tutor.bio}</p>

        {/* Audio Greeting Player */}
        <div className="bg-teachy-lavender/50 rounded-2xl p-3 mb-4 border border-purple-100/60">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handlePlayAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                isPlayingAudio
                  ? 'bg-teachy-purple text-white shadow-md'
                  : 'bg-white text-teachy-purple hover:bg-purple-50 shadow-sm'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                  <span>Playing sample...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen Voice</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-gray-500 font-medium italic truncate max-w-[150px]">
              {tutor.sampleAudioText}
            </span>
          </div>
        </div>

        {/* Languages & Badges */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tutor.languages.map((lang, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full flex items-center gap-1"
            >
              <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Price & Book */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-lg font-black text-teachy-dark">${tutor.hourlyRate}</span>
          <span className="text-[11px] text-gray-500"> / 45m session</span>
        </div>

        <button
          onClick={handleBook}
          className="inline-flex items-center gap-1.5 bg-teachy-purple hover:bg-teachy-purple-dark text-white px-4 py-2 rounded-full text-xs font-bold shadow-md shadow-purple-500/10 hover:shadow-purple-500/25 transition-all transform hover:scale-[1.02]"
        >
          <Video className="w-3.5 h-3.5" />
          <span>Live Class</span>
        </button>
      </div>
    </div>
  );
};
