"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accessibility,
  Heart,
  ShoppingBag,
  Stethoscope,
  MapPin,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Car,
  Users,
  Home,
} from "lucide-react"

export default function WheelchairPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-black/10 rounded-full text-black text-sm font-medium mb-6">
              <Accessibility className="w-4 h-4 mr-2" />
              Accessible Transportation Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Wheelchair
              <span className="block text-3xl md:text-4xl font-semibold">Accessible Transfers</span>
            </h1>
            <p className="text-xl text-black/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Our wheelchair vehicle will get you to your destination in convenience, comfort, and safety. Take yourself
              shopping, to your medical appointment, or enjoy a personal day trip.
            </p>
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
            >
              Book Wheelchair Transfer
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Accessible Transportation You Can Trust</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Get in touch to discuss the specifics of your requirements. We're here to provide safe, comfortable, and
              dignified transportation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Safety First</h3>
                <p className="text-gray-700">
                  Our wheelchair-accessible vehicles are equipped with the latest safety features and operated by
                  trained professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Comfort & Dignity</h3>
                <p className="text-gray-700">
                  Travel with comfort and dignity in our specially designed vehicles that prioritize your comfort and
                  independence.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Reliable Service</h3>
                <p className="text-gray-700">
                  Count on us for punctual, reliable service that respects your schedule and gets you where you need to
                  go on time.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Where We Can Take You</h3>
              <p className="text-lg text-gray-700">
                From essential appointments to leisure activities, we're here to help you get around with ease.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Stethoscope, title: "Medical Appointments", desc: "Doctor visits, therapy, and treatments" },
                { icon: ShoppingBag, title: "Shopping Trips", desc: "Grocery stores, malls, and retail outlets" },
                { icon: MapPin, title: "Personal Day Trips", desc: "Leisure outings and recreational activities" },
                { icon: Home, title: "Home Visits", desc: "Family visits and social gatherings" },
                { icon: Car, title: "Airport Transfers", desc: "Accessible airport transportation" },
                { icon: Users, title: "Social Events", desc: "Community events and social activities" },
                { icon: Heart, title: "Wellness Visits", desc: "Spa, wellness centers, and health facilities" },
                { icon: CheckCircle, title: "Custom Trips", desc: "Any destination you need to reach" },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="bg-white hover:shadow-md transition-all duration-300 border border-gray-200"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="font-bold text-black mb-2">{service.title}</h4>
                    <p className="text-gray-600 text-sm">{service.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-yellow-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready for Accessible Transportation?</h2>
          <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
            Get in touch to discuss your specific requirements. We're here to provide safe, comfortable, and reliable
            wheelchair-accessible transport.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg font-semibold"
            >
              Discuss Your Requirements
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
