import React, { useState } from 'react';
import { SOLAR_SYSTEM_PLANETS } from '../data/spaceData';
import { PlanetInfo } from '../types';

interface CelestialAlmanacProps {
  unit: 'metric' | 'imperial';
}

export const CelestialAlmanac: React.FC<CelestialAlmanacProps> = ({ unit }) => {
  const [earthWeight, setEarthWeight] = useState<number>(unit === 'imperial' ? 150 : 70);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>(unit === 'imperial' ? 'lbs' : 'kg');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetInfo>(SOLAR_SYSTEM_PLANETS[2]); // Earth

  const categories = ['All', 'Terrestrial', 'Gas Giant', 'Ice Giant'];

  const filteredPlanets = SOLAR_SYSTEM_PLANETS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.type === selectedCategory;
  });

  const calculateWeight = (gravityFactor: number) => {
    const w = earthWeight * gravityFactor;
    return w.toFixed(1);
  };

  return (
    <div className="space-y-8">
      {/* Interactive Weight on Other Worlds Calculator */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-cyan-400">[SIMULATOR]</span>
              <h2 className="text-base font-bold text-slate-100 sm:text-lg">
                Planetary Gravity Simulator: Weight Across the Solar System
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Surface gravity varies dramatically based on a planet's mass and radius. Enter your Earth weight to see your weight on other worlds:
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5">
              <input
                type="number"
                min="1"
                max="500"
                value={earthWeight}
                onChange={(e) => setEarthWeight(Math.max(1, Number(e.target.value) || 0))}
                className="w-16 bg-transparent text-sm font-bold text-cyan-300 focus:outline-none"
              />
              <span className="text-xs text-slate-400 font-mono">Earth</span>
            </div>

            <div className="flex rounded-md border border-slate-700 bg-slate-800 p-0.5 text-xs font-mono">
              <button
                onClick={() => setWeightUnit('kg')}
                className={`rounded px-2 py-1 ${weightUnit === 'kg' ? 'bg-slate-700 text-slate-100 font-bold' : 'text-slate-400'}`}
              >
                kg
              </button>
              <button
                onClick={() => setWeightUnit('lbs')}
                className={`rounded px-2 py-1 ${weightUnit === 'lbs' ? 'bg-slate-700 text-slate-100 font-bold' : 'text-slate-400'}`}
              >
                lbs
              </button>
            </div>
          </div>
        </div>

        {/* Gravity Grid Breakdown */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {SOLAR_SYSTEM_PLANETS.map((planet) => {
            const planetWeight = calculateWeight(planet.gravityFactor);
            const isEarth = planet.name === 'Earth';
            return (
              <div
                key={planet.name}
                onClick={() => setSelectedPlanet(planet)}
                className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                  selectedPlanet.name === planet.name
                    ? 'border-cyan-500/60 bg-slate-800/90 shadow-md'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: planet.colorHex }}
                    />
                    <span className="text-xs font-bold text-slate-200">{planet.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    {(planet.gravityFactor * 100).toFixed(0)}% g
                  </span>
                </div>

                <div className="mt-2 text-lg font-bold font-mono text-cyan-400">
                  {planetWeight} <span className="text-xs font-normal text-slate-400">{weightUnit}</span>
                </div>

                <div className="mt-1 text-[11px] text-slate-400">
                  {isEarth ? 'Reference baseline' : planet.gravityFactor < 1 ? 'Lighter feeling' : 'Heavier feeling'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Planet Deep-Dive Inspector */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          <div className="space-y-4 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: selectedPlanet.colorHex }}
              />
              <h3 className="text-2xl font-bold text-slate-100">{selectedPlanet.name}</h3>
              <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                {selectedPlanet.type}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              {selectedPlanet.funFact}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs">
              <div className="rounded-lg bg-slate-950/70 p-3 border border-slate-800/80">
                <div className="text-slate-500 text-[10px]">DISTANCE FROM SUN</div>
                <div className="mt-1 font-semibold text-slate-200">{selectedPlanet.distanceFromSunAU} AU</div>
                <div className="text-[10px] text-slate-400">{selectedPlanet.distanceFromSunKm}</div>
              </div>

              <div className="rounded-lg bg-slate-950/70 p-3 border border-slate-800/80">
                <div className="text-slate-500 text-[10px]">EQUATORIAL DIAMETER</div>
                <div className="mt-1 font-semibold text-slate-200">
                  {selectedPlanet.diameterKm.toLocaleString()} km
                </div>
                <div className="text-[10px] text-slate-400">
                  {(selectedPlanet.diameterKm / 12742).toFixed(2)}x Earth
                </div>
              </div>

              <div className="rounded-lg bg-slate-950/70 p-3 border border-slate-800/80">
                <div className="text-slate-500 text-[10px]">ORBITAL PERIOD (YEAR)</div>
                <div className="mt-1 font-semibold text-slate-200">
                  {selectedPlanet.orbitalPeriodDays >= 365
                    ? `${(selectedPlanet.orbitalPeriodDays / 365.25).toFixed(1)} Earth yrs`
                    : `${selectedPlanet.orbitalPeriodDays} Earth days`}
                </div>
              </div>

              <div className="rounded-lg bg-slate-950/70 p-3 border border-slate-800/80">
                <div className="text-slate-500 text-[10px]">CONFIRMED MOONS</div>
                <div className="mt-1 font-semibold text-cyan-400">{selectedPlanet.moonsCount} Natural Satellites</div>
              </div>
            </div>
          </div>

          {/* Quick physics telemetry card */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Surface Conditions & Physics
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Surface Gravity:</span>
                <span className="text-cyan-400 font-semibold">{selectedPlanet.surfaceGravity} m/s²</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Day Length:</span>
                <span className="text-slate-200">
                  {selectedPlanet.dayLengthHours > 48
                    ? `${(selectedPlanet.dayLengthHours / 24).toFixed(1)} Earth days`
                    : `${selectedPlanet.dayLengthHours} hours`}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Temperature:</span>
                <span className="text-slate-200">{selectedPlanet.temperatureC}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Your Weight Here:</span>
                <span className="text-amber-400 font-bold">
                  {calculateWeight(selectedPlanet.gravityFactor)} {weightUnit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solar System Catalog Comparison Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100">Solar System Planetary Catalog</h3>
            <p className="text-xs text-slate-400">Standardized orbital astronomical metrics</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                  selectedCategory === c
                    ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="pb-3 font-medium">CELESTIAL BODY</th>
                <th className="pb-3 font-medium">TYPE</th>
                <th className="pb-3 font-medium">DISTANCE (AU)</th>
                <th className="pb-3 font-medium">DIAMETER</th>
                <th className="pb-3 font-medium">DAY LENGTH</th>
                <th className="pb-3 font-medium">SURFACE GRAVITY</th>
                <th className="pb-3 font-medium">MOONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredPlanets.map((planet) => (
                <tr
                  key={planet.name}
                  onClick={() => setSelectedPlanet(planet)}
                  className={`cursor-pointer transition-colors ${
                    selectedPlanet.name === planet.name ? 'bg-cyan-950/30' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3 pr-4 font-sans font-semibold text-slate-200 flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: planet.colorHex }}
                    />
                    {planet.name}
                  </td>
                  <td className="py-3 pr-4 text-slate-400 font-sans">{planet.type}</td>
                  <td className="py-3 pr-4 text-slate-300">{planet.distanceFromSunAU} AU</td>
                  <td className="py-3 pr-4 text-slate-300">{planet.diameterKm.toLocaleString()} km</td>
                  <td className="py-3 pr-4 text-slate-300">{planet.dayLengthHours}h</td>
                  <td className="py-3 pr-4 text-cyan-400">{planet.surfaceGravity} m/s²</td>
                  <td className="py-3 text-slate-400">{planet.moonsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
