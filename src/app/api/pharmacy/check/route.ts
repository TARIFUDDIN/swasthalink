// src/app/api/pharmacy/check/route.ts
import { prisma } from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const medicine = searchParams.get('medicine');
    const village = searchParams.get('village') || '';

    if (!medicine) {
      return NextResponse.json({ error: "Medicine name required" }, { status: 400 });
    }

    const pharmacies = await prisma.pharmacy.findMany({
      where: {
        ...(village && { village: { contains: village, mode: 'insensitive' } }),
        medicines: {
          some: {
            name: { contains: medicine, mode: 'insensitive' },
            stock: { gt: 0 }
          }
        }
      },
      include: {
        medicines: {
          where: {
            name: { contains: medicine, mode: 'insensitive' },
            stock: { gt: 0 }
          }
        }
      }
    });

    return NextResponse.json(pharmacies);
  } catch (error) {
    console.error('Pharmacy check error:', error);
    return NextResponse.json(
      { error: "Failed to check medicine availability" },
      { status: 500 }
    );
  }
}
 