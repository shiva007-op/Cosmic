import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, placeholder = "Search asteroid..." }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-4 py-2.5 w-64 bg-white/5 border border-white/10 rounded-lg 
        text-white placeholder-gray-400 outline-none 
        focus:border-blue-400/50 focus:bg-white/10 focus:shadow-lg focus:shadow-blue-500/20
        transition-all duration-300"
      />
    </form>
  );
}
