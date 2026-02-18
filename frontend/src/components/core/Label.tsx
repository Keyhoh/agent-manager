import { LabelHTMLAttributes, forwardRef, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required = false, className = '', children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`block text-sm font-medium text-gray-700 mb-1 cursor-pointer ${className}`}
        {...props}
      >
        {children}
        {required && <span aria-label="必須"> *</span>}
      </label>
    );
  },
);

Label.displayName = 'Label';
