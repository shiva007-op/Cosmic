import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  gradient, 
  borderColor 
}) {
  return (
    <div className={`bg-gradient-to-br ${gradient} backdrop-blur-sm border ${borderColor} rounded-xl p-6 hover:scale-105 transition-transform duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs opacity-60 mt-1">{subtitle}</p>}
        </div>
        {Icon && <Icon className="w-8 h-8 opacity-80" />}
      </div>
    </div>
  );
}
