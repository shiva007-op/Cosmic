import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function NavigationItem({ 
  item, 
  isActive = false, 
  onClick 
}) {
  const Icon = item.icon;
  
  return (
    <button
      onClick={() => onClick?.(item.name)}
      className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
        ${isActive 
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 shadow-lg' 
          : 'hover:bg-white/10 border border-transparent hover:border-white/20'
        }`}
    >
      <Icon className={`w-5 h-5 transition-colors duration-300
        ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'}`} 
      />
      <span className={`font-medium transition-colors duration-300
        ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
        {item.name}
      </span>
      
      <ChevronRight className={`w-4 h-4 ml-auto transition-all duration-300
        ${isActive ? 'text-blue-400 opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-white'}`} />
    </button>
  );
}
