'use client'
import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface Props {
  children: ReactNode;
}

export const ListContainer: React.FC<Props> = ({ children }) => {
  const childArray = React.Children.toArray(children);

  return (
    <div className="list-container">
      {childArray.map((child, index) => (
        <motion.div 
        key={index} 
        className="list-item"
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};
