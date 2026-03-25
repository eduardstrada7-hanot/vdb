import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { status, adminNotes } = body

    const validStatuses = ['pending', 'reviewed', 'approved', 'rejected']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
        reviewedAt: status && status !== 'pending' ? new Date() : undefined,
      },
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Update booking error:', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}
