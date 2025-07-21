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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setIsSubmitting(true)

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        console.error("Server error:", data.error)
        alert(data.error || "Failed to send message. Please try again or call us directly at (08) 1234 5678.")
      }
    } catch (error) {
      console.error("Network error:", error)
      alert(
        "Network error occurred. Please check your connection and try again, or call us directly at (08) 1234 5678.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = formData.name && formData.email && formData.message

  return (
    <section className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Phone</h4>
                    <p className="text-gray-700">(61) 4352 8728 7</p>
                    <p className="text-sm text-gray-600 mt-1">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Email</h4>
                    <p className="text-gray-700">rgcabsperth@gmail.com</p>
                    <p className="text-sm text-gray-600 mt-1">We'll respond within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Service Area</h4>
                    <p className="text-gray-700">Perth & Surrounding Areas</p>
                    <p className="text-gray-700">Rockingham, Baldivis, Fremantle</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Operating Hours</h4>
                    <p className="text-gray-700">24/7 Service Available</p>
                    <p className="text-sm text-gray-600 mt-1">Always ready to serve you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-6">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-all duration-200 text-black placeholder-gray-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-all duration-200 text-black placeholder-gray-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-all duration-200 text-black placeholder-gray-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-all duration-200 text-black bg-white"
                >
                  <option value="">Select a service</option>
                  <option value="airport-transfer">Custom Service</option>
                  <option value="airport-transfer">Airport Transfer</option>
                  <option value="corporate">Corporate Transfer</option>
                  <option value="taxi-van">Perth Taxi Van</option>
                  <option value="social-event">Social Event</option>
                  <option value="wheelchair">Wheelchair Transfer</option>
                  <option value="fifo">FIFO Transfer</option>
                  <option value="tours">Tours & Day Trips</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us about your transportation needs..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-all duration-200 resize-none text-black placeholder-gray-500 bg-white"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={!canSubmit || isSubmitted || isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  isSubmitted
                    ? "bg-green-500 hover:bg-green-500 text-white"
                    : "bg-yellow-400 hover:bg-yellow-500 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Message Sent Successfully
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-600 text-center mt-4">
                We'll get back to you within 2 hours during business hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}