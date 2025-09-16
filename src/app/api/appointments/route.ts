import { prisma } from "../../lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Test database connection first
    try {
      await prisma.$connect();
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json(
        { error: "Database connection failed. Please try again." },
        { status: 500 }
      );
    }

    const { doctorId, date, time, symptoms } = await request.json();

    // Check if doctor exists
    const doctor = await prisma.user.findUnique({
      where: { 
        id: doctorId,
        role: 'DOCTOR' 
      }
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor not found or invalid doctor ID" },
        { status: 404 }
      );
    }

    // Find user in database
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id }
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: dbUser.id,
        doctorId,
        date: new Date(date),
        time,
        symptoms,
        meetingUrl: `https://meet.jit.si/nabha-consultation-${Date.now()}`,
      },
    });

    return NextResponse.json(appointment);
  } catch (error: any) {
    console.error('Appointment creation error:', error);
    
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "Invalid doctor ID. Please select a valid doctor." },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Test database connection first
    try {
      await prisma.$connect();
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json(
        { error: "Database connection failed. Please try again." },
        { status: 500 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id }
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const appointments = await prisma.appointment.findMany({
      where: { patientId: dbUser.id },
      include: {
        doctor: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Appointments fetch error:', error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}