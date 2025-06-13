'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoleGuard from '@/components/RoleGuard';
import { useAuth } from '@/lib/AuthContext';

export default function AddProductPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '', // You can later replace this with an upload component
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          artisanId: user?.id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add product');
      }

      router.push('/dashboard/products');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RoleGuard allowedRoles={['ARTISAN']} fallbackPath="/">
      <div className="container">
        <h1>Add New Product</h1>
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

          <button type="submit" disabled={submitting} className="cta-button">
            {submitting ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </RoleGuard>
  );
}
