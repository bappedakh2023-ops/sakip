export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="p-8 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Halaman Login SAKIP</h1>
        <p className="text-gray-600 mb-6">Silakan login untuk mengakses Dashboard.</p>
        {/* Nanti Anda bisa memasukkan form login Supabase di sini */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Login Sementara
        </button>
      </div>
    </div>
  );
}
