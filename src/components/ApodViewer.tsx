import React, { useState } from 'react';
import { ApodItem } from '../types';
import { fetchApod } from '../services/spaceApi';
import { APOD_CURATED_ARCHIVE } from '../data/spaceData';

export const ApodViewer: React.FC = () => {
  const [currentApod, setCurrentApod] = useState<ApodItem>(APOD_CURATED_ARCHIVE[0]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const loadDate = async (dateStr: string) => {
    setIsLoading(true);
    try {
      const data = await fetchApod(dateStr);
      setCurrentApod(data);
    } catch {
      // Fallback already handled inside fetchApod
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedDate(val);
    loadDate(val);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentApod.hdurl || currentApod.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Preset Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-xs font-semibold text-slate-400 mr-1">
            ARCHIVE PRESETS:
          </span>
          {APOD_CURATED_ARCHIVE.slice(0, 4).map((item) => (
            <button
              key={item.date}
              onClick={() => {
                setCurrentApod(item);
                setSelectedDate(item.date);
              }}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                currentApod.title === item.title
                  ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              {item.title.split(':')[0].slice(0, 20)}
            </button>
          ))}
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-500">DATE:</span>
          <input
            type="date"
            value={selectedDate}
            max={new Date().toISOString().split('T')[0]}
            min="1995-06-16"
            onChange={handleDateChange}
            className="rounded border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none font-mono"
          />
        </div>
      </div>

      {/* Main APOD Display Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Image Canvas / Preview Area */}
          <div className="relative group min-h-[380px] bg-black lg:col-span-7 flex items-center justify-center overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2 text-xs text-slate-400 font-mono">
                <span>FETCHING TELEMETRY...</span>
              </div>
            ) : currentApod.media_type === 'video' ? (
              <iframe
                src={currentApod.url}
                title={currentApod.title}
                className="h-full min-h-[400px] w-full border-0"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={currentApod.url}
                  alt={currentApod.title}
                  className="max-h-[600px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-3 right-3 rounded border border-slate-700 bg-slate-950/90 px-3 py-1 text-xs font-mono text-slate-200 backdrop-blur-md hover:bg-slate-900 transition-colors"
                >
                  FULL RESOLUTION [4K]
                </button>
              </>
            )}
          </div>

          {/* Metadata & In-Depth Scientific Context */}
          <div className="flex flex-col justify-between p-6 lg:col-span-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="text-cyan-400">{currentApod.date}</span>
                <span>{currentApod.copyright ? `© ${currentApod.copyright}` : 'Public Domain'}</span>
              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
                {currentApod.title}
              </h2>

              <div className="rounded-lg border border-slate-800/80 bg-slate-950/50 p-3.5">
                <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  ASTRONOMICAL OBSERVATION
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed max-h-[260px] overflow-y-auto pr-1">
                  {currentApod.explanation}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-800 pt-4 font-mono text-xs">
              <button
                onClick={handleCopyLink}
                className="rounded border border-slate-800 bg-slate-800/80 px-3 py-1.5 font-medium text-slate-200 hover:bg-slate-700 transition-colors"
              >
                {copied ? 'LINK COPIED' : 'COPY DIRECT LINK'}
              </button>

              {currentApod.hdurl && (
                <a
                  href={currentApod.hdurl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 font-semibold text-cyan-300 hover:bg-cyan-900/50 transition-colors"
                >
                  RAW 4K IMAGE →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative max-h-[95vh] max-w-[95vw] overflow-hidden rounded-xl border border-slate-700 bg-black">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 rounded bg-slate-900/90 px-2.5 py-1 text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              CLOSE [ESC]
            </button>
            <img
              src={currentApod.hdurl || currentApod.url}
              alt={currentApod.title}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-xs text-slate-300 font-mono">
              <div className="font-bold text-slate-100 text-sm font-sans">{currentApod.title}</div>
              <div className="text-slate-400 mt-0.5">{currentApod.date} · {currentApod.copyright || 'NASA/ESA'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
