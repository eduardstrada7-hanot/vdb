import type { Metadata } from 'next'
import AdminDashboard from './AdminDashboard'
import LogoutButton from './LogoutButton'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Velvet Bridal Makeovers booking management dashboard.',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return (
    <>
      <section className="pt-28 pb-8 px-6 bg-[#4A1A6B] text-white">
        <div className="max-w-7xl mx-auto flex items-start justify-between gap-4">
          <div>
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-2">Admin</p>
            <h1 className="font-playfair text-2xl md:text-4xl font-bold">Booking Dashboard</h1>
          </div>
          <LogoutButton />
        </div>
      </section>
      <section className="py-10 px-6 bg-[#FAF5FE] min-h-screen">
        <div className="max-w-7xl mx-auto">
          <AdminDashboard />
        </div>
      </section>
    </>
  )
}
