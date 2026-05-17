import React from 'react';
import { motion } from 'framer-motion';
import { Info, AlertTriangle, Lightbulb, BarChart3 } from 'lucide-react';

interface FactBoxProps {
  type: 'stat' | 'warning' | 'tip' | 'info';
  title: string;
  text: string;
  icon?: React.ReactNode;
}

export const FactBox: React.FC<FactBoxProps> = ({ type, title, text, icon }) => {
  const configs = {
    stat: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      icon: <BarChart3 className="w-5 h-5" />
    },
    warning: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      icon: <AlertTriangle className="w-5 h-5" />
    },
    tip: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      icon: <Lightbulb className="w-5 h-5" />
    },
    info: {
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
      text: "text-violet-400",
      icon: <Info className="w-5 h-5" />
    }
  };

  const config = configs[type];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      viewport={{ once: true }}
      className={`p-5 rounded-2xl border ${config.border} ${config.bg} flex gap-4 items-start my-6 shadow-lg`}
    >
      <div className={`mt-1 shrink-0 ${config.text}`}>
        {icon || config.icon}
      </div>
      <div>
        <h4 className={`text-xs font-black uppercase tracking-widest mb-1 ${config.text}`}>
          {title}
        </h4>
        <p className="text-gray-300 font-medium leading-relaxed italic text-sm">
          {text}
        </p>
      </div>
    </motion.div>
  );
};
