declare module 'react-katex' {
  import React from 'react';
  
  interface MathProps {
    math: string;
    block?: boolean;
    errorColor?: string;
    renderError?: (error: Error | TypeError) => React.ReactNode;
    settings?: any;
    as?: string | React.ElementType;
    children?: React.ReactNode;
  }
  
  export const InlineMath: React.FC<MathProps>;
  export const BlockMath: React.FC<MathProps>;
}
