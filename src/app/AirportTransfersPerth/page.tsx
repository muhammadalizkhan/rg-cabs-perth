"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Car,
  Clock,
  Users,
  MapPin,
  Baby,
  Star,
  Shield,
  Smartphone,
  CreditCard,
  Search,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import Customservice from "@/components/customservice/customservice"

const pricingData = [
  { suburb: "Alkimos", distance: "52 km", cost: "$110 - $125", popular: false },
  { suburb: "Armadale", distance: "30 km", cost: "$60", popular: true },
  { suburb: "Bakers Hills", distance: "61 km", cost: "$130", popular: false },
  { suburb: "Baldivis", distance: "55 km", cost: "$115 - $130", popular: true },
  { suburb: "Beechina", distance: "42 km", cost: "$110 - $120", popular: false },
  { suburb: "Bindoon", distance: "72 km", cost: "$150 - $160", popular: false },
  { suburb: "Bullsbrook", distance: "44 km", cost: "$95 - $110", popular: false },
  { suburb: "Bunbury", distance: "176 km", cost: "$390", popular: false },
  { suburb: "Busselton", distance: "229 km", cost: "$450", popular: false },
  { suburb: "Byford", distance: "33 km", cost: "$85 - $95", popular: true },
  { suburb: "Canning Vale", distance: "23 km", cost: "$55 - $65", popular: true },
  { suburb: "Chittering", distance: "56 km", cost: "$120", popular: false },
  { suburb: "Clackline", distance: "69 km", cost: "$155", popular: false },
  { suburb: "Clarkson", distance: "44 km", cost: "$110", popular: false },
  { suburb: "Cockburn Central", distance: "30 km", cost: "$79", popular: true },
  { suburb: "Coogee", distance: "41 km", cost: "$75 - $85", popular: false },
  { suburb: "Cooloongup", distance: "60 km", cost: "$115 - $120", popular: false },
  { suburb: "Cottesloe", distance: "24 km", cost: "$60 - $70", popular: true },
  { suburb: "Dwellingup", distance: "91 km", cost: "$200", popular: false },
  { suburb: "Ellenbrook", distance: "32 km", cost: "$70", popular: true },
  { suburb: "Fremantle", distance: "30 km", cost: "$65 - $75", popular: true },
  { suburb: "Gidgegannup", distance: "32 km", cost: "$80 - $90", popular: false },
  { suburb: "Gingin", distance: "80 km", cost: "$175", popular: false },
  { suburb: "Hillarys", distance: "31 km", cost: "$70 - $80", popular: false },
  { suburb: "Joondalup", distance: "37 km", cost: "$95", popular: true },
  { suburb: "Jurien Bay", distance: "232 km", cost: "$500", popular: false },
  { suburb: "Kwinana", distance: "48 km", cost: "$100", popular: false },
  { suburb: "Lancelin", distance: "134 km", cost: "$320", popular: false },
  { suburb: "Mahogany Creek", distance: "21 km", cost: "$60", popular: false },
  { suburb: "Mandurah", distance: "81 km", cost: "$165 - $180", popular: true },
  { suburb: "Margaret River", distance: "277 km", cost: "$540", popular: false },
  { suburb: "Moora", distance: "163 km", cost: "$350", popular: false },
  { suburb: "Morangup", distance: "52 km", cost: "$120", popular: false },
  { suburb: "Mosman Park", distance: "32 km", cost: "$75", popular: false },
  { suburb: "Muchea", distance: "54 km", cost: "$110 - $125", popular: false },
  { suburb: "Mullaloo", distance: "36 km", cost: "$80 - 90", popular: false },
  { suburb: "Mundaring", distance: "24 km", cost: "$70", popular: false },
  { suburb: "Northam", distance: "85 km", cost: "$180", popular: false },
  { suburb: "Pinjar", distance: "49 km", cost: "$90 - $100", popular: false },
  { suburb: "Pinjarra", distance: "91 km", cost: "$190", popular: false },
  { suburb: "Quinns Rocks", distance: "49 km", cost: "$110", popular: false },
  { suburb: "Ridgewood", distance: "48 km", cost: "$115 - $130", popular: false },
  { suburb: "Rockingham", distance: "56 km", cost: "$115 - $125", popular: true },
  { suburb: "Roleystone", distance: "23 km", cost: "$75 - $80", popular: false },
  { suburb: "Scarborough", distance: "30 km", cost: "$75", popular: true },
  { suburb: "Serpentine", distance: "57 km", cost: "$130", popular: false },
  { suburb: "Stoneville", distance: "26 km", cost: "$65 - $70", popular: false },
  { suburb: "Toodyay", distance: "76 km", cost: "$175", popular: false },
  { suburb: "Two Rocks", distance: "84 km", cost: "$180", popular: false },
  { suburb: "Waikiki", distance: "63 km", cost: "$125 - $130", popular: false },
  { suburb: "Warnbro", distance: "62 km", cost: "$130", popular: false },
  { suburb: "Waroona", distance: "118 km", cost: "$250", popular: false },
  { suburb: "Wooroloo", distance: "46 km", cost: "$100 - $125", popular: false },
  { suburb: "Wundowie", distance: "57 km", cost: "$135 - $140", popular: false },
  { suburb: "Yanchep", distance: "64 km", cost: "$150", popular: false },
  { suburb: "York", distance: "87 km", cost: "$200", popular: false },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Fremantle",
    rating: 5,
    comment: "Absolutely fantastic service! The driver was punctual, professional, and the car was spotless.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Michael Chen",
    location: "Joondalup",
    rating: 5,
    comment: "Best airport transfer service in Perth. Reliable, affordable, and always on time.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emma Wilson",
    location: "Rockingham",
    rating: 5,
    comment: "Professional drivers, clean vehicles, and excellent customer service. Made my trip stress-free.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function PerthAirportTransfers() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()


  const filteredPricing = pricingData.filter((item) => item.suburb.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 bg-black/10 rounded-full text-black text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2" />
              Perth's #1 Rated Airport Transfer Service
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
              Premium Airport Transfers
              <span className="block text-3xl md:text-4xl font-semibold">Perth & Surrounding Areas</span>
            </h1>
            <p className="text-lg text-black/80 mb-6 max-w-2xl mx-auto">
              Professional drivers, luxury vehicles, and unmatched reliability. Available 24/7 with transparent pricing.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <button
                onClick={() => router.push('/BookNow')}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                Book Now
                <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
              </button>
             <Link href="tel:+61812345678" passHref>
      <Button
        size="lg"
        variant="outline"
        className="border-2 border-yellow text-black hover:bg-black hover:text-white px-6 py-3 text-base rounded-lg bg-white"
      >
        Call: (61) 812345678
      </Button>
    </Link>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">50K+</div>
                <div className="text-black/70 text-sm">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">24/7</div>
                <div className="text-black/70 text-sm">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">5★</div>
                <div className="text-black/70 text-sm">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">100%</div>
                <div className="text-black/70 text-sm">On-Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-3">How It Works</h2>
            <p className="text-lg text-gray-700">Book your transfer in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Book Online",
                description: "Enter your details and get instant pricing",
                icon: Smartphone,
              },
              {
                step: "02",
                title: "Enjoy Ride",
                description: "Relax as we take you to your destination",
                icon: MapPin,
              },
              {
                step: "03",
                title: "Pay Your Way",
                description: "We accept all popular payment methods",
                icon: CheckCircle,
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-black" />
                </div>
                <div className="text-sm font-bold text-yellow-600 mb-2">STEP {step.step}</div>
                <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
                <p className="text-gray-700 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-3">Pricing by Suburb</h2>
            <p className="text-lg text-gray-700 mb-6">Transparent pricing with no hidden fees</p>

            <div className="max-w-md mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search your suburb..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-base rounded-lg border-2 border-gray-300 focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          <Card className="bg-white-400 shadow-lg border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-yellow-400">
                  <TableRow className="border-0">
                    <TableHead className="px-4 py-3 text-black font-bold text-base">Suburb</TableHead>
                    <TableHead className="px-4 py-3 text-black font-bold text-base">Distance</TableHead>
                    <TableHead className="px-4 py-3 text-black font-bold text-base">Price Range</TableHead>
                    <TableHead className="px-4 py-3 text-right text-black font-bold text-base">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                  {filteredPricing.map((item, index) => (
                    <TableRow key={index} className="hover:bg-yellow-50 transition-colors border-b border-gray-100">
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-black">{item.suburb}</span>
                          {item.popular && (
                            <Badge className="bg-yellow-400 text-black text-xs font-semibold">Popular</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-700 font-medium">{item.distance}</TableCell>
                      <TableCell className="px-4 py-3">
                        <span className="text-lg text-black">{item.cost}</span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right">
                        <Button
                          className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg px-4 py-2 font-semibold transition-all hover:shadow-md"
                          size="sm"
                        >
                          Book Now
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <Customservice />
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-3">Why Choose Perth Transfers?</h2>
            <p className="text-lg text-gray-700">Professional service you can trust</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "24/7 Availability",
                description:
                  "Round-the-clock service for all your travel needs, including early morning and late-night flights.",
              },
              {
                icon: Shield,
                title: "Licensed & Insured",
                description: "All drivers are professionally licensed with comprehensive insurance coverage.",
              },
              {
                icon: Smartphone,
                title: "Easy Booking",
                description: "Book instantly online with real-time tracking and instant confirmations.",
              },
              {
                icon: Users,
                title: "1-12 Passengers",
                description: "From solo travelers to large groups, we have the perfect vehicle for you.",
              },
              {
                icon: CreditCard,
                title: "Fixed Pricing",
                description: "No hidden fees, no surge pricing. Transparent rates with multiple payment options.",
              },
              {
                icon: Baby,
                title: "Family Friendly",
                description: "Child seats available upon request. We cater to families with special care.",
              },
            ].map((feature, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-3">Customer Reviews</h2>
            <p className="text-lg text-gray-700">What our customers say about us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed italic">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-yellow-400 text-black text-sm font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-black text-sm">{testimonial.name}</div>
                      <div className="text-gray-600 text-xs">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-yellow-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Ready to Book Your Transfer?</h2>
          <p className="text-lg text-black/80 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for reliable airport transfers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
                onClick={() => router.push('/BookNow')}
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-6 py-3 text-base rounded-lg font-semibold"
            >
              Book Transfer Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Link href="tel:+61812345678" passHref>
      <Button
        size="lg"
        variant="outline"
        className="border-2 border-black text-black hover:bg-black hover:text-white px-6 py-3 text-base rounded-lg bg-transparent"
      >
        Call: (61) 812345678
      </Button>
    </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
