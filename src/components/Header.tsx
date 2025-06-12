'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect even if there's an error
      router.push('/');
    }
  };

  return (
    <header className="site-header">
      <div className="site-title">Handcrafted Haven</div>

      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <ul className="nav-list">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/sellers">Artisans</Link></li>

          {user ? (
            <>
              <li className="user-greeting">Hello, {user.name}</li>

              {/* Role-specific navigation links */}
              {user.role === 'ARTISAN' && (
                <>
                  <li><Link href="/dashboard/products">My Products</Link></li>
                  <li><Link href="/dashboard/orders">My Orders</Link></li>
                </>
              )}

              {user.role === 'CUSTOMER' && (
                <>
                  <li><Link href="/orders">My Orders</Link></li>
                  <li><Link href="/cart">Cart</Link></li>
                </>
              )}

              {user.role === 'ADMIN' && (
                <>
                  <li><Link href="/admin/users">Manage Users</Link></li>
                  <li><Link href="/admin/products">Manage Products</Link></li>
                </>
              )}

              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </button>
    </header>
  );
}
