'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('penilaian_kinerja')
          .select('id, realisasi, opd(nama_opd)');
        
        if (error) throw error;
        setData(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Memuat data...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Rekap SAKIP OPD</h1>
      <table className="mt-4 w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">OPD</th>
            <th className="border p-2">Nilai Realisasi</th>
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