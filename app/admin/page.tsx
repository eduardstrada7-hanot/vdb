import type { Metadata } from 'next'
import AdminDashboard from './AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Velvet Bridal Makeovers booking management dashboard.',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return (
    <>
      <section className="pt-28 pb-8 px-6 bg-[#2C1810] text-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-2">Admin</p>
          <h1 className="font-playfair text-4xl font-bold">Booking Dashboard</h1>
          <p className="text-white/50 text-sm mt-2">
            Note: This page has no authentication — protect it before going live.
          </p>
        </div>
      </section>
      <section className="py-10 px-6 bg-[#FEFAF6] min-h-screen">
        <div className="max-w-7xl mx-auto">
          <AdminDashboard />
        </div>
      </section>
    </>
  )
}
