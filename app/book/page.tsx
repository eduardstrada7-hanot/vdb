import type { Metadata } from 'next'
import { Suspense } from 'react'
import BookingForm from './BookingForm'

export const metadata: Metadata = {
  title: 'Book Your Look',
  description:
    'Request a booking with Divia for your wedding, sangeet, mehndi, or any special occasion. Luxury Indian bridal makeup and hair.',
  alternates: { canonical: '/book' },
}

export default function BookPage() {
  return (
    <>
      <section className="pt-36 pb-12 px-6 bg-gradient-to-br from-[#2C1810] to-[#3d2218] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-60">
            <div className="w-12 h-px bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-widest uppercase">Booking</span>
            <div className="w-12 h-px bg-[#C9A84C]" />
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
            Book Your <em className="text-[#C9A84C]">Look</em>
          </h1>
          <p className="text-white/65 text-lg">
            Complete the form below and Divia will personally reach out within 48 hours to confirm your booking.
          </p>
        </div>
      </section>
      <section className="py-20 px-6 bg-[#FEFAF6]">
        <Suspense fallback={<div className="max-w-2xl mx-auto text-center py-20 text-[#2C1810]/40">Loading...</div>}>
          <BookingForm />
        </Suspense>
      </section>
    </>
  )
}
