import React from 'react';

interface TagProps {
  children?: React.ReactNode;
  className?: string;
}

export function PostTags({ children, className }: TagProps) {
  return (
    <div
      className={`flex text-xs mt-2 gap-2${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  );
}

export function PostTag({ children, className }: TagProps) {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-800 text-black dark:text-white dark:text-opacity-60 text-opacity-70 px-1 py-[1px]${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </div>
  );
}
