'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(`Error: ${error.message}`);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border text-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Iniciar Sesión</h1>
      {errorMsg && <p className="mb-4 text-sm text-center font-semibold text-red-600">{errorMsg}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
        >
          Ingresar
        </button>
      </form>
    </main>
  );
}