import React from 'react';

interface PlusGridProps {
  rows?: number;
  cols?: number;
  color?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PlusGrid: React.FC<PlusGridProps> = ({
  rows = 5,
  cols = 5,
  color = '#F472B6', // teachy-pink-light
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { gap: 'gap-2', text: 'text-xs' },
    md: { gap: 'gap-3', text: 'text-sm' },
    lg: { gap: 'gap-4', text: 'text-base' },
  };

  const { gap, text } = sizeMap[size];

  return (
    <div
      className={`inline-grid select-none pointer-events-none opacity-80 ${gap} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span
          key={i}
          className={`font-mono font-bold leading-none ${text} transition-opacity duration-300 hover:opacity-100`}
          style={{ color }}
        >
          +
        </span>
      ))}
    </div>
  );
};
