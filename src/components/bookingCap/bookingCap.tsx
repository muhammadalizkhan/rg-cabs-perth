"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, Users, Car, Phone, Mail, User, MessageSquare, Send, MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationInput } from "@/components/locationInput/locationInput"
import { RouteMap } from "@/components/routeMap/routeMap"
import type { LocationData, Stop, RouteData } from "@/types/location"

export default function BookingCap() {
  const [pickup, setPickup] = useState<LocationData | null>(null)
  const [destination, setDestination] = useState<LocationData | null>(null)
  const [stops, setStops] = useState<Stop[]>([])
  const [routeData, setRouteData] = useState<RouteData | null>(null)

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [passengers, setPassengers] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-red-300 bg-red-50">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-red-800 mb-4">Setup Required</h2>
              <p className="text-red-700 mb-4">Google Maps API key is missing.</p>
              <div className="bg-red-100 p-4 rounded text-left">
                <p className="text-sm font-mono text-red-800">
                  Add to .env.local:
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

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!pickup || !destination) {
      setMessage("Please select pickup and destination locations")
      return
    }

    if (!date || !time || !vehicleType || !passengers) {
      setMessage("Please fill in all trip details")
      return
    }

    if (!firstName || !lastName || !email || !phone) {
      setMessage("Please fill in all personal details")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      const bookingData = {
        pickup: pickup.address,
        pickupCoordinates: { lat: pickup.lat, lng: pickup.lng },
        destination: destination.address,
        destinationCoordinates: { lat: destination.lat, lng: destination.lng },
        stops: stops
          .filter((s) => s.location)
          .map((s) => ({
            address: s.location!.address,
            coordinates: { lat: s.location!.lat, lng: s.location!.lng },
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
        routeInfo: routeData,
      }

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage("✅ Booking request sent successfully! We'll contact you shortly.")
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
      } else {
        setMessage(`❌ ${result.error || "Failed to send booking request"}`)
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Perth Transfer</h1>
          <p className="text-lg text-gray-600">Professional transportation services in Perth</p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-6 w-6 text-teal-500" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <LocationInput
                  label="Pickup Location"
                  value={pickup}
                  onChange={setPickup}
                  placeholder="Enter pickup address in Perth"
                  showCurrentLocation={true}
                  icon={<MapPin className="h-5 w-5 text-green-600" />}
                />



                <LocationInput
                  label="Destination"
                  value={destination}
                  onChange={setDestination}
                  placeholder="Enter destination in Perth"
                  icon={<Navigation className="h-5 w-5 text-red-600" />}
                />
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-teal-500" />
                  Schedule & Vehicle
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-lg font-bold flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Date
                  </Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={getTomorrowDate()}
                    className="h-14 text-base font-semibold"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                    Time
                  </Label>
                  <Select value={time} onValueChange={setTime} required>
                    <SelectTrigger className="h-14 text-base font-semibold">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateTimeOptions().map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold flex items-center gap-3">
                    <Car className="h-5 w-5 text-green-600" />
                    Vehicle
                  </Label>
                  <Select value={vehicleType} onValueChange={setVehicleType} required>
                    <SelectTrigger className="h-14 text-base font-semibold">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan (1-4 passengers)</SelectItem>
                      <SelectItem value="suv">SUV (1-6 passengers)</SelectItem>
                      <SelectItem value="van">Van (1-8 passengers)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold flex items-center gap-3">
                    <Users className="h-5 w-5 text-orange-600" />
                    Passengers
                  </Label>
                  <Select value={passengers} onValueChange={setPassengers} required>
                    <SelectTrigger className="h-14 text-base font-semibold">
                      <SelectValue placeholder="Number of passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n} passenger{n > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Personal Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-6 w-6 text-teal-500" />
                  Your Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-lg font-bold">First Name</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="h-14 text-base font-semibold"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold">Last Name</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="h-14 text-base font-semibold"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="h-14 text-base font-semibold"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-bold flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    Phone
                  </Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="h-14 text-base font-semibold"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <Label className="text-lg font-bold flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requests..."
                    className="min-h-[100px] text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Card>
              <CardContent className="p-6">
                {message && (
                  <div
                    className={`mb-4 p-4 rounded-lg ${
                      message.includes("✅")
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !pickup || !destination}
                  className="w-full h-16 text-lg font-bold bg-teal-600 hover:bg-teal-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-6 w-6 mr-3" />
                      Book Transfer
                    </>
                  )}
                </Button>

                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>
                    Need help? Call <strong>+61 435 287 287</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <RouteMap pickup={pickup} destination={destination} stops={stops} onRouteChange={setRouteData} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
