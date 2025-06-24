"use client"

import {
  Menu,
  Phone,
  X,
  ChevronDown,
  Car,
  Users,
  Plane,
  Calendar,
  ShipWheelIcon as Wheelchair,
  Package,
  MapPin,
  Baby,
  Waves,
  ArrowRight,
  Star,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Booking", href: "/booking" },
  { name: "Contact", href: "/contact" },
]

const serviceItems = [
  { name: "Corporate Transfer", href: "/services/corporate", icon: Users, description: "Professional business travel" },
  { name: "Perth Taxi Van", href: "/services/van", icon: Car, description: "Spacious group transportation" },
  { name: "FIFO Transfer", href: "/services/fifo", icon: Plane, description: "Fly-in fly-out services" },
  { name: "Social Event", href: "/services/social", icon: Calendar, description: "Party and event transport" },
  { name: "Special Occasion", href: "/services/special", icon: Calendar, description: "Weddings and celebrations" },
  {
    name: "Wheelchair Transfers",
    href: "/services/wheelchair",
    icon: Wheelchair,
    description: "Accessible transportation",
  },
  { name: "Parcel Delivery", href: "/services/delivery", icon: Package, description: "Package and courier service" },
  { name: "Tours/Day Trips", href: "/services/tours", icon: MapPin, description: "Sightseeing and excursions" },
  { name: "Baby Capsules", href: "/services/baby", icon: Baby, description: "Child-safe transportation" },
  {
    name: "Surfboard Fish Rod Transfer",
    href: "/services/surfboard",
    icon: Waves,
    description: "Sports equipment transport",
  },
  {
    name: "Airport Transfers Perth",
    href: "/services/airport",
    icon: Plane,
    description: "Airport pickup and drop-off",
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      <div className="hidden lg:block bg-gray-900 text-white py-2">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-8">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-yellow-400" />
                +61 2 1234 5678
              </span>
              <span className="text-gray-300">Available 24/7 Australia Wide</span>
            </div>
            <span className="text-yellow-400 font-medium">Premium Cab Service</span>
          </div>
        </div>
      </div>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xs bg-gradient-to-br from-yellow-400 to-yellow-500 text-black shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <span className="text-lg font-bold">RG</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Cab</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button className="relative flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 group">
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-300"></div>
                      </button>

                      <div
                        className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-200 ${
                          servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
                        }`}
                      >
                        <div className="p-4">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Our Services
                          </div>
                          <div className="space-y-1">
                            {serviceItems.map((service) => {
                              const IconComponent = service.icon
                              return (
                                <Link
                                  key={service.name}
                                  href={service.href}
                                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                                >
                                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-100 transition-colors duration-200">
                                    <IconComponent className="h-4 w-4 text-gray-600 group-hover:text-yellow-600" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                                    <div className="text-xs text-gray-500">{service.description}</div>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
                    >
                      {item.name}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">24/7 Available</span>
              </div>
              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200">
                Book Now
              </Button>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-all duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`relative h-full w-full bg-white transition-all duration-500 ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-black shadow-lg">
                <span className="text-lg font-bold">RG</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">RG Cab</span>
                <div className="text-xs text-gray-500 font-medium">PREMIUM RIDES</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Main Navigation */}
            <div className="p-6">
              <div className="space-y-1">
                {navigationItems.map((item, index) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className={`w-full flex items-center justify-between p-4 text-left rounded-2xl hover:bg-gray-50 transition-all duration-300 group ${
                            isOpen ? "animate-in slide-in-from-bottom" : ""
                          }`}
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animationFillMode: "both",
                          }}
                        >
                          <div>
                            <div className="text-2xl font-semibold text-gray-900 group-hover:text-black">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">Premium ride options</div>
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            mobileServicesOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="ml-4 mt-2 space-y-1">
                            {serviceItems.map((service, serviceIndex) => {
                              const IconComponent = service.icon
                              return (
                                <Link
                                  key={service.name}
                                  href={service.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group ${
                                    mobileServicesOpen ? "animate-in slide-in-from-left" : ""
                                  }`}
                                  style={{
                                    animationDelay: `${serviceIndex * 50}ms`,
                                    animationFillMode: "both",
                                  }}
                                >
                                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-yellow-100 transition-colors duration-200">
                                    <IconComponent className="h-5 w-5 text-gray-600 group-hover:text-yellow-600" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-base font-medium text-gray-900">{service.name}</div>
                                    <div className="text-sm text-gray-500">{service.description}</div>
                                  </div>
                                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all duration-200" />
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 group ${
                          isOpen ? "animate-in slide-in-from-bottom" : ""
                        }`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animationFillMode: "both",
                        }}
                      >
                        <div>
                          <div className="text-2xl font-semibold text-gray-900 group-hover:text-black">{item.name}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {item.name === "Home" && "Welcome to RG Cab"}
                            {item.name === "About" && "Our story & mission"}
                            {item.name === "Booking" && "Reserve your ride"}
                            {item.name === "Contact" && "Get in touch"}
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-2 transition-all duration-300" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Quick Actions</div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center p-4 bg-yellow-50 rounded-2xl hover:bg-yellow-100 transition-colors duration-200 group"
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                    <Car className="h-6 w-6 text-black" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Book Now</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors duration-200 group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Call Now</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">24/7 Hotline</div>
                  <div className="text-sm text-gray-600">+61 2 1234 5678</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-600 fill-current" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Customer Rating</div>
                  <div className="text-sm text-gray-600">4.9/5 ⭐⭐⭐⭐⭐</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Response Time</div>
                  <div className="text-sm text-gray-600">Under 5 minutes</div>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Book Your Premium Ride
            </Button>

            <div className="text-center mt-4">
              <div className="text-sm text-gray-600">Trusted by 50,000+ customers</div>
              <div className="text-xs text-gray-500 mt-1">Available in 50+ cities across Australia</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
