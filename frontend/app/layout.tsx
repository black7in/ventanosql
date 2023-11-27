import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts'
import SessionAuthProvider from '@/context/SessionAuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className="continer">
          <SessionAuthProvider>
            {children}
          </SessionAuthProvider>
        </main>

      </body>
    </html>
  );
}
