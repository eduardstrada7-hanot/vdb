import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      clientName,
      clientEmail,
      clientPhone,
      eventType,
      eventDate,
      eventDuration,
      eventLocation,
      guestCount,
      notes,
    } = body

    // Validation
    if (!clientName || !clientEmail || !clientPhone || !eventType || !eventDate || !eventDuration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const booking = await prisma.booking.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        eventType,
        eventDate: new Date(eventDate),
        eventDuration,
        eventLocation: eventLocation || null,
        guestCount: guestCount ? parseInt(guestCount) : null,
        notes: notes || null,
        status: 'pending',
      },
    })

    // Log email (placeholder - configure real SMTP in production)
    console.log(`
New Booking Request
======================
To: ${clientEmail}
Subject: Booking Request Received — Velvet Bridal Makeovers

Hi ${clientName},

Thank you for reaching out to Velvet Bridal Makeovers!

Your booking request has been received. Divia will personally review your request and call you within 48 hours to confirm availability and discuss your look.

Booking Reference: ${booking.id}
Event: ${eventType}
Date: ${new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Duration: ${eventDuration}

Where Every Celebration Begins with Beauty
— Divia, Velvet Bridal Makeovers
`)

    return NextResponse.json({ id: booking.id, status: booking.status }, { status: 201 })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Fetch bookings error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
