'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase'; // Pastikan jalur ini benar sesuai struktur Anda

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Proses login ke Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg('Email atau password salah!');
      setLoading(false);
    } else {
      // Jika berhasil, arahkan kembali ke Dashboard utama
      window.location.href = '/';
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login SAKIP</h1>
        
        {errorMsg && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}
