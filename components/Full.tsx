import React from 'react';

export const Full = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={` w-full ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Full;
