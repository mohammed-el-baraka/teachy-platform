import React from 'react';
import { Link } from 'react-router-dom';

interface TeachyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const TeachyLogo: React.FC<TeachyLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-xl', gap: 'gap-2' },
    md: { icon: 'w-9 h-9', text: 'text-2xl', gap: 'gap-2.5' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', gap: 'gap-3' },
    xl: { icon: 'w-16 h-16', text: 'text-4xl', gap: 'gap-4' },
  };

  const { icon, text, gap } = sizeMap[size];

  return (
    <Link to="/" className={`inline-flex items-center ${gap} select-none group ${className}`}>
      {/* Book Icon with Petals and Sparkles */}
      <div className={`relative ${icon} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Sparkles / Stars above book */}
          <path
            d="M60 4L63 15L74 18L63 21L60 32L57 21L46 18L57 15L60 4Z"
            fill="#7C3AED"
          />
          <path
            d="M38 18L40 25L47 27L40 29L38 36L36 29L29 27L36 25L38 18Z"
            fill="#7C3AED"
            opacity="0.9"
          />
          <path
            d="M82 18L84 25L91 27L84 29L82 36L80 29L73 27L80 25L82 18Z"
            fill="#7C3AED"
            opacity="0.9"
          />

          {/* Book Base (Purple Outer Wings) */}
          <path
            d="M60 76C42 68 20 62 4 67C15 76 38 84 60 79C82 84 105 76 116 67C100 62 78 68 60 76Z"
            fill="#6D28D9"
          />
          
          {/* Middle Petals (Pink/Magenta Pages) */}
          <path
            d="M60 76C48 58 32 46 22 51C28 62 45 71 60 76Z"
            fill="#EC4899"
          />
          <path
            d="M60 76C72 58 88 46 98 51C92 62 75 71 60 76Z"
            fill="#EC4899"
          />

          {/* Inner Petals (Vibrant Rose/Magenta) */}
          <path
            d="M60 76C54 50 44 40 37 42C40 55 52 69 60 76Z"
            fill="#F43F5E"
          />
          <path
            d="M60 76C66 50 76 40 83 42C80 55 68 69 60 76Z"
            fill="#F43F5E"
          />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <span
          className={`font-serif font-black tracking-tight text-teachy-purple-dark group-hover:text-teachy-purple transition-colors duration-200 ${text}`}
          style={{ letterSpacing: '-0.03em' }}
        >
          teachy
        </span>
      )}
    </Link>
  );
};
