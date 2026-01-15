import { useState, useEffect } from 'react';

export function VistaBoot({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    // Stage 1: Idle (1.5s)
    const timer1 = setTimeout(() => setStage(2), 1500);
    
    // Stage 2: Loading (3s)
    const timer2 = setTimeout(() => setStage(3), 4500);
    
    // Stage 3: Transition (1s)
    const timer3 = setTimeout(() => onComplete(), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      
      {/* Stage 1: Idle - Faint orb glow */}
      {stage === 1 && (
        <div className="relative w-48 h-48 animate-fadeIn">
          {/* Subtle glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 174, 239, 0.3) 0%, rgba(0, 174, 239, 0.1) 50%, transparent 70%)',
              filter: 'blur(30px)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Stage 2: Loading - Full orb with progress bar */}
      {stage >= 2 && (
        <div className="flex flex-col items-center">
          {/* Vista Orb - Full visibility */}
          <div className="relative w-40 h-40 mb-16 animate-fadeIn">
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 174, 239, 0.7) 0%, rgba(0, 174, 239, 0.4) 30%, rgba(0, 174, 239, 0.2) 50%, transparent 70%)',
                filter: 'blur(25px)',
                transform: 'scale(1.3)',
              }}
            />

            {/* Main Orb */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.2) 100%)',
                boxShadow: '0 0 50px rgba(0, 174, 239, 0.8), inset 0 0 40px rgba(255,255,255,0.3), inset -10px -10px 30px rgba(0,0,0,0.4)',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              {/* Four-color flag */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 transform rotate-45">
                  <div className="rounded-sm" style={{ background: 'linear-gradient(135deg, #f25022 0%, #d93b15 100%)', boxShadow: '0 0 15px rgba(242, 80, 34, 0.8)' }} />
                  <div className="rounded-sm" style={{ background: 'linear-gradient(135deg, #7fba00 0%, #6a9e00 100%)', boxShadow: '0 0 15px rgba(127, 186, 0, 0.8)' }} />
                  <div className="rounded-sm" style={{ background: 'linear-gradient(135deg, #00a4ef 0%, #0078d4 100%)', boxShadow: '0 0 15px rgba(0, 164, 239, 0.8)' }} />
                  <div className="rounded-sm" style={{ background: 'linear-gradient(135deg, #ffb900 0%, #ff9500 100%)', boxShadow: '0 0 15px rgba(255, 185, 0, 0.8)' }} />
                </div>
              </div>

              {/* Highlight streak */}
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

              {/* Inner refraction */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at 70% 70%, transparent 30%, rgba(0, 174, 239, 0.2) 60%, rgba(0, 174, 239, 0.4) 100%)',
                }}
              />
            </div>
          </div>

          {/* Progress Bar - Vista Aero style with strong glow */}
          {stage === 2 && (
            <div className="w-80 h-2 relative animate-fadeIn">
              {/* Progress track */}
              <div
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))',
                  boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(0, 0, 0, 0.6)',
                }}
              >
                {/* Animated green progress fill */}
                <div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(to bottom, #b4ec51, #429321)',
                    boxShadow: '0 0 20px rgba(66, 147, 33, 1), 0 0 40px rgba(66, 147, 33, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                    animation: 'progressGrow 3s ease-out forwards',
                  }}
                />

                {/* Reflection on progress bar */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                  }}
                />
              </div>

              {/* Progress glow underneath */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(to right, transparent, #429321, transparent)',
                  filter: 'blur(15px)',
                  transform: 'translateY(4px)',
                  opacity: 0.6,
                  animation: 'progressGrow 3s ease-out forwards',
                }}
              />
            </div>
          )}

          {/* Stage 3: White flash transition */}
          {stage === 3 && (
            <div
              className="absolute inset-0 bg-white"
              style={{
                animation: 'flashTransition 1s ease-out forwards',
              }}
            />
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes progressGrow {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes flashTransition {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
