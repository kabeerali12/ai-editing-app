
import React from 'react';

interface LoaderProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Loader: React.FC<LoaderProps> = ({ text, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-24 w-24 border-8',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-text-primary">
      <div
        className={`animate-spin rounded-full border-t-transparent ${sizeClasses[size]}`}
        style={{ borderColor: '#4f46e5' }}
      ></div>
      {text && <p className="text-lg font-semibold">{text}</p>}
    </div>
  );
};

export default Loader;
