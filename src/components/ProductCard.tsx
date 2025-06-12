import { Product } from '@prisma/client';

import Link from 'next/link';
import Image from 'next/image';

type ProductWithArtisan = Product & {
  artisan: string; // Ensure the artisan field is part of the product object
};

export default function ProductCard({ product }: { product: ProductWithArtisan }) {
  return (
    <div className="product-card">
      {//<Image src={product.images[0] || '/placeholder.jpg'} alt={product.name} width={200} height={200} />
      }
      <Image src={'/placeholder.svg'} alt={product.name} width={200} height={200} />
      <Link href={`/products/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>
      <p>{product.description}</p>
      <p className="price">${product.price.toString()}</p>
    </div>
  );
}
