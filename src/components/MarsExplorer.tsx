import React, { useState } from 'react';
import { MarsPhoto } from '../types';
import { MARS_SURFACE_PHOTOS } from '../data/spaceData';

interface MarsExplorerProps {
  unit: 'metric' | 'imperial';
}

export const MarsExplorer: React.FC<MarsExplorerProps> = ({ unit }) => {
  const [selectedRover, setSelectedRover] = useState<'All' | 'Perseverance' | 'Curiosity'>('All');
  const [selectedCamera, setSelectedCamera] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<MarsPhoto | null>(null);

  const filteredPhotos = MARS_SURFACE_PHOTOS.filter((photo) => {
    const matchesRover = selectedRover === 'All' || photo.rover === selectedRover;
    const matchesCamera = selectedCamera === 'All' || photo.camera.includes(selectedCamera);
    return matchesRover && matchesCamera;
  });

  const formatTemp = (celsius: number) => {
    if (unit === 'imperial') {
      const f = Math.round((celsius * 9) / 5 + 32);
      return `${f}°F`;
    }
    return `${celsius}°C`;
  };

  return (
    <div className="space-y-6">
      {/* Mars Rovers Status & Live Environmental Telemetry Banner */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Rover Telemetry: Perseverance */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-red-400 font-mono">PERSEVERANCE ROVER</span>
            <span className="rounded bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
              ACTIVE · SOL 1204+
            </span>
          </div>
          <div className="mt-3 space-y-1 text-xs text-slate-300 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Landing Site:</span>
              <span className="text-slate-200">Jezero Crater (18.38° N, 77.58° E)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Traversed:</span>
              <span className="text-cyan-400">{unit === 'imperial' ? '18.4 miles' : '29.6 km'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Samples Cached:</span>
              <span className="text-slate-200">25 Titanium Tubes</span>
            </div>
          </div>
        </div>

        {/* Rover Telemetry: Curiosity */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-400 font-mono">CURIOSITY ROVER</span>
            <span className="rounded bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
              ACTIVE · SOL 3880+
            </span>
          </div>
          <div className="mt-3 space-y-1 text-xs text-slate-300 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Landing Site:</span>
              <span className="text-slate-200">Gale Crater / Mount Sharp</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Traversed:</span>
              <span className="text-cyan-400">{unit === 'imperial' ? '20.1 miles' : '32.4 km'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Primary Goal:</span>
              <span className="text-slate-200">Past Habitable Environments</span>
            </div>
          </div>
        </div>

        {/* Martian Weather Sensor Station (REMS / MEDA) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 font-mono">ATMOSPHERE (MEDA)</span>
            <span className="font-mono text-[10px] text-red-400 font-bold">[MET]</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="rounded bg-slate-950/60 p-2">
              <div className="text-[10px] text-slate-500">AIR TEMP (HIGH)</div>
              <div className="text-sm font-semibold text-slate-200">{formatTemp(-14)}</div>
            </div>
            <div className="rounded bg-slate-950/60 p-2">
              <div className="text-[10px] text-slate-500">AIR TEMP (LOW)</div>
              <div className="text-sm font-semibold text-blue-300">{formatTemp(-76)}</div>
            </div>
            <div className="rounded bg-slate-950/60 p-2">
              <div className="text-[10px] text-slate-500">PRESSURE</div>
              <div className="text-sm font-semibold text-slate-200">748 Pa (0.7% Earth)</div>
            </div>
            <div className="rounded bg-slate-950/60 p-2">
              <div className="text-[10px] text-slate-500">WIND SPEED</div>
              <div className="text-sm font-semibold text-slate-200">{unit === 'imperial' ? '9 mph' : '15 km/h'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-xs">
        {/* Rover Selection */}
        <div className="flex items-center gap-1.5 font-mono">
          <span className="font-semibold text-slate-400 mr-1">ROVER:</span>
          {(['All', 'Perseverance', 'Curiosity'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRover(r)}
              className={`rounded px-2.5 py-1 font-medium transition-all ${
                selectedRover === r
                  ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Camera Selection */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
          <span className="text-slate-500 mr-1">PAYLOAD:</span>
          {[
            { id: 'All', label: 'All Instruments' },
            { id: 'MAST', label: 'Mastcam' },
            { id: 'NAV', label: 'Navcam' },
            { id: 'HAZ', label: 'Hazcam' },
            { id: 'RMI', label: 'Micro-Imager' }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCamera(c.id)}
              className={`rounded px-2.5 py-1 font-medium transition-all ${
                selectedCamera === c.id
                  ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:border-slate-700 hover:bg-slate-900/90"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <img
                src={photo.img_src}
                alt={photo.cameraFullName}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 rounded bg-slate-950/80 px-2 py-0.5 font-mono text-[10px] text-cyan-300 backdrop-blur-sm">
                {photo.rover} · SOL {photo.sol}
              </div>
              <div className="absolute bottom-2 right-2 rounded bg-slate-950/80 px-2 py-0.5 font-mono text-[10px] text-slate-300 backdrop-blur-sm">
                {photo.camera}
              </div>
            </div>

            <div className="p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-200">{photo.cameraFullName}</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {photo.description}
              </p>
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-2 text-[11px] text-slate-500 font-mono">
                <span>Earth: {photo.earth_date}</span>
                <span className="text-cyan-400 group-hover:underline">
                  Inspect Frame →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox for Mars Surface Image */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
            <div className="relative aspect-[16/10] w-full bg-black">
              <img
                src={activePhoto.img_src}
                alt={activePhoto.cameraFullName}
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 rounded bg-slate-950/90 px-2.5 py-1 text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-red-400 font-mono">
                  {activePhoto.rover} ROVER · {activePhoto.camera}
                </span>
                <span className="font-mono text-slate-400">
                  SOL {activePhoto.sol} ({activePhoto.earth_date})
                </span>
              </div>

              <h4 className="text-base font-semibold text-slate-100">{activePhoto.cameraFullName}</h4>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                {activePhoto.description}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActivePhoto(null)}
                  className="rounded border border-slate-750 bg-slate-800 px-4 py-1.5 text-xs font-mono font-medium text-slate-200 hover:bg-slate-700"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
