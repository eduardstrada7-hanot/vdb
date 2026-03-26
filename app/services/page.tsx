import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Services',
  description:
    "Explore Divya's luxury hair and makeup services for Indian weddings and celebrations — Bridal, Mehandi, Sangeet, Haldi, Engagement, Reception, and more.",
  alternates: { canonical: '/services' },
}

const services = [
  {
    emoji: '👰',
    name: 'Bridal Makeover',
    description:
      'The ultimate wedding day transformation. Divya creates a stunning, long-lasting look that honors your heritage while reflecting your unique beauty — traditional, fusion, or modern.',
    highlight: true,
  },
  {
    emoji: '🌿',
    name: 'Mehandi Night',
    description:
      'Celebrate the ancient art of henna with a festive, vibrant glam look. Rich colors, dramatic eyes, and a look that complements your intricate mehandi patterns.',
    highlight: false,
  },
  {
    emoji: '✨',
    name: 'Sangeet Night',
    description:
      'Light up the dance floor with a glitzy, high-energy look perfect for the music and celebration of your sangeet. Bold, expressive, and absolutely radiant.',
    highlight: false,
  },
  {
    emoji: '🌼',
    name: 'Haldi Ceremony',
    description:
      'A dewy, luminous glow that enhances your natural beauty for the turmeric ritual. Fresh, warm, and effortlessly beautiful for this joyful ceremony.',
    highlight: false,
  },
  {
    emoji: '💍',
    name: 'Engagement Ceremony',
    description:
      'Make a stunning first impression as a soon-to-be bride. An elegant, polished look for the ring ceremony and family gathering that photographs beautifully.',
    highlight: false,
  },
  {
    emoji: '🥂',
    name: 'Reception Gala',
    description:
      'Sophisticated evening glamour for the post-wedding reception. A refined, editorial look as you celebrate with all your guests one final, unforgettable time.',
    highlight: false,
  },
  {
    emoji: '🍸',
    name: 'Cocktail & Gala Dinners',
    description:
      'Red carpet-ready looks for upscale events. Polished, chic, and effortlessly glamorous for galas, charity dinners, and cocktail evenings.',
    highlight: false,
  },
  {
    emoji: '📸',
    name: 'Pre-Wedding Shoots',
    description:
      'Camera-ready, editorial looks designed for your engagement or pre-wedding photography sessions. Luminous skin, striking eyes, perfect from every angle.',
    highlight: false,
  },
  {
    emoji: '🎺',
    name: 'Baraat Welcome',
    description:
      "A festive, vibrant look for the bride's family welcoming the groom's procession. Celebratory, bold, and full of joy for this lively tradition.",
    highlight: false,
  },
  {
    emoji: '🎂',
    name: 'Birthday & Special Occasions',
    description:
      'Milestone birthdays, sweet 16s, anniversaries — every special moment deserves a flawless look. Custom glam tailored to the vibe of your celebration.',
    highlight: false,
  },
  {
    emoji: '🌟',
    name: 'Prom & Formal Events',
    description:
      "Teen-forward glamour that's sophisticated yet age-appropriate. Beautiful, confident looks for prom, homecoming, and formal school events.",
    highlight: false,
  },
  {
    emoji: '💼',
    name: 'Corporate Events & Headshots',
    description:
      'Clean, polished professional looks for corporate events, headshots, and business occasions. Confidence-boosting beauty that photographs impeccably.',
    highlight: false,
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-20 px-6 lg:px-12 bg-gradient-to-br from-[#4A1A6B] to-[#6B2D9A] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-60">
            <div className="w-8 sm:w-12 h-px bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-widest uppercase">Our Services</span>
            <div className="w-8 sm:w-12 h-px bg-[#C9A84C]" />
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Every Look,{' '}
            <em className="text-[#C9A84C]">Perfected</em>
          </h1>
          <p className="text-white/65 text-base md:text-lg leading-relaxed">
            From your first pre-wedding ritual to the grand reception gala, Divya crafts each look with deep knowledge of South Asian beauty traditions and contemporary artistry.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 lg:px-12 bg-[#FAF5FE]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div
                key={svc.name}
                className={`card-lift rounded-2xl p-8 flex flex-col ${
                  svc.highlight
                    ? 'bg-[#4A1A6B] text-white border-2 border-[#C9A84C]'
                    : 'bg-white border border-[#EDD9F5]'
                }`}
              >
                <div className="text-4xl mb-4">{svc.emoji}</div>
                {svc.highlight && (
                  <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-2">
                    Most Popular
                  </span>
                )}
                <h2
                  className={`font-playfair text-xl font-semibold mb-3 ${
                    svc.highlight ? 'text-white' : 'text-[#4A1A6B]'
                  }`}
                >
                  {svc.name}
                </h2>
                <p
                  className={`text-sm leading-relaxed flex-1 mb-6 ${
                    svc.highlight ? 'text-white/70' : 'text-[#4A1A6B]/60'
                  }`}
                >
                  {svc.description}
                </p>
                <Link href={`/book?service=${encodeURIComponent(svc.name)}`}>
                  <Button variant={svc.highlight ? 'primary' : 'secondary'} size="sm" className="w-full">
                    Book This Service
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 bg-[#EDD9F5]/60 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#4A1A6B] mb-4">
            Not sure which service is right for you?
          </h2>
          <p className="text-[#4A1A6B]/65 text-base md:text-lg mb-8">
            Send a booking request and Divya will reach out to discuss the perfect look for your celebration.
          </p>
          <Link href="/book">
            <Button size="lg" variant="primary">
              Send a Booking Request
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
