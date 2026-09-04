import React from 'react';

interface LogoProps {
  variant?: 'full' | 'mark' | 'horizontal' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const BitsnailLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  onClick,
}) => {
  // Dimension scales
  const sizeMap = {
    sm: { height: 38, width: 44, text: 'text-base', sub: 'text-[9px]' },
    md: { height: 48, width: 56, text: 'text-xl', sub: 'text-[10px]' },
    lg: { height: 64, width: 75, text: 'text-2xl', sub: 'text-xs' },
    xl: { height: 90, width: 105, text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  // Exact Logo Colors from User's uploaded Image 1
  const GOLD = '#C59B3F';
  const DARK_GREEN = '#163426';

  // SVG Artwork representing the exact Bitsnail emblem from Image 1
  const LogoEmblem = (
    <svg
      viewBox="0 0 170 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: currentSize.height, width: 'auto', maxHeight: '100%' }}
      className="shrink-0 transition-transform duration-200"
      aria-label="Bitsnail Logo"
    >
      {/* 1. Radiating Sun / Telecom Rays in Gold (matching Image 1) */}
      <g stroke={GOLD} strokeWidth="3.5" strokeLinecap="round">
        {/* Ray 1 (Bottom Left ~175°) */}
        <line x1="30" y1="84" x2="48" y2="82" />
        <line x1="52" y1="81.5" x2="57" y2="81" strokeWidth="3" />

        {/* Ray 2 (~150°) */}
        <line x1="41" y1="67" x2="63" y2="76" />

        {/* Ray 3 (~128°) */}
        <line x1="48" y1="46" x2="59" y2="55" />
        <line x1="64" y1="59" x2="73" y2="67" />

        {/* Ray 4 (~105°) */}
        <line x1="68" y1="28" x2="72" y2="40" />
        <line x1="75" y1="49" x2="81" y2="62" />

        {/* Ray 5 (~85° Top Center) */}
        <line x1="88" y1="22" x2="91" y2="38" />
        <line x1="93" y1="46" x2="96" y2="61" />

        {/* Ray 6 (~62°) */}
        <line x1="113" y1="28" x2="119" y2="43" />
        <line x1="123" y1="50" x2="126" y2="57" />

        {/* Ray 7 (~42° Right) */}
        <line x1="130" y1="46" x2="140" y2="55" />
      </g>

      {/* 2. Snail Body & Head (Dark Green fill with Gold outline) */}
      {/* Snail Body Silhouette */}
      <path
        d="M58 116 
           C 50 116, 52 110, 56 102
           C 60 95, 65 89, 71 85
           C 71 85, 78 78, 86 78
           C 95 78, 102 82, 107 88
           C 112 75, 119 63, 125 56
           C 130 50, 137 46, 142 50
           C 146 54, 145 61, 141 68
           C 136 76, 131 84, 132 94
           C 133 103, 130 110, 122 114
           C 114 116, 80 116, 58 116 Z"
        fill={DARK_GREEN}
        stroke={GOLD}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Antenna 1 (Left feeler) */}
      <path
        d="M136 49 C 137 44, 139 40, 145 38"
        stroke={GOLD}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Antenna 2 (Right feeler) */}
      <path
        d="M141 52 C 144 47, 147 43, 153 43"
        stroke={GOLD}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* 3. Snail Shell - Outer Circle & Inward Spiral */}
      {/* Outer Shell Circle Fill */}
      <circle cx="88" cy="85" r="28" fill={DARK_GREEN} stroke={GOLD} strokeWidth="3.5" />

      {/* Inward Clockwise Gold Spiral */}
      <path
        d="M 88 57 
           A 28 28 0 0 1 116 85 
           A 28 28 0 0 1 88 113 
           A 23 23 0 0 1 67 92 
           A 18 18 0 0 1 86 70 
           A 14 14 0 0 1 101 84 
           A 9 9 0 0 1 88 95 
           A 5 5 0 0 1 83 87"
        stroke={GOLD}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* 4. Solid Gold Baseline Under Snail */}
      <rect x="50" y="117" width="80" height="4" rx="2" fill={GOLD} />

      {/* 5. Gold "BITSNAIL" Typography */}
      <text
        x="90"
        y="138"
        textAnchor="middle"
        fill={GOLD}
        fontSize="15"
        fontWeight="800"
        fontFamily="'Outfit', sans-serif"
        letterSpacing="3.5px"
      >
        BITSNAIL
      </text>
    </svg>
  );

  // Standalone Mark / Emblem
  if (variant === 'mark') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
        title="Bitsnail Technologies"
      >
        {LogoEmblem}
      </div>
    );
  }

  // Vertical Full Badge (Emblem centered with corporate title)
  if (variant === 'badge' || variant === 'full') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center justify-center p-3 bg-white rounded-2xl border border-[#DCE7E1] shadow-xs ${
          onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
        } ${className}`}
      >
        {LogoEmblem}
        <span className="text-[11px] font-bold text-[#163426] tracking-wider uppercase mt-1">
          Technologies Pvt Ltd
        </span>
      </div>
    );
  }

  // Horizontal Header Variant (Emblem + Company Name)
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      id="brand-logo-container"
    >
      {LogoEmblem}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-['Outfit',sans-serif] font-black tracking-tight ${currentSize.text} text-[#163426]`}
        >
          BITSNAIL
        </span>
        <span
          className={`font-semibold tracking-[0.18em] uppercase ${currentSize.sub} text-[#2B784E]`}
        >
          Technologies Pvt Ltd
        </span>
      </div>
    </div>
  );
};
