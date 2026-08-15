import React from 'react';

interface DecorativeBackgroundProps {
  showRibbon?: boolean;
}

export const DecorativeBackground: React.FC<DecorativeBackgroundProps> = ({
  showRibbon = true,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-white">
      {/* Top Left Organic Soft Sky-Blue Blob */}
      <div className="blob-shape-tl animate-pulse-subtle" />

      {/* Bottom Right Organic Soft Sky-Blue Blob */}
      <div className="blob-shape-br" />

      {/* Subtle Top Right Accent Blob */}
      <div className="blob-shape-tr" />

      {/* Looping Faint Lavender Ribbon (from slide mockup) */}
      {showRibbon && (
        <svg
          className="absolute left-0 top-0 w-full h-full opacity-35"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 320 280 C 220 180, 220 400, 360 480 C 500 560, 480 820, 620 900"
            stroke="#DDD6FE"
            strokeWidth="38"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 280 180 C 180 80, 160 300, 300 420 C 440 540, 520 700, 580 850"
            stroke="#EDE9FE"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}
    </div>
  );
};
