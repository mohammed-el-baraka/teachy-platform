import React from 'react';
import { Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Clock, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { setSelectedCourse, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSelect = () => {
    setSelectedCourse(course);
    if (isAuthenticated) {
      navigate('/course');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="group bg-white rounded-3xl p-6 border border-purple-100 shadow-sm hover:shadow-xl hover:border-teachy-purple/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* Top Tag & Flag */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <span className="text-3xl p-2 bg-teachy-lavender/50 rounded-2xl border border-purple-100">
              {course.flag}
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teachy-purple px-2.5 py-1 bg-teachy-lavender rounded-full">
                {course.level}
              </span>
              <h3 className="font-bold text-lg text-teachy-dark group-hover:text-teachy-purple transition-colors mt-1">
                {course.title}
              </h3>
            </div>
          </div>
          {course.isPopular && (
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Popular
            </span>
          )}
        </div>

        <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {course.description}
        </p>

        {/* Topics badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {course.topics.slice(0, 3).map((topic, i) => (
            <span
              key={i}
              className="text-[11px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Footer info & CTA */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-xs text-gray-500">
          <span className="flex items-center gap-1 font-semibold text-amber-600">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            {course.studentsCount}
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {course.duration}
          </span>
        </div>

        <button
          onClick={handleSelect}
          className="inline-flex items-center gap-1 bg-teachy-lavender hover:bg-teachy-purple text-teachy-purple hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
        >
          <span>Start</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
