"use client"
import React from "react"
import Link from "next/link"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Shield,
  Car,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Smartphone,
  CreditCard,
  Award,
  Globe,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Booking", href: "/booking" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
]

const services = [
  { name: "Airport Transfer", href: "/services/airport" },
  { name: "City Rides", href: "/services/city" },
  { name: "Corporate Travel", href: "/services/corporate" },
  { name: "Wedding Transport", href: "/services/wedding" },
  { name: "Tour Services", href: "/services/tours" },
  { name: "Emergency Rides", href: "/services/emergency" },
]

const cities = [
  { name: "Sydney", href: "/cities/sydney" },
  { name: "Melbourne", href: "/cities/melbourne" },
  { name: "Brisbane", href: "/cities/brisbane" },
  { name: "Perth", href: "/cities/perth" },
  { name: "Adelaide", href: "/cities/adelaide" },
  { name: "Gold Coast", href: "/cities/gold-coast" },
]

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "Refund Policy", href: "/refunds" },
  { name: "Safety Guidelines", href: "/safety" },
  { name: "Driver Terms", href: "/driver-terms" },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/rgcab", color: "hover:text-blue-600" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/rgcab", color: "hover:text-blue-400" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/rgcab", color: "hover:text-pink-600" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/rgcab", color: "hover:text-blue-700" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/rgcab", color: "hover:text-red-600" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Stay updated with RG Cab</h3>
              <p className="text-gray-400 text-lg">
                Get exclusive offers, service updates, and travel tips delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
              />
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-black shadow-lg">
                  <span className="text-xl font-bold">RG</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">RG Cab</span>
                <span className="text-xs text-yellow-400 font-medium tracking-wide">PREMIUM RIDES</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed max-w-md">
              Australia's most trusted premium taxi service with 200+ professional drivers serving 15+ cities
              nationwide. Safe, reliable, and comfortable transportation 24/7.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">50k+</div>
                  <div className="text-sm text-gray-400">Happy Customers</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <div>
                  <div className="text-xl font-bold">4.9/5</div>
                  <div className="text-sm text-gray-400">Customer Rating</div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">+61 2 1234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">support@rgcab.com.au</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">123 Collins Street, Melbourne VIC 3000</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300">Available 24/7</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    {link.name}
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    {service.name}
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Service Areas</h4>
            <ul className="space-y-3">
              {cities.map((city) => (
                <li key={city.name}>
                  <Link
                    href={city.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    {city.name}
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/cities"
                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200 flex items-center group"
              >
                View all cities
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h5 className="font-semibold">Fully Insured</h5>
                <p className="text-sm text-gray-400">Complete coverage</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Car className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h5 className="font-semibold">Premium Fleet</h5>
                <p className="text-sm text-gray-400">Latest vehicles</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h5 className="font-semibold">Easy Booking</h5>
                <p className="text-sm text-gray-400">App & website</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h5 className="font-semibold">Award Winning</h5>
                <p className="text-sm text-gray-400">Best service 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
              <span>© 2024 RG Cab. All rights reserved.</span>
              <div className="flex items-center gap-4">
                {legalLinks.slice(0, 3).map((link, index) => (
                  <React.Fragment key={link.name}>
                    <Link href={link.href} className="hover:text-yellow-400 transition-colors duration-200">
                      {link.name}
                    </Link>
                    {index < 2 && <span className="text-gray-600">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 mr-2">Follow us:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 hover:scale-110`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Additional Legal Links */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              {legalLinks.slice(3).map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link href={link.href} className="hover:text-yellow-400 transition-colors duration-200">
                    {link.name}
                  </Link>
                  {index < legalLinks.slice(3).length - 1 && <span className="text-gray-700">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Licensed Transport Provider</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Australia Wide Service</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">ABN: 12 345 678 901 • Transport License: TL123456</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
