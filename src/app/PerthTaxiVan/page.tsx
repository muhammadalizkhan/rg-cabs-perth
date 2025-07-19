"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Clock,
  Phone,
  Calendar,
  Music,
  Trophy,
  Camera,
  MapPin,
  CheckCircle,
  ArrowRight,
  CaravanIcon as Van,
} from "lucide-react"
import ContactUs from "@/components/contactUs/contactUs"

export default function PerthTaxiVanPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-black/10 rounded-full text-black text-sm font-medium mb-6">
              <Van className="w-4 h-4 mr-2" />
              Large Group Transportation Specialists
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Perth Taxi Van
              <span className="block text-3xl md:text-4xl font-semibold">Large Group Transport</span>
            </h1>
            <p className="text-xl text-black/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Finding a large taxi in Perth airport can be a challenge. Book in advance to reserve your own private van.
              We are the taxi service Perth visitors rely on to facilitate outings and larger group functions.
            </p>
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
            >
              Book Your Van Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Why Choose Our Van Service?</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Imagine the convenience of a taxi service that allows you to call and speak directly to the driver? We
              make group transportation simple and stress-free.
            </p>
          </div>

          <div className="bg-white grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Direct Driver Contact</h3>
                <p className="text-gray-700">
                  Call and speak directly to your driver. No middleman, no confusion - just direct communication for a
                  seamless experience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Advance Booking</h3>
                <p className="text-gray-700">
                  Book in advance to guarantee your van. No more tough and nervous waiting games - secure your transport
                  today.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">24/7 Availability</h3>
                <p className="text-gray-700">
                  Available around the clock throughout Rockingham, Baldivis, and Perth. We're here when you need us
                  most.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Service Areas */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Perfect For All Events</h3>
              <p className="text-lg text-gray-700">
                Whether it's airport transfers, job functions, or wedding transportation - we make it happen.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {[
                { icon: Music, label: "Festivals" },
                { icon: Camera, label: "Shows" },
                { icon: Users, label: "Social Functions" },
                { icon: Trophy, label: "Sporting Events" },
                { icon: Music, label: "Concerts" },
                { icon: MapPin, label: "Tours" },
                { icon: CheckCircle, label: "And More" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-sm font-semibold text-black">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    <ContactUs />
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Book Your Group Transport?</h2>
          <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
            Don't let transportation be a challenge for your next event. Book your van in advance and travel with
            confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg font-semibold"
            >
              Call Now: (08) 1234 5678
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg rounded-lg bg-transparent"
            >
              Email Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
