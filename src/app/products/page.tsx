'use client';

import { useEffect, useState, useCallback } from 'react';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { Product } from '@prisma/client';

type ProductWithArtisan = Product & {
  artisan: string; 
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithArtisan[]>([]); 
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceMin: '',
    priceMax: '',
  });

  const fetchProducts = useCallback(async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/products?${query}`);
    const data: ProductWithArtisan[] = await res.json(); 
    setProducts(data);
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main>
      <div style={{ maxWidth: '960px', width: '100%' }}>
        <SearchBar
          filters={filters}
          setFilters={setFilters}
          onSearch={fetchProducts}
        />
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
