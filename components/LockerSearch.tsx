'use client';

import { useState } from 'react';
import { Locker } from '@/types';

interface LockerSearchProps {
  lockersIniciales: Locker[];
}

export default function LockerSearch({ lockersIniciales }: LockerSearchProps) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  const lockersFiltrados = lockersIniciales.filter((locker) => {
    const coincideTexto =
      locker.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      locker.ubicacion.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroEstado === 'todos' || locker.estado === filtroEstado;

    return coincideTexto && coincideEstado;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por código o ubicación..."
          className="border p-2 rounded w-full text-black"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select
          className="border p-2 rounded text-black"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="todos">Todos los estados</option>
          <option value="disponible">Disponible</option>
          <option value="ocupado">Ocupado</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lockersFiltrados.length > 0 ? (
          lockersFiltrados.map((locker) => (
            <div key={locker.id} className="border p-4 rounded shadow bg-white text-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Locker #{locker.codigo}</h3>
                <span
                  className={`px-2 py-1 rounded text-xs text-white font-semibold ${
                    locker.estado === 'disponible'
                      ? 'bg-green-600'
                      : locker.estado === 'ocupado'
                      ? 'bg-red-600'
                      : 'bg-yellow-600'
                  }`}
                >
                  {locker.estado}
                </span>
              </div>
              <p className="text-sm text-gray-600">Ubicación: {locker.ubicacion}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-2">No se encontraron casilleros.</p>
        )}
      </div>
    </div>
  );
}