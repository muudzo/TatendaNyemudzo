import { ReactNode } from 'react';

export interface WindowState {
  id: string;
  title: string;
  icon?: string;
  content: ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowProps extends WindowState {
  osType: 'vista' | 'macos';
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onDragStart: (id: string, startX: number, startY: number) => void;
}

export function Window({
  id,
  title,
  icon,
  content,
  x,
  y,
  width,
  height,
  isMinimized,
  isMaximized,
  zIndex,
  osType,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onDragStart,
}: WindowProps) {
  if (isMinimized) return null;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.window-control')) return;
    onFocus(id);
    const startX = e.clientX - x;
    const startY = e.clientY - y;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - startX;
      const newY = Math.max(0, moveEvent.clientY - startY);
      onDragStart(id, newX, newY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 64px)' }
    : { top: y, left: x, width, height };

  if (osType === 'vista') {
    return (
      <div
        className="absolute"
        style={{
          ...windowStyle,
          zIndex,
        }}
        onClick={() => onFocus(id)}
      >
        <div
          className="rounded-lg overflow-hidden h-full flex flex-col"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Vista Title Bar */}
          <div
            className="h-12 px-4 flex items-center justify-between cursor-move select-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0, 174, 239, 0.9), rgba(0, 120, 212, 0.7))',
              borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            }}
            onMouseDown={handleMouseDown}
          >
            <div
              className="flex items-center gap-3"
              style={{
                fontFamily: '"Segoe UI", sans-serif',
                fontSize: '13px',
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)',
              }}
            >
              {icon && <div className="w-5 h-5">{icon}</div>}
              <span>{title}</span>
            </div>

            <div className="flex gap-2">
              {['_', '□', '×'].map((symbol, i) => (
                <button
                  key={i}
                  className="window-control w-11 h-8 flex items-center justify-center rounded transition-all"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to bottom, #e8f4ff, #00a4ef)';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 164, 239, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => {
                    if (i === 0) onMinimize(id);
                    else if (i === 1) onMaximize(id);
                    else onClose(id);
                  }}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div
            className="flex-1 overflow-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.7) 50%, rgba(240,248,255,0.75) 100%)',
              borderLeft: '2px solid rgba(255, 255, 255, 0.4)',
              borderRight: '2px solid rgba(255, 255, 255, 0.4)',
              borderBottom: '2px solid rgba(255, 255, 255, 0.4)',
            }}
          >
            {content}
          </div>
        </div>
      </div>
    );
  } else {
    // macOS
    return (
      <div
        className="absolute"
        style={{
          ...windowStyle,
          zIndex,
        }}
        onClick={() => onFocus(id)}
      >
        <div
          className="rounded-lg overflow-hidden h-full flex flex-col"
          style={{
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Mac Title Bar */}
          <div
            className="h-11 px-4 flex items-center justify-between cursor-move select-none"
            style={{
              background: 'linear-gradient(to bottom, #f0f0f0 0%, #d0d0d0 50%, #b8b8b8 100%)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="flex gap-2">
              {[
                { color: '#ff5f57', action: () => onClose(id) },
                { color: '#ffbd2e', action: () => onMinimize(id) },
                { color: '#28ca42', action: () => onMaximize(id) },
              ].map((btn, i) => (
                <button
                  key={i}
                  className="window-control w-3 h-3 rounded-full transition-all"
                  style={{
                    background: `linear-gradient(to bottom, ${btn.color}, ${btn.color}dd)`,
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    boxShadow: `0 1px 2px rgba(0, 0, 0, 0.2)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.2)';
                  }}
                  onClick={btn.action}
                />
              ))}
            </div>

            <div
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{
                fontFamily: '"Lucida Grande", sans-serif',
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#444444',
                textShadow: '0 1px 0 rgba(255, 255, 255, 0.8)',
              }}
            >
              {title}
            </div>

            <div />
          </div>

          {/* Content Area */}
          <div
            className="flex-1 overflow-auto"
            style={{
              background: 'linear-gradient(to bottom, #ffffff 0%, #f8f8f8 100%)',
            }}
          >
            {content}
          </div>
        </div>
      </div>
    );
  }
}
