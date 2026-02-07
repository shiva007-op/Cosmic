import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  History, 
  Calendar, 
  Bot, 
  BookOpen
} from 'lucide-react';
import NavigationItem from './ui/NavigationItem';

const navigationItems = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "History", icon: History },
  { name: "Calendar", icon: Calendar },
  { name: "AI Assistant", icon: Bot },
  { name: "Resources", icon: BookOpen },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Overview");

  const handleNavigation = (itemName) => {
    setActiveItem(itemName);
    console.log('Navigating to:', itemName);
    // Implement navigation logic
  };

  return (
    <aside className="w-64 relative">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-800/40 backdrop-blur-xl border-r border-white/10" />
      
      <div className="relative p-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
          Navigation
        </h2>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.name}
              item={item}
              isActive={activeItem === item.name}
              onClick={handleNavigation}
            />
          ))}
        </nav>

        {/* Bottom decoration */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">Version 1.0.0</p>
            <p className="text-xs text-gray-600 mt-1">Monitoring Space</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
