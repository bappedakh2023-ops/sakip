'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Menggunakan nama tabel yang benar dari database.sql
      const { data } = await supabase
        .from('penilaian_kinerja') 
        .select('id, realisasi, opd(nama_opd)');
      setData(data || []);
    }
    fetchData();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Rekap SAKIP OPD</h1>
      <table className="mt-4 w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">OPD</th>
            <th className="border p-2">Realisasi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td className="border p-2">{item.opd?.nama_opd || 'N/A'}</td>
              <td className="border p-2">{item.realisasi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
