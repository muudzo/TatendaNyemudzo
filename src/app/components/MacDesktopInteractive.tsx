import { useState } from 'react';
import { Window, WindowState } from '@/app/components/WindowManager';
import { ProjectsExplorer } from '@/app/components/apps/ProjectsExplorer';
import { AboutMe } from '@/app/components/apps/AboutMe';
import { CVViewer } from '@/app/components/apps/CVViewer';
import { ChessGame } from '@/app/components/apps/ChessGame';

interface DockIcon {
  id: string;
  name: string;
  icon: string;
}

export function MacDesktopInteractive({ onShowTokens }: { onShowTokens: () => void }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [hoveredDockIcon, setHoveredDockIcon] = useState<string | null>(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Update clock
  useState(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(interval);
  });

  const dockIcons: DockIcon[] = [
    { id: 'finder', name: 'Finder (Projects)', icon: '📁' },
    { id: 'about', name: 'About Me', icon: '👤' },
    { id: 'cv', name: 'CV.pdf', icon: '📄' },
    { id: 'chess', name: 'Chess', icon: '♟️' },
    { id: 'settings', name: 'Design System', icon: '⚙️' },
  ];

  const openWindow = (appId: string) => {
    if (appId === 'settings') {
      onShowTokens();
      return;
    }

    // Check if window already exists
    const existingWindow = windows.find(w => w.id === appId);
    if (existingWindow) {
      focusWindow(appId);
      return;
    }

    let newWindow: WindowState;
    const baseX = 120 + windows.length * 30;
    const baseY = 100 + windows.length * 30;

    switch (appId) {
      case 'finder':
        newWindow = {
          id: 'finder',
          title: 'Projects',
          icon: '📁',
          content: <ProjectsExplorer osType="macos" />,
          x: baseX,
          y: baseY,
          width: 850,
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
          content: <AboutMe osType="macos" />,
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
          title: 'CV.pdf',
          icon: '📄',
          content: <CVViewer osType="macos" />,
          x: baseX,
          y: baseY,
          width: 800,
          height: 650,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex,
        };
        break;
      case 'chess':
        newWindow = {
          id: 'chess',
          title: 'Chess',
          icon: '♟️',
          content: <ChessGame />,
          x: baseX,
          y: baseY,
          width: 480,
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
        background: 'linear-gradient(to bottom, #5aa8e0 0%, #2071b8 100%)',
      }}
    >
      {/* Aurora wallpaper effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 40%, rgba(147, 197, 253, 0.4) 0%, transparent 50%)',
        }}
      />

      {/* Menu Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-6 flex items-center px-3 gap-4"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span
          className="font-bold"
          style={{
            fontFamily: '"Lucida Grande", sans-serif',
            fontSize: '13px',
            color: '#000',
            textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)',
          }}
        >
          
        </span>
        <span
          className="font-bold"
          style={{
            fontFamily: '"Lucida Grande", sans-serif',
            fontSize: '13px',
            color: '#000',
            textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)',
          }}
        >
          Portfolio
        </span>
        <div className="flex-1" />
        <span
          className="text-xs"
          style={{
            fontFamily: '"Lucida Grande", sans-serif',
            color: '#000',
            textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)',
          }}
        >
          {time}
        </span>
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          {...window}
          osType="macos"
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onDragStart={moveWindow}
        />
      ))}

      {/* Dock */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div
          className="flex gap-1 px-3 py-2 rounded-2xl"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15))',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          }}
        >
          {dockIcons.map((icon, index) => {
            const isHovered = hoveredDockIcon === icon.id;
            const isNeighbor = hoveredDockIcon && Math.abs(dockIcons.findIndex(i => i.id === hoveredDockIcon) - index) === 1;
            
            let scale = 1;
            if (isHovered) scale = 1.5;
            else if (isNeighbor) scale = 1.2;

            return (
              <div
                key={icon.id}
                className="relative cursor-pointer transition-all"
                style={{
                  transform: `scale(${scale}) translateY(${isHovered ? '-16px' : isNeighbor ? '-8px' : '0'})`,
                  transformOrigin: 'bottom',
                }}
                onMouseEnter={() => setHoveredDockIcon(icon.id)}
                onMouseLeave={() => setHoveredDockIcon(null)}
                onClick={() => openWindow(icon.id)}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-all"
                  style={{
                    background: 'linear-gradient(to bottom, #f0f9ff, #bae6fd)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {icon.icon}
                </div>

                {/* Tooltip */}
                {isHovered && (
                  <div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded whitespace-nowrap"
                    style={{
                      background: 'rgba(0, 0, 0, 0.75)',
                      fontFamily: '"Lucida Grande", sans-serif',
                      fontSize: '11px',
                      color: '#ffffff',
                    }}
                  >
                    {icon.name}
                  </div>
                )}

                {/* Active Indicator */}
                {windows.some(w => w.id === icon.id && !w.isMinimized) && (
                  <div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{
                      background: '#000',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
