import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

// Create one global Prisma instance only if not already created (important for serverless)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default async function ArtisanDetailPage({
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
      <div className="product-detail-wrapper">
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
      </div>
    </main>
  );
}
