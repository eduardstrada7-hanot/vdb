'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/book', label: 'Book Now', highlight: true },
  { href: '/admin', label: 'Admin' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAF5FE]/95 backdrop-blur-md shadow-sm border-b border-[#EDD9F5]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles
              size={18}
              className="text-[#C9A84C] group-hover:rotate-12 transition-transform duration-300"
            />
            <span
              className="font-playfair text-lg font-semibold tracking-wide"
              style={{ color: scrolled ? '#4A1A6B' : 'white' }}
            >
              Velvet Bridal Makeovers
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.highlight ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="btn-primary px-6 py-2 rounded-full text-sm font-medium text-white"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-medium tracking-wide transition-colors ${
                    scrolled
                      ? 'text-[#4A1A6B] hover:text-[#C9A84C]'
                      : 'text-white/90 hover:text-[#C9A84C]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X size={24} className={scrolled ? 'text-[#4A1A6B]' : 'text-white'} />
            ) : (
              <Menu size={24} className={scrolled ? 'text-[#4A1A6B]' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-[#FAF5FE] border-t border-[#EDD9F5] py-6 px-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block text-sm font-medium tracking-wide py-2 ${
                  link.highlight
                    ? 'text-[#C9A84C] font-semibold'
                    : 'text-[#4A1A6B] hover:text-[#C9A84C]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
