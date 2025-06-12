// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category');
  const priceMin = parseFloat(searchParams.get('priceMin') || '0');
  const priceMax = parseFloat(searchParams.get('priceMax') || '999999');

  const products = await prisma.product.findMany({
    where: {
      AND: [
        { name: { contains: search, mode: 'insensitive' } },
        { price: { gte: priceMin, lte: priceMax } },
        category
          ? {
              categories: {
                some: {
                  category: {
                    name: { equals: category, mode: 'insensitive' },
                  },
                },
              },
            }
          : {},
      ],
    },
    include: {
      categories: true,
    },
  });

  return NextResponse.json(products);
}