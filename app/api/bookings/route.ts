import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Resend } from 'resend'

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

    const formattedDate = new Date(eventDate + 'T12:00:00').toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'divyareddyananthula06@gmail.com',
      subject: `New Booking Request — ${clientName} (${eventType})`,
      html: `
        <h2>New Booking Request 💄</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:8px;color:#888">Name</td><td style="padding:8px"><strong>${clientName}</strong></td></tr>
          <tr><td style="padding:8px;color:#888">Email</td><td style="padding:8px">${clientEmail}</td></tr>
          <tr><td style="padding:8px;color:#888">Phone</td><td style="padding:8px">${clientPhone}</td></tr>
          <tr><td style="padding:8px;color:#888">Event</td><td style="padding:8px">${eventType}</td></tr>
          <tr><td style="padding:8px;color:#888">Date</td><td style="padding:8px">${formattedDate}</td></tr>
          <tr><td style="padding:8px;color:#888">Duration</td><td style="padding:8px">${eventDuration}</td></tr>
          ${eventLocation ? `<tr><td style="padding:8px;color:#888">Location</td><td style="padding:8px">${eventLocation}</td></tr>` : ''}
          ${guestCount ? `<tr><td style="padding:8px;color:#888">Guests</td><td style="padding:8px">${guestCount}</td></tr>` : ''}
          ${notes ? `<tr><td style="padding:8px;color:#888">Notes</td><td style="padding:8px">${notes}</td></tr>` : ''}
          <tr><td style="padding:8px;color:#888">Booking ID</td><td style="padding:8px;font-family:monospace">${booking.id}</td></tr>
        </table>
      `,
    })

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
