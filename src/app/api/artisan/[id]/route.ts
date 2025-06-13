// src/app/api/artisans/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const segments = url.pathname.split('/').filter(Boolean);
  const id = segments[segments.length - 1]; // reliably fetches the ID

  if (!id) {
    return new NextResponse('Artisan ID missing', { status: 400 });
  }

  const artisan = await prisma.user.findUnique({
    where: { id },
    include: {
      artisanProfile: true,
      products: {
        include: { artisan: true },
      },
    },
  });

  if (!artisan || artisan.role !== 'ARTISAN') {
    return new NextResponse('Artisan not found', { status: 404 });
  }

  return NextResponse.json(artisan);
}

