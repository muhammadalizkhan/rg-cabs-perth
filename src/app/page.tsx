import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="text-4xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            RG Cab - Premium Taxi Service
          </div>
          <Button className="bg-gradient-to-r from-black to-gray-800 text-yellow-400 hover:from-gray-800 hover:to-black hover:text-yellow-300 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Get Started
          </Button>
        </main>
      </div>
    </div>
  )
}
