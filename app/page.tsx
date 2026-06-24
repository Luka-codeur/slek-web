import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { Features } from '@/components/features'
import { Security } from '@/components/security'
import { Pricing } from '@/components/pricing'
import { Download } from '@/components/download'
import { Footer } from '@/components/footer'
import { SlekSceneProvider } from '@/components/slek-scene-context'
import { SceneMount } from '@/components/scene-mount'
import { LoadingScreen } from '@/components/loading-screen'

export default function Page() {
  return (
    <SlekSceneProvider>
      <LoadingScreen />

      {/* Scène 3D fixe, immersive en fond sur tout le site */}
      <SceneMount />

      <div className="relative z-10">
        <Navbar />
        <main className="flex flex-col gap-y-12 sm:gap-y-24">
          <Hero />
          <HowItWorks />
          <Features />
          <Security />
          <Pricing />
          <Download />
        </main>
        <Footer />
      </div>
    </SlekSceneProvider>
  )
}
