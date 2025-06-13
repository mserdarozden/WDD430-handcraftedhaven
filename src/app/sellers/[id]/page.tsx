'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

export default function ArtisanDetailPage() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchArtisan = async () => {
      try {
        const res = await fetch(`/api/artisan/${id}`);
        const data = await res.json();
        setArtisan(data);
      } catch (error) {
        console.error('Error fetching artisan:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisan();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!artisan) return <p>Artisan not found</p>;

  return (
    <main>
      <div className="product-detail-wrapper">
        <div className="artisan-detail-header">
          <Image src={artisan.artisanProfile?.website || '/placeholder.jpg'} alt={artisan.name} width={200} height={300} />
          <div>
            <h1>{artisan.name}</h1>
            <p><strong>Shop:</strong> {artisan.artisanProfile?.shopName}</p>
            <p><strong>Location:</strong> {artisan.artisanProfile?.location || 'N/A'}</p>
            <p>{artisan.artisanProfile?.bio}</p>
          </div>
        </div>


        <h2 style={{ marginTop: '2rem' }}>Products by {artisan.name}</h2>
        <div className="products-grid">
          {artisan.products.length === 0 && <p>No products listed yet.</p>}
          {artisan.products.map((product: any) => (
            <ProductCard key={product.id} product={{ ...product, artisan: artisan.name }} />
          ))}
        </div>
      </div>
    </main>
  );
}
