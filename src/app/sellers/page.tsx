import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import Link from 'next/link';
import Image from 'next/image';

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
            <div className="artisan-card-content">
              <Image src={artisan.artisanProfile?.website || '/placeholder.jpg'} alt={artisan.name} width={200} height={300} />
              <div>
                <h3>{artisan.name}</h3>
                <p><strong>Shop:</strong> {artisan.artisanProfile?.shopName}</p>
                <p>
                  <strong>Location:</strong> {artisan.artisanProfile?.location || 'N/A'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
