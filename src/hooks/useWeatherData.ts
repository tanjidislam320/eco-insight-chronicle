import { useQuery } from '@tanstack/react-query';
import { fetchCurrentWeather, fetchForecast, getApiKey, getStoredLocation, storeWeatherSnapshot } from '@/lib/weatherApi';
import type { WeatherData, ForecastDay } from '@/lib/weatherApi';

export const useCurrentWeather = () => {
  const apiKey = getApiKey();
  const location = getStoredLocation();

  return useQuery<WeatherData>({
    queryKey: ['weather', location],
    queryFn: async () => {
      if (!apiKey) {
        throw new Error('API key not configured');
      }
      const data = await fetchCurrentWeather(location, apiKey);
      // Store snapshot for historical comparison
      storeWeatherSnapshot(location, data);
      return data;
    },
    enabled: !!apiKey,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });
};

export const useForecast = () => {
  const apiKey = getApiKey();
  const location = getStoredLocation();

  return useQuery<ForecastDay[]>({
    queryKey: ['forecast', location],
    queryFn: async () => {
      if (!apiKey) {
        throw new Error('API key not configured');
      }
      return fetchForecast(location, apiKey);
    },
    enabled: !!apiKey,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
