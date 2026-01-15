import { useState, useEffect } from 'react';

interface StarProps {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export function OSSelector({ onSelectOS }: { onSelectOS: (os: 'vista' | 'macos') => void }) {
  const [hoveredOS, setHoveredOS] = useState<'vista' | 'macos' | null>(null);
  const [selectedOS, setSelectedOS] = useState<'vista' | 'macos' | null>(null);
  const [stars, setStars] = useState<StarProps[]>([]);

  useEffect(() => {
    // Generate sparse starfield - only 80-100 stars for the entire screen
    const generatedStars: StarProps[] = [];
    const starCount = 80 + Math.floor(Math.random() * 20);
    
    for (let i = 0; i < starCount; i++) {
      generatedStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 1.5, // Very small stars
        opacity: 0.2 + Math.random() * 0.5, // Dim
      });
    }
    
    setStars(generatedStars);
  }, []);

  const handleClick = (os: 'vista' | 'macos') => {
    setSelectedOS(os);
    setTimeout(() => {
      onSelectOS(os);
    }, 800);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: '#ffffff',
              opacity: star.opacity,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* OS Selection Container */}
      <div className="relative z-10 flex items-center justify-center gap-32">
        
        {/* Windows Vista */}
        <div
          className="flex flex-col items-center cursor-pointer select-none"
          onMouseEnter={() => setHoveredOS('vista')}
          onMouseLeave={() => setHoveredOS(null)}
          onClick={() => handleClick('vista')}
          style={{
            transform: hoveredOS === 'vista' ? 'scale(1.05)' : selectedOS === 'vista' ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Vista Orb */}
          <div className="relative w-40 h-40 mb-6">
            {/* Outer glow - heavy and dramatic */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 174, 239, 0.6) 0%, rgba(0, 174, 239, 0.4) 30%, rgba(0, 174, 239, 0.2) 50%, transparent 70%)',
                filter: 'blur(20px)',
                transform: hoveredOS === 'vista' ? 'scale(1.4)' : selectedOS === 'vista' ? 'scale(1.6)' : 'scale(1.2)',
                transition: 'transform 0.4s ease-out',
              }}
            />
            
            {/* Halo ring for selected state */}
            {selectedOS === 'vista' && (
              <div
                className="absolute inset-0 rounded-full border-2"
                style={{
                  borderColor: 'rgba(0, 174, 239, 0.6)',
                  boxShadow: '0 0 30px rgba(0, 174, 239, 0.8)',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            )}

            {/* Main Orb - Glass sphere with four-color flag */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.2) 100%)',
                boxShadow: hoveredOS === 'vista' || selectedOS === 'vista'
                  ? '0 0 60px rgba(0, 174, 239, 0.9), inset 0 0 40px rgba(255,255,255,0.3), inset -10px -10px 30px rgba(0,0,0,0.4)'
                  : '0 0 40px rgba(0, 174, 239, 0.7), inset 0 0 30px rgba(255,255,255,0.2), inset -10px -10px 30px rgba(0,0,0,0.3)',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease-out',
              }}
            >
              {/* Four-color flag inside */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 transform rotate-45">
                  {/* Red */}
                  <div
                    className="rounded-sm"
                    style={{
                      background: 'linear-gradient(135deg, #f25022 0%, #d93b15 100%)',
                      boxShadow: '0 0 15px rgba(242, 80, 34, 0.8)',
                    }}
                  />
                  {/* Green */}
                  <div
                    className="rounded-sm"
                    style={{
                      background: 'linear-gradient(135deg, #7fba00 0%, #6a9e00 100%)',
                      boxShadow: '0 0 15px rgba(127, 186, 0, 0.8)',
                    }}
                  />
                  {/* Blue */}
                  <div
                    className="rounded-sm"
                    style={{
                      background: 'linear-gradient(135deg, #00a4ef 0%, #0078d4 100%)',
                      boxShadow: '0 0 15px rgba(0, 164, 239, 0.8)',
                    }}
                  />
                  {/* Yellow */}
                  <div
                    className="rounded-sm"
                    style={{
                      background: 'linear-gradient(135deg, #ffb900 0%, #ff9500 100%)',
                      boxShadow: '0 0 15px rgba(255, 185, 0, 0.8)',
                    }}
                  />
                </div>
              </div>

              {/* Top-left highlight streak - strong and visible */}
              <div
                className="absolute rounded-full"
                style={{
                  top: '15%',
                  left: '15%',
                  width: '45%',
                  height: '45%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)',
                  filter: 'blur(2px)',
                }}
              />

              {/* Inner refraction effects */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at 70% 70%, transparent 30%, rgba(0, 174, 239, 0.2) 60%, rgba(0, 174, 239, 0.4) 100%)',
                }}
              />
            </div>

            {/* Bottom shadow */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 w-32 h-4 rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.6) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
          </div>

          {/* Vista Typography */}
          <div
            style={{
              fontFamily: '"Segoe UI", sans-serif',
              fontSize: '24px',
              fontWeight: 400,
              color: '#e8f4ff',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            }}
          >
            Windows Vista
          </div>
        </div>

        {/* Mac OS X */}
        <div
          className="flex flex-col items-center cursor-pointer select-none"
          onMouseEnter={() => setHoveredOS('macos')}
          onMouseLeave={() => setHoveredOS(null)}
          onClick={() => handleClick('macos')}
          style={{
            transform: hoveredOS === 'macos' ? 'scale(1.04) translateY(-2px)' : selectedOS === 'macos' ? 'scale(1.06) translateY(-4px)' : 'scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Apple Logo with Aqua Glass Style */}
          <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
            {/* Soft glow - more elastic and warm than Vista */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0.2) 40%, transparent 65%)',
                filter: 'blur(25px)',
                transform: hoveredOS === 'macos' ? 'scale(1.5)' : selectedOS === 'macos' ? 'scale(1.7)' : 'scale(1.3)',
                transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />

            {/* Apple Logo SVG with Aqua styling */}
            <svg
              viewBox="0 0 170 170"
              className="w-32 h-32 relative z-10"
              style={{
                filter: hoveredOS === 'macos' || selectedOS === 'macos'
                  ? 'drop-shadow(0 0 20px rgba(147, 197, 253, 0.8))'
                  : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6))',
                transition: 'filter 0.3s ease-out',
              }}
            >
              <defs>
                {/* Aqua glass gradient - signature Mac look */}
                <linearGradient id="appleAqua" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#f0f9ff', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#bae6fd', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#7dd3fc', stopOpacity: 1 }} />
                </linearGradient>
                
                {/* Highlight gradient */}
                <linearGradient id="appleHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
                  <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              
              {/* Apple logo path */}
              <g transform="translate(85, 85)">
                {/* Main apple body */}
                <path
                  d="M -25,-10 Q -30,-5 -30,5 Q -30,25 -20,35 Q -10,45 5,45 Q 15,45 22,40 Q 30,35 30,20 Q 30,5 25,-5 Q 20,-15 10,-20 Q 5,-22 0,-22 L 0,-22 Q -5,-22 -10,-20 Q -18,-15 -25,-10 Z"
                  fill="url(#appleAqua)"
                  stroke="rgba(0, 0, 0, 0.2)"
                  strokeWidth="1"
                />
                
                {/* Bite out of apple */}
                <circle
                  cx="18"
                  cy="-2"
                  r="8"
                  fill="black"
                  opacity="1"
                />
                
                {/* Leaf */}
                <path
                  d="M 2,-22 Q 8,-30 15,-28 Q 12,-25 10,-22 Q 8,-20 5,-20 Z"
                  fill="url(#appleAqua)"
                  stroke="rgba(0, 0, 0, 0.2)"
                  strokeWidth="0.5"
                />
                
                {/* Internal highlight - Aqua signature */}
                <ellipse
                  cx="-8"
                  cy="-5"
                  rx="12"
                  ry="18"
                  fill="url(#appleHighlight)"
                  opacity="0.5"
                />
              </g>
            </svg>

            {/* Bottom shadow */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 w-28 h-3 rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.4) 0%, transparent 70%)',
                filter: 'blur(6px)',
              }}
            />
          </div>

          {/* Mac OS X Typography */}
          <div
            style={{
              fontFamily: '"Lucida Grande", "Lucida Sans Unicode", sans-serif',
              fontSize: '24px',
              fontWeight: 400,
              color: '#f5f5f0',
              letterSpacing: '0.01em',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            }}
          >
            Mac OS X
          </div>
        </div>
      </div>
    </div>
  );
}
