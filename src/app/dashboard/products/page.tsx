'use client';

import { useEffect, useState } from 'react';
import RoleGuard from '@/components/RoleGuard';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  const handleEdit = (productId: string) => {
    router.push(`/dashboard/products/${productId}/edit`);
  };

  const handleDelete = async (productId: string) => {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

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
                <div key={product.id} className="product-card-wrapper">
                  <div className="card-body">
                    <ProductCard product={{ ...product, artisan: user?.name ?? '' }} />
                  </div>
                  <div className="button-group">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="cta-button"
                      style={{ backgroundColor: 'var(--steel-blue)' }}
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="cta-button"
                      style={{ backgroundColor: '#b00020' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
