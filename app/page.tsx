import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Velvet Bridal Makeovers | Indian Bridal Makeup & Hair Artist',
  description:
    'Luxury Indian bridal makeup and hair by Divya. Where Every Celebration Begins with Beauty. Serving the tri-state area.',
  alternates: { canonical: '/' },
}

const services = [
  { icon: '👰', name: 'Bridal Makeover', desc: 'Full wedding day hair & makeup, traditional or fusion looks' },
  { icon: '🌿', name: 'Mehandi Night', desc: 'Festive glam for the pre-wedding henna ceremony' },
  { icon: '✨', name: 'Sangeet Night', desc: 'Glitzy, high-energy look for the music & dance celebration' },
  { icon: '🌸', name: 'Haldi Ceremony', desc: 'Natural, dewy glow for the turmeric ritual' },
  { icon: '💍', name: 'Engagement', desc: 'Elegant look for the ring ceremony & family gathering' },
  { icon: '🥂', name: 'Reception Gala', desc: 'Sophisticated evening glamour for the post-wedding reception' },
  { icon: '🏡', name: 'Grihapravesh', desc: 'Radiant, auspicious look for the house warming ceremony' },
  { icon: '🍼', name: 'Baby Shower Ceremony', desc: 'Soft, luminous glam for celebrating a new arrival' },
]

const testimonials = [
  {
    name: 'Priya S.',
    event: 'Bridal Makeover',
    text: 'Divya is an absolute artist. She understood my vision perfectly and made me feel like royalty on my wedding day. Every guest was in awe!',
    rating: 5,
  },
  {
    name: 'Ananya R.',
    event: 'Sangeet & Reception',
    text: 'I booked Divya for both my sangeet and reception. Two completely different looks — both were absolutely flawless. She is truly gifted.',
    rating: 5,
  },
  {
    name: 'Kavya M.',
    event: 'Mehandi & Haldi',
    text: "From the natural haldi glow to the vibrant mehandi look, Divya captured every emotion of my pre-wedding celebrations. I cried happy tears!",
    rating: 5,
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Velvet Bridal Makeovers',
  description: 'Luxury Indian bridal makeup and hair by Divya',
  url: 'https://velvetbridalmakeovers.com',
  sameAs: ['https://www.instagram.com/velvet_bridal_makeovers'],
  priceRange: '$$$$',
  serviceArea: 'Tri-State Area, USA',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/divia-showreel.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-80">
            <div className="w-8 sm:w-12 h-px bg-[#C9A84C]" />
            <Sparkles size={16} className="text-[#C9A84C]" />
            <div className="w-8 sm:w-12 h-px bg-[#C9A84C]" />
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
            Velvet Bridal<br />
            <em className="text-[#C9A84C]">Makeovers</em>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-light tracking-widest uppercase mb-4 opacity-90">
            Where Every Celebration Begins with Beauty
          </p>
          <p className="text-sm md:text-base tracking-wider opacity-70 mb-10">
            Luxury Indian Bridal &amp; Event Hair + Makeup by Divya
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book">
              <Button size="lg" variant="primary">
                Book Your Look
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/services">
              <button className="btn-secondary px-8 py-4 text-base font-medium rounded-full text-white border-white/50 hover:border-[#C9A84C]">
                View Services
              </button>
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-10 bg-white/40 mx-auto" />
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 px-6 lg:px-12 bg-[#F3EAFF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-divider" />
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A1A6B] mb-4">
              Every Look, Perfected
            </h2>
            <p className="text-[#4A1A6B]/60 text-lg max-w-xl mx-auto">
              From your first pre-wedding ritual to the grand reception, Divya crafts each look with intention and artistry.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="card-lift bg-white border border-[#E4D0F5] rounded-2xl p-8 text-center group"
              >
                <div className="text-4xl mb-4">{svc.icon}</div>
                <h3 className="font-playfair text-xl font-semibold text-[#4A1A6B] mb-3">
                  {svc.name}
                </h3>
                <p className="text-[#4A1A6B]/60 text-sm leading-relaxed mb-6">{svc.desc}</p>
                <Link href="/services">
                  <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest hover:text-[#C9729A] transition-colors">
                    Learn More →
                  </span>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="secondary" size="lg">
                See All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Divya */}
      <section className="py-24 px-6 lg:px-12 bg-[#E4D0F5]/40">
        <div className="max-w-5xl mx-auto text-center">
          <div className="section-divider" />
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A1A6B] mb-8">
            The Artist Behind the Magic
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-[#4A1A6B]/75 text-base md:text-lg leading-relaxed mb-6">
              Hi, I&apos;m <strong className="text-[#4A1A6B]">Divya</strong> — a professional makeup and hair artist with a deep passion for South Asian beauty traditions. I believe every celebration deserves a look that&apos;s as unforgettable as the moment itself.
            </p>
            <p className="text-[#4A1A6B]/75 text-base md:text-lg leading-relaxed mb-6">
              With years of experience in Indian bridal makeovers, I blend timeless tradition with contemporary elegance. Whether you envision a classic bridal look rooted in your heritage or a modern fusion that turns heads, I bring your vision to life — with warmth, precision, and love.
            </p>
            <p className="text-[#4A1A6B]/75 text-base md:text-lg leading-relaxed mb-10">
              From intimate haldi ceremonies to grand reception galas, every client deserves to feel like the most radiant version of themselves. That&apos;s my promise to you.
            </p>
            <Link href="/book">
              <Button size="lg" variant="primary">
                Book a Consultation
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 lg:px-12 bg-[#F3EAFF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-divider" />
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A1A6B] mb-4">
              Brides Are Saying
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="card-lift bg-white border border-[#E4D0F5] rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#C9A84C" className="text-[#C9A84C]" />
                  ))}
                </div>
                <p className="text-[#4A1A6B]/70 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-[#4A1A6B] text-sm">{t.name}</p>
                  <p className="text-[#C9A84C] text-xs mt-1">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#EDE3F7]">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles size={24} className="text-[#C9A84C] mx-auto mb-6" />
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#4A1A6B] mb-4">
            Follow the Journey
          </h2>
          <p className="text-[#4A1A6B]/60 text-base md:text-lg mb-8">
            Catch behind-the-scenes artistry, real bride transformations, and daily beauty inspiration.
          </p>
          <a
            href="https://www.instagram.com/velvet_bridal_makeovers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-primary px-8 py-4 rounded-full text-base font-medium text-white"
          >
            <InstagramIcon size={20} />
            @velvet_bridal_makeovers
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-[#E4D0F5] to-[#F3EAFF]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="section-divider" />
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A1A6B] mb-6">
            Your Dream Look Awaits
          </h2>
          <p className="text-[#4A1A6B]/65 text-base md:text-lg leading-relaxed mb-10">
            Every celebration deserves to begin with beauty. Let&apos;s create something extraordinary together.
          </p>
          <Link href="/book">
            <Button size="lg" variant="primary">
              Book Your Look Now
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
