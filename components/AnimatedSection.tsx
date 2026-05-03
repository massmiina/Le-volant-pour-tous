'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedSection: React.FC<Props> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
