"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Baby,
  Shield,
  CheckCircle,
  Calendar,
  Phone,
  Heart,
  Users,
  Car,
  ArrowRight,
  AlertTriangle,
  Star,
  Clock,
} from "lucide-react"

export default function BabyCapsulesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-black/10 rounded-full text-black text-sm font-medium mb-6">
              <Baby className="w-4 h-4 mr-2" />
              Child Safety Specialists
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Baby Capsules
              <span className="block text-3xl md:text-4xl font-semibold">Safe Travel for Little Ones</span>
            </h1>
            <p className="text-xl text-black/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Perth Taxi Services provides you with baby capsules and child restraints that fully comply with Australian
              safety standards. Kindly share your requirements and arrange for the correct capsule/car seat for your
              child.
            </p>
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
            >
              Request Baby Capsule
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Australian Safety Standards Compliance</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              All our baby capsules and child restraints fully comply with Australian safety standards, ensuring your
              child's safety and your peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Safety Certified</h3>
                <p className="text-gray-700">
                  All baby capsules and child restraints fully comply with Australian safety standards for maximum
                  protection.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Advance Booking Required</h3>
                <p className="text-gray-700">
                  Baby capsules should be requested at the time of booking to ensure availability and proper
                  installation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Age-Appropriate Options</h3>
                <p className="text-gray-700">
                  We provide the correct capsule or car seat based on your child's age, weight, and specific
                  requirements.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-16">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-black mb-2">Important Booking Notice</h3>
                <p className="text-gray-700">
                  Baby capsules must be requested at the time of booking to ensure we have the appropriate safety
                  equipment ready for your journey. Please share your child's age, weight, and any specific requirements
                  when making your reservation.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Child Restraint Options</h3>
              <p className="text-lg text-gray-700">
                We provide age-appropriate safety equipment for children of all ages and sizes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Baby, title: "Baby Capsules", desc: "0-6 months, rear-facing infant capsules" },
                { icon: Car, title: "Convertible Seats", desc: "6 months-4 years, rear and forward facing" },
                { icon: Users, title: "Booster Seats", desc: "4-7 years, booster seats with seatbelt" },
                { icon: CheckCircle, title: "Custom Requirements", desc: "Special needs and specific requests" },
              ].map((restraint, index) => (
                <Card
                  key={index}
                  className="bg-white hover:shadow-md transition-all duration-300 border border-gray-200"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                      <restraint.icon className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="font-bold text-black mb-2">{restraint.title}</h4>
                    <p className="text-gray-600 text-sm">{restraint.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Travel Safely with Your Child?</h2>
          <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
            Share your requirements and let us arrange the correct baby capsule or child restraint for your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg font-semibold"
            >
              Share Your Requirements
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
