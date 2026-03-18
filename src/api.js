const API_BASE = 'http://localhost:3001/api';

export async function fetchApi(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch ${endpoint}:`, err);
    return null;
  }
}

// Riders
export const getRiders = () => fetchApi('/riders');
export const getRider = (id) => fetchApi(`/riders/${id}`);

// Standings
export const getChampionship = () => fetchApi('/standings/championship');
export const getLiveStandings = () => fetchApi('/standings/live');

// News
export const getAllNews = () => fetchApi('/news');
export const getBreakingNews = () => fetchApi('/news/breaking');
export const getLatestNews = () => fetchApi('/news/latest');
export const getNewsFeed = () => fetchApi('/news/feed');
export const getVideos = () => fetchApi('/news/videos');

// Races
export const getCurrentRace = () => fetchApi('/races/current');
export const getTelemetry = () => fetchApi('/races/telemetry');
export const getRaceCalendar = () => fetchApi('/races/calendar');
export const getNextRace = () => fetchApi('/races/next');

// Store
export const getProducts = (category) => fetchApi(`/store/products${category ? `?category=${category}` : ''}`);
export const getLimitedDrops = () => fetchApi('/store/drops');
export const getMerch = () => fetchApi('/store/merch');
