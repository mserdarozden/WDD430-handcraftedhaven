'use client';

import { useEffect, useState } from 'react';
import RoleGuard from '@/components/RoleGuard';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
};

export default function ArtisanProductsPage() {
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(`/api/artisan/${user.id}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Failed to load artisan products:', err);
      } finally {
        setFetching(false);
      }
    };

    fetchProducts();
  }, [user?.id]);

  if (loading) return <p>Loading your dashboard...</p>;

  return (
    <RoleGuard allowedRoles={['ARTISAN']} fallbackPath="/">
      <div className="container">
        <h1>My Products</h1>
        <p>Welcome to your product management dashboard. Here you can add, edit, and manage your handcrafted products.</p>

        <div className="action-buttons" style={{ marginTop: '1rem' }}>
          <Link href="/dashboard/products/new">
            <button className="cta-button">Add New Product</button>
          </Link>
        </div>

        <div className="product-list" style={{ marginTop: '2rem' }}>
          {fetching ? (
            <p>Loading your products...</p>
          ) : products.length === 0 ? (
            <p>You haven't listed any products yet.</p>
          ) : (
            <div className="products-grid">
              {products.map((product: any) => (
              <ProductCard key={product.id} product={{ ...product, artisan: user?.name ?? '' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
