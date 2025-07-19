"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Heart,
  GraduationCap,
  PartyPopper,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  Gift,
  Camera,
  Music,
  Crown,
  Cake,
} from "lucide-react"

export default function SpecialEventPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-black/10 rounded-full text-black text-sm font-medium mb-6">
              <Gift className="w-4 h-4 mr-2" />
              Special Occasion Transportation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Special Occasion
              <span className="block text-3xl md:text-4xl font-semibold">Stress-Free Transport</span>
            </h1>
            <p className="text-xl text-black/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              For weddings, school events, parties — do not stress out about getting there. We take your booking up to a
              year in advance so you know you're ready to go.
            </p>
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
            >
              Book Special Event
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Perfect for Your Special Day</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From intimate celebrations to grand occasions, we ensure your transportation is one less thing to worry
              about.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Book Up to 1 Year Ahead</h3>
                <p className="text-gray-700">
                  Plan your special occasion transport well in advance. We accept bookings up to a year ahead so you can
                  secure your ride early.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Stress-Free Experience</h3>
                <p className="text-gray-700">
                  Focus on enjoying your special day while we handle all the transportation details. Arrive relaxed and
                  on time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Punctual & Reliable</h3>
                <p className="text-gray-700">
                  Your special occasion deserves perfect timing. We ensure punctual pickup and delivery for your
                  important events.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Special Occasions We Serve</h3>
              <p className="text-lg text-gray-700">
                Whatever the celebration, we're here to make your transportation seamless and memorable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Heart, title: "Weddings", desc: "Bridal party and guest transportation" },
                { icon: GraduationCap, title: "School Events", desc: "Graduations, proms, and school functions" },
                { icon: PartyPopper, title: "Birthday Parties", desc: "Milestone birthday celebrations" },
                { icon: Crown, title: "Anniversaries", desc: "Special anniversary celebrations" },
                { icon: Cake, title: "Baby Showers", desc: "Baby shower and gender reveal parties" },
                { icon: Music, title: "Formal Events", desc: "Galas, award ceremonies, and formal dinners" },
                { icon: Camera, title: "Photo Shoots", desc: "Wedding and special occasion photography" },
                { icon: Gift, title: "Surprise Events", desc: "Surprise parties and special surprises" },
              ].map((event, index) => (
                <Card
                  key={index}
                  className="bg-white hover:shadow-md transition-all duration-300 border border-gray-200"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                      <event.icon className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="font-bold text-black mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-sm">{event.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Ready to Secure Your Special Day Transport?
          </h2>
          <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
            Don't leave your special occasion transport to chance. Book early and ensure everything goes perfectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg font-semibold"
            >
              Send Your Enquiry
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
