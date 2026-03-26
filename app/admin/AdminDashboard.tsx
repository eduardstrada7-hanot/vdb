'use client'

import { useState, useEffect, useCallback } from 'react'
import Badge from '@/components/ui/Badge'
import { format } from 'date-fns'
import { X, RefreshCw } from 'lucide-react'

interface Booking {
  id: string
  createdAt: string
  clientName: string
  clientEmail: string
  clientPhone: string
  eventType: string
  eventDate: string
  eventDuration: string
  eventLocation?: string
  guestCount?: number
  notes?: string
  status: string
  adminNotes?: string
  reviewedAt?: string
}

const STATUS_FILTERS = ['all', 'pending', 'reviewed', 'approved', 'rejected']

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings')
      const data = await res.json()
      setBookings(data)
    } catch {
      console.error('Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const updateStatus = async (id: string, status: string) => {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes }),
      })
      if (res.ok) {
        await fetchBookings()
        setSelected(null)
        setAdminNotes('')
      }
    } catch {
      console.error('Failed to update booking')
    } finally {
      setActionLoading(false)
    }
  }

  const filtered = bookings.filter((b) => filter === 'all' || b.status === filter)

  const counts: Record<string, number> = { all: bookings.length }
  bookings.forEach((b) => {
    counts[b.status] = (counts[b.status] || 0) + 1
  })

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              filter === s
                ? 'bg-[#2C1810] text-white'
                : 'bg-white border border-[#F5E6E0] text-[#2C1810]/60 hover:border-[#C9A84C]/50'
            }`}
          >
            {s} {counts[s] !== undefined ? `(${counts[s]})` : ''}
          </button>
        ))}
        <button
          onClick={fetchBookings}
          className="ml-auto flex items-center gap-2 text-[#2C1810]/50 text-sm hover:text-[#C9A84C] transition-colors"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 text-[#2C1810]/40">Loading bookings...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-[#2C1810]/40">No bookings found.</div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#F5E6E0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F5E6E0] bg-[#FEFAF6]">
                  {['Client', 'Event', 'Date', 'Duration', 'Submitted', 'Status', ''].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold uppercase tracking-widest text-[#2C1810]/40"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-[#F5E6E0]/50 last:border-0 hover:bg-[#FEFAF6]/70 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <p className="font-semibold text-[#2C1810] text-sm">{b.clientName}</p>
                      <p className="text-[#2C1810]/40 text-xs">{b.clientEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2C1810]">{b.eventType}</td>
                    <td className="px-6 py-4 text-sm text-[#2C1810]">
                      {format(new Date(b.eventDate), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2C1810]/60">{b.eventDuration}</td>
                    <td className="px-6 py-4 text-xs text-[#2C1810]/40">
                      {format(new Date(b.createdAt), 'MMM d, h:mm a')}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <Badge status={b.status} />
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <button
                        onClick={() => {
                          setSelected(b)
                          setAdminNotes(b.adminNotes || '')
                        }}
                        className="text-[#C9A84C] text-xs font-medium hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-[#F5E6E0] px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between rounded-t-3xl">
              <div>
                <h3 className="font-playfair text-xl font-semibold text-[#2C1810]">
                  {selected.clientName}
                </h3>
                <p className="text-[#2C1810]/40 text-xs">{selected.id}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge status={selected.status} />
                <button
                  onClick={() => setSelected(null)}
                  className="text-[#2C1810]/40 hover:text-[#2C1810] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="px-4 sm:px-8 py-4 sm:py-6 space-y-4 text-sm">
              {[
                ['Email', selected.clientEmail],
                ['Phone', selected.clientPhone],
                ['Event Type', selected.eventType],
                ['Event Date', format(new Date(selected.eventDate), 'EEEE, MMMM d, yyyy')],
                ['Duration', selected.eventDuration],
                ['Location', selected.eventLocation || '—'],
                ['Guests', selected.guestCount?.toString() || '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 flex-wrap">
                  <span className="text-[#2C1810]/40 uppercase tracking-widest text-xs">{label}</span>
                  <span className="text-[#2C1810] font-medium">{value}</span>
                </div>
              ))}

              {selected.notes && (
                <div className="pt-3 border-t border-[#F5E6E0]">
                  <p className="text-[#2C1810]/40 text-xs uppercase tracking-widest mb-2">Client Notes</p>
                  <p className="text-[#2C1810]/70">{selected.notes}</p>
                </div>
              )}

              <div className="pt-3 border-t border-[#F5E6E0]">
                <label className="block text-[#2C1810]/40 text-xs uppercase tracking-widest mb-2">
                  Admin Notes
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this booking..."
                  rows={3}
                  className="w-full border border-[#F5E6E0] rounded-xl px-4 py-3 text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] resize-none"
                />
              </div>
            </div>

            <div className="px-4 sm:px-8 pb-4 sm:pb-8 flex gap-2 sm:gap-3">
              <button
                onClick={() => updateStatus(selected.id, 'approved')}
                disabled={actionLoading || selected.status === 'approved'}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white py-3 rounded-xl text-sm font-medium transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(selected.id, 'reviewed')}
                disabled={actionLoading || selected.status === 'reviewed'}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white py-3 rounded-xl text-sm font-medium transition-colors"
              >
                Mark Reviewed
              </button>
              <button
                onClick={() => updateStatus(selected.id, 'rejected')}
                disabled={actionLoading || selected.status === 'rejected'}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white py-3 rounded-xl text-sm font-medium transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
