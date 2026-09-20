import React, { useState, useEffect } from 'react';
import { RocketLaunch } from '../types';
import { fetchUpcomingLaunches } from '../services/spaceApi';

export const LaunchTracker: React.FC = () => {
  const [launches, setLaunches] = useState<RocketLaunch[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await fetchUpcomingLaunches();
      setLaunches(data);
      setIsLoading(false);
    };
    load();
  }, []);

  // Update countdown timer for the closest upcoming launch
  const nextLaunch = launches[0];

  useEffect(() => {
    if (!nextLaunch) return;

    const tick = () => {
      const target = new Date(nextLaunch.net).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdown({ d, h, m, s });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [nextLaunch]);

  const filteredLaunches = launches.filter((launch) => {
    const matchesProvider =
      selectedProvider === 'All' ||
      launch.provider.toLowerCase().includes(selectedProvider.toLowerCase());
    const matchesSearch =
      launch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      launch.rocket.toLowerCase().includes(searchQuery.toLowerCase()) ||
      launch.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvider && matchesSearch;
  });

  const providers = ['All', 'SpaceX', 'Rocket Lab', 'Arianespace', 'ISRO'];

  return (
    <div className="space-y-6">
      {/* Featured Next Immediate Launch Countdown Hero */}
      {nextLaunch && (
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
          <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            <div className="space-y-3 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded border border-cyan-500/30 bg-cyan-950/50 px-2 py-0.5 font-mono text-xs font-semibold text-cyan-300">
                  NEXT IMMEDIATE MISSION
                </span>
                <span className="rounded border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-400">
                  STATUS: {nextLaunch.status.toUpperCase()}
                </span>
                <span className="font-mono text-xs text-slate-400">{nextLaunch.provider}</span>
              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
                {nextLaunch.name}
              </h2>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {nextLaunch.missionDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
                <div>
                  <span className="text-slate-500 mr-1">ROCKET:</span>
                  <span className="text-slate-200 font-semibold">{nextLaunch.rocket}</span>
                </div>
                <div>
                  <span className="text-slate-500 mr-1">PAD:</span>
                  <span>{nextLaunch.pad}</span>
                </div>
                <div>
                  <span className="text-slate-500 mr-1">NET:</span>
                  <span className="text-cyan-400">{new Date(nextLaunch.net).toUTCString().slice(0, 22)} UTC</span>
                </div>
              </div>
            </div>

            {/* Countdown Clock Display */}
            <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-4 text-center lg:col-span-5">
              <div className="text-xs font-mono font-medium text-slate-400">
                T-MINUS COUNTDOWN
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2 font-mono">
                <div className="rounded-lg bg-slate-900 p-2">
                  <div className="text-2xl font-bold text-slate-100 sm:text-3xl">
                    {countdown ? String(countdown.d).padStart(2, '0') : '00'}
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400">DAYS</div>
                </div>
                <div className="rounded-lg bg-slate-900 p-2">
                  <div className="text-2xl font-bold text-slate-100 sm:text-3xl">
                    {countdown ? String(countdown.h).padStart(2, '0') : '00'}
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400">HOURS</div>
                </div>
                <div className="rounded-lg bg-slate-900 p-2">
                  <div className="text-2xl font-bold text-slate-100 sm:text-3xl">
                    {countdown ? String(countdown.m).padStart(2, '0') : '00'}
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400">MINS</div>
                </div>
                <div className="rounded-lg bg-slate-900 p-2">
                  <div className="text-2xl font-bold text-cyan-400 sm:text-3xl">
                    {countdown ? String(countdown.s).padStart(2, '0') : '00'}
                  </div>
                  <div className="mt-0.5 text-[10px] text-cyan-400">SECS</div>
                </div>
              </div>

              {nextLaunch.webcastUrl && (
                <a
                  href={nextLaunch.webcastUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-750 bg-slate-850 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-slate-750 transition-colors"
                >
                  <span>Launch Webcast →</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[11px] text-slate-400 mr-1">AGENCY:</span>
          {providers.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedProvider(p)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                selectedProvider === p
                  ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="min-w-[200px] flex-1 sm:max-w-xs">
          <input
            type="text"
            placeholder="Search rocket, payload, pad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950/80 py-1.5 px-3 text-xs text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none"
          />
        </div>
      </div>

      {/* Launch Schedule Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLaunches.map((launch) => (
          <div
            key={launch.id}
            className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/50 p-4 transition-all hover:border-slate-750 hover:bg-slate-900/80"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-400 font-mono">{launch.provider}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-mono uppercase ${
                    launch.status === 'Go'
                      ? 'border border-emerald-500/30 bg-emerald-950/30 text-emerald-400'
                      : 'border border-amber-500/30 bg-amber-950/30 text-amber-400'
                  }`}
                >
                  {launch.status}
                </span>
              </div>

              <h3 className="mt-2 text-sm font-bold text-slate-100">{launch.name}</h3>

              <div className="mt-2.5 space-y-1 text-xs text-slate-400 font-mono">
                <div>
                  <span className="text-slate-500 mr-1">VEHICLE:</span>
                  <span className="font-medium text-slate-200">{launch.rocket}</span>
                  <span className="text-slate-600 mx-1">/</span>
                  <span className="text-slate-400">{launch.orbit}</span>
                </div>
                <div className="truncate">
                  <span className="text-slate-500 mr-1">LOCATION:</span>
                  <span className="text-slate-300">{launch.location}</span>
                </div>
                <div>
                  <span className="text-slate-500 mr-1">NET TIME:</span>
                  <span className="text-cyan-400">
                    {new Date(launch.net).toLocaleDateString()} · {new Date(launch.net).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {launch.missionDescription}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
              <span className="font-mono text-[11px] text-slate-500">{launch.pad.split('(')[0].trim()}</span>
              {launch.webcastUrl && (
                <a
                  href={launch.webcastUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Watch Stream →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredLaunches.length === 0 && !isLoading && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center text-xs text-slate-400">
          No scheduled launches match your filter query.
        </div>
      )}
    </div>
  );
};
