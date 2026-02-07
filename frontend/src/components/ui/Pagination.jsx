import React from 'react';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  maxVisiblePages = 5 
}) {
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-6 mt-12">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 text-white font-medium shadow-lg hover:shadow-xl disabled:hover:shadow-none"
      >
        ← Previous
      </button>

      <div className="flex items-center gap-2">
        {getVisiblePages().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
              currentPage === pageNum
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-white/80'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 text-white font-medium shadow-lg hover:shadow-xl disabled:hover:shadow-none"
      >
        Next →
      </button>
    </div>
  );
}
