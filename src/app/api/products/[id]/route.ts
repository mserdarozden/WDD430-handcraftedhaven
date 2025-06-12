import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const segments = url.pathname.split('/');
  const id = segments[segments.indexOf('products') + 1];

  if (!id) {
    return new NextResponse('Product ID missing', { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      artisan: true,
      categories: {
        include: { category: true },
      },
    },
  });

  if (!product) {
    return new NextResponse('Product not found', { status: 404 });
  }

  return NextResponse.json(product);
}
