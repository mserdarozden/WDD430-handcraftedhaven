import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import Link from 'next/link';

export default async function SellersPage() {
  const artisans = await prisma.user.findMany({
    where: { role: 'ARTISAN' },
    include: {
      artisanProfile: true,
    },
  });

  return (
    <main>
      <div className="artisan-grid">
        {artisans.map((artisan) => (
          <Link
            key={artisan.id}
            href={`/sellers/${artisan.id}`}
            className="artisan-card"
          >
            <h3>{artisan.name}</h3>
            <p><strong>Shop:</strong> {artisan.artisanProfile?.shopName}</p>
            <p>{artisan.artisanProfile?.bio}</p>
            <p>
              <strong>Location:</strong> {artisan.artisanProfile?.location || 'N/A'}
            </p>
            {artisan.artisanProfile?.website && (
              <p>
                <span style={{ color: 'var(--steel-blue)', textDecoration: 'underline' }}>
                  Visit Website
                </span>
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
