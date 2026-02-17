import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      error = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none text-gray-900';
    const stateStyles = error
      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
    
    return (
      <select
        ref={ref}
        className={`${baseStyles} ${stateStyles} ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';
