import './globals.css'; // Pastikan Anda membuat file ini jika belum ada

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
