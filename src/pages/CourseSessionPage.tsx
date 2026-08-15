import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PlusGrid } from '../components/PlusGrid';
import { DecorativeBackground } from '../components/DecorativeBackground';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Sparkles,
  Volume2,
  Send,
  BookOpen
} from 'lucide-react';
import { ChatMessage } from '../types';

export const CourseSessionPage: React.FC = () => {
  const { selectedCourse, activeTutor, user, setSelectedCourse, courses } = useAuth();

  // Call states
  const [isInCall, setIsInCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSubtitlesOn, setIsSubtitlesOn] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'notes' | 'vocab'>('chat');
  const [callDuration, setCallDuration] = useState(0);

  // Real webcam state & ref
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  // Chat message state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'tutor',
      senderName: activeTutor.name,
      text: `Hello ${user?.name || 'there'}! Welcome to today's ${selectedCourse.title} live session. How are you feeling today?`,
      timestamp: '17:30',
    },
    {
      id: '2',
      sender: 'system',
      senderName: 'Teachy AI Assistant',
      text: 'Live transcription & pronunciation feedback are active for this call.',
      timestamp: '17:30',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Dynamic conversation subtitles simulation
  const [currentSubtitle, setCurrentSubtitle] = useState(
    `"Hello! Great to connect with you. Let us warm up with a few everyday expressions."`
  );

  // Call timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isInCall) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isInCall]);

  // Handle webcam stream
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (isInCall && isVideoOn) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream;
            setHasCameraPermission(true);
          }
        } catch (err) {
          console.warn('Webcam not available or permission denied:', err);
          setHasCameraPermission(false);
        }
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isInCall, isVideoOn]);

  // Scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, activeTab]);

  const handleJoinCall = () => {
    setIsInCall(true);
  };

  const handleEndCall = () => {
    setIsInCall(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: user?.name || 'You',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const sentText = inputMessage.trim();
    setInputMessage('');

    // Simulate Tutor response after 1.5s
    setTimeout(() => {
      const tutorReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        senderName: activeTutor.name,
        text: `Wonderful phrased! That sounds very natural. Notice how using "Actually" makes the transition smoother.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        correction: sentText.toLowerCase().includes('good')
          ? {
              original: sentText,
              improved: 'I am doing exceptionally well, thank you!',
              explanation: 'Expands your descriptive range beyond basic adjectives.',
            }
          : undefined,
      };
      setChatMessages((prev) => [...prev, tutorReply]);
      setCurrentSubtitle(`"${tutorReply.text}"`);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] py-8 px-4 sm:px-6 lg:px-8">
      <DecorativeBackground showRibbon={false} />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header: Course Name & Language Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-purple-100">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedCourse.flag}</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-black text-teachy-purple tracking-tight">
                {selectedCourse.title}
              </h1>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Live 1-on-1 Practice with {activeTutor.name} ({activeTutor.accent})
            </p>
          </div>

          {/* Quick Course Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Switch Course:</span>
            <select
              value={selectedCourse.id}
              onChange={(e) => {
                const found = courses.find((c) => c.id === e.target.value);
                if (found) setSelectedCourse(found);
              }}
              className="text-xs font-bold text-teachy-purple bg-white border border-purple-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teachy-purple cursor-pointer shadow-sm"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* MAIN CLASSROOM LAYOUT - Matching Slide 13 Spec */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Large Lavender Rounded Video Call Window (Slide 13 Exact Representation) */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            <div className="w-full bg-[#E9E3FB] rounded-[2.5rem] p-6 sm:p-8 relative min-h-[440px] sm:min-h-[500px] flex flex-col justify-between shadow-xl border border-purple-200/80 overflow-hidden group">
              
              {/* Call Status Bar / Header inside window */}
              <div className="flex items-center justify-between z-20">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-100 shadow-sm">
                  <span className={`w-2.5 h-2.5 rounded-full ${isInCall ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                  <span className="text-xs font-bold text-teachy-dark">
                    {isInCall ? `Live Call • ${formatTime(callDuration)}` : 'Classroom Waiting Room'}
                  </span>
                </div>

                {isInCall && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSubtitlesOn(!isSubtitlesOn)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                        isSubtitlesOn
                          ? 'bg-teachy-purple text-white shadow-sm'
                          : 'bg-white/70 text-gray-700 hover:bg-white'
                      }`}
                    >
                      CC Subtitles {isSubtitlesOn ? 'ON' : 'OFF'}
                    </button>
                  </div>
                )}
              </div>

              {/* Video Screen Area */}
              <div className="my-auto w-full flex items-center justify-center relative py-6">
                
                {isInCall ? (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tutor Video Stream */}
                    <div className="relative aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden bg-purple-900 shadow-inner border-2 border-white/80 flex items-center justify-center">
                      <img
                        src={activeTutor.avatar}
                        alt={activeTutor.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span>{activeTutor.name} (Tutor)</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-xl text-[11px] text-purple-100 flex items-center justify-between">
                        <span>Native Speaker: {activeTutor.nativeLanguage}</span>
                        <span className="text-emerald-400 font-bold">100% Signal</span>
                      </div>
                    </div>

                    {/* Learner Video / Camera Stream */}
                    <div className="relative aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden bg-purple-950 shadow-inner border-2 border-white/80 flex items-center justify-center">
                      {isVideoOn ? (
                        hasCameraPermission ? (
                          <video
                            ref={userVideoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover transform -scale-x-100"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <div className="w-16 h-16 rounded-full bg-purple-800 mx-auto flex items-center justify-center text-white text-2xl font-bold mb-2">
                              {user?.name.charAt(0) || 'M'}
                            </div>
                            <p className="text-xs text-purple-200 font-medium">Camera Stream Active</p>
                            <p className="text-[10px] text-purple-300">Allow camera permission for webcam</p>
                          </div>
                        )
                      ) : (
                        <div className="text-center p-4">
                          <VideoOff className="w-10 h-10 text-purple-300 mx-auto mb-2" />
                          <p className="text-xs text-purple-200 font-semibold">Camera is Turned Off</p>
                        </div>
                      )}

                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isMicOn ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        <span>{user?.name || 'You'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Waiting Room Mode (Slide 13 Visual) */
                  <div className="text-center space-y-4 max-w-sm">
                    <div className="w-20 h-20 rounded-full bg-white/70 mx-auto flex items-center justify-center shadow-md border border-purple-100">
                      <VideoIcon className="w-10 h-10 text-teachy-purple" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-teachy-dark">Live Classroom Standby</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Test your microphone and video controls below, then click &quot;Join now&quot; to begin your 1-on-1 session.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Subtitles Overlay if in call */}
              {isInCall && isSubtitlesOn && (
                <div className="mb-4 z-20 bg-black/75 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-center font-medium max-w-xl mx-auto shadow-lg border border-white/10">
                  <span className="text-amber-300 font-bold mr-1.5">{activeTutor.name}:</span>
                  <span>{currentSubtitle}</span>
                </div>
              )}

              {/* BOTTOM CENTER CALL CONTROLS - Exactly matching Slide 13 Mockup */}
              <div className="flex items-center justify-center gap-4 pt-4 z-20">
                {/* Microphone Toggle Button */}
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 ${
                    isMicOn
                      ? 'bg-teachy-dark hover:bg-black text-white'
                      : 'bg-rose-600 hover:bg-rose-700 text-white ring-4 ring-rose-200'
                  }`}
                  aria-label={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
                  title={isMicOn ? 'Microphone Active' : 'Microphone Muted'}
                >
                  {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </button>

                {/* Camera / Video Toggle Button */}
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 ${
                    isVideoOn
                      ? 'bg-teachy-dark hover:bg-black text-white'
                      : 'bg-rose-600 hover:bg-rose-700 text-white ring-4 ring-rose-200'
                  }`}
                  aria-label={isVideoOn ? 'Turn Camera Off' : 'Turn Camera On'}
                  title={isVideoOn ? 'Camera Active' : 'Camera Off'}
                >
                  {isVideoOn ? <VideoIcon className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </button>

                {/* In-Call End Button */}
                {isInCall && (
                  <button
                    onClick={handleEndCall}
                    className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95"
                    title="Leave Call"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </button>
                )}
              </div>

            </div>

            {/* Bottom Plus Grid Motif (Slide 13) */}
            <div className="mt-3 opacity-75">
              <PlusGrid rows={1} cols={6} color="#F472B6" size="sm" />
            </div>

          </div>

          {/* Right Side: Ready to join ? Panel (Slide 13 Exact Representation) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* Top Container with Plus Grid & "Ready to join ?" Headline (Slide 13) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-lg relative overflow-hidden">
              
              {/* Pink Plus Grid above headline (Slide 13 Exact Detail) */}
              <div className="mb-4">
                <PlusGrid rows={4} cols={5} color="#F472B6" size="sm" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-teachy-dark">
                  Ready to join ?
                </h2>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Your tutor <span className="font-bold text-teachy-purple">{activeTutor.name}</span> is online and ready for your 1-on-1 conversational English practice.
                </p>

                {/* Pink Join Now Button (Slide 13 Exact Button) */}
                <div>
                  {!isInCall ? (
                    <button
                      onClick={handleJoinCall}
                      className="w-full bg-teachy-pink hover:bg-teachy-pink-hover text-white text-base font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <VideoIcon className="w-5 h-5" />
                      <span>Join now</span>
                    </button>
                  ) : (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs font-bold text-emerald-800">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Session in Progress
                      </span>
                      <button
                        onClick={handleEndCall}
                        className="text-rose-600 hover:underline text-xs font-semibold"
                      >
                        Leave Call
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* In-Call Classroom Assistant & Notes Tabs */}
            <div className="bg-white rounded-3xl border border-purple-100 shadow-md overflow-hidden flex-1 flex flex-col min-h-[380px]">
              
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-100 bg-purple-50/40 p-1.5 gap-1 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'chat'
                      ? 'bg-white text-teachy-purple shadow-sm'
                      : 'text-gray-600 hover:text-teachy-purple'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Live Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'notes'
                      ? 'bg-white text-teachy-purple shadow-sm'
                      : 'text-gray-600 hover:text-teachy-purple'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Agenda & Notes</span>
                </button>
                <button
                  onClick={() => setActiveTab('vocab')}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'vocab'
                      ? 'bg-white text-teachy-purple shadow-sm'
                      : 'text-gray-600 hover:text-teachy-purple'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Vocab Helper</span>
                </button>
              </div>

              {/* Tab Content: Live Chat */}
              {activeTab === 'chat' && (
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3 max-h-[230px] overflow-y-auto pr-1">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-teachy-purple text-white ml-6 rounded-br-sm'
                            : msg.sender === 'system'
                            ? 'bg-amber-50 border border-amber-200 text-amber-900 mx-1'
                            : 'bg-teachy-lavender text-teachy-dark mr-6 rounded-bl-sm border border-purple-100'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-[10px] mb-1 opacity-80">
                          <span>{msg.senderName}</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p>{msg.text}</p>
                        
                        {/* Live AI Correction Badge */}
                        {msg.correction && (
                          <div className="mt-2 pt-2 border-t border-purple-200/80 bg-white/70 p-2 rounded-xl text-teachy-dark">
                            <span className="text-[10px] font-bold uppercase text-teachy-purple block">
                              ✨ Natural Phrasing Suggestion:
                            </span>
                            <p className="font-semibold text-emerald-700 mt-0.5">
                              &quot;{msg.correction.improved}&quot;
                            </p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{msg.correction.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input Form */}
                  <form onSubmit={handleSendMessage} className="mt-3 pt-2 border-t border-gray-100 flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type a message or response..."
                      className="flex-1 px-3.5 py-2 text-xs rounded-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-teachy-purple"
                    />
                    <button
                      type="submit"
                      className="w-8 h-8 rounded-full bg-teachy-purple hover:bg-teachy-purple-dark text-white flex items-center justify-center flex-shrink-0 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {/* Tab Content: Agenda & Notes */}
              {activeTab === 'notes' && (
                <div className="p-4 space-y-3 text-xs text-gray-700 overflow-y-auto max-h-[280px]">
                  <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
                    <span className="font-bold text-teachy-purple block mb-1">🎯 Today&apos;s Objectives</span>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Use everyday colloquial idioms in natural conversation</li>
                      <li>Accent reduction: Linking consonants and vowels</li>
                      <li>Handling polite inquiries & restaurant negotiations</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="font-bold text-gray-800 block mb-1">⏱️ Session Structure</span>
                    <p className="text-gray-600">00-05m: Casual Warmup</p>
                    <p className="text-gray-600">05-30m: Topic Deep Dive & Dialogue</p>
                    <p className="text-gray-600">30-45m: Pronunciation Feedback & Next Steps</p>
                  </div>
                </div>
              )}

              {/* Tab Content: Vocab Helper */}
              {activeTab === 'vocab' && (
                <div className="p-4 space-y-2 text-xs overflow-y-auto max-h-[280px]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teachy-purple block mb-2">
                    Key Vocabulary for this topic:
                  </span>
                  {[
                    { term: 'Break the ice', def: 'To make people feel more comfortable in a social setting' },
                    { term: 'Cut corners', def: 'To do something the easiest or cheapest way' },
                    { term: 'Hit the nail on the head', def: 'To describe exactly what is causing a situation' },
                    { term: 'See eye to eye', def: 'To agree fully with someone' },
                  ].map((v, i) => (
                    <div key={i} className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="font-bold text-teachy-dark">{v.term}</p>
                      <p className="text-gray-500 text-[11px]">{v.def}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
