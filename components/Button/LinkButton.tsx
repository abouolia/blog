import React from 'react';

export const highlightText =
  'px-1 font-light transition-colors duration-150 ease-linear rounded-sm bg-unhovered hover:bg-hovered dark:hover:bg-hovered-dark dark:hover:text-white dark:bg-unhovered-dark';

export const LinkButton = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={className ? `${highlightText} ${className}` : highlightText}
    {...props}
  />
));

LinkButton.displayName = 'LinkButton';
