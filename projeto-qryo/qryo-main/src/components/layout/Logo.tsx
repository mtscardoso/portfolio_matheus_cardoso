import React from 'react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative">
        {/* Neumorphic Shadow for the logo icon itself */}
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]"
        >
          {/* Main Q Shape with QR modules */}
          <rect x="15" y="15" width="70" height="70" rx="12" stroke="black" strokeWidth="6" />
          
          {/* Finder Pattern Style Corners */}
          <rect x="25" y="25" width="20" height="20" rx="4" fill="black" />
          <rect x="55" y="25" width="20" height="20" rx="4" fill="black" />
          <rect x="25" y="55" width="20" height="20" rx="4" fill="black" />
          
          {/* Stylized Q Tail as a QR module path */}
          <path 
            d="M65 65 L85 85" 
            stroke="black" 
            strokeWidth="10" 
            strokeLinecap="round" 
          />
          
          {/* Small accent dots */}
          <circle cx="65" cy="65" r="4" fill="black" />
          <rect x="75" y="55" width="8" height="8" rx="2" fill="black" opacity="0.6" />
          <rect x="55" y="75" width="8" height="8" rx="2" fill="black" opacity="0.6" />
        </svg>
      </div>
      <span className="text-3xl font-black tracking-tighter uppercase leading-none text-gray-900">
        Qryo
      </span>
    </div>
  );
}
