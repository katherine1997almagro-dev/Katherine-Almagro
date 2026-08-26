// Tipos para la API Externa de Clima
export interface ClimaData {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
}

// Tipos para los casilleros de EcoBox Smart
export interface Locker {
  id: string;
  codigo: string;
  ubicacion: string;
  estado: 'disponible' | 'ocupado' | 'mantenimiento';
}