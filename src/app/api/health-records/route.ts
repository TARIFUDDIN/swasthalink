import { prisma } from "../../lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id }
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const healthRecords = await prisma.healthRecord.findMany({
      where: { userId: dbUser.id },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json(healthRecords);
  } catch (error) {
    console.error('Health records fetch error:', error);
    return NextResponse.json(
      { error: "Failed to fetch health records" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { diagnosis, medicines, notes, doctorName } = await request.json();

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id }
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const healthRecord = await prisma.healthRecord.create({
      data: {
        userId: dbUser.id,
        diagnosis,
        medicines,
        notes,
        doctorName,
      }
    });

    return NextResponse.json(healthRecord);
  } catch (error) {
    console.error('Health record creation error:', error);
    return NextResponse.json(
      { error: "Failed to create health record" },
      { status: 500 }
    );
  }
}