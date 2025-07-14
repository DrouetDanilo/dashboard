import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const cityCoords: Record<string, { lat: number, lon: number }> = {
  guayaquil: { lat: -2.1962, lon: -79.8862 },
  quito: { lat: -0.1807, lon: -78.4678 },
  manta: { lat: -0.9677, lon: -80.7089 },
  cuenca: { lat: -2.9006, lon: -79.0045 },
};

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos en milisegundos

export default function DataFetcher(city: string): DataFetcherOutput {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const coords = cityCoords[city] || cityCoords.guayaquil;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&timezone=America/Chicago&temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=mm&hourly=temperature_2m,wind_speed_10m`;
        const storageKey = `weather_${city}`;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            // 1. Intentar leer del localStorage
            const cached = localStorage.getItem(storageKey);
            if (cached) {
                try {
                    const { timestamp, result } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        setData(result);
                        setLoading(false);
                        return; // Usar caché si está vigente
                    }
                } catch {
                    // Si hay error en el parseo, ignorar y continuar
                }
            }

            // 2. Si no hay caché vigente, llamar a la API
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }
                const result: OpenMeteoResponse = await response.json();
                setData(result);
                // Guardar en localStorage con timestamp
                localStorage.setItem(storageKey, JSON.stringify({
                    timestamp: Date.now(),
                    result
                }));
            } catch (err: any) {
                // 3. Si falla la API, intentar usar caché aunque esté vencida
                if (cached) {
                    try {
                        const { result } = JSON.parse(cached);
                        setData(result);
                        setError("Mostrando datos almacenados por error de conexión.");
                    } catch {
                        setError("Ocurrió un error desconocido al obtener los datos.");
                    }
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city]);

    return { data, loading, error };
}