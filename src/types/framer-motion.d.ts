


// src/types/framer-motion.d.ts
declare module "framer-motion" {
  import * as React from "react";

  export type MotionProps = {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    [key: string]: any;
  };

  export const motion: {
    div: React.FC<MotionProps>;
    section: React.FC<MotionProps>;
    span: React.FC<MotionProps>;
    button: React.FC<MotionProps>;
    [key: string]: React.FC<MotionProps>;
  };
}
