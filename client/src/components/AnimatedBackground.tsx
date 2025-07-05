
import React from 'react';

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-gray-800">
      {/* Starry night sky - top layer only */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={`star-${i}`}
            className={`absolute rounded-full animate-pulse ${
              i % 4 === 0 ? 'w-1 h-1 bg-white' : 
              i % 4 === 1 ? 'w-2 h-2 bg-yellow-100' : 
              i % 4 === 2 ? 'w-1 h-1 bg-blue-100' :
              'w-1 h-1 bg-white opacity-80'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`, // Only in top 40% to avoid tree overlap
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Twinkling star effect - top layer only */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`twinkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 35}%`, // Only in top 35%
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Clouds - positioned in upper-middle area to avoid tree overlap */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={`cloud-${i}`}
            className="absolute animate-pulse opacity-25"
            style={{
              left: `${Math.random() * 85}%`,
              top: `${10 + Math.random() * 25}%`, // Between 10-35% height
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          >
            <svg 
              width={80 + Math.random() * 60} 
              height={30 + Math.random() * 20} 
              viewBox="0 0 100 40" 
              className="text-gray-600"
            >
              <circle cx="20" cy={20 + Math.random() * 5} r={8 + Math.random() * 4} fill="currentColor" />
              <circle cx="35" cy={15 + Math.random() * 5} r={12 + Math.random() * 6} fill="currentColor" />
              <circle cx="50" cy={20 + Math.random() * 5} r={10 + Math.random() * 4} fill="currentColor" />
              <circle cx="65" cy={18 + Math.random() * 5} r={8 + Math.random() * 4} fill="currentColor" />
              <circle cx="80" cy={22 + Math.random() * 5} r={6 + Math.random() * 3} fill="currentColor" />
              <circle cx="42" cy={25 + Math.random() * 3} r={6 + Math.random() * 2} fill="currentColor" opacity="0.8" />
              <circle cx="58" cy={25 + Math.random() * 3} r={5 + Math.random() * 2} fill="currentColor" opacity="0.7" />
            </svg>
          </div>
        ))}
      </div>

      {/* Glow worms - scattered throughout but avoiding dense tree areas */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => {
          const xPos = Math.random() * 100;
          const yPos = Math.random() * 100;
          // Avoid dense tree areas (bottom 30%) for some glow worms
          const adjustedY = i % 3 === 0 ? Math.random() * 70 : yPos;
          
          return (
            <div
              key={`glowworm-${i}`}
              className={`absolute rounded-full opacity-80 animate-pulse ${
                i % 4 === 0 ? 'w-2 h-2 bg-yellow-300' : 
                i % 4 === 1 ? 'w-1 h-1 bg-green-300' : 
                i % 4 === 2 ? 'w-3 h-3 bg-lime-400' :
                'w-2 h-2 bg-yellow-200'
              }`}
              style={{
                left: `${xPos}%`,
                top: `${adjustedY}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
                boxShadow: i % 4 === 0 ? '0 0 10px rgba(255, 255, 0, 0.6)' : 
                          i % 4 === 1 ? '0 0 8px rgba(0, 255, 0, 0.5)' :
                          i % 4 === 2 ? '0 0 12px rgba(50, 205, 50, 0.7)' :
                          '0 0 8px rgba(255, 255, 0, 0.4)'
              }}
            />
          );
        })}
      </div>

      {/* Trees - positioned in lower area with varied heights to create depth */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`tree-${i}`}
            className="absolute opacity-25 animate-bounce"
            style={{
              left: `${Math.random() * 95}%`,
              top: `${45 + Math.random() * 50}%`, // Trees in bottom 55% only
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${5 + Math.random() * 4}s`,
              zIndex: Math.floor(Math.random() * 3) + 1, // Varied z-index for depth
            }}
          >
            <svg
              width={50 + Math.random() * 50}
              height={80 + Math.random() * 60}
              viewBox="0 0 80 120"
              className={`${i % 4 === 0 ? 'text-green-700' : i % 4 === 1 ? 'text-green-600' : i % 4 === 2 ? 'text-emerald-700' : 'text-green-800'} drop-shadow-lg`}
            >
              <rect 
                x="35" 
                y="85" 
                width={8 + Math.random() * 6} 
                height={25 + Math.random() * 15} 
                fill="#8B4513" 
                opacity="0.8" 
              />
              <circle cx="40" cy={70 + Math.random() * 10} r={20 + Math.random() * 8} fill="currentColor" opacity="0.6" />
              <circle cx={35 + Math.random() * 10} cy={60 + Math.random() * 10} r={15 + Math.random() * 8} fill="currentColor" opacity="0.7" />
              <circle cx={45 + Math.random() * 10} cy={65 + Math.random() * 10} r={12 + Math.random() * 8} fill="currentColor" opacity="0.8" />
              <circle cx="40" cy={50 + Math.random() * 10} r={10 + Math.random() * 8} fill="currentColor" opacity="0.9" />
              
              <line x1={25 + Math.random() * 5} y1="70" x2={18 + Math.random() * 5} y2="65" stroke="#8B4513" strokeWidth="2" opacity="0.6" />
              <line x1={55 + Math.random() * 5} y1="65" x2={62 + Math.random() * 5} y2="60" stroke="#8B4513" strokeWidth="2" opacity="0.6" />
              <line x1="40" y1={55 + Math.random() * 5} x2={45 + Math.random() * 5} y2={50 + Math.random() * 5} stroke="#8B4513" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>
        ))}
      </div>

      {/* Bushes - positioned in lower-middle area, between clouds and trees */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={`bush-${i}`}
            className="absolute opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 95}%`,
              top: `${40 + Math.random() * 45}%`, // Between 40-85% height
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <svg
              width={35 + Math.random() * 35}
              height={20 + Math.random() * 15}
              viewBox="0 0 60 35"
              className={`${i % 4 === 0 ? 'text-green-600' : i % 4 === 1 ? 'text-green-500' : i % 4 === 2 ? 'text-emerald-600' : 'text-green-700'}`}
            >
              <circle cx={10 + Math.random() * 10} cy={20 + Math.random() * 10} r={8 + Math.random() * 6} fill="currentColor" opacity="0.7" />
              <circle cx={25 + Math.random() * 10} cy={15 + Math.random() * 10} r={10 + Math.random() * 8} fill="currentColor" opacity="0.8" />
              <circle cx={40 + Math.random() * 10} cy={20 + Math.random() * 10} r={6 + Math.random() * 6} fill="currentColor" opacity="0.6" />
              <circle cx={20 + Math.random() * 10} cy={25 + Math.random() * 5} r={5 + Math.random() * 4} fill="currentColor" opacity="0.9" />
              <circle cx={30 + Math.random() * 10} cy={28 + Math.random() * 5} r={4 + Math.random() * 4} fill="currentColor" opacity="0.7" />
            </svg>
          </div>
        ))}
      </div>

      {/* Floating particles - distributed throughout with spacing consideration */}
      <div className="absolute inset-0">
        {[...Array(35)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute rounded-full opacity-40 animate-ping ${
              i % 5 === 0 ? 'w-2 h-2 bg-green-300' : 
              i % 5 === 1 ? 'w-1 h-1 bg-yellow-200' : 
              i % 5 === 2 ? 'w-3 h-3 bg-emerald-400' :
              i % 5 === 3 ? 'w-1 h-1 bg-teal-300' :
              'w-2 h-2 bg-lime-300'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating leaves - distributed in middle layers */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute animate-bounce opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${20 + Math.random() * 60}%`, // Between 20-80% to avoid star/ground overlap
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          >
            <svg 
              width={8 + Math.random() * 8} 
              height={6 + Math.random() * 6} 
              viewBox="0 0 12 8" 
              className={`${i % 4 === 0 ? 'text-green-500' : i % 4 === 1 ? 'text-green-400' : i % 4 === 2 ? 'text-emerald-500' : 'text-lime-500'}`}
            >
              <path
                d="M2 4 Q6 1 10 4 Q6 7 2 4"
                fill="currentColor"
                opacity="0.9"
              />
              <line x1="2" y1="4" x2="10" y2="4" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
            </svg>
          </div>
        ))}
      </div>

      {/* Enhanced dark forest floor gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900/50 via-green-900/30 to-transparent">
        {/* Ground vegetation - only at bottom */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`grass-${i}`}
            className={`absolute bottom-0 opacity-40 animate-pulse ${
              i % 3 === 0 ? 'bg-green-800' : i % 3 === 1 ? 'bg-green-700' : 'bg-emerald-800'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 4}px`,
              height: `${5 + Math.random() * 25}px`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
