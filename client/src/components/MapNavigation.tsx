
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, BarChart3, Calculator, Info, MessageCircle, User, LogOut } from 'lucide-react';

interface MapNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export const MapNavigation: React.FC<MapNavigationProps> = ({ currentPage, onPageChange, onLogout }) => {
  // Navigation items positioned precisely along the zig-zag path
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, x: 10, y: 50 },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, x: 22, y: 27 },
    { id: 'calculator', label: 'Calculator', icon: Calculator, x: 35, y: 40 },
    { id: 'about', label: 'About', icon: Info, x: 50, y: 65 },
    { id: 'chatbot', label: 'Chatbot', icon: MessageCircle, x: 65, y: 28 },
    { id: 'profile', label: 'Profile', icon: User, x: 85, y: 42 },
  ];

  return (
    <div className="relative w-full h-32 bg-gradient-to-b from-green-900 via-green-800 to-green-700 overflow-hidden shadow-lg">
      {/* Enhanced zig-zag adventurous path */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="20%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#d97706" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
          </linearGradient>
          
          <filter id="pathGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main adventure path - precise zig-zag matching navigation points */}
        <path
          d="M10,50 Q18,35 22,27 Q28,22 35,40 Q42,52 50,65 Q57,70 65,28 Q72,15 85,42"
          stroke="url(#pathGradient)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#pathGlow)"
          className="drop-shadow-lg"
        />
        
        {/* Path segments glow effect */}
        <path
          d="M10,50 Q18,35 22,27 Q28,22 35,40 Q42,52 50,65 Q57,70 65,28 Q72,15 85,42"
          stroke="#fbbf24"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
          className="animate-pulse"
        />
        
        {/* Dotted helper lines for path clarity */}
        <path
          d="M10,50 Q18,35 22,27 Q28,22 35,40 Q42,52 50,65 Q57,70 65,28 Q72,15 85,42"
          stroke="#fbbf24"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2,3"
          opacity="0.6"
        />
      </svg>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={`nav-particle-${i}`}
            className={`absolute w-1 h-1 rounded-full opacity-70 animate-ping ${
              i % 3 === 0 ? 'bg-yellow-300' : i % 3 === 1 ? 'bg-orange-300' : 'bg-amber-200'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation checkpoints - precisely aligned */}
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        
        return (
          <div
            key={item.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
          >
            {/* Enhanced checkpoint glow effect */}
            <div className={`absolute inset-0 rounded-full blur-md ${
              isActive ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
            } opacity-50 w-16 h-16 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2`} />
            
            {/* Outer ring effect */}
            <div className={`absolute inset-0 rounded-full border-2 ${
              isActive ? 'border-yellow-300 animate-spin' : 'border-green-300'
            } opacity-40 w-20 h-20 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2`} 
            style={{ animationDuration: '3s' }} />
            
            {/* Checkpoint button */}
            <Button
              onClick={() => onPageChange(item.id)}
              className={`relative z-10 w-14 h-14 rounded-full p-0 transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
                isActive
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white shadow-2xl ring-4 ring-yellow-300/50'
                  : 'bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-xl'
              }`}
            >
              <Icon className="w-6 h-6" />
            </Button>

            {/* Enhanced label tooltip */}
            <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-black/95 to-gray-900/95 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 ${
              isActive ? 'opacity-100 scale-105' : ''
            } pointer-events-none shadow-xl border border-gray-700`}>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
              {item.label}
            </div>
          </div>
        );
      })}

      {/* App title with enhanced styling */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 z-20">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20">
          <span className="text-white font-bold text-xl drop-shadow-lg">E</span>
        </div>
        <span className="text-2xl font-bold text-white drop-shadow-lg tracking-wide bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
          EcoTracker Adventure
        </span>
      </div>

      {/* Enhanced logout button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="bg-gradient-to-r from-red-600 to-red-700 border-red-500 text-white hover:from-red-700 hover:to-red-800 backdrop-blur-sm shadow-xl transition-all duration-300 hover:scale-105"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
