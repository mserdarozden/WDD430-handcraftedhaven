// src/app/sellers/[id]/page.tsx
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

const prisma = new PrismaClient();

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const artisan = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      artisanProfile: true,
      products: {
        include: {
          artisan: true,
        },
      },
    },
  });

  if (!artisan || artisan.role !== 'ARTISAN') return notFound();

  return (
    <main>
      <h1>{artisan.name}</h1>
      <p><strong>Shop:</strong> {artisan.artisanProfile?.shopName}</p>
      <p><strong>Location:</strong> {artisan.artisanProfile?.location || 'N/A'}</p>
      <p>{artisan.artisanProfile?.bio}</p>

      <h2 style={{ marginTop: '2rem' }}>Products by {artisan.name}</h2>
      <div className="products-grid">
        {artisan.products.length === 0 && <p>No products listed yet.</p>}
        {artisan.products.map((product) => (
          <ProductCard key={product.id} product={{ ...product, artisan: artisan.name }} />
        ))}
      </div>
    </main>
  );
}
