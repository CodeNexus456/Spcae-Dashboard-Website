import { Astronaut, RocketLaunch, ApodItem, MarsPhoto, PlanetInfo, SpaceNewsItem } from '../types';

export const CURRENT_ASTRONAUTS: Astronaut[] = [
  {
    name: 'Sunita Williams',
    craft: 'ISS (Expedition 71/72)',
    role: 'Flight Engineer / Commander',
    country: 'United States',
    flag: '🇺🇸',
    daysInSpace: 340,
    mission: 'Boeing Starliner / ISS Exp 71',
    bio: 'Veteran NASA astronaut and naval aviator with 7 previous spacewalks totaling over 50 hours.'
  },
  {
    name: 'Barry "Butch" Wilmore',
    craft: 'ISS (Expedition 71/72)',
    role: 'Flight Engineer',
    country: 'United States',
    flag: '🇺🇸',
    daysInSpace: 290,
    mission: 'Boeing Starliner / ISS Exp 71',
    bio: 'NASA astronaut and US Navy test pilot on his third space mission.'
  },
  {
    name: 'Matthew Dominick',
    craft: 'ISS (Expedition 71)',
    role: 'Commander (Crew-8)',
    country: 'United States',
    flag: '🇺🇸',
    daysInSpace: 200,
    mission: 'SpaceX Crew-8',
    bio: 'Active duty US Navy commander conducting microgravity fluid physics experiments.'
  },
  {
    name: 'Michael Barratt',
    craft: 'ISS (Expedition 71)',
    role: 'Medical Officer / Flight Engineer',
    country: 'United States',
    flag: '🇺🇸',
    daysInSpace: 412,
    mission: 'SpaceX Crew-8',
    bio: 'Aerospace medicine physician-astronaut studying long-duration space radiation biology.'
  },
  {
    name: 'Jeanette Epps',
    craft: 'ISS (Expedition 71)',
    role: 'Mission Specialist',
    country: 'United States',
    flag: '🇺🇸',
    daysInSpace: 200,
    mission: 'SpaceX Crew-8',
    bio: 'Aerospace engineer and former CIA intelligence officer conducting pharmaceutical crystal growth research.'
  },
  {
    name: 'Oleg Kononenko',
    craft: 'ISS (Expedition 71)',
    role: 'ISS Commander',
    country: 'Russia',
    flag: '🇷🇺',
    daysInSpace: 1110,
    mission: 'Soyuz MS-25',
    bio: 'World record holder for the longest cumulative time spent in outer space in human history (over 1,100 days).'
  },
  {
    name: 'Nikolai Chub',
    craft: 'ISS (Expedition 71)',
    role: 'Flight Engineer',
    country: 'Russia',
    flag: '🇷🇺',
    daysInSpace: 370,
    mission: 'Soyuz MS-25',
    bio: 'Roscosmos cosmonaut completing a historic full one-year continuous mission in orbit.'
  },
  {
    name: 'Tracy Caldwell Dyson',
    craft: 'ISS (Expedition 71)',
    role: 'Flight Engineer',
    country: 'United States',
    flag: '🇺🇸',
    daysInSpace: 385,
    mission: 'Soyuz MS-25',
    bio: 'Physical chemist and veteran NASA astronaut specializing in station environmental systems.'
  }
];

export const UPCOMING_LAUNCHES_FALLBACK: RocketLaunch[] = [
  {
    id: 'launch-starlink-f9-1',
    name: 'Starlink Group 10-15',
    provider: 'SpaceX',
    providerCountry: 'USA',
    rocket: 'Falcon 9 Block 5',
    net: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(), // 18 hrs from now
    status: 'Go',
    pad: 'Space Launch Complex 40 (SLC-40)',
    location: 'Cape Canaveral SFS, Florida, USA',
    missionDescription: 'Deployment of 22 Starlink V2 Mini broadband satellites into low Earth orbit to expand low-latency global coverage.',
    orbit: 'Low Earth Orbit (LEO)',
    webcastUrl: 'https://www.youtube.com/@SpaceX',
    image: 'https://images.unsplash.com/photo-1517976487588-46682782b3d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'launch-electron-strix',
    name: 'Owl Night Long (StriX Mission)',
    provider: 'Rocket Lab',
    providerCountry: 'USA / NZ',
    rocket: 'Electron / Curie',
    net: new Date(Date.now() + 1000 * 60 * 60 * 42).toISOString(), // ~42 hrs from now
    status: 'Go',
    pad: 'Launch Complex 1B (LC-1B)',
    location: 'Mahia Peninsula, New Zealand',
    missionDescription: 'Dedicated launch of a Synthetic Aperture Radar (SAR) Earth observation satellite for Japanese commercial operator Synspective.',
    orbit: 'Sun-Synchronous Orbit (SSO)',
    webcastUrl: 'https://www.rocketlabusa.com/live-stream',
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'launch-starship-flight-6',
    name: 'Starship Integrated Flight Test 6',
    provider: 'SpaceX',
    providerCountry: 'USA',
    rocket: 'Starship & Super Heavy Booster',
    net: new Date(Date.now() + 1000 * 60 * 60 * 120).toISOString(),
    status: 'Go',
    pad: 'Orbital Launch Mount A (Starbase)',
    location: 'Boca Chica, Texas, USA',
    missionDescription: 'Next iteration of full-stack orbital demonstration, testing in-space Raptor relight, revised heat shield tiles, and Super Heavy tower catch.',
    orbit: 'Transatmospheric Suborbital',
    webcastUrl: 'https://www.youtube.com/@SpaceX',
    image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'launch-ariane-6-commercial',
    name: 'Ariane 62 CSO-3',
    provider: 'Arianespace / ESA',
    providerCountry: 'Europe',
    rocket: 'Ariane 62 (Vinci upper stage)',
    net: new Date(Date.now() + 1000 * 60 * 60 * 240).toISOString(),
    status: 'TBD',
    pad: 'ELA-4 (Ensemble de Lancement Ariane 4)',
    location: 'Guiana Space Centre, Kourou, French Guiana',
    missionDescription: 'Deployment of the third French military optical observation reconnaissance satellite into sun-synchronous orbit.',
    orbit: 'Sun-Synchronous Orbit (SSO)',
    webcastUrl: 'https://www.arianespace.com',
    image: 'https://images.unsplash.com/photo-1541185934-01b600ea069c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'launch-isro-pslv',
    name: 'PSLV-C59 / Proba-3',
    provider: 'ISRO / ESA',
    providerCountry: 'India',
    rocket: 'Polar Satellite Launch Vehicle (PSLV-XL)',
    net: new Date(Date.now() + 1000 * 60 * 60 * 360).toISOString(),
    status: 'Go',
    pad: 'First Launch Pad (FLP)',
    location: 'Satish Dhawan Space Centre, Sriharikota, India',
    missionDescription: 'Precision formation-flying mission between two European satellites creating an artificial solar eclipse to observe the Sun corona.',
    orbit: 'High Earth Orbit (HEO)',
    webcastUrl: 'https://www.isro.gov.in',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  }
];

export const APOD_CURATED_ARCHIVE: ApodItem[] = [
  {
    date: '2026-09-19',
    title: 'The Cosmic Cliffs of the Carina Nebula',
    explanation: 'Captured by the James Webb Space Telescope’s Near-Infrared Camera (NIRCam), this landscape of "mountains" and "valleys" is actually the edge of a gigantic, gaseous cavity within NGC 3372, roughly 7,600 light-years away. Intense ultraviolet radiation and stellar winds from massive, hot stars carve the nebula wall, sculpting pillars of cold interstellar dust inside which newborn stars are igniting.',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    hdurl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2400&q=95',
    media_type: 'image',
    copyright: 'NASA, ESA, CSA, and STScI'
  },
  {
    date: '2026-09-18',
    title: 'Pillars of Creation in High-Def Infrared',
    explanation: 'Towering tendrils of cosmic dust and gas stand inside the heart of the Eagle Nebula (M16), 6,500 light-years from Earth. Mid-infrared observations reveal dense pockets of interstellar material that resist the violent erosion of nearby ultraviolet super-emitters, sheltering protostellar cores in their earliest phases of gravitational collapse.',
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=85',
    hdurl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2400&q=95',
    media_type: 'image',
    copyright: 'NASA / STScI / Webb Science Team'
  },
  {
    date: '2026-09-15',
    title: 'Webb’s First Deep Field (SMACS 0723)',
    explanation: 'This composite represents the deepest and sharpest infrared image of the distant universe taken to date. The galaxy cluster SMACS 0723 acts as a gravitational lens, bending and magnifying the light of background galaxies that existed more than 13.1 billion years ago, just a few hundred million years after the Big Bang.',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=85',
    hdurl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2400&q=95',
    media_type: 'image',
    copyright: 'NASA / ESA / CSA / Webb Team'
  },
  {
    date: '2026-09-10',
    title: 'Andromeda: Spiral Galaxy M31 in Ultraviolet',
    explanation: 'The majestic Andromeda Galaxy is our Milky Way’s largest galactic neighbor, located 2.5 million light-years away. In ultraviolet and optical composites, the bright blue knots tracing the outer spiral arms highlight regions of fierce star formation containing young, scorching O- and B-type stellar giants.',
    url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1600&q=85',
    hdurl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=2400&q=95',
    media_type: 'image',
    copyright: 'Galex / NASA / JPL-Caltech'
  },
  {
    date: '2026-09-05',
    title: 'The Rings of Saturn and Enceladus in Backlight',
    explanation: 'Cassini captured this panoramic mosaic while sitting directly in the shadow of Saturn. Looking back toward the Sun through the outer E-ring, microscopic ice grains ejected by the south polar geysers of the ocean moon Enceladus shimmer against the void of interplanetary space.',
    url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=85',
    hdurl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=2400&q=95',
    media_type: 'image',
    copyright: 'NASA / JPL-Caltech / Space Science Institute'
  }
];

export const MARS_SURFACE_PHOTOS: MarsPhoto[] = [
  {
    id: 'perseverance-sol-1200-mastcam',
    rover: 'Perseverance',
    camera: 'MASTCAM-Z',
    cameraFullName: 'Mast Camera Zoom Multispectral Imager',
    sol: 1204,
    earth_date: '2024-07-12',
    img_src: 'https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?auto=format&fit=crop&w=1000&q=85',
    description: 'High-resolution panorama of the ancient Jezero crater delta rim showing fine sedimentary layering deposited by flowing river water billions of years ago.'
  },
  {
    id: 'curiosity-sol-3800-mastcam',
    rover: 'Curiosity',
    camera: 'MASTCAM',
    cameraFullName: 'Mast Camera Right 100mm telephoto',
    sol: 3880,
    earth_date: '2024-05-18',
    img_src: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1000&q=85',
    description: 'Mount Sharp sulphate-bearing unit foothills showing wind-sculpted sulfate yardangs and sandstone mesas inside Gale Crater.'
  },
  {
    id: 'perseverance-navcam-surface',
    rover: 'Perseverance',
    camera: 'NAVCAM_LEFT',
    cameraFullName: 'Navigation Camera Left Stereo Pair',
    sol: 1195,
    earth_date: '2024-07-03',
    img_src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=85',
    description: 'Autonomous traverse scouting frame verifying rock hazard clearance for the robotic arm sample-caching drill assembly.'
  },
  {
    id: 'perseverance-hazcam-tracks',
    rover: 'Perseverance',
    camera: 'FRONT_HAZCAM_LEFT',
    cameraFullName: 'Front Hazard Avoidance Camera',
    sol: 1180,
    earth_date: '2024-06-18',
    img_src: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=85',
    description: 'Wide-angle terrain view showing wheel cleat tracks pressed into fine basaltic regolith sand beneath the rover chassis.'
  },
  {
    id: 'curiosity-chemcam-target',
    rover: 'Curiosity',
    camera: 'RMI',
    cameraFullName: 'ChemCam Remote Micro-Imager',
    sol: 3750,
    earth_date: '2024-01-22',
    img_src: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=85',
    description: 'Laser-induced breakdown spectroscopy micro-texture inspection revealing pure white calcium-sulfate cross-cutting mineral veins.'
  },
  {
    id: 'perseverance-sample-tube',
    rover: 'Perseverance',
    camera: 'WATSON',
    cameraFullName: 'Wide Angle Topographic Sensor for Operations and eNgineering',
    sol: 1150,
    earth_date: '2024-05-19',
    img_src: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1000&q=85',
    description: 'Drill bit borehole inspection in silica-rich mudstone core, successfully cached inside an ultra-clean titanium sample tube for future Earth return.'
  }
];

export const SOLAR_SYSTEM_PLANETS: PlanetInfo[] = [
  {
    name: 'Mercury',
    type: 'Terrestrial',
    distanceFromSunAU: 0.387,
    distanceFromSunKm: '57.9 million km',
    diameterKm: 4879,
    orbitalPeriodDays: 88.0,
    dayLengthHours: 4222.6,
    temperatureC: '-180°C to +430°C',
    moonsCount: 0,
    surfaceGravity: 3.7,
    gravityFactor: 0.38,
    colorHex: '#9e9e9e',
    funFact: 'Despite being closest to the Sun, Venus is hotter because Mercury lacks an atmosphere to trap heat.'
  },
  {
    name: 'Venus',
    type: 'Terrestrial',
    distanceFromSunAU: 0.723,
    distanceFromSunKm: '108.2 million km',
    diameterKm: 12104,
    orbitalPeriodDays: 224.7,
    dayLengthHours: 2802.0,
    temperatureC: '+465°C',
    moonsCount: 0,
    surfaceGravity: 8.87,
    gravityFactor: 0.91,
    colorHex: '#e0a96d',
    funFact: 'Spins in the opposite direction (retrograde) to most planets. One Venusian day is longer than its entire year!'
  },
  {
    name: 'Earth',
    type: 'Terrestrial',
    distanceFromSunAU: 1.0,
    distanceFromSunKm: '149.6 million km',
    diameterKm: 12742,
    orbitalPeriodDays: 365.25,
    dayLengthHours: 24.0,
    temperatureC: '-88°C to +58°C',
    moonsCount: 1,
    surfaceGravity: 9.807,
    gravityFactor: 1.0,
    colorHex: '#3b82f6',
    funFact: 'The only known celestial body in the universe confirmed to harbor liquid water oceans and active biological life.'
  },
  {
    name: 'Moon',
    type: 'Satellite',
    distanceFromSunAU: 1.0,
    distanceFromSunKm: '384,400 km from Earth',
    diameterKm: 3474,
    orbitalPeriodDays: 27.3,
    dayLengthHours: 708.7,
    temperatureC: '-130°C to +120°C',
    moonsCount: 0,
    surfaceGravity: 1.62,
    gravityFactor: 0.166,
    colorHex: '#cbd5e1',
    funFact: 'With only one-sixth of Earth gravity, an astronaut can effortlessly jump over 2 meters into the air.'
  },
  {
    name: 'Mars',
    type: 'Terrestrial',
    distanceFromSunAU: 1.524,
    distanceFromSunKm: '227.9 million km',
    diameterKm: 6779,
    orbitalPeriodDays: 687.0,
    dayLengthHours: 24.6,
    temperatureC: '-140°C to +20°C',
    moonsCount: 2,
    surfaceGravity: 3.72,
    gravityFactor: 0.38,
    colorHex: '#ef4444',
    funFact: 'Home to Olympus Mons, the largest volcano in the Solar System, standing nearly 3 times taller than Mount Everest.'
  },
  {
    name: 'Jupiter',
    type: 'Gas Giant',
    distanceFromSunAU: 5.204,
    distanceFromSunKm: '778.5 million km',
    diameterKm: 139820,
    orbitalPeriodDays: 4333,
    dayLengthHours: 9.93,
    temperatureC: '-110°C (cloud tops)',
    moonsCount: 95,
    surfaceGravity: 24.79,
    gravityFactor: 2.53,
    colorHex: '#d97706',
    funFact: 'Massive enough to contain all other Solar System planets combined twice over. Its Great Red Spot is an anticylonic storm larger than Earth.'
  },
  {
    name: 'Saturn',
    type: 'Gas Giant',
    distanceFromSunAU: 9.537,
    distanceFromSunKm: '1.43 billion km',
    diameterKm: 116460,
    orbitalPeriodDays: 10759,
    dayLengthHours: 10.7,
    temperatureC: '-140°C',
    moonsCount: 146,
    surfaceGravity: 10.44,
    gravityFactor: 1.06,
    colorHex: '#f59e0b',
    funFact: 'Saturn is the least dense planet in the Solar System (0.687 g/cm³)—it is less dense than water and would theoretically float in an ocean!'
  },
  {
    name: 'Uranus',
    type: 'Ice Giant',
    distanceFromSunAU: 19.191,
    distanceFromSunKm: '2.87 billion km',
    diameterKm: 50724,
    orbitalPeriodDays: 30687,
    dayLengthHours: 17.2,
    temperatureC: '-195°C',
    moonsCount: 28,
    surfaceGravity: 8.69,
    gravityFactor: 0.89,
    colorHex: '#06b6d4',
    funFact: 'Rotates on its side with an axial tilt of 98 degrees, rolling around the Sun like a ball through its 84-year orbit.'
  },
  {
    name: 'Neptune',
    type: 'Ice Giant',
    distanceFromSunAU: 30.069,
    distanceFromSunKm: '4.50 billion km',
    diameterKm: 49244,
    orbitalPeriodDays: 60190,
    dayLengthHours: 16.1,
    temperatureC: '-200°C',
    moonsCount: 16,
    surfaceGravity: 11.15,
    gravityFactor: 1.14,
    colorHex: '#2563eb',
    funFact: 'Features the most violent winds in the entire Solar System, whipping methane clouds at supersonic speeds exceeding 2,100 km/h.'
  },
  {
    name: 'Pluto',
    type: 'Dwarf Planet',
    distanceFromSunAU: 39.482,
    distanceFromSunKm: '5.91 billion km',
    diameterKm: 2376,
    orbitalPeriodDays: 90560,
    dayLengthHours: 153.3,
    temperatureC: '-225°C',
    moonsCount: 5,
    surfaceGravity: 0.62,
    gravityFactor: 0.063,
    colorHex: '#94a3b8',
    funFact: 'Features a massive heart-shaped nitrogen ice glacier (Tombaugh Regio) and towering water-ice mountain peaks reaching 3,500 meters.'
  }
];

export const SPACE_NEWS_FALLBACK: SpaceNewsItem[] = [
  {
    id: 'news-1',
    title: 'NASA and ESA Confirm Next Phase of Mars Sample Return Architecture',
    url: 'https://spacenews.com',
    image_url: 'https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?auto=format&fit=crop&w=800&q=80',
    news_site: 'SpaceNews',
    summary: 'NASA leadership reviewed updated proposals from international partners to streamline the retrieval of sealed Martian rock cores collected by the Perseverance rover.',
    published_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    category: 'Missions'
  },
  {
    id: 'news-2',
    title: 'James Webb Detects Complex Organic Hydrocarbons in Early Protoplanetary Disk',
    url: 'https://www.esa.int',
    image_url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    news_site: 'ESA News',
    summary: 'Spectroscopy readings from Webb’s MIRI instrument identified pre-biotic chemical ingredients within the dust disc encircling a young solar-type star.',
    published_at: new Date(Date.now() - 1000 * 60 * 340).toISOString(),
    category: 'Science'
  },
  {
    id: 'news-3',
    title: 'Commercial Crew Astronauts Complete Milestone Fluid Dynamics Spacewalk',
    url: 'https://www.nasa.gov',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    news_site: 'NASA Spaceflight',
    summary: 'Expedition astronauts routed new power cabling and serviced the external Columbus laboratory module during a 6-hour and 34-minute extravehicular excursion.',
    published_at: new Date(Date.now() - 1000 * 60 * 620).toISOString(),
    category: 'Stations'
  },
  {
    id: 'news-4',
    title: 'Heavy-Lift Booster Ground Test Validates 33-Engine Simultaneous Ignition',
    url: 'https://spaceflightnow.com',
    image_url: 'https://images.unsplash.com/photo-1517976487588-46682782b3d8?auto=format&fit=crop&w=800&q=80',
    news_site: 'Spaceflight Now',
    summary: 'A full-duration static fire demonstrated cryogenic liquid methane and LOX feed uniformity, clearing the booster for its next orbital flight campaign.',
    published_at: new Date(Date.now() - 1000 * 60 * 950).toISOString(),
    category: 'Rockets'
  }
];
