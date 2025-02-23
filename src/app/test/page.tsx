"use client";
import { Dock } from '@/components/library/test/dock';
import { AppWindow } from '@/components/library/test/dock/app-window';
import React, { useState } from 'react';

function App() {
  const [openApps, setOpenApps] = useState<Set<string>>(new Set());

  const handleOpenApp = (appId: string) => {
    setOpenApps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(appId)) {
        newSet.delete(appId);
      } else {
        newSet.add(appId);
      }
      return newSet;
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Example App Windows */}
      <AppWindow
        title="Settings"
        isOpen={openApps.has('settings')}
        onClose={() => handleOpenApp('settings')}
        onMinimize={() => handleOpenApp('settings')}
      >
        <div className="text-white">Settings Content</div>
      </AppWindow>

      <AppWindow
        title="Music"
        isOpen={openApps.has('music')}
        onClose={() => handleOpenApp('music')}
        onMinimize={() => handleOpenApp('music')}
      >
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
        <div className="text-white">Music Player</div>
      </AppWindow>

      <AppWindow
        title="Photos"
        isOpen={openApps.has('photos')}
        onClose={() => handleOpenApp('photos')}
        onMinimize={() => handleOpenApp('photos')}
      >
        <div className="text-white">Photo Gallery</div>
      </AppWindow>

      <AppWindow
        title="Mail"
        isOpen={openApps.has('mail')}
        onClose={() => handleOpenApp('mail')}
        onMinimize={() => handleOpenApp('mail')}
      >
        <div className="text-white">Mail Client</div>
      </AppWindow>

      <AppWindow
        title="Terminal"
        isOpen={openApps.has('terminal')}
        onClose={() => handleOpenApp('terminal')}
        onMinimize={() => handleOpenApp('terminal')}
      >
        <div className="text-white font-mono">
          <p>user@machine:~$ _</p>
        </div>
      </AppWindow>

      <Dock openApp={handleOpenApp} openApps={openApps} />
    </div>
  );
}

export default App