import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { AnchorHTMLAttributes, forwardRef } from 'react';

export type LinkVariant = 'primary' | 'secondary' | 'ghost';

interface LinkProps
  extends
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'as'> {
  variant?: LinkVariant;
}

const variantStyles: Record<LinkVariant, string> = {
  primary: 'text-blue-600 hover:text-blue-800 hover:underline',
  secondary:
    'px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer',
  ghost: 'text-gray-600 hover:text-gray-900',
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'primary', className = '', children, ...props }, ref) => {
    return (
      <NextLink
        ref={ref}
        className={`${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </NextLink>
    );
  },
);

Link.displayName = 'Link';
