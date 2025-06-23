"use client"

import { Menu, Phone, MapPin, Clock, X, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"

const navigationItems = [
  { name: "Home", href: "/", description: "Welcome to RG Cab" },
  { name: "About", href: "/about", description: "Our story & mission" },
  { name: "Services", href: "/services", description: "Premium ride options" },
  { name: "Booking", href: "/booking", description: "Reserve your ride" },
  { name: "Contact", href: "/contact", description: "Get in touch" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
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
      <div className="hidden lg:block bg-black text-yellow-400 py-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Available 24/7 in Your City</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Quick Response Time</span>
              </div>
            </div>
            <div className="text-yellow-400 font-medium">Premium Cab Service</div>
          </div>
        </div>
      </div>

      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-white border-b border-gray-100"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-black to-gray-800 text-yellow-400 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <span className="text-xl font-bold">RG</span>
                  </div>
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-black group-hover:text-gray-800 transition-colors">
                    RG Cab
                  </span>
                  <span className="text-xs text-gray-500 font-medium tracking-wide">PREMIUM RIDES</span>
                </div>
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center space-x-1">
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative group px-4 py-2 text-sm font-semibold text-gray-700 hover:text-black transition-all duration-300"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 rounded-lg bg-yellow-400/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg">
                <Phone className="h-4 w-4 text-green-500" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Call Now</span>
                  <span className="text-sm font-semibold text-black">24/7 Available</span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-black to-gray-800 text-yellow-400 hover:from-gray-800 hover:to-black hover:text-yellow-300 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Book Now
              </Button>
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-black to-gray-800 text-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${isOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black transition-all duration-500 ${isOpen ? "scale-100" : "scale-110"
            }`}
        >
          <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-400/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-10 w-24 h-24 bg-yellow-400/5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-yellow-400/5 rounded-full animate-ping"></div>
        </div>

        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-black shadow-lg">
                  <span className="text-xl font-bold">RG</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">RG Cab</span>
                <span className="text-xs text-yellow-400 font-medium tracking-wide">PREMIUM RIDES</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="h-12 w-12 rounded-xl bg-gray-800 text-yellow-400 hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 px-6 py-8">
            <div className="space-y-2">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group block p-4 rounded-2xl hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105 ${isOpen ? "animate-in slide-in-from-left" : ""
                    }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-3 w-3 bg-yellow-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <div>
                        <div className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-yellow-400 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-6 space-y-6 border-t border-gray-700">
            {/* Contact Info */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-xl">
                <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">24/7 Hotline</div>
                  <div className="text-lg font-semibold text-white">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-xl">
                <div className="h-10 w-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Customer Rating</div>
                  <div className="text-lg font-semibold text-white">4.9/5 ⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              Book Your Premium Ride
            </Button>

            <div className="text-center">
              <div className="text-sm text-gray-400">Trusted by 10,000+ customers</div>
              <div className="text-xs text-gray-500 mt-1">Available in 50+ cities</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
