/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { ISSTracker } from './components/ISSTracker';
import { LaunchTracker } from './components/LaunchTracker';
import { ApodViewer } from './components/ApodViewer';
import { MarsExplorer } from './components/MarsExplorer';
import { CelestialAlmanac } from './components/CelestialAlmanac';
import { SpaceNews } from './components/SpaceNews';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('orbit');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [isLive, setIsLive] = useState<boolean>(true);

  const tabsInfo: Record<string, { id: string; num: string; title: string; subtitle: string }> = {
    orbit: {
      id: 'orbit',
      num: '01',
      title: 'International Space Station Telemetry',
      subtitle: 'Real-time orbital tracking, ground trajectory coordinates, and active Expedition 71/72 crew'
    },
    launches: {
      id: 'launches',
      num: '02',
      title: 'Upcoming Rocket Launch Schedule',
      subtitle: 'Verified launch windows, countdown clocks, payloads, and mission profiles across global space agencies'
    },
    apod: {
      id: 'apod',
      num: '03',
      title: 'NASA Astronomy Picture of the Day',
      subtitle: 'Curated deep-sky cosmic captures, high-resolution telescope imagery, and astrophysical explanations'
    },
    mars: {
      id: 'mars',
      num: '04',
      title: 'Mars Surface Exploration',
      subtitle: 'Authentic imagery from Curiosity and Perseverance rovers with Jezero & Gale Crater weather telemetry'
    },
    planets: {
      id: 'planets',
      num: '05',
      title: 'Solar System Almanac & Gravity Calculator',
      subtitle: 'Planetary orbital constants, atmospheric physics, and interactive weight simulation across the solar system'
    },
    news: {
      id: 'news',
      num: '06',
      title: 'Global Spaceflight News Feed',
      subtitle: 'Up-to-the-minute updates from NASA, ESA, SpaceX, and leading aerospace research institutions'
    }
  };

  const currentTabInfo = tabsInfo[activeTab] || tabsInfo.orbit;

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unit={unit}
        setUnit={setUnit}
        isLive={isLive}
        setIsLive={setIsLive}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-6">
        {/* Section Header with Human-Crafted Editorial Aesthetic */}
        <div className="flex flex-col gap-2 border-b border-slate-800/80 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
              <span>MODULE {currentTabInfo.num}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400 uppercase tracking-wider">{activeTab}</span>
            </div>
            <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
              {currentTabInfo.title}
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              {currentTabInfo.subtitle}
            </p>
          </div>

          {/* Quick Section Switchers */}
          <div className="flex flex-wrap items-center gap-1.5 sm:mt-0 font-mono text-xs">
            {Object.entries(tabsInfo).map(([key, info]) => {
              const isSelected = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`rounded px-2.5 py-1 text-[11px] transition-all ${
                    isSelected
                      ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-transparent'
                  }`}
                >
                  <span className="text-slate-500 mr-1">{info.num}</span>
                  <span className="capitalize">{key}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content with Motion Fade Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
          >
            {activeTab === 'orbit' && <ISSTracker unit={unit} isLive={isLive} />}
            {activeTab === 'launches' && <LaunchTracker />}
            {activeTab === 'apod' && <ApodViewer />}
            {activeTab === 'mars' && <MarsExplorer unit={unit} />}
            {activeTab === 'planets' && <CelestialAlmanac unit={unit} />}
            {activeTab === 'news' && <SpaceNews />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Clean Footer with Data Source Attribution */}
      <Footer />
    </div>
  );
}
