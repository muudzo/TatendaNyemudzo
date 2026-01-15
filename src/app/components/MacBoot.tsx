import { useState, useEffect } from 'react';

export function MacBoot({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    // Stage 1: Logo appears (1s)
    const timer1 = setTimeout(() => setStage(2), 1000);
    
    // Stage 2: Spinner (3s)
    const timer2 = setTimeout(() => setStage(3), 4000);
    
    // Stage 3: Fade out (1s)
    const timer3 = setTimeout(() => onComplete(), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #e8e8e8 0%, #c8c8c8 100%)',
      }}
    >
      
      {/* Stage 1 & 2: Apple Logo with optional spinner */}
      {(stage === 1 || stage === 2) && (
        <div className="flex flex-col items-center animate-fadeIn">
          {/* Apple Logo */}
          <div className="relative w-32 h-32 mb-12">
            <svg
              viewBox="0 0 170 170"
              className="w-full h-full"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
              }}
            >
              <defs>
                {/* Gray gradient for boot screen */}
                <linearGradient id="bootApple" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#d0d0d0', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#a0a0a0', stopOpacity: 1 }} />
                </linearGradient>
                
                <linearGradient id="bootHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              
              <g transform="translate(85, 85)">
                {/* Main apple body */}
                <path
                  d="M -25,-10 Q -30,-5 -30,5 Q -30,25 -20,35 Q -10,45 5,45 Q 15,45 22,40 Q 30,35 30,20 Q 30,5 25,-5 Q 20,-15 10,-20 Q 5,-22 0,-22 L 0,-22 Q -5,-22 -10,-20 Q -18,-15 -25,-10 Z"
                  fill="url(#bootApple)"
                  stroke="rgba(0, 0, 0, 0.15)"
                  strokeWidth="1"
                />
                
                {/* Bite */}
                <circle
                  cx="18"
                  cy="-2"
                  r="8"
                  style={{
                    fill: 'linear-gradient(to bottom, #e8e8e8 0%, #c8c8c8 100%)',
                  }}
                />
                
                {/* Leaf */}
                <path
                  d="M 2,-22 Q 8,-30 15,-28 Q 12,-25 10,-22 Q 8,-20 5,-20 Z"
                  fill="url(#bootApple)"
                  stroke="rgba(0, 0, 0, 0.15)"
                  strokeWidth="0.5"
                />
                
                {/* Internal highlight */}
                <ellipse
                  cx="-8"
                  cy="-5"
                  rx="12"
                  ry="18"
                  fill="url(#bootHighlight)"
                  opacity="0.6"
                />
              </g>
            </svg>
          </div>

          {/* Stage 2: Loading Spinner */}
          {stage === 2 && (
            <div className="relative w-12 h-12 animate-fadeIn">
              {/* Mac OS X style spinner - radial segments */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) * Math.PI / 180;
                  const x1 = 50 + Math.cos(angle) * 25;
                  const y1 = 50 + Math.sin(angle) * 25;
                  const x2 = 50 + Math.cos(angle) * 40;
                  const y2 = 50 + Math.sin(angle) * 40;
                  
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#888888"
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity={1 - (i * 0.08)}
                      style={{
                        transformOrigin: '50px 50px',
                        animation: `spinFade 1s linear infinite`,
                        animationDelay: `${-i * 0.083}s`,
                      }}
                    />
                  );
                })}
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Stage 3: Fade to white */}
      {stage === 3 && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #e8e8e8 0%, #c8c8c8 100%)',
            animation: 'fadeToWhite 1s ease-out forwards',
          }}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spinFade {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }

        @keyframes fadeToWhite {
          0% { opacity: 1; }
          100% { opacity: 0; background: #ffffff; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
