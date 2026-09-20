export interface ISSTelemetry {
  latitude: number;
  longitude: number;
  altitude: number; // in km
  velocity: number; // in km/h
  visibility: 'daylight' | 'eclipsed';
  timestamp: number;
  solar_lat?: number;
  solar_lon?: number;
}

export interface Astronaut {
  name: string;
  craft: string;
  role: string;
  country: string;
  flag: string;
  daysInSpace: number;
  mission: string;
  bio: string;
}

export interface RocketLaunch {
  id: string;
  name: string;
  provider: string;
  providerCountry: string;
  rocket: string;
  net: string; // ISO date
  status: 'Go' | 'TBD' | 'Success' | 'Hold';
  pad: string;
  location: string;
  missionDescription: string;
  orbit: string;
  webcastUrl?: string;
  image?: string;
}

export interface ApodItem {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  copyright?: string;
}

export interface MarsPhoto {
  id: string;
  rover: 'Perseverance' | 'Curiosity';
  camera: string;
  cameraFullName: string;
  sol: number;
  earth_date: string;
  img_src: string;
  description: string;
}

export interface PlanetInfo {
  name: string;
  type: 'Terrestrial' | 'Gas Giant' | 'Ice Giant' | 'Dwarf Planet' | 'Satellite';
  distanceFromSunAU: number; // Astronomical Units
  distanceFromSunKm: string;
  diameterKm: number;
  orbitalPeriodDays: number;
  dayLengthHours: number;
  temperatureC: string;
  moonsCount: number;
  surfaceGravity: number; // m/s^2 (Earth = 9.807)
  gravityFactor: number; // ratio to Earth
  colorHex: string;
  funFact: string;
}

export interface SpaceNewsItem {
  id: number | string;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  category?: string;
}
