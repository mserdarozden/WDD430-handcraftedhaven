'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/lib/AuthContext';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price.toString(),
          image: data.images?.[0] || '',
        });
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          image: formData.image,
          artisanId: user?.id,
        }),
      });

      if (!res.ok) throw new Error('Update failed');
      router.push('/dashboard/products');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <RoleGuard allowedRoles={['ARTISAN']} fallbackPath="/">
      <div className="container">
        <h1>Edit Product</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
          <div>
            <label>Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div>
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div>
            <label>Price:</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} required />
          </div>

          <div>
            <label>Image URL:</label>
            <input name="image" value={formData.image} onChange={handleChange} />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" className="cta-button" disabled={submitting}>
            {submitting ? 'Saving...' : 'Update Product'}
          </button>
        </form>
      </div>
    </RoleGuard>
  );
}
