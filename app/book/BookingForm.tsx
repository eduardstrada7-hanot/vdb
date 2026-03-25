'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import StepIndicator from '@/components/ui/StepIndicator'
import Button from '@/components/ui/Button'
import { CheckCircle, Calendar, User, FileText } from 'lucide-react'

const EVENT_TYPES = [
  'Bridal Makeover',
  'Mehndi Night',
  'Sangeet Night',
  'Haldi Ceremony',
  'Engagement Ceremony',
  'Reception Gala',
  'Cocktail & Gala Dinners',
  'Pre-Wedding Shoots',
  'Baraat Welcome',
  'Birthday & Special Occasions',
  'Prom & Formal Events',
  'Corporate Events & Headshots',
]

const DURATIONS = ['2 Hours', '4 Hours', '6 Hours', 'Full Day (8+ hrs)', 'Custom']

interface FormData {
  eventType: string
  eventDate: string
  eventDuration: string
  eventLocation: string
  guestCount: string
  clientName: string
  clientEmail: string
  clientPhone: string
  notes: string
}

const initialForm: FormData = {
  eventType: '',
  eventDate: '',
  eventDuration: '',
  eventLocation: '',
  guestCount: '',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  notes: '',
}

const steps = ['Your Event', 'About You', 'Review']

export default function BookingForm() {
  const searchParams = useSearchParams()
  const preselectedService = searchParams.get('service') || ''

  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({
    ...initialForm,
    eventType: preselectedService,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<{ bookingId: string } | null>(null)
  const [error, setError] = useState('')

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const step1Valid = form.eventType && form.eventDate && form.eventDuration
  const step2Valid = form.clientName && form.clientEmail && form.clientPhone

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          guestCount: form.guestCount ? parseInt(form.guestCount) : null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setSuccess({ bookingId: data.id })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white rounded-3xl border border-[#F5E6E0] shadow-lg p-12">
          <CheckCircle size={56} className="text-[#C9A84C] mx-auto mb-6" />
          <h2 className="font-playfair text-3xl font-bold text-[#2C1810] mb-4">
            Request Received!
          </h2>
          <p className="text-[#2C1810]/70 text-lg mb-4">
            Divia will call you within <strong>48 hours</strong> to confirm your booking details.
          </p>
          <div className="bg-[#F5E6E0]/60 rounded-2xl p-6 mb-8">
            <p className="text-xs text-[#2C1810]/50 uppercase tracking-widest mb-1">Booking Reference</p>
            <p className="font-mono text-[#2C1810] font-semibold text-lg">{success.bookingId}</p>
          </div>
          <button
            onClick={() => {
              setSuccess(null)
              setForm(initialForm)
              setStep(1)
            }}
            className="text-[#C9A84C] text-sm font-medium hover:underline"
          >
            Submit another request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator steps={steps} currentStep={step} />

      <div className="bg-white rounded-3xl border border-[#F5E6E0] shadow-lg overflow-hidden">
        {/* Step 1 */}
        {step === 1 && (
          <div className="p-8 md:p-12 step-enter">
            <div className="flex items-center gap-3 mb-8">
              <Calendar size={22} className="text-[#C9A84C]" />
              <h2 className="font-playfair text-2xl font-semibold text-[#2C1810]">Your Event</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#2C1810]/50 mb-2">
                  Event Type *
                </label>
                <select
                  value={form.eventType}
                  onChange={(e) => update('eventType', e.target.value)}
                  className="w-full border border-[#F5E6E0] rounded-xl px-4 py-3 text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all"
                >
                  <option value="">Select an event type</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#2C1810]/50 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  min={minDate}
                  value={form.eventDate}
                  onChange={(e) => update('eventDate', e.target.value)}
                  className="w-full border border-[#F5E6E0] rounded-xl px-4 py-3 text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#2C1810]/50 mb-3">
                  Duration *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {DURATIONS.map((d) => (
                    <label
                      key={d}
                      className={`flex items-center justify-center gap-2 border rounded-xl px-4 py-3 cursor-pointer text-sm transition-all ${
                        form.eventDuration === d
                          ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#2C1810] font-medium'
                          : 'border-[#F5E6E0] text-[#2C1810]/60 hover:border-[#C9A84C]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="duration"
                        value={d}
                        checked={form.eventDuration === d}
                        onChange={(e) => update('eventDuration', e.target.value)}
                        className="sr-only"
                      />
                      {d}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#2C1810]/50 mb-2">
                  Event Location <span className="normal-case text-[#2C1810]/30">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="City or venue name"
                  value={form.eventLocation}
                  onChange={(e) => update('eventLocation', e.target.value)}
                  className="w-full border border-[#F5E6E0] rounded-xl px-4 py-3 text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all placeholder:text-[#2C1810]/25"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#2C1810]/50 mb-2">
                  Number of People <span className="normal-case text-[#2C1810]/30">(optional)</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1, 5, 10"
                  min="1"
                  value={form.guestCount}
                  onChange={(e) => update('guestCount', e.target.value)}
                  className="w-full border border-[#F5E6E0] rounded-xl px-4 py-3 text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all placeholder:text-[#2C1810]/25"
                />
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!step1Valid}
                variant="primary"
                size="lg"
                className="disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="p-8 md:p-12 step-enter">
            <div className="flex items-center gap-3 mb-8">
              <User size={22} className="text-[#C9A84C]" />
              <h2 className="font-playfair text-2xl font-semibold text-[#2C1810]">About You</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#2C1810]/50 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.clientName}
                  onChange={(e) => update('clientName', e.target.value)}
                  className="w-full border border-[#F5E6E0] rounded-xl px-4 py-3 text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all placeholder:text-[#2C1810]/25"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#2C1810]/50 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.clientEmail}
                  onChange={(e) => update('clientEmail', e.target.value)}
                  className="w-full border border-[#F5E6E0] rounded-xl px-4 py-3 text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all placeholder:text-[#2C1810]/25"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#2C1810]/50 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.clientPhone}
                  onChange={(e) => update('clientPhone', e.target.value)}
                  className="w-full border border-[#F5E6E0] rounded-xl px-4 py-3 text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all placeholder:text-[#2C1810]/25"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#2C1810]/50 mb-2">
                  Special Requests <span className="normal-case text-[#2C1810]/30">(optional)</span>
                </label>
                <textarea
                  placeholder="Tell Divia about your vision, inspiration, or any specific requirements..."
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  rows={4}
                  className="w-full border border-[#F5E6E0] rounded-xl px-4 py-3 text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all placeholder:text-[#2C1810]/25 resize-none"
                />
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-[#2C1810]/50 text-sm hover:text-[#2C1810] transition-colors"
              >
                ← Back
              </button>
              <Button
                onClick={() => setStep(3)}
                disabled={!step2Valid}
                variant="primary"
                size="lg"
                className="disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                Review Request
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="p-8 md:p-12 step-enter">
            <div className="flex items-center gap-3 mb-8">
              <FileText size={22} className="text-[#C9A84C]" />
              <h2 className="font-playfair text-2xl font-semibold text-[#2C1810]">Review &amp; Submit</h2>
            </div>

            {/* Summary */}
            <div className="bg-[#FEFAF6] border border-[#F5E6E0] rounded-2xl p-6 mb-8 space-y-4">
              <h3 className="font-playfair text-lg font-semibold text-[#2C1810] mb-4">Your Booking Summary</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {[
                  ['Event Type', form.eventType],
                  ['Date', form.eventDate ? new Date(form.eventDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''],
                  ['Duration', form.eventDuration],
                  ['Location', form.eventLocation || '—'],
                  ['Guests', form.guestCount || '—'],
                  ['Name', form.clientName],
                  ['Email', form.clientEmail],
                  ['Phone', form.clientPhone],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[#2C1810]/40 text-xs uppercase tracking-widest mb-0.5">{label}</p>
                    <p className="text-[#2C1810] font-medium">{value}</p>
                  </div>
                ))}
              </div>
              {form.notes && (
                <div className="pt-3 border-t border-[#F5E6E0]">
                  <p className="text-[#2C1810]/40 text-xs uppercase tracking-widest mb-1">Notes</p>
                  <p className="text-[#2C1810] text-sm">{form.notes}</p>
                </div>
              )}
            </div>

            {/* What happens next */}
            <div className="bg-[#2C1810]/5 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-[#2C1810] text-sm uppercase tracking-widest mb-4">What happens next?</h3>
              <ol className="space-y-3">
                {[
                  'Divia personally reviews your booking request.',
                  "She'll call you within 48 hours to confirm details & availability.",
                  'You receive a confirmation email once your booking is approved.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#2C1810]/70">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C9A84C] text-white text-xs flex items-center justify-center font-semibold mt-0.5">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-[#2C1810]/50 text-sm hover:text-[#2C1810] transition-colors"
              >
                ← Back
              </button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                variant="primary"
                size="lg"
              >
                {loading ? 'Sending...' : 'Send Booking Request'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
