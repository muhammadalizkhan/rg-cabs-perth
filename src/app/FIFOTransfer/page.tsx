"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Plane,
  Clock,
  Calendar,
  Moon,
  Sun,
  Shield,
  Users,
  MapPin,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Home,
  RefreshCw,
} from "lucide-react"

export default function FIFOTransferPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-black/10 rounded-full text-black text-sm font-medium mb-6">
              <Plane className="w-4 h-4 mr-2" />
              Fly-In Fly-Out Transportation Specialists
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              FIFO Transfer
              <span className="block text-3xl md:text-4xl font-semibold">Regular Airport Transport</span>
            </h1>
            <p className="text-xl text-black/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Need to get to and from the airport on a regular basis? Looking to avoid the hassle of finding someone who
              can drop you off or pick you up at a moment's notice? Our team can get you door to door at any time, day
              or night.
            </p>
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
            >
              Book FIFO Transfer
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Reliable FIFO Transportation</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Let your loved ones stay in bed for those early morning drop-offs, and let us do the driving for you. We
              provide top-notch service that won't disrupt anyone's schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">24/7 Availability</h3>
                <p className="text-gray-700">
                  Day or night, early morning or late evening - we're available whenever your flight schedule demands.
                  No time is too early or too late.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Regular Schedule Service</h3>
                <p className="text-gray-700">
                  Perfect for FIFO workers with regular rotation schedules. We understand your routine and adapt to your
                  specific timing needs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Home className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Door-to-Door Service</h3>
                <p className="text-gray-700">
                  Complete convenience from your front door to the airport terminal and back. No need to burden family
                  or friends with early morning drives.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white  rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">FIFO Service Features</h3>
              <p className="text-lg text-gray-700">
                Designed specifically for fly-in fly-out workers and regular business travelers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Moon, title: "Early Morning", desc: "Pre-dawn pickups for early flights" },
                { icon: Sun, title: "Late Night", desc: "Late evening returns from work" },
                { icon: Calendar, title: "Scheduled Runs", desc: "Regular rotation schedule service" },
                { icon: Briefcase, title: "Work Equipment", desc: "Space for work bags and equipment" },
                { icon: Shield, title: "Reliable Service", desc: "Dependable transportation you can count on" },
                { icon: Users, title: "Family Friendly", desc: "Let family members sleep in" },
                { icon: Plane, title: "Airport Expertise", desc: "Know all terminals and procedures" },
                { icon: MapPin, title: "Local Knowledge", desc: "Best routes and timing for all areas" },
              ].map((feature, index) => (
                <Card key={index} className="bg-white hover:shadow-md transition-all duration-300 border border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="font-bold text-black mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-gradient-to-r from-yellow-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready for Hassle-Free FIFO Transport?</h2>
          <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of FIFO workers who trust us for reliable, punctual airport transfers. Let us handle the
            driving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg font-semibold"
            >
              Book FIFO Transfer
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg rounded-lg bg-transparent"
            >
              Call: (08) 1234 5678
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
