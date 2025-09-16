import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

interface Availability {
  [key: string]: string[];
}

interface Doctor {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  specialization: string | null;
  experience: number | null;
  languages: string[];
  availability: any;
}

export async function GET() {
  try {
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

    const doctors = await prisma.user.findMany({
      where: { role: 'DOCTOR' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        specialization: true,
        experience: true,
        languages: true,
        availability: true,
      }
    });

    // Get booked slots for each doctor
    const doctorsWithBookedSlots = await Promise.all(
      doctors.map(async (doctor: Doctor) => {
        const appointments = await prisma.appointment.findMany({
          where: { 
            doctorId: doctor.id,
            status: 'SCHEDULED'
          },
          select: {
            date: true,
            time: true
          }
        });

        const bookedSlots = appointments.map((app: { date: Date; time: string }) => 
          `${app.date.toISOString().split('T')[0]}-${app.time}`
        );

        // Type assertion for availability
        const availability = doctor.availability as unknown as Availability;

        return {
          ...doctor,
          bookedSlots,
          languages: doctor.languages || ["Hindi", "English"],
          availability: availability || {
            monday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
            tuesday: ["09:00", "10:00", "14:00", "15:00", "16:00"],
            wednesday: ["09:00", "10:00", "11:00", "14:00"],
            thursday: ["10:00", "11:00", "14:00", "15:00", "16:00"],
            friday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
            saturday: ["09:00", "10:00", "11:00"],
            sunday: []
          }
        };
      })
    );

    return NextResponse.json(doctorsWithBookedSlots);
  } catch (error) {
    console.error('Doctors fetch error:', error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}