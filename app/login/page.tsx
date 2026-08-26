'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('cliente');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getSession() {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        router.push('/login');
        return;
      }

      setUserEmail(session.user.email ?? 'Usuario');
      // Obtenemos el rol guardado en los metadatos del usuario
      const rolMetadata = session.user.user_metadata?.rol || 'cliente';
      setUserRole(rolMetadata);
      setLoading(false);
    }

    getSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div className="text-center mt-12 text-lg">Cargando panel...</div>;
  }

  return (
    <main className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border text-gray-800">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Control - EcoBox Smart</h1>
          <p className="text-sm text-gray-600">Bienvenido, <span className="font-semibold">{userEmail}</span></p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-700 transition"
        >
          Cerrar Sesión
        </button>
      </div>

      {userRole === 'administrador' ? (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Vista de Administrador</h2>
          <p className="text-gray-700 mb-4">Aquí puedes gestionar los casilleros inteligentes, registrar nuevos paquetes y supervisar el inventario de EcoBox Smart.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow border">
              <h3 className="font-bold text-blue-600">Gestión de Casilleros</h3>
              <p className="text-sm text-gray-600 mt-1">Asignar y liberar casilleros físicos.</p>
            </div>
            <div className="bg-white p-4 rounded shadow border">
              <h3 className="font-bold text-blue-600">Registro de Paquetes</h3>
              <p className="text-sm text-gray-600 mt-1">Cargar códigos QR y notificar a los clientes.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-emerald-800 mb-2">Vista de Cliente</h2>
          <p className="text-gray-700 mb-4">Aquí puedes consultar el estado de tus encomiendas y verificar tus casilleros asignados.</p>
          <div className="bg-white p-4 rounded shadow border">
            <h3 className="font-bold text-emerald-600">Mis Paquetes Pendientes</h3>
            <p className="text-sm text-gray-600 mt-1">No tienes paquetes por retirar en este momento.</p>
          </div>
        </div>
      )}
    </main>
  );
}