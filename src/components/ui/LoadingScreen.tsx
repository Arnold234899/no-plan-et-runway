
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Start text animation after a brief delay
    const textTimer = setTimeout(() => setShowText(true), 500);
    
    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          // Complete loading after progress reaches 100%
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(textTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 flex items-center justify-center overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.3)_0%,transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,197,253,0.2)_0%,transparent_50%)] animate-pulse delay-1000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        {/* Brand logo/text */}
        <div className={`transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-300 animate-pulse">
                NO
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400 animate-pulse delay-300">
                PLAN-ET
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-400 animate-pulse delay-500">
                B
              </span>
            </h1>
            
            <p className="text-blue-200 text-xl md:text-2xl font-light tracking-wide animate-fade-in delay-1000">
              Where consciousness meets couture
            </p>
          </div>

          {/* Loading bar */}
          <div className="w-80 max-w-full mx-auto">
            <div className="h-1 bg-blue-900/50 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-white transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Loading percentage */}
            <p className="text-blue-300 text-sm font-medium">
              Loading... {progress}%
            </p>
          </div>
        </div>

        {/* Rotating border animation */}
        <div className="absolute inset-0 -m-8">
          <div className="w-full h-full border-2 border-transparent bg-gradient-to-r from-blue-400 via-transparent to-blue-400 rounded-full animate-spin opacity-30"
               style={{ animationDuration: '8s' }} />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-blue-400/50 animate-pulse" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-blue-400/50 animate-pulse delay-500" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-blue-400/50 animate-pulse delay-1000" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-blue-400/50 animate-pulse delay-1500" />
    </div>
  );
};
