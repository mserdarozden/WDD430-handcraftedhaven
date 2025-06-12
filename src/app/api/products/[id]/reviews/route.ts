import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all reviews for a product
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const segments = url.pathname.split('/');
  const id = segments[segments.indexOf('products') + 1]; // get product ID

  const reviews = await prisma.review.findMany({
    where: { productId: id },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(
    reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      userName: r.user.name,
      createdAt: r.createdAt,
    }))
  );
}

// POST new review
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const segments = url.pathname.split('/');
  const id = segments[segments.indexOf('products') + 1]; // get product ID

  const { rating, comment, userId } = await req.json();

  if (!userId || rating < 1 || rating > 5) {
    return new NextResponse('Invalid input', { status: 400 });
  }

  try {
    const review = await prisma.review.create({
      data: {
        productId: id,
        userId,
        rating,
        comment,
      },
      include: { user: true },
    });

    return NextResponse.json({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      userName: review.user.name,
      createdAt: review.createdAt,
    });
  } catch (err: any) {
    if (err.code === 'P2002') {
      return new NextResponse('You already reviewed this product.', { status: 409 });
    }
    return new NextResponse('Failed to submit review', { status: 500 });
  }
}
