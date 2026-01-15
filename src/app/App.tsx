import { useState } from 'react';
import { OSSelector } from '@/app/components/OSSelector';
import { VistaBoot } from '@/app/components/VistaBoot';
import { MacBoot } from '@/app/components/MacBoot';
import { VistaDesktopInteractive } from '@/app/components/VistaDesktopInteractive';
import { MacDesktopInteractive } from '@/app/components/MacDesktopInteractive';
import { DesignTokens } from '@/app/components/DesignTokens';

type AppState = 'selector' | 'vista-boot' | 'mac-boot' | 'vista-desktop' | 'mac-desktop' | 'tokens';

export default function App() {
  const [state, setState] = useState<AppState>('selector');

  const handleOSSelect = (os: 'vista' | 'macos') => {
    if (os === 'vista') {
      setState('vista-boot');
    } else {
      setState('mac-boot');
    }
  };

  const handleVistaBootComplete = () => {
    setState('vista-desktop');
  };

  const handleMacBootComplete = () => {
    setState('mac-desktop');
  };

  const handleShowTokens = () => {
    setState('tokens');
  };

  const handleBackToSelector = () => {
    setState('selector');
  };

  return (
    <div className="w-full h-screen">
      {state === 'selector' && (
        <OSSelector onSelectOS={handleOSSelect} />
      )}

      {state === 'vista-boot' && (
        <VistaBoot onComplete={handleVistaBootComplete} />
      )}

      {state === 'mac-boot' && (
        <MacBoot onComplete={handleMacBootComplete} />
      )}

      {state === 'vista-desktop' && (
        <VistaDesktopInteractive onShowTokens={handleShowTokens} />
      )}

      {state === 'mac-desktop' && (
        <MacDesktopInteractive onShowTokens={handleShowTokens} />
      )}

      {state === 'tokens' && (
        <DesignTokens onBack={handleBackToSelector} />
      )}

      {/* Global navigation hint - subtle */}
      {state !== 'selector' && state !== 'tokens' && (
        <button
          onClick={handleBackToSelector}
          className="fixed top-4 left-4 px-3 py-1.5 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white rounded text-xs transition-all z-50"
          style={{
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          ← Back to OS Selector
        </button>
      )}
    </div>
  );
}