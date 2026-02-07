import React from 'react';
import { Satellite } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <Satellite className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </div>
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Cosmic Watch
        </h1>
        <p className="text-sm text-gray-400 font-medium">Near-Earth Object Threat Monitor</p>
      </div>
    </div>
  );
}
