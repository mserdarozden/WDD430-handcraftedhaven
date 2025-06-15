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
      artisan: true, 
    },
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, image, artisanId } = body;

    if (!name || !description || !price || !artisanId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        images: image ? [image] : [],
        artisan: { connect: { id: artisanId } },
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
