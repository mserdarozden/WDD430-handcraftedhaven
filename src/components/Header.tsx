'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); 

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/');
    }
  };

  
  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <header className="site-header">
      <div className="site-title">Handcrafted Haven</div>

      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li><Link href="/" className={isActive('/')}>Home</Link></li>
          <li><Link href="/products" className={isActive('/products')}>Products</Link></li>
          <li><Link href="/sellers" className={isActive('/sellers')}>Artisans</Link></li>

          {user ? (
            <>
              <li className="user-greeting">Hello, {user.name}</li>

              {user.role === 'ARTISAN' && (
                <li>
                  <Link href="/dashboard/products" className={isActive('/dashboard/products')}>
                    My Products
                  </Link>
                </li>
              )}

              {user.role === 'ADMIN' && (
                <li>
                  <Link href="/admin/products" className={isActive('/admin/products')}>
                    Manage Products
                  </Link>
                </li>
              )}

              <li>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/login" className={isActive('/login')}>Login</Link></li>
              <li><Link href="/register" className={isActive('/register')}>Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </header>
  );
}
