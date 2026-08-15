import React from 'react';

interface SquiggleUnderlineProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const SquiggleUnderline: React.FC<SquiggleUnderlineProps> = ({
  children,
  color = '#FBBF24',
  className = '',
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span>{children}</span>
      <svg
        className="absolute left-0 -bottom-2 w-full h-3 overflow-visible pointer-events-none"
        viewBox="0 0 100 16"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M2 9C18 3 32 14 48 8C64 3 78 14 98 8"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};
