import { useState } from 'react';
import { Window, WindowState } from '@/app/components/WindowManager';
import { ProjectsExplorer } from '@/app/components/apps/ProjectsExplorer';
import { AboutMe } from '@/app/components/apps/AboutMe';
import { CVViewer } from '@/app/components/apps/CVViewer';
import { PacManGame } from '@/app/components/apps/PacManGame';

interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
}

export function VistaDesktopInteractive({ onShowTokens }: { onShowTokens: () => void }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Update clock
  useState(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(interval);
  });

  const desktopIcons: DesktopIcon[] = [
    { id: 'projects', name: 'Projects', icon: '📁', x: 30, y: 30 },
    { id: 'about', name: 'About Me', icon: '👤', x: 30, y: 140 },
    { id: 'cv', name: 'CV.pdf', icon: '📄', x: 30, y: 250 },
    { id: 'pacman', name: 'Pac-Man.exe', icon: '🟡', x: 30, y: 360 },
  ];

  const openWindow = (appId: string) => {
    // Check if window already exists
    const existingWindow = windows.find(w => w.id === appId);
    if (existingWindow) {
      focusWindow(appId);
      return;
    }

    let newWindow: WindowState;
    const baseX = 100 + windows.length * 30;
    const baseY = 80 + windows.length * 30;

    switch (appId) {
      case 'projects':
        newWindow = {
          id: 'projects',
          title: 'Projects',
          icon: '📁',
          content: <ProjectsExplorer osType="vista" />,
          x: baseX,
          y: baseY,
          width: 900,
          height: 600,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex,
        };
        break;
      case 'about':
        newWindow = {
          id: 'about',
          title: 'About Me',
          icon: '👤',
          content: <AboutMe osType="vista" />,
          x: baseX,
          y: baseY,
          width: 700,
          height: 600,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex,
        };
        break;
      case 'cv':
        newWindow = {
          id: 'cv',
          title: 'CV.pdf - Document Viewer',
          icon: '📄',
          content: <CVViewer osType="vista" />,
          x: baseX,
          y: baseY,
          width: 800,
          height: 650,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex,
        };
        break;
      case 'pacman':
        newWindow = {
          id: 'pacman',
          title: 'Pac-Man.exe',
          icon: '🟡',
          content: <PacManGame />,
          x: baseX,
          y: baseY,
          width: 500,
          height: 620,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex,
        };
        break;
      default:
        return;
    }

    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
    setStartMenuOpen(false);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const maximizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const focusWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w));
    setNextZIndex(nextZIndex + 1);
  };

  const moveWindow = (id: string, x: number, y: number) => {
    setWindows(windows.map(w => w.id === id ? { ...w, x, y } : w));
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #8dd5f7 0%, #4fa9d5 50%, #1e5799 100%)',
      }}
    >
      {/* Wallpaper gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)',
        }}
      />

      {/* Desktop Icons */}
      {desktopIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute cursor-pointer select-none transition-all"
          style={{
            left: icon.x,
            top: icon.y,
            width: 80,
          }}
          onDoubleClick={() => openWindow(icon.id)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <div className="flex flex-col items-center p-2 rounded">
            <div className="text-5xl mb-2">{icon.icon}</div>
            <div
              className="text-center text-xs px-2 py-1 rounded"
              style={{
                fontFamily: '"Segoe UI", sans-serif',
                color: '#ffffff',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 0 5px rgba(0, 0, 0, 0.5)',
                wordWrap: 'break-word',
              }}
            >
              {icon.name}
            </div>
          </div>
        </div>
      ))}

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          {...window}
          osType="vista"
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onDragStart={moveWindow}
        />
      ))}

      {/* Taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 flex items-center px-2 gap-2"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85))',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Start Orb */}
        <button
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.2) 100%)',
            boxShadow: startMenuOpen
              ? '0 0 30px rgba(0, 174, 239, 1), inset 0 0 20px rgba(255,255,255,0.4)'
              : '0 0 20px rgba(0, 174, 239, 0.7), inset 0 0 15px rgba(255,255,255,0.3)',
            border: '2px solid rgba(255,255,255,0.3)',
          }}
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 174, 239, 1), inset 0 0 20px rgba(255,255,255,0.4)';
          }}
          onMouseLeave={(e) => {
            if (!startMenuOpen) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 174, 239, 0.7), inset 0 0 15px rgba(255,255,255,0.3)';
            }
          }}
        >
          <div className="w-8 h-8 grid grid-cols-2 grid-rows-2 gap-0.5 transform rotate-45">
            <div className="rounded-sm" style={{ background: 'linear-gradient(135deg, #f25022 0%, #d93b15 100%)' }} />
            <div className="rounded-sm" style={{ background: 'linear-gradient(135deg, #7fba00 0%, #6a9e00 100%)' }} />
            <div className="rounded-sm" style={{ background: 'linear-gradient(135deg, #00a4ef 0%, #0078d4 100%)' }} />
            <div className="rounded-sm" style={{ background: 'linear-gradient(135deg, #ffb900 0%, #ff9500 100%)' }} />
          </div>
        </button>

        {/* Taskbar Buttons */}
        {windows.filter(w => !w.isMinimized).map((window) => (
          <button
            key={window.id}
            className="h-10 px-4 rounded transition-all flex items-center gap-2"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontFamily: '"Segoe UI", sans-serif',
              fontSize: '12px',
              color: '#ffffff',
              maxWidth: '200px',
            }}
            onClick={() => focusWindow(window.id)}
          >
            <span>{window.icon}</span>
            <span className="truncate">{window.title}</span>
          </button>
        ))}

        <div className="flex-1" />

        {/* System Tray */}
        <div
          className="flex items-center gap-2 px-3 h-10 rounded"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <span className="text-white text-xs">🔊</span>
          <span className="text-white text-xs">🌐</span>
          <span
            className="text-white text-sm ml-2"
            style={{
              fontFamily: '"Segoe UI", sans-serif',
            }}
          >
            {time}
          </span>
        </div>
      </div>

      {/* Start Menu */}
      {startMenuOpen && (
        <div
          className="absolute bottom-16 left-0 w-96 rounded-tr-lg overflow-hidden"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Start Menu Content */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.7) 50%, rgba(240,248,255,0.75) 100%)',
              borderLeft: '2px solid rgba(255, 255, 255, 0.4)',
              borderRight: '2px solid rgba(255, 255, 255, 0.4)',
              borderTop: '2px solid rgba(255, 255, 255, 0.4)',
            }}
          >
            <div className="p-2 space-y-1">
              {desktopIcons.map((icon) => (
                <button
                  key={icon.id}
                  className="w-full flex items-center gap-3 p-3 rounded transition-all text-left"
                  style={{
                    fontFamily: '"Segoe UI", sans-serif',
                    fontSize: '14px',
                    color: '#003d5c',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 164, 239, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                  onClick={() => openWindow(icon.id)}
                >
                  <span className="text-2xl">{icon.icon}</span>
                  <span>{icon.name}</span>
                </button>
              ))}
              <div className="border-t my-2" style={{ borderColor: 'rgba(0, 120, 212, 0.2)' }} />
              <button
                className="w-full flex items-center gap-3 p-3 rounded transition-all text-left"
                style={{
                  fontFamily: '"Segoe UI", sans-serif',
                  fontSize: '14px',
                  color: '#003d5c',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 164, 239, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
                onClick={onShowTokens}
              >
                <span className="text-2xl">⚙️</span>
                <span>Design System</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}