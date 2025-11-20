// OpenWeatherMap API configuration and helpers
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  rainChance: number;
  sunrise: string;
  sunset: string;
  icon: string;
}

export interface ForecastDay {
  date: string;
  temp: number;
  condition: string;
  icon: string;
}

export interface HistoricalData {
  date: string;
  temp: number;
  rainfall: number;
}

export const getApiKey = (): string | null => {
  return localStorage.getItem('openweathermap_api_key');
};

export const setApiKey = (key: string): void => {
  localStorage.setItem('openweathermap_api_key', key);
};

export const getStoredLocation = (): string => {
  return localStorage.getItem('weather_location') || 'New York';
};

export const setStoredLocation = (location: string): void => {
  localStorage.setItem('weather_location', location);
};

const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const fetchCurrentWeather = async (city: string, apiKey: string): Promise<WeatherData> => {
  const response = await fetch(
    `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
  );
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your OpenWeatherMap API key in settings.');
    }
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();

  return {
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    humidity: data.main.humidity,
    wind: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    rainChance: data.clouds?.all || 0,
    sunrise: formatTime(data.sys.sunrise),
    sunset: formatTime(data.sys.sunset),
    icon: data.weather[0].icon,
  };
};

export const fetchForecast = async (city: string, apiKey: string): Promise<ForecastDay[]> => {
  const response = await fetch(
    `${API_BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }

  const data = await response.json();
  
  // Get one forecast per day (noon time)
  const dailyForecasts = data.list.filter((item: any) => 
    item.dt_txt.includes('12:00:00')
  ).slice(0, 5);

  return dailyForecasts.map((item: any) => ({
    date: new Date(item.dt * 1000).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    }),
    temp: Math.round(item.main.temp),
    condition: item.weather[0].main,
    icon: item.weather[0].icon,
  }));
};

// Store current weather data for historical comparison
export const storeWeatherSnapshot = (city: string, data: WeatherData): void => {
  const key = `weather_history_${city}`;
  const history = getWeatherHistory(city);
  
  const today = new Date().toISOString().split('T')[0];
  
  // Only store one snapshot per day
  const existingIndex = history.findIndex(item => item.date === today);
  const snapshot = {
    date: today,
    temp: data.temp,
    rainfall: data.rainChance,
  };

  if (existingIndex >= 0) {
    history[existingIndex] = snapshot;
  } else {
    history.push(snapshot);
  }

  // Keep only last 365 days
  const filtered = history.slice(-365);
  localStorage.setItem(key, JSON.stringify(filtered));
};

export const getWeatherHistory = (city: string): HistoricalData[] => {
  const key = `weather_history_${city}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};
