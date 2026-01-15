import { useState } from 'react';

type Piece = '♔' | '♕' | '♖' | '♗' | '♘' | '♙' | '♚' | '♛' | '♜' | '♝' | '♞' | '♟' | null;

export function ChessGame() {
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [message, setMessage] = useState('Click a piece to move');

  // Initial chess board setup
  const initialBoard: Piece[][] = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
  ];

  const [board, setBoard] = useState(initialBoard);

  const handleSquareClick = (row: number, col: number) => {
    if (!selectedSquare) {
      // Select piece
      if (board[row][col]) {
        setSelectedSquare([row, col]);
        setMessage('Click destination square');
      }
    } else {
      // Move piece
      const [selectedRow, selectedCol] = selectedSquare;
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = newBoard[selectedRow][selectedCol];
      newBoard[selectedRow][selectedCol] = null;
      setBoard(newBoard);
      setSelectedSquare(null);
      setMessage('Click a piece to move');
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedSquare(null);
    setMessage('Click a piece to move');
  };

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Status Bar */}
      <div
        className="mb-4 px-6 py-2 rounded"
        style={{
          background: 'linear-gradient(to bottom, #f0f9ff, #bae6fd)',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          boxShadow: '0 2px 6px rgba(147, 197, 253, 0.4)',
          fontFamily: '"Lucida Grande", sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#000',
        }}
      >
        {message}
      </div>

      {/* Chess Board */}
      <div
        className="inline-block p-2 rounded"
        style={{
          background: 'linear-gradient(to bottom, #8b7355, #6d5d4b)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
          border: '3px solid #4a3f35',
        }}
      >
        <div className="grid grid-cols-8 gap-0">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const isLight = (rowIndex + colIndex) % 2 === 0;
              const isSelected = selectedSquare?.[0] === rowIndex && selectedSquare?.[1] === colIndex;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="w-12 h-12 flex items-center justify-center cursor-pointer transition-all"
                  style={{
                    background: isSelected
                      ? '#7dd3fc'
                      : isLight
                      ? '#f0d9b5'
                      : '#b58863',
                    border: isSelected ? '2px solid #0ea5e9' : 'none',
                    fontSize: '32px',
                  }}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.opacity = '0.8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  {piece}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={resetGame}
          className="px-4 py-2 rounded transition-all"
          style={{
            background: 'linear-gradient(to bottom, #f0f9ff, #bae6fd)',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
            fontFamily: '"Lucida Grande", sans-serif',
            fontSize: '12px',
            color: '#000',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to bottom, #bae6fd, #7dd3fc)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to bottom, #f0f9ff, #bae6fd)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          New Game
        </button>
      </div>

      {/* Info */}
      <div
        className="mt-4 p-3 rounded text-center text-xs"
        style={{
          background: 'rgba(248, 248, 248, 1)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          fontFamily: '"Lucida Grande", sans-serif',
          color: '#333',
          maxWidth: '300px',
        }}
      >
        <div className="font-bold mb-1">Classic Chess</div>
        <div>Select a piece, then click where you want to move it.</div>
        <div className="mt-1 text-xs opacity-60">(Simplified rules - no validation)</div>
      </div>
    </div>
  );
}
