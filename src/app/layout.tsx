import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/global.css";
import "../styles/auth.css";
import { AuthProvider } from '../lib/AuthContext';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'Discover artisan-made treasures and support creators.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
