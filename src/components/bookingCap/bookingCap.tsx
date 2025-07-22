"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, Clock, Users, Car, Phone, Mail, User, MessageSquare, Send, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationInput } from "@/components/locationInput/locationInput"
import { StopsManager } from "@/components/stopsManager/stopsManager"
import { RouteMap } from "@/components/routeMap/routeMap"
import type { LocationDetails, Stop, RouteInfo } from "@/types/location"

export default function BookingCap() {
  // Location states
  const [pickup, setPickup] = useState<LocationDetails | null>(null)
  const [destination, setDestination] = useState<LocationDetails | null>(null)
  const [stops, setStops] = useState<Stop[]>([])
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null)

  // Booking details states
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [passengers, setPassengers] = useState("")

  // Customer details states
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  // Check if API key is configured
  const isApiKeyConfigured = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  // Get tomorrow's date as minimum date
  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  // Generate time options
  const generateTimeOptions = () => {
    const times = []
    for (let hour = 6; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        times.push(timeString)
      }
    }
    return times
  }

  // Validate form
  const validateForm = () => {
    if (!pickup || !destination) return "Please select pickup and destination locations"
    if (!date || !time) return "Please select date and time"
    if (!vehicleType || !passengers) return "Please select vehicle type and passenger count"
    if (!firstName || !lastName || !email || !phone) return "Please fill in all customer details"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address"
    if (!/^[+]?[0-9\s\-$$$$]{8,}$/.test(phone)) return "Please enter a valid phone number"

    // Validate stops
    for (const stop of stops) {
      if (!stop.isValid && stop.location === null) {
        return "Please complete all stop locations or remove empty stops"
      }
    }

    return null
  }

  // Submit booking
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setSubmitMessage(validationError)
      return
    }

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const bookingData = {
        pickup: pickup!.address,
        pickupCoordinates: pickup!.coordinates,
        destination: destination!.address,
        destinationCoordinates: destination!.coordinates,
        stops: stops
          .filter((stop) => stop.isValid)
          .map((stop) => ({
            address: stop.location!.address,
            coordinates: stop.location!.coordinates,
          })),
        date,
        time,
        vehicleType,
        passengers: Number.parseInt(passengers),
        firstName,
        lastName,
        email,
        phone,
        specialRequests,
        routeInfo: routeInfo
          ? {
              distance: routeInfo.totalDistanceKm,
              duration: routeInfo.totalDurationMin,
              estimatedFare: routeInfo.estimatedFare,
            }
          : null,
      }

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitMessage("✅ Booking request sent successfully! We will contact you shortly to confirm.")
        // Reset form
        setPickup(null)
        setDestination(null)
        setStops([])
        setDate("")
        setTime("")
        setVehicleType("")
        setPassengers("")
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setSpecialRequests("")
        setRouteInfo(null)
      } else {
        setSubmitMessage(`❌ ${result.error || "Failed to send booking request. Please try again."}`)
      }
    } catch (error) {
      console.error("Booking submission error:", error)
      setSubmitMessage("❌ Failed to send booking request. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isApiKeyConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-2 border-red-300 bg-red-50">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-800 mb-4">Configuration Required</h2>
              <p className="text-red-700 mb-4">
                Google Maps API key is not configured. Please add your API key to the environment variables.
              </p>
              <div className="bg-red-100 p-4 rounded-lg text-left">
                <p className="text-sm text-red-800 font-mono">
                  Add to your .env.local file:
                  <br />
                  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Perth Transfer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional transportation services throughout Perth metropolitan area. Book your ride with ease.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location Selection */}
            <Card className="border-2 border-gray-300 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                  <Car className="h-6 w-6 text-teal-500" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <LocationInput
                  label="Pickup Location"
                  type="pickup"
                  value={pickup}
                  onChange={setPickup}
                  placeholder="Enter your pickup address in Perth"
                  showCurrentLocation={true}
                />

                <StopsManager stops={stops} onChange={setStops} disabled={isSubmitting} />

                <LocationInput
                  label="Destination"
                  type="destination"
                  value={destination}
                  onChange={setDestination}
                  placeholder="Enter your destination in Perth"
                  showCurrentLocation={false}
                />
              </CardContent>
            </Card>

            {/* Date, Time, and Vehicle Selection */}
            <Card className="border-2 border-gray-300 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                  <Clock className="h-6 w-6 text-teal-500" />
                  Schedule & Vehicle
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Date
                  </Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={getTomorrowDate()}
                    className="h-14 text-base font-semibold bg-white border-2 border-gray-400"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                    Time
                  </Label>
                  <Select value={time} onValueChange={setTime} required>
                    <SelectTrigger className="h-14 text-base font-semibold bg-white border-2 border-gray-400">
                      <SelectValue placeholder="Select pickup time" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateTimeOptions().map((timeOption) => (
                        <SelectItem key={timeOption} value={timeOption}>
                          {timeOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <Car className="h-5 w-5 text-green-600" />
                    Vehicle Type
                  </Label>
                  <Select value={vehicleType} onValueChange={setVehicleType} required>
                    <SelectTrigger className="h-14 text-base font-semibold bg-white border-2 border-gray-400">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan (1-4 passengers)</SelectItem>
                      <SelectItem value="suv">SUV (1-6 passengers)</SelectItem>
                      <SelectItem value="van">Van (1-8 passengers)</SelectItem>
                      <SelectItem value="luxury">Luxury (1-4 passengers)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <Users className="h-5 w-5 text-orange-600" />
                    Passengers
                  </Label>
                  <Select value={passengers} onValueChange={setPassengers} required>
                    <SelectTrigger className="h-14 text-base font-semibold bg-white border-2 border-gray-400">
                      <SelectValue placeholder="Number of passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 8 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1} passenger{i > 0 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Customer Details */}
            <Card className="border-2 border-gray-300 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                  <User className="h-6 w-6 text-teal-500" />
                  Your Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900">First Name</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="h-14 text-base font-semibold bg-white border-2 border-gray-400"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900">Last Name</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="h-14 text-base font-semibold bg-white border-2 border-gray-400"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-14 text-base font-semibold bg-white border-2 border-gray-400"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    Phone
                  </Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="h-14 text-base font-semibold bg-white border-2 border-gray-400"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requests or additional information..."
                    className="min-h-[100px] text-base bg-white border-2 border-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Section */}
            <Card className="border-2 border-gray-300 bg-white shadow-sm">
              <CardContent className="p-6">
                {submitMessage && (
                  <div
                    className={`mb-4 p-4 rounded-lg border-2 ${
                      submitMessage.includes("✅")
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !pickup || !destination}
                  className="w-full h-16 text-lg font-bold bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send className="h-6 w-6 mr-3" />
                      Book Your Transfer
                    </>
                  )}
                </Button>

                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>
                    Need immediate assistance? Call us at <strong>+61 435 287 287</strong>
                  </p>
                  <p>Available 24/7 for all your transportation needs</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Route Map */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <RouteMap
                pickup={pickup}
                destination={destination}
                stops={stops}
                vehicleType={vehicleType}
                onRouteCalculated={setRouteInfo}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
