import { HTMLAttributes } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerColor = 'primary' | 'secondary' | 'white';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-b-2',
};

const colorStyles: Record<SpinnerColor, string> = {
  primary: 'border-blue-600',
  secondary: 'border-gray-600',
  white: 'border-white',
};

export function Spinner({ 
  size = 'md', 
  color = 'primary',
  label = '読み込み中...',
  className = '',
  ...props 
}: SpinnerProps) {
  return (
    <div 
      role="status" 
      aria-live="polite"
      className={`flex justify-center items-center ${className}`}
      {...props}
    >
      <div
        className={`animate-spin rounded-full ${sizeStyles[size]} ${colorStyles[color]}`}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
