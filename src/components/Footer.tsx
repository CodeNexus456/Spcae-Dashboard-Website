import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-[#080d1a] py-8 text-xs text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-slate-200 tracking-wider">ASTRON TELEMETRY</span>
          <span className="text-slate-600">·</span>
          <span>Crafted for space researchers, mission analysts & stargazers</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-500">
          <span>ISS: WhereTheISS.at</span>
          <span className="text-slate-700">/</span>
          <span>NASA APOD & Mars Archive</span>
          <span className="text-slate-700">/</span>
          <span>LL2 Space Devs</span>
          <span className="text-slate-700">/</span>
          <span>SNAPI News</span>
        </div>
      </div>
    </footer>
  );
};
