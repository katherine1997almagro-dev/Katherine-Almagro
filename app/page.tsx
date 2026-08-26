import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Proyecto Next.js</h1>
      <p className="text-gray-400 mb-8">Selecciona una ruta para navegar:</p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          href="/login" 
          className="px-4 py-2 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Iniciar Sesión
        </Link>
        <Link 
          href="/register" 
          className="px-4 py-2 bg-green-600 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Crear Cuenta
        </Link>
        <Link 
          href="/dashboard" 
          className="px-4 py-2 bg-purple-600 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Ir al Dashboard
        </Link>
      </div>
    </main>
  );
}