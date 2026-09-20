import React, { useState, useEffect, useRef } from 'react';
import { ISSTelemetry, Astronaut } from '../types';
import { fetchISSTelemetry } from '../services/spaceApi';
import { CURRENT_ASTRONAUTS } from '../data/spaceData';

interface ISSTrackerProps {
  unit: 'metric' | 'imperial';
  isLive: boolean;
}

export const ISSTracker: React.FC<ISSTrackerProps> = ({ unit, isLive }) => {
  const [telemetry, setTelemetry] = useState<ISSTelemetry | null>(null);
  const [history, setHistory] = useState<{ lat: number; lon: number; time: number }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAstronaut, setSelectedAstronaut] = useState<Astronaut | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const mapRef = useRef<HTMLDivElement>(null);

  const loadTelemetry = async () => {
    try {
      const data = await fetchISSTelemetry();
      setTelemetry(data);
      setLastUpdated(new Date());
      setHistory((prev) => {
        const next = [...prev, { lat: data.latitude, lon: data.longitude, time: data.timestamp }];
        // Keep last 16 points for trajectory trail
        return next.slice(-16);
      });
      setError(null);
    } catch (err: any) {
      setError('Unable to fetch live telemetry. Using orbital estimation.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTelemetry();
    if (!isLive) return;
    const interval = setInterval(loadTelemetry, 5000);
    return () => clearInterval(interval);
  }, [isLive]);

  // Convert km/h to mph or km to miles
  const formatSpeed = (kmh: number) => {
    if (unit === 'imperial') {
      const mph = Math.round(kmh * 0.621371);
      return `${mph.toLocaleString()} mph`;
    }
    return `${Math.round(kmh).toLocaleString()} km/h`;
  };

  const formatDistance = (km: number) => {
    if (unit === 'imperial') {
      const mi = Math.round(km * 0.621371);
      return `${mi.toLocaleString()} mi`;
    }
    return `${Math.round(km).toLocaleString()} km`;
  };

  // Map projection coordinates: SVG viewBox 0 0 1000 500
  // Longitude -180 to 180 maps to x 0 to 1000
  // Latitude 90 to -90 maps to y 0 to 500
  const projectX = (lon: number) => ((lon + 180) / 360) * 1000;
  const projectY = (lat: number) => ((90 - lat) / 180) * 500;

  // Generate a projected orbital sine wave trajectory around current ISS position
  const generateOrbitPath = (centerLat: number, centerLon: number) => {
    const points: string[] = [];
    for (let offset = -180; offset <= 180; offset += 5) {
      const lon = ((centerLon + offset + 180) % 360) - 180;
      // ISS orbital inclination is 51.6 degrees
      const lat = 51.6 * Math.sin(((centerLon + offset) * Math.PI) / 180);
      const x = projectX(lon);
      const y = projectY(lat);
      if (points.length === 0) {
        points.push(`M ${x.toFixed(1)} ${y.toFixed(1)}`);
      } else {
        // Handle wrap-around discontinuities
        const prevLon = ((centerLon + offset - 5 + 180) % 360) - 180;
        if (Math.abs(lon - prevLon) > 100) {
          points.push(`M ${x.toFixed(1)} ${y.toFixed(1)}`);
        } else {
          points.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
        }
      }
    }
    return points.join(' ');
  };

  const issX = telemetry ? projectX(telemetry.longitude) : 500;
  const issY = telemetry ? projectY(telemetry.latitude) : 250;

  return (
    <div className="space-y-6">
      {/* Overview & Key Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Orbital Velocity</span>
            <span className="font-mono text-[10px] text-cyan-400 font-bold">[VEL]</span>
          </div>
          <div className="mt-2 font-mono text-lg font-semibold tracking-tight text-slate-100 sm:text-xl">
            {telemetry ? formatSpeed(telemetry.velocity) : '27,580 km/h'}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">~7.66 km/second</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Mean Altitude</span>
            <span className="font-mono text-[10px] text-blue-400 font-bold">[ALT]</span>
          </div>
          <div className="mt-2 font-mono text-lg font-semibold tracking-tight text-slate-100 sm:text-xl">
            {telemetry ? formatDistance(telemetry.altitude) : '422 km'}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Low Earth Orbit (LEO)</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Latitude</span>
            <span className="font-mono text-[10px] text-slate-400 font-bold">LAT</span>
          </div>
          <div className="mt-2 font-mono text-lg font-semibold tracking-tight text-slate-100 sm:text-xl">
            {telemetry ? `${Math.abs(telemetry.latitude).toFixed(3)}° ${telemetry.latitude >= 0 ? 'N' : 'S'}` : '—'}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Inclination: 51.6°</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Longitude</span>
            <span className="font-mono text-[10px] text-slate-400 font-bold">LON</span>
          </div>
          <div className="mt-2 font-mono text-lg font-semibold tracking-tight text-slate-100 sm:text-xl">
            {telemetry ? `${Math.abs(telemetry.longitude).toFixed(3)}° ${telemetry.longitude >= 0 ? 'E' : 'W'}` : '—'}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Prime Meridian ref</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Lighting Condition</span>
            <span className="font-mono text-[10px] text-amber-400 font-bold">[SOL]</span>
          </div>
          <div className="mt-2 flex items-center gap-2 font-mono text-base font-semibold text-slate-100 sm:text-lg">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                telemetry?.visibility === 'daylight' ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-indigo-400 shadow-[0_0_8px_#818cf8]'
              }`}
            />
            <span className="capitalize">{telemetry?.visibility || 'Daylight'}</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">16 sunrises / 24h</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Crew in Orbit</span>
            <span className="font-mono text-[10px] text-emerald-400 font-bold">[CREW]</span>
          </div>
          <div className="mt-2 font-mono text-lg font-semibold tracking-tight text-slate-100 sm:text-xl">
            {CURRENT_ASTRONAUTS.length} Humans
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Expedition 71/72</div>
        </div>
      </div>

      {/* Main Interactive Orbit Map */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 bg-slate-900/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400" />
            <h2 className="text-sm font-semibold text-slate-200">International Space Station Ground Track</h2>
            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400">NORAD #25544</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Updated {lastUpdated.toLocaleTimeString()}</span>
            <button
              onClick={loadTelemetry}
              className="flex items-center gap-1.5 rounded border border-slate-800 bg-slate-800/60 px-2.5 py-1 text-slate-300 hover:bg-slate-700 transition-colors font-mono text-[11px]"
            >
              <span>{isLoading ? 'SYNCING...' : 'RELOAD'}</span>
            </button>
          </div>
        </div>

        {/* Map Canvas with SVG Projection */}
        <div ref={mapRef} className="relative aspect-[2/1] w-full bg-[#080d1a]">
          <svg viewBox="0 0 1000 500" className="h-full w-full select-none" xmlns="http://www.w3.org/2000/svg">
            {/* Latitude / Longitude Grid lines */}
            <g stroke="#1e293b" strokeWidth="0.75" strokeDasharray="3 3">
              {/* Parallels */}
              <line x1="0" y1="83.3" x2="1000" y2="83.3" /> {/* +60 */}
              <line x1="0" y1="166.6" x2="1000" y2="166.6" /> {/* +30 */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#334155" strokeWidth="1" strokeDasharray="none" /> {/* Equator */}
              <line x1="0" y1="333.3" x2="1000" y2="333.3" /> {/* -30 */}
              <line x1="0" y1="416.6" x2="1000" y2="416.6" /> {/* -60 */}

              {/* Meridians */}
              <line x1="250" y1="0" x2="250" y2="500" /> {/* -90 */}
              <line x1="500" y1="0" x2="500" y2="500" stroke="#334155" strokeWidth="1" strokeDasharray="none" /> {/* Prime 0 */}
              <line x1="750" y1="0" x2="750" y2="500" /> {/* +90 */}
            </g>

            {/* Simplified World Continents Silhouettes for fast, crisp rendering */}
            <g fill="#14213d" stroke="#1f3460" strokeWidth="0.8" opacity="0.85">
              {/* North America */}
              <path d="M 120 70 L 220 60 L 280 90 L 290 140 L 240 180 L 230 230 L 200 240 L 190 270 L 175 240 L 140 190 L 100 160 L 80 120 Z" />
              {/* South America */}
              <path d="M 230 260 L 290 270 L 320 320 L 290 410 L 260 450 L 240 400 L 220 340 L 220 280 Z" />
              {/* Eurasia */}
              <path d="M 460 70 L 580 60 L 720 70 L 870 90 L 920 140 L 850 190 L 780 220 L 710 210 L 640 260 L 590 210 L 520 200 L 480 160 L 440 120 L 430 80 Z" />
              {/* Africa */}
              <path d="M 470 210 L 570 200 L 610 260 L 570 370 L 530 420 L 490 380 L 460 300 L 450 240 Z" />
              {/* Australia */}
              <path d="M 780 340 L 860 330 L 900 370 L 880 420 L 810 420 L 760 380 Z" />
              {/* Greenland */}
              <path d="M 330 40 L 390 40 L 370 90 L 320 80 Z" />
              {/* Great Britain & Scandinavia */}
              <path d="M 450 110 L 470 100 L 460 130 Z M 510 60 L 540 80 L 510 130 Z" />
              {/* Japan */}
              <path d="M 870 170 L 890 190 L 870 220 Z" />
              {/* Madagascar */}
              <path d="M 615 360 L 630 380 L 620 410 Z" />
              {/* Antarctica */}
              <path d="M 50 485 L 950 485 L 900 460 L 600 465 L 400 460 L 100 465 Z" />
            </g>

            {/* Simulated Projected Orbit Trajectory */}
            {telemetry && (
              <path
                d={generateOrbitPath(telemetry.latitude, telemetry.longitude)}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.6"
              />
            )}

            {/* Position history trail */}
            {history.map((pt, i) => (
              <circle
                key={i}
                cx={projectX(pt.lon)}
                cy={projectY(pt.lat)}
                r={2 + (i / history.length) * 2}
                fill="#38bdf8"
                opacity={(i + 1) / history.length * 0.5}
              />
            ))}

            {/* Current ISS Position Marker */}
            {telemetry && (
              <g transform={`translate(${issX}, ${issY})`}>
                {/* Footprint Coverage Circle (Line of sight ~4,500 km footprint) */}
                <circle
                  r="52"
                  fill="#06b6d4"
                  fillOpacity="0.06"
                  stroke="#06b6d4"
                  strokeWidth="0.75"
                  strokeDasharray="2 2"
                />

                {/* Radar pulse animation ring */}
                <circle r="16" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8">
                  <animate attributeName="r" values="6;24" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Crosshairs */}
                <line x1="-12" y1="0" x2="-4" y2="0" stroke="#22d3ee" strokeWidth="1.5" />
                <line x1="4" y1="0" x2="12" y2="0" stroke="#22d3ee" strokeWidth="1.5" />
                <line x1="0" y1="-12" x2="0" y2="-4" stroke="#22d3ee" strokeWidth="1.5" />
                <line x1="0" y1="4" x2="0" y2="12" stroke="#22d3ee" strokeWidth="1.5" />

                {/* Core Satellite icon dot */}
                <circle r="4.5" fill="#f8fafc" stroke="#06b6d4" strokeWidth="2" />

                {/* ISS Label with altitude indicator */}
                <g transform="translate(14, -14)">
                  <rect x="0" y="-12" width="68" height="24" rx="4" fill="#0f172a" fillOpacity="0.9" stroke="#334155" strokeWidth="0.8" />
                  <text x="6" y="3" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    ISS · LEO
                  </text>
                </g>
              </g>
            )}
          </svg>

          {/* Map Controls & Status Badge Overlay */}
          <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs backdrop-blur-md">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>Current Orbit: 92.6 min period</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-slate-400">
              Passes/Day: 15.5
            </span>
          </div>

          <div className="absolute top-3 right-3 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-md">
            <span className="font-mono text-cyan-400">FOOTPRINT:</span> ~4,500 km Horizon
          </div>
        </div>
      </div>

      {/* Crew Onboard Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-base font-semibold text-slate-100">Astronauts Currently Aboard the Station</h3>
            <p className="text-xs text-slate-400">Expedition 71/72 active research crew members in microgravity</p>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 text-xs font-medium text-emerald-400">
            {CURRENT_ASTRONAUTS.length} Crew Active
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CURRENT_ASTRONAUTS.map((astro) => (
            <div
              key={astro.name}
              onClick={() => setSelectedAstronaut(astro)}
              className="group cursor-pointer rounded-xl border border-slate-800/80 bg-slate-900/70 p-3.5 transition-all hover:border-cyan-500/40 hover:bg-slate-800/60"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{astro.flag}</span>
                    <span className="font-semibold text-slate-200 group-hover:text-cyan-300 text-sm">{astro.name}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">{astro.role}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-800/60 pt-2.5 text-xs text-slate-400">
                <span>{astro.mission}</span>
                <span className="font-mono text-cyan-400">{astro.daysInSpace}d logged</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Astronaut Detail Modal */}
        {selectedAstronaut && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedAstronaut.flag}</span>
                    <h4 className="text-lg font-bold text-slate-100">{selectedAstronaut.name}</h4>
                  </div>
                  <p className="text-xs text-cyan-400 font-medium">{selectedAstronaut.role}</p>
                </div>
                <button
                  onClick={() => setSelectedAstronaut(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-slate-300">
                <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-950/60 p-3 font-mono">
                  <div>
                    <span className="text-slate-500">MISSION:</span>
                    <p className="font-semibold text-slate-200">{selectedAstronaut.mission}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">TOTAL LOGGED:</span>
                    <p className="font-semibold text-cyan-400">{selectedAstronaut.daysInSpace} Days</p>
                  </div>
                  <div>
                    <span className="text-slate-500">COUNTRY:</span>
                    <p className="font-semibold text-slate-200">{selectedAstronaut.country}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">CRAFT:</span>
                    <p className="font-semibold text-slate-200">{selectedAstronaut.craft}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-400">Mission Biography</h5>
                  <p className="mt-1 leading-relaxed text-slate-300">{selectedAstronaut.bio}</p>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setSelectedAstronaut(null)}
                  className="rounded-lg bg-slate-800 px-4 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Station Technical Profile */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="font-mono text-[10px] text-cyan-400 font-bold">[SPEC]</span>
            <span>Station Mass & Dimensions</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            The ISS weighs approximately 450,000 kg (~990,000 lbs) and measures 109 meters end-to-end, roughly the size of an American football field.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="font-mono text-[10px] text-blue-400 font-bold">[POWER]</span>
            <span>Solar Power Generation</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Eight sets of solar wings create 2,500 square meters of solar panels, generating up to 120 kilowatts of usable electrical power for laboratory experiments.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="font-mono text-[10px] text-amber-400 font-bold">[HISTORY]</span>
            <span>Continuous Human Presence</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Continuously inhabited since November 2, 2000. Over 270 individuals from 21 nations have visited, conducting more than 3,000 scientific investigations.
          </p>
        </div>
      </div>
    </div>
  );
};
