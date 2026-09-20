import React, { useState, useEffect } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unit: 'metric' | 'imperial';
  setUnit: (u: 'metric' | 'imperial') => void;
  isLive: boolean;
  setIsLive: (live: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  unit,
  setUnit,
  isLive,
  setIsLive
}) => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        now.toUTCString().replace('GMT', 'UTC').split(' ').slice(1, 5).join(' ')
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'orbit', label: 'ISS Orbit' },
    { id: 'launches', label: 'Launches' },
    { id: 'apod', label: 'NASA APOD' },
    { id: 'mars', label: 'Mars Rover' },
    { id: 'planets', label: 'Planets & Gravity' },
    { id: 'news', label: 'News Feed' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0b0f19]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand & Live status */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 items-center justify-center rounded border border-cyan-500/40 bg-cyan-950/30 px-2 font-mono text-xs font-bold tracking-wider text-cyan-300">
            ASTRON
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-slate-100 text-base">Space Dashboard</span>
              <span className="rounded border border-slate-800 bg-slate-800/80 px-1.5 py-0.2 text-[10px] font-mono text-slate-400">
                v2.4
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="relative flex h-2 w-2">
                {isLive && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                {isLive ? 'LIVE' : 'PAUSED'} · {utcTime || 'SYNCING...'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/80 p-1 text-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Global Controls: Unit Switch & Feed Pause */}
        <div className="flex items-center gap-2">
          {/* Metric / Imperial toggle */}
          <div className="flex rounded-md border border-slate-800 bg-slate-900/80 p-0.5 text-xs font-mono">
            <button
              onClick={() => setUnit('metric')}
              className={`rounded px-2.5 py-1 transition-colors ${
                unit === 'metric' ? 'bg-slate-800 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              KM
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`rounded px-2.5 py-1 transition-colors ${
                unit === 'imperial' ? 'bg-slate-800 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              MI
            </button>
          </div>

          {/* Pause / Resume live polling button */}
          <button
            onClick={() => setIsLive(!isLive)}
            title={isLive ? 'Pause live polling' : 'Resume live polling'}
            className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs font-mono font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
            <span>{isLive ? 'ACTIVE' : 'HOLD'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
