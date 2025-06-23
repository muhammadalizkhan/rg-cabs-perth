import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar/navbar"
import Hero from "@/components/hero/hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <Hero />
    </div>
  )
}
