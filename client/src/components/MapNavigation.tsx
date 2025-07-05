import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, BarChart3, Calculator, Info, MessageCircle, User } from 'lucide-react';

interface MapNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export const MapNavigation: React.FC<MapNavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'about', label: 'About', icon: Info },
    { id: 'chatbot', label: 'Chatbot', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-transparent">
      <div className="flex justify-between items-center h-20 px-6 sm:px-12 py-2">
        {/* Brand with logo */}
        <div className="flex items-center space-x-4">
          <img
            src="/ecosangamlogo.png"
            alt="EcoSangam Logo"
            className="h-14 w-14 object-contain"
            style={{ display: 'block' }}
          />
          <span className="text-3xl font-extrabold text-white tracking-wide">
            EcoSangam
          </span>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                size="lg"
                onClick={() => onPageChange(item.id)}
                className={`${
                  currentPage === item.id
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'text-white hover:bg-green-800 hover:text-green-300'
                } transition-all duration-200 flex items-center px-6 py-3 rounded-lg font-semibold text-lg`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-green-200 bg-black/60">
        <div className="grid grid-cols-3 gap-2 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                size="lg"
                onClick={() => onPageChange(item.id)}
                className={`${
                  currentPage === item.id
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'text-white hover:bg-green-800 hover:text-green-300'
                } flex-col h-auto py-3 px-2 rounded-lg font-semibold text-base`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
