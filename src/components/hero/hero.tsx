"use client"
import { Car, Phone, Star, MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const cities = [
  { name: "Sydney", subtitle: "Harbour City", color: "from-blue-500 to-cyan-500" },
  { name: "Melbourne", subtitle: "Cultural Capital", color: "from-purple-500 to-pink-500" },
  { name: "Brisbane", subtitle: "River City", color: "from-green-500 to-emerald-500" },
  { name: "Perth", subtitle: "Western Gateway", color: "from-orange-500 to-red-500" },
  { name: "Adelaide", subtitle: "City of Churches", color: "from-indigo-500 to-purple-500" },
  { name: "Gold Coast", subtitle: "Surfers Paradise", color: "from-yellow-500 to-orange-500" },
  { name: "Canberra", subtitle: "Capital Territory", color: "from-teal-500 to-blue-500" },
]

export default function Hero() {
  const [currentCity, setCurrentCity] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentCity((prev) => (prev + 1) % cities.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-[#f8f9fa] via-[#f3f3f3] to-[#e9ecef] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Available Now</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                BOOK A TAXI IN
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  AUSTRALIA
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-700 font-medium">RELIABLE PREMIUM TRANSPORT</p>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Professional drivers, luxury vehicles, and 24/7 availability across all major Australian cities. Your
                trusted partner for safe and comfortable travel.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Car className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Book Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Phone className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Call Now
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Customer Rating</div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Cities</div>
              </div>
            </div>
          </div>

          {/* Right Content - Animated City Showcase */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Main animated city card */}
              <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cities[currentCity].color} opacity-5 transition-all duration-700`}
                ></div>

                <div className="relative z-10 space-y-8">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Available in</div>
                    <div
                      className={`text-4xl font-bold transition-all duration-500 ${isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"}`}
                    >
                      <span className={`bg-gradient-to-r ${cities[currentCity].color} bg-clip-text text-transparent`}>
                        {cities[currentCity].name}
                      </span>
                    </div>
                    <div
                      className={`text-lg text-gray-600 transition-all duration-500 delay-100 ${isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"}`}
                    >
                      {cities[currentCity].subtitle}
                    </div>
                  </div>

                  {/* City grid preview */}
                  <div className="grid grid-cols-3 gap-3">
                    {cities.slice(0, 6).map((city, index) => (
                      <div
                        key={city.name}
                        className={`relative p-3 rounded-xl transition-all duration-500 cursor-pointer ${
                          index === currentCity
                            ? "bg-white shadow-lg scale-105 border-2 border-yellow-400"
                            : "bg-gray-50 hover:bg-gray-100 hover:scale-102"
                        }`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <div className={`w-3 h-3 rounded-full mb-2 bg-gradient-to-r ${city.color}`}></div>
                        <div className="text-xs font-semibold text-gray-900 truncate">{city.name}</div>
                        <div className="text-xs text-gray-500 truncate">{city.subtitle}</div>
                      </div>
                    ))}
                  </div>

                  {/* Service info */}
                  <div className="bg-gray-50/80 backdrop-blur-sm p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-yellow-500" />
                        <span className="font-semibold text-gray-900">Premium Service</span>
                      </div>
                      <div className="text-sm text-green-600 font-medium">Available 24/7</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Professional drivers • Luxury vehicles • Instant booking
                    </div>
                  </div>

                  {/* Progress indicators */}
                  <div className="flex justify-center gap-2">
                    {cities.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentCity ? "bg-yellow-400 w-6" : "bg-gray-300"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="h-3 w-3 text-black" />
                </div>
              </div>

              {/* Additional floating elements */}
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>

              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
