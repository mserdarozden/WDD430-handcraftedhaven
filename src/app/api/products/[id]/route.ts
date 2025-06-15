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

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const body = await req.json();
    const { name, description, price, image } = body;

    if (!name || !description || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        images: image ? [image] : [],
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
