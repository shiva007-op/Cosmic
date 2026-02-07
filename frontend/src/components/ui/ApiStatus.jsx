import React from 'react';
import { Wifi } from 'lucide-react';

export default function ApiStatus({ isOnline = true }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
      isOnline 
        ? 'bg-green-500/10 border border-green-400/30' 
        : 'bg-red-500/10 border border-red-400/30'
    }`}>
      <Wifi className={`w-4 h-4 ${isOnline ? 'text-green-400' : 'text-red-400'}`} />
      <span className={`text-sm font-medium ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
        API {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
}
