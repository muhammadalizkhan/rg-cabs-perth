"use client"
import { useState } from "react"
import type React from "react"

import { Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const canSubmit = formData.name && formData.email && formData.message

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Get in touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Contact information</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">+61 2 1234 5678</p>
                    <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">support@rgcab.com.au</p>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Office</h4>
                    <p className="text-gray-600">123 Collins Street</p>
                    <p className="text-gray-600">Melbourne, VIC 3000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Business hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Weekend: 10:00 AM - 4:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Taxi service available 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="pt-8 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-2xl font-bold text-gray-900">2 min</div>
                  <div className="text-sm text-gray-600">Average response time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Customer support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                >
                  <option value="">Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 resize-none text-gray-900 placeholder-gray-500 bg-white"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={!canSubmit || isSubmitted}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
                  isSubmitted
                    ? "bg-green-500 hover:bg-green-500 text-white"
                    : "bg-black hover:bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Message sent
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send message
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-500 text-center">
                We'll get back to you within 2 hours during business hours.
              </p>
            </form>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-20 pt-16 border-t border-gray-100">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-700">Emergency</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Need immediate assistance?</h3>
            <p className="text-gray-600 mb-4">For urgent taxi bookings or emergencies, call us directly</p>
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-medium">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: +61 2 1234 5678
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
