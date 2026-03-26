import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail } from 'lucide-react'

function InstagramIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#4A1A6B] text-[#E4D0F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.jpeg" alt="Velvet Bridal Makeovers" width={48} height={48} className="rounded-full object-cover" />
              <span className="font-playfair text-xl font-semibold text-white">
                Velvet Bridal Makeovers
              </span>
            </div>
            <p className="text-[#E4D0F5]/70 text-sm leading-relaxed mb-4">
              Where Every Celebration Begins with Beauty
            </p>
            <p className="text-[#E4D0F5]/60 text-xs leading-relaxed">
              Luxury Indian Bridal &amp; Event Hair + Makeup by Divya
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-playfair text-[#C9A84C] text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/book', label: 'Book Now' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#E4D0F5]/70 hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-playfair text-[#C9A84C] text-lg mb-6">Connect</h4>
            <div className="space-y-4">
              <a
                href="https://www.instagram.com/velvet_bridal_makeovers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#E4D0F5]/70 hover:text-[#C9A84C] text-sm transition-colors group"
              >
                <InstagramIcon size={16} className="group-hover:scale-110 transition-transform" />
                @velvet_bridal_makeovers
              </a>
              <div className="flex items-center gap-3 text-[#E4D0F5]/70 text-sm">
                <MapPin size={16} className="text-[#C9A84C]" />
                Serving the tri-state area &amp; beyond
              </div>
              <div className="flex items-center gap-3 text-[#E4D0F5]/70 text-sm">
                <Mail size={16} className="text-[#C9A84C]" />
                Book via our online form
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E4D0F5]/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#E4D0F5]/40 text-xs">
            &copy; {new Date().getFullYear()} Velvet Bridal Makeovers. All rights reserved.
          </p>
          <p className="text-[#E4D0F5]/40 text-xs">Crafted with love for Divya ✨</p>
        </div>
      </div>
    </footer>
  )
}
