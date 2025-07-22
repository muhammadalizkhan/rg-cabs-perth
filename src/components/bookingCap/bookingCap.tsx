"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, Clock, Users, Phone, Mail, User, MessageSquare, Send, RotateCcw, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TripSection } from "@/components/bookingTrip/bookingTrip"
import { RouteMap } from "@/components/routeMap/routeMap"
import type { ReturnTripData, TripData, RouteData, VehicleType } from "@/types/location"
import { SimpleSwitch } from "../ui/simple-switch"
import { ReturnTripSection } from "@/components/returnTrip/returnTrip"
import { VehicleTypeCard } from "@/components/cardType/cardType"


export default function BookingCap() {
  const [outboundTrip, setOutboundTrip] = useState<TripData>({
    pickup: null,
    destination: null,
    stops: [],
  })

  const [hasReturnTrip, setHasReturnTrip] = useState(false)
  const [returnTrip, setReturnTrip] = useState<ReturnTripData>({
    pickup: null,
    destination: null,
    stops: [],
    date: "",
    time: "",
  })

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null)
  const [routeData, setRouteData] = useState<RouteData | null>(null)

  // Form states
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [passengers, setPassengers] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  // Check API key
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-2 border-red-300 bg-red-50">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-black mb-4">Setup Required</h2>
              <p className="text-black mb-4">Google Maps API key is missing.</p>
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <p className="text-sm font-mono text-black">
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

  const handleReturnTripToggle = (checked: boolean) => {
    setHasReturnTrip(checked)

    if (checked) {
      // Auto-populate return trip with reversed locations if outbound trip is complete
      if (outboundTrip.pickup && outboundTrip.destination) {
        setReturnTrip({
          pickup: outboundTrip.destination,
          destination: outboundTrip.pickup,
          stops: [],
          date: "",
          time: "",
        })
      } else {
        setReturnTrip({
          pickup: null,
          destination: null,
          stops: [],
          date: "",
          time: "",
        })
      }
    } else {
      // Clear return trip data
      setReturnTrip({
        pickup: null,
        destination: null,
        stops: [],
        date: "",
        time: "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!outboundTrip.pickup || !outboundTrip.destination) {
      setMessage("Please select pickup and destination locations")
      return
    }

    if (!selectedVehicle) {
      setMessage("Please select a vehicle type")
      return
    }

    if (hasReturnTrip && (!returnTrip.pickup || !returnTrip.destination || !returnTrip.date || !returnTrip.time)) {
      setMessage("Please complete all return trip details")
      return
    }

    if (!date || !time || !passengers) {
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
        outboundTrip: {
          pickup: outboundTrip.pickup.address,
          pickupCoordinates: { lat: outboundTrip.pickup.lat, lng: outboundTrip.pickup.lng },
          destination: outboundTrip.destination.address,
          destinationCoordinates: { lat: outboundTrip.destination.lat, lng: outboundTrip.destination.lng },
          stops: outboundTrip.stops
            .filter((s) => s.location)
            .map((s) => ({
              address: s.location!.address,
              coordinates: { lat: s.location!.lat, lng: s.location!.lng },
            })),
        },
        returnTrip: hasReturnTrip
          ? {
              pickup: returnTrip.pickup?.address || null,
              pickupCoordinates: returnTrip.pickup ? { lat: returnTrip.pickup.lat, lng: returnTrip.pickup.lng } : null,
              destination: returnTrip.destination?.address || null,
              destinationCoordinates: returnTrip.destination
                ? { lat: returnTrip.destination.lat, lng: returnTrip.destination.lng }
                : null,
              stops: returnTrip.stops
                .filter((s) => s.location)
                .map((s) => ({
                  address: s.location!.address,
                  coordinates: { lat: s.location!.lat, lng: s.location!.lng },
                })),
              date: returnTrip.date,
              time: returnTrip.time,
            }
          : null,
        hasReturnTrip,
        vehicleType: selectedVehicle,
        date,
        time,
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
        setOutboundTrip({ pickup: null, destination: null, stops: [] })
        setReturnTrip({ pickup: null, destination: null, stops: [], date: "", time: "" })
        setHasReturnTrip(false)
        setSelectedVehicle(null)
        setDate("")
        setTime("")
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
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Book Your Perth Transfer</h1>
          <p className="text-lg text-gray-600 font-medium">Professional transportation services in Perth</p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Outbound Trip */}
            <TripSection
              title="Outbound Trip"
              tripData={outboundTrip}
              onChange={setOutboundTrip}
              showCurrentLocation={true}
            />

            <VehicleTypeCard selectedVehicle={selectedVehicle} onChange={setSelectedVehicle} />

            {/* Return Trip Toggle */}
            <Card className="border-2 border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-black" />
                    <div>
                      <Label className="text-base font-semibold text-black cursor-pointer">Return Trip</Label>
                      <p className="text-sm text-gray-600">Add a return journey</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{hasReturnTrip ? "Yes" : "No"}</span>
                    

<SimpleSwitch
  checked={hasReturnTrip}
  onCheckedChange={(checked) => handleReturnTripToggle(checked)}
/>
                  </div>
                </div>
              </CardContent>
            </Card>

            {hasReturnTrip && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <ReturnTripSection
                  returnTripData={returnTrip}
                  onChange={setReturnTrip}
                  outboundTrip={outboundTrip}
                  minDate={date || getTomorrowDate()}
                />
              </div>
            )}

            {/* Outbound Date & Time */}
            <Card className="border-2 border-gray-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-black flex items-center gap-2">
                  <Clock className="h-5 w-5 text-black" />
                  Outbound Schedule & Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-black flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-black" />
                    Date
                  </Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={getTomorrowDate()}
                    className="h-12 text-sm font-medium bg-white border-2 border-gray-300 text-black hover:border-gray-400 focus:border-black transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold text-black flex items-center gap-2">
                    <Clock className="h-4 w-4 text-black" />
                    Time
                  </Label>
                  <Select value={time} onValueChange={setTime} required>
                    <SelectTrigger className="h-12 text-sm font-medium bg-white border-2 border-gray-300 text-black hover:border-gray-400 focus:border-black transition-all duration-200">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200">
                      {generateTimeOptions().map((t) => (
                        <SelectItem key={t} value={t} className="text-black hover:bg-gray-50 focus:bg-gray-50">
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold text-black flex items-center gap-2">
                    <Users className="h-4 w-4 text-black" />
                    Passengers
                  </Label>
                  <Select value={passengers} onValueChange={setPassengers} required>
                    <SelectTrigger className="h-12 text-sm font-medium bg-white border-2 border-gray-300 text-black hover:border-gray-400 focus:border-black transition-all duration-200">
                      <SelectValue placeholder="Number of passengers" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <SelectItem
                          key={n}
                          value={n.toString()}
                          className="text-black hover:bg-gray-50 focus:bg-gray-50"
                        >
                          {n} passenger{n > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Personal Details */}
            <Card className="border-2 border-gray-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-black flex items-center gap-2">
                  <User className="h-5 w-5 text-black" />
                  Your Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-black">First Name</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="h-12 text-sm font-medium bg-white border-2 border-gray-300 text-black hover:border-gray-400 focus:border-black transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold text-black">Last Name</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="h-12 text-sm font-medium bg-white border-2 border-gray-300 text-black hover:border-gray-400 focus:border-black transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold text-black flex items-center gap-2">
                    <Mail className="h-4 w-4 text-black" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="h-12 text-sm font-medium bg-white border-2 border-gray-300 text-black hover:border-gray-400 focus:border-black transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold text-black flex items-center gap-2">
                    <Phone className="h-4 w-4 text-black" />
                    Phone
                  </Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="h-12 text-sm font-medium bg-white border-2 border-gray-300 text-black hover:border-gray-400 focus:border-black transition-all duration-200"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <Label className="text-base font-semibold text-black flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-black" />
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requests..."
                    className="min-h-[100px] text-sm bg-white border-2 border-gray-300 text-black hover:border-gray-400 focus:border-black transition-all duration-200"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Card className="border-2 border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6">
                {message && (
                  <div
                    className={`mb-4 p-4 rounded-lg border-2 ${
                      message.includes("✅")
                        ? "bg-green-50 text-green-800 border-green-200"
                        : "bg-red-50 text-red-800 border-red-200"
                    }`}
                  >
                    <p className="font-medium">{message}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !outboundTrip.pickup || !outboundTrip.destination || !selectedVehicle}
                  className="w-full h-14 text-base font-semibold bg-black hover:bg-gray-800 text-white transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-500"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Book {hasReturnTrip ? "Round Trip" : "One Way"} Transfer
                    </>
                  )}
                </Button>

                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>
                    Need help? Call <span className="font-semibold text-black">+61 435 287 287</span>
                  </p>
                  <p>Available 24/7 for all your transportation needs</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Route Map */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <RouteMap
                outboundTrip={outboundTrip}
                returnTrip={
                  hasReturnTrip
                    ? { pickup: returnTrip.pickup, destination: returnTrip.destination, stops: returnTrip.stops }
                    : null
                }
                onRouteChange={setRouteData}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

