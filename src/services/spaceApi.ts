import { ISSTelemetry, RocketLaunch, SpaceNewsItem, ApodItem } from '../types';
import { UPCOMING_LAUNCHES_FALLBACK, SPACE_NEWS_FALLBACK, APOD_CURATED_ARCHIVE } from '../data/spaceData';

// Fetch live ISS telemetry
export async function fetchISSTelemetry(): Promise<ISSTelemetry> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544', {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`ISS HTTP error: ${res.status}`);
    const data = await res.json();
    return {
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      altitude: Number(data.altitude),
      velocity: Number(data.velocity),
      visibility: data.visibility === 'daylight' ? 'daylight' : 'eclipsed',
      timestamp: data.timestamp || Math.floor(Date.now() / 1000),
      solar_lat: data.solar_lat,
      solar_lon: data.solar_lon
    };
  } catch {
    // If network fails, simulate realistic orbital drift based on ~27,600 km/h
    const now = Date.now() / 1000;
    // Orbital period ~92.6 mins = 5556 secs -> 360 deg every 5556s
    const angle = (now % 5556) / 5556 * 2 * Math.PI;
    const lat = 51.6 * Math.sin(angle); // 51.6 deg inclination
    const lon = ((now % 5556) / 5556 * 360 - 180 + (now / 86400 * 360) % 360) % 360 - 180;
    return {
      latitude: Number(lat.toFixed(4)),
      longitude: Number(lon.toFixed(4)),
      altitude: 422.5,
      velocity: 27580,
      visibility: Math.sin(angle) > 0 ? 'daylight' : 'eclipsed',
      timestamp: Math.floor(now)
    };
  }
}

// Fetch upcoming rocket launches
export async function fetchUpcomingLaunches(): Promise<RocketLaunch[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=8', {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`Launches HTTP: ${res.status}`);
    const json = await res.json();

    if (json && Array.isArray(json.results) && json.results.length > 0) {
      return json.results.map((item: any): RocketLaunch => {
        const providerName = item.launch_service_provider?.name || 'Space Agency';
        return {
          id: item.id,
          name: item.name || 'Orbital Launch Mission',
          provider: providerName,
          providerCountry: item.pad?.location?.country_code || 'Global',
          rocket: item.rocket?.configuration?.name || 'Launch Vehicle',
          net: item.net || new Date(Date.now() + 86400000).toISOString(),
          status: item.status?.abbrev === 'Go' ? 'Go' : (item.status?.abbrev === 'Hold' ? 'Hold' : 'TBD'),
          pad: item.pad?.name || 'Orbital Launch Pad',
          location: item.pad?.location?.name || 'Launch Site',
          missionDescription: item.mission?.description || 'Payload deployment and trajectory insertion for satellite operations.',
          orbit: item.mission?.orbit?.name || 'Low Earth Orbit (LEO)',
          webcastUrl: item.webcast_live ? item.vidURLs?.[0]?.url : undefined,
          image: item.image || 'https://images.unsplash.com/photo-1517976487588-46682782b3d8?auto=format&fit=crop&w=800&q=80'
        };
      });
    }
    return UPCOMING_LAUNCHES_FALLBACK;
  } catch {
    return UPCOMING_LAUNCHES_FALLBACK;
  }
}

// Fetch live Spaceflight news
export async function fetchSpaceNews(): Promise<SpaceNewsItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=12', {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`News HTTP: ${res.status}`);
    const json = await res.json();

    if (json && Array.isArray(json.results) && json.results.length > 0) {
      return json.results.map((item: any): SpaceNewsItem => {
        // Tag categorize based on title/summary
        const txt = (item.title + ' ' + (item.summary || '')).toLowerCase();
        let cat = 'Spaceflight';
        if (txt.includes('station') || txt.includes('iss') || txt.includes('tiangong') || txt.includes('astronaut')) cat = 'Stations';
        else if (txt.includes('rocket') || txt.includes('falcon') || txt.includes('booster') || txt.includes('launch') || txt.includes('starship')) cat = 'Rockets';
        else if (txt.includes('mars') || txt.includes('moon') || txt.includes('artemis') || txt.includes('lunar')) cat = 'Missions';
        else if (txt.includes('webb') || txt.includes('telescope') || txt.includes('galaxy') || txt.includes('star') || txt.includes('black hole')) cat = 'Science';

        return {
          id: item.id,
          title: item.title,
          url: item.url,
          image_url: item.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
          news_site: item.news_site || 'Spaceflight News',
          summary: item.summary || 'Recent space exploration and aerospace development update.',
          published_at: item.published_at,
          category: cat
        };
      });
    }
    return SPACE_NEWS_FALLBACK;
  } catch {
    return SPACE_NEWS_FALLBACK;
  }
}

// Fetch NASA APOD (Astronomy Picture of the Day)
export async function fetchApod(dateString?: string): Promise<ApodItem> {
  // If date specified matches one of our curated items, or if live API fails
  if (dateString) {
    const found = APOD_CURATED_ARCHIVE.find(item => item.date === dateString);
    if (found) return found;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const dateParam = dateString ? `&date=${dateString}` : '';
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY${dateParam}`, {
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`APOD HTTP: ${res.status}`);
    const data = await res.json();
    return {
      date: data.date,
      title: data.title,
      explanation: data.explanation,
      url: data.url,
      hdurl: data.hdurl || data.url,
      media_type: data.media_type === 'video' ? 'video' : 'image',
      copyright: data.copyright ? data.copyright.replace(/\n/g, '').trim() : 'NASA Public Domain'
    };
  } catch {
    // Return curated archive item
    if (dateString) {
      const match = APOD_CURATED_ARCHIVE.find(a => a.date <= dateString) || APOD_CURATED_ARCHIVE[0];
      return { ...match, date: dateString };
    }
    return APOD_CURATED_ARCHIVE[0];
  }
}
