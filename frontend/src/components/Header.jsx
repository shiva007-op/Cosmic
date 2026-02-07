import React from 'react';
import Logo from './ui/Logo';
import SearchBar from './ui/SearchBar';
import ApiStatus from './ui/ApiStatus';

export default function Header() {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  return (
    <header className="relative z-50">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl border-b border-white/10" />
      
      <div className="relative px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Search and Status */}
          <div className="flex items-center gap-6">
            <ApiStatus isOnline={true} />
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </header>
  );
}
