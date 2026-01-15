import { useState, useEffect, useCallback } from 'react';

export function PacManGame() {
  const [score, setScore] = useState(0);
  const [pacmanPos, setPacmanPos] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | 'down'>('right');
  const [pellets, setPellets] = useState<Set<string>>(new Set());
  const [gameActive, setGameActive] = useState(false);

  const gridSize = 15;
  const cellSize = 24;

  // Initialize pellets
  useEffect(() => {
    const initialPellets = new Set<string>();
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (!(x === 5 && y === 5)) {
          initialPellets.add(`${x},${y}`);
        }
      }
    }
    setPellets(initialPellets);
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setPacmanPos((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        switch (direction) {
          case 'right':
            newX = (prev.x + 1) % gridSize;
            break;
          case 'left':
            newX = (prev.x - 1 + gridSize) % gridSize;
            break;
          case 'down':
            newY = (prev.y + 1) % gridSize;
            break;
          case 'up':
            newY = (prev.y - 1 + gridSize) % gridSize;
            break;
        }

        const key = `${newX},${newY}`;
        if (pellets.has(key)) {
          setPellets((prev) => {
            const newPellets = new Set(prev);
            newPellets.delete(key);
            return newPellets;
          });
          setScore((s) => s + 10);
        }

        return { x: newX, y: newY };
      });
    }, 200);

    return () => clearInterval(interval);
  }, [gameActive, direction, pellets]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameActive) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          setDirection('left');
          break;
        case 'ArrowRight':
          setDirection('right');
          break;
        case 'ArrowUp':
          setDirection('up');
          break;
        case 'ArrowDown':
          setDirection('down');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive]);

  const handleStart = () => {
    setGameActive(true);
    setScore(0);
    setPacmanPos({ x: 5, y: 5 });
    setDirection('right');
    // Reinitialize pellets
    const initialPellets = new Set<string>();
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (!(x === 5 && y === 5)) {
          initialPellets.add(`${x},${y}`);
        }
      }
    }
    setPellets(initialPellets);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Score Display */}
      <div
        className="mb-4 px-6 py-3 rounded"
        style={{
          background: 'linear-gradient(to bottom, #ffb900, #ff9500)',
          border: '2px solid #ff8800',
          boxShadow: '0 2px 8px rgba(255, 185, 0, 0.4)',
          fontFamily: '"Segoe UI", sans-serif',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000',
        }}
      >
        SCORE: {score}
      </div>

      {/* Game Board */}
      <div
        className="relative rounded"
        style={{
          width: gridSize * cellSize,
          height: gridSize * cellSize,
          background: '#000',
          border: '3px solid #00a4ef',
          boxShadow: '0 0 20px rgba(0, 164, 239, 0.5)',
        }}
      >
        {/* Pellets */}
        {Array.from(pellets).map((key) => {
          const [x, y] = key.split(',').map(Number);
          return (
            <div
              key={key}
              className="absolute rounded-full"
              style={{
                left: x * cellSize + cellSize / 2 - 2,
                top: y * cellSize + cellSize / 2 - 2,
                width: 4,
                height: 4,
                background: '#ffb900',
                boxShadow: '0 0 4px #ffb900',
              }}
            />
          );
        })}

        {/* Pac-Man */}
        <div
          className="absolute transition-all duration-200"
          style={{
            left: pacmanPos.x * cellSize,
            top: pacmanPos.y * cellSize,
            width: cellSize,
            height: cellSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            transform: 
              direction === 'right' ? 'rotate(0deg)' :
              direction === 'left' ? 'rotate(180deg)' :
              direction === 'down' ? 'rotate(90deg)' :
              'rotate(270deg)',
          }}
        >
          🟡
        </div>

        {/* Game Over / Start Overlay */}
        {!gameActive && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
            }}
          >
            <button
              onClick={handleStart}
              className="px-8 py-4 rounded transition-all"
              style={{
                background: 'linear-gradient(to bottom, #e8f4ff, #00a4ef)',
                border: '2px solid #0078d4',
                boxShadow: '0 4px 12px rgba(0, 164, 239, 0.6)',
                fontFamily: '"Segoe UI", sans-serif',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#003d5c',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 164, 239, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 164, 239, 0.6)';
              }}
            >
              START GAME
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div
        className="mt-4 p-4 rounded text-center"
        style={{
          background: 'rgba(232, 244, 255, 0.5)',
          border: '1px solid rgba(0, 120, 212, 0.3)',
          fontFamily: '"Segoe UI", sans-serif',
          fontSize: '12px',
          color: '#003d5c',
        }}
      >
        <div className="font-bold mb-2">HOW TO PLAY</div>
        <div>Use arrow keys to move Pac-Man</div>
        <div>Collect all the pellets!</div>
      </div>

      {pellets.size === 0 && gameActive && (
        <div
          className="mt-4 px-6 py-3 rounded animate-pulse"
          style={{
            background: 'linear-gradient(to bottom, #7fba00, #6a9e00)',
            border: '2px solid #5a8e00',
            boxShadow: '0 0 20px rgba(127, 186, 0, 0.8)',
            fontFamily: '"Segoe UI", sans-serif',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          🎉 YOU WIN! 🎉
        </div>
      )}
    </div>
  );
}
