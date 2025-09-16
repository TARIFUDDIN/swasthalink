import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Availability {
  [key: string]: string[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
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

    const doctor = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        availability: true
      }
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor not found" },
        { status: 404 }
      );
    }

    // Get day name from date
    const dayName = new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long' 
    }).toLowerCase();

    // Type assertion for availability
    const availability = doctor.availability as unknown as Availability;
    const daySlots = availability?.[dayName] || [];

    // Get booked slots for this date
    const appointments = await prisma.appointment.findMany({
      where: { 
        doctorId: params.id,
        date: new Date(date),
        status: 'SCHEDULED'
      },
      select: {
        time: true
      }
    });

    const bookedTimes = appointments.map((app: { time: string }) => app.time);
    const availableSlots = daySlots.filter((slot: string) => !bookedTimes.includes(slot));

    return NextResponse.json({ availableSlots });
  } catch (error) {
    console.error('Availability fetch error:', error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}