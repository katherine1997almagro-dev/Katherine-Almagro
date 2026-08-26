async function getClimaQuito() {
  try {
    // Usamos una API pública de clima gratuita para Quito
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-0.2299&longitude=-78.5249&current=temperature_2m,wind_speed_10m',
      { next: { revalidate: 3600 } } // Revalida cada hora
    );

    if (!res.ok) {
      throw new Error('No se pudo obtener el clima');
    }

    const data = await res.json();
    return {
      temperatura: data.current.temperature_2m,
      viento: data.current.wind_speed_10m,
    };
  } catch (error) {
    console.error('Error al conectar con la API externa:', error);
    return null;
  }
}

export default async function Home() {
  const clima = await getClimaQuito();

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6 text-gray-800">
      {/* Encabezado del Proyecto */}
      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg text-center shadow-sm">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">EcoBox Smart</h1>
        <p className="text-gray-600">
          Red inteligente y ecológica de casilleros para entrega y retiro seguro de paquetes en Quito.
        </p>
      </div>

      {/* Sección de la API Externa (Clima en tiempo real) */}
      <div className="bg-white border p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Condiciones en el Punto de Operación</h2>
        <p className="text-sm text-gray-600 mb-4">Datos meteorológicos en tiempo real (Quito, Ecuador).</p>
        
        {clima ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded border text-center">
              <p className="text-sm text-gray-500">Temperatura Actual</p>
              <p className="text-2xl font-bold text-emerald-600">{clima.temperatura} °C</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border text-center">
              <p className="text-sm text-gray-500">Velocidad del Viento</p>
              <p className="text-2xl font-bold text-emerald-600">{clima.viento} km/h</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded">
            No se pudieron cargar los datos meteorológicos en este momento.
          </p>
        )}
      </div>

      {/* Accesos rápidos */}
      <div className="flex justify-center gap-4 pt-4">
        <a
          href="/login"
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          Iniciar Sesión
        </a>
        <a
          href="/register"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Registrarse
        </a>
      </div>
    </main>
  );
}