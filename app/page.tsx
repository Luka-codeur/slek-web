import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { Features } from '@/components/features'
import { Security } from '@/components/security'
import { Pricing } from '@/components/pricing'
import { Download } from '@/components/download'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Security />
        <Pricing />
        <Download />
      </main>
      <Footer />
    </div>
  )
}
