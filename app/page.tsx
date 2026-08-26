import LockerSearch from '@/components/LockerSearch';
import { ClimaData, Locker } from '@/types';

async function getClimaQuito(): Promise<ClimaData | null> {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-0.22985&longitude=-78.52495&current_weather=true',
      { cache: 'no-store' }
    );
    if (!res.ok) throw new Error('Error al consultar la API externa');
    return res.json();
  } catch (error) {
    console.error('Error fetching API:', error);
    return null;
  }
}

const LOCKERS_EJEMPLO: Locker[] = [
  { id: '1', codigo: 'ECO-01', ubicacion: 'Centro Histórico - Plaza Grande', estado: 'disponible' },
  { id: '2', codigo: 'ECO-02', ubicacion: 'Terminal Quitumbe', estado: 'ocupado' },
  { id: '3', codigo: 'ECO-03', ubicacion: 'Guamaní Norte', estado: 'disponible' },
  { id: '4', codigo: 'ECO-04', ubicacion: 'CCI - Iñaquito', estado: 'mantenimiento' },
];

export default async function HomePage() {
  const clima = await getClimaQuito();

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-8">
      <section className="text-center py-8 bg-emerald-50 rounded-lg border border-emerald-100">
        <h1 className="text-4xl font-bold text-emerald-800">EcoBox Smart</h1>
        <p className="text-gray-600 mt-2">
          Red inteligente y ecológica de casilleros para entrega y retiro de paquetes.
        </p>
      </section>

      <section className="border p-4 rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Clima Actual en Punto de Operación (Quito)
        </h2>
        {clima ? (
          <div className="flex gap-6 text-gray-700">
            <p>Temperatura: <strong>{clima.current_weather.temperature} °C</strong></p>
            <p>Viento: <strong>{clima.current_weather.windspeed} km/h</strong></p>
          </div>
        ) : (
          <p className="text-red-500">No se pudo cargar el clima en este momento.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Buscar Casilleros Disponibles</h2>
        <LockerSearch lockersIniciales={LOCKERS_EJEMPLO} />
      </section>
    </main>
  );
}