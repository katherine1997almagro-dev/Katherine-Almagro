'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('cliente');
  const [mensaje, setMensaje] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { rol },
      },
    });

    if (error) {
      setMensaje(`Error: ${error.message}`);
    } else {
      setMensaje('¡Registro exitoso! Redirigiendo al login...');
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border text-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-center text-emerald-700">Crear Cuenta</h1>
      {mensaje && <p className="mb-4 text-sm text-center font-semibold text-blue-600">{mensaje}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Correo electrónico</label>
          <input
            type="email"
            required
            className="w-full border p-2 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            required
            className="w-full border p-2 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de usuario (Rol)</label>
          <select
            className="w-full border p-2 rounded text-black bg-white"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="cliente">Cliente (Retira paquetes)</option>
            <option value="administrador">Administrador (Gestiona casilleros)</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white font-bold py-2 rounded hover:bg-emerald-700 transition"
        >
          Registrarse
        </button>
      </form>
    </main>
  );
}