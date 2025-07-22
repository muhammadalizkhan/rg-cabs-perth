"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  Star,
  Shield,
  Phone,
  Mail,
  User,
  Zap,
  LocateFixed,
  Plus,
  X,
  CreditCard,
  Wallet,
  Building,
  Car,
  Users,
  Users2,
  UsersRound,
  Edit3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { GoogleMapsAutocomplete } from "@/components/googleMapsAutocomplete/googleMapsAutocomplete"
import { RouteMap } from "@/components//routeMap/routeMap"

// Passenger options with proper Lucide icons
const passengerOptions = [
  {
    id: "1-2",
    label: "1-2 Passengers",
    value: "1-2",
    icon: User,
    description: "Perfect for individuals or couples",
  },
  {
    id: "1-3",
    label: "1-3 Passengers",
    value: "1-3",
    icon: Users,
    description: "Ideal for small groups",
  },
  {
    id: "1-4",
    label: "1-4 Passengers",
    value: "1-4",
    icon: Users2,
    description: "Great for families",
  },
  {
    id: "1,2,3,4",
    label: "1, 2, 3, 4 Passengers",
    value: "1,2,3,4",
    icon: UsersRound,
    description: "Flexible group size",
  },
  {
    id: "custom",
    label: "Custom",
    value: "custom",
    icon: Edit3,
    description: "Specify your own number",
  },
]

// Payment methods
const paymentMethods = [
  {
    id: "paying-driver",
    name: "Cash to Driver",
    description: "Pay the driver directly in cash",
    icon: User,
    color: "bg-gradient-to-br from-green-500 to-green-600",
  },
  {
    id: "ptts-card",
    name: "PTTS Card",
    description: "Public transport card payment",
    icon: CreditCard,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: "cabcharge",
    name: "Cabcharge",
    description: "Cabcharge account payment",
    icon: Building,
    color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
  },
  {
    id: "credit-card",
    name: "Credit Card",
    description: "Pay with credit/debit card",
    icon: CreditCard,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
  {
    id: "other",
    name: "Other",
    description: "Alternative payment method",
    icon: Wallet,
    color: "bg-gradient-to-br from-gray-500 to-gray-600",
  },
]

interface Stop {
  id: string
  location: string
}

export default function BookingSystem() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    pickup: "",
    destination: "",
    stops: [] as Stop[],
    date: "",
    time: "",
    passengers: "",
    customPassengers: "",
    paymentMethod: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [geolocationError, setGeolocationError] = useState<string | null>(null)

  // Get current date and time
  const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const getCurrentTime = () => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }

  // Initialize with current date/time
  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      date: getCurrentDate(),
      time: getCurrentTime(),
    }))
  }, [])

  const handleStopChange = (stopId: string, value: string) => {
    setBookingData((prev) => ({
      ...prev,
      stops: prev.stops.map((stop) => (stop.id === stopId ? { ...stop, location: value } : stop)),
    }))
  }

  const addStop = () => {
    const newStop: Stop = {
      id: Date.now().toString(),
      location: "",
    }
    setBookingData((prev) => ({
      ...prev,
      stops: [...prev.stops, newStop],
    }))
  }

  const removeStop = (stopId: string) => {
    setBookingData((prev) => ({
      ...prev,
      stops: prev.stops.filter((stop) => stop.id !== stopId),
    }))
  }

  const handleUseCurrentLocation = () => {
    setGeolocationError(null)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          // Use Google Maps Geocoding API to get address from coordinates
          if (window.google && window.google.maps) {
            const geocoder = new window.google.maps.Geocoder() // Updated line
            const latlng = { lat: latitude, lng: longitude }

            geocoder.geocode({ location: latlng }, (results: { formatted_address: any }[], status: string) => {
              if (status === "OK" && results && results[0]) {
                setBookingData((prev) => ({ ...prev, pickup: results[0].formatted_address }))
              } else {
                const locationText = `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
                setBookingData((prev) => ({ ...prev, pickup: locationText }))
              }
            })
          } else {
            const locationText = `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
            setBookingData((prev) => ({ ...prev, pickup: locationText }))
          }
        },
        (error) => {
          let errorMessage = "Unable to retrieve your current location. Please enter it manually."
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Location access denied. Please enable location permissions in your browser."
          }
          setGeolocationError(errorMessage)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      )
    } else {
      setGeolocationError("Geolocation is not supported by your browser.")
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  // Validation for each step
  const canProceedStep1 = bookingData.pickup && bookingData.destination && bookingData.date && bookingData.time
  const canProceedStep2 =
    bookingData.passengers && (bookingData.passengers !== "custom" || bookingData.customPassengers)
  const canProceedStep3 = bookingData.paymentMethod
  const canProceedStep4 = bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone

  const selectedPayment = paymentMethods.find((p) => p.id === bookingData.paymentMethod)

  // Calculate progress
  const progress = (currentStep / 4) * 100

  // Handle booking submission
  const handleSubmitBooking = async () => {
    setIsSubmitting(true)
    setBookingSuccess(false)
    setBookingError(null)

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      const data = await res.json()

      if (res.ok) {
        setBookingSuccess(true)
        setBookingData({
          pickup: "",
          destination: "",
          stops: [],
          date: getCurrentDate(),
          time: getCurrentTime(),
          passengers: "",
          customPassengers: "",
          paymentMethod: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          specialRequests: "",
        })
        setCurrentStep(1)
        setTimeout(() => setBookingSuccess(false), 5000)
      } else {
        setBookingError(data.error || "Failed to confirm booking. Please try again.")
      }
    } catch (error) {
      console.error("Booking submission error:", error)
      setBookingError("Network error occurred. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getMinTime = () => {
    if (bookingData.date === getCurrentDate()) {
      return getCurrentTime()
    }
    return "00:00"
  }

  const stepTitles = ["Trip Details", "Passengers", "Payment", "Contact Info"]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f3f3f3" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full mb-6 shadow-lg">
            <Car className="h-5 w-5 text-white" />
            <span className="text-sm font-semibold text-white">Professional Taxi Service</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Book Your <span className="text-teal-500">Ride</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Professional drivers, premium vehicles, reliable service across Perth
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8 border-2 border-gray-300 shadow-lg bg-white">
          <CardContent className="pt-8 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {currentStep}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Step {currentStep} of 4</p>
                  <p className="text-lg font-bold text-gray-900">{stepTitles[currentStep - 1]}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">{Math.round(progress)}% Complete</p>
              </div>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-2 border-gray-300 bg-white">
              <CardContent className="p-8 lg:p-12">
                {/* Step 1: Trip Details */}
                {currentStep === 1 && (
                  <div className="space-y-10">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Where are you going?</h2>
                      <p className="text-lg text-gray-700 font-medium">Enter your pickup and destination locations</p>
                    </div>

                    <div className="space-y-8">
                      {/* Pickup Location */}
                      <GoogleMapsAutocomplete
                        label="Pickup Location"
                        value={bookingData.pickup}
                        onChange={(value) => setBookingData((prev) => ({ ...prev, pickup: value }))}
                        placeholder="Enter pickup location"
                        icon={<div className="w-3 h-3 bg-teal-500 rounded-full"></div>}
                        types={["establishment", "geocode"]}
                      />

                      <div className="flex justify-center">
                        <Button
                          type="button"
                          onClick={handleUseCurrentLocation}
                          variant="outline"
                          size="lg"
                          className="bg-teal-50 border-2 border-teal-300 text-teal-700 hover:bg-teal-100 hover:border-teal-400 font-semibold px-6 py-3 h-auto shadow-sm"
                        >
                          <LocateFixed className="h-5 w-5 mr-2 text-teal-600" />
                          <span className="text-teal-700 font-semibold">Use Current Location</span>
                        </Button>
                      </div>

                      {geolocationError && (
                        <Alert className="border-2 border-red-300 bg-red-50">
                          <AlertDescription className="text-red-800 font-semibold">{geolocationError}</AlertDescription>
                        </Alert>
                      )}

                      {/* Stops */}
                      {bookingData.stops.map((stop, index) => (
                        <div key={stop.id} className="space-y-3">
                          <div className="flex gap-3">
                            <div className="flex-1">
                              <GoogleMapsAutocomplete
                                label={`Stop ${index + 1}`}
                                value={stop.location}
                                onChange={(value) => handleStopChange(stop.id, value)}
                                placeholder={`Enter stop ${index + 1} location`}
                                icon={<div className="w-3 h-3 bg-orange-500 rounded-full"></div>}
                                types={["establishment", "geocode"]}
                              />
                            </div>
                            <div className="flex items-end">
                              <Button
                                type="button"
                                onClick={() => removeStop(stop.id)}
                                variant="outline"
                                size="icon"
                                className="h-14 w-14 text-red-600 border-2 border-red-300 hover:bg-red-50 hover:border-red-400 bg-white shadow-sm"
                              >
                                <X className="h-5 w-5 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        onClick={addStop}
                        variant="outline"
                        size="lg"
                        className="w-full border-dashed border-2 border-gray-400 hover:border-teal-500 hover:bg-teal-50 text-gray-700 hover:text-teal-700 py-6 bg-white font-semibold shadow-sm"
                      >
                        <Plus className="h-5 w-5 mr-2 text-gray-700" />
                        <span className="text-gray-800 font-semibold">Add Stop</span>
                      </Button>

                      {/* Destination */}
                      <GoogleMapsAutocomplete
                        label="Destination"
                        value={bookingData.destination}
                        onChange={(value) => setBookingData((prev) => ({ ...prev, destination: value }))}
                        placeholder="Enter destination"
                        icon={<div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                        types={["establishment", "geocode"]}
                      />

                      {/* Date and Time */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-blue-500" />
                            Date
                          </Label>
                          <Input
                            type="date"
                            value={bookingData.date}
                            min={getCurrentDate()}
                            onChange={(e) => setBookingData((prev) => ({ ...prev, date: e.target.value }))}
                            className="h-14 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 shadow-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                            <Clock className="h-5 w-5 text-purple-500" />
                            Time
                          </Label>
                          <Input
                            type="time"
                            value={bookingData.time}
                            min={getMinTime()}
                            onChange={(e) => setBookingData((prev) => ({ ...prev, time: e.target.value }))}
                            className="h-14 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-8">
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!canProceedStep1}
                        size="lg"
                        className="bg-black hover:bg-gray-800 text-white px-10 py-4 text-lg font-bold h-auto shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="text-white font-bold">Continue</span>
                        <ArrowRight className="ml-2 h-5 w-5 text-white" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Passenger Selection */}
                {currentStep === 2 && (
                  <div className="space-y-10">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">How many passengers?</h2>
                      <p className="text-lg text-gray-700 font-medium">Select the number of passengers for your trip</p>
                    </div>

                    <div className="space-y-4">
                      {passengerOptions.map((option) => {
                        const IconComponent = option.icon
                        return (
                          <Card
                            key={option.id}
                            className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 bg-white ${
                              bookingData.passengers === option.value
                                ? "border-teal-500 bg-teal-50 shadow-lg"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            onClick={() => setBookingData((prev) => ({ ...prev, passengers: option.value }))}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4">
                                <div
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    bookingData.passengers === option.value
                                      ? "border-teal-500 bg-teal-500"
                                      : "border-gray-400 bg-white"
                                  }`}
                                >
                                  {bookingData.passengers === option.value && <Check className="h-4 w-4 text-white" />}
                                </div>
                                <div className="flex items-center gap-4 flex-1">
                                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <IconComponent className="h-6 w-6 text-gray-700" />
                                  </div>
                                  <div>
                                    <span className="font-bold text-lg text-gray-900">{option.label}</span>
                                    <p className="text-sm text-gray-600 font-medium">{option.description}</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}

                      {bookingData.passengers === "custom" && (
                        <div className="space-y-3 mt-6">
                          <Label className="text-lg font-bold text-gray-900">Custom Number of Passengers</Label>
                          <Input
                            type="number"
                            min="1"
                            max="20"
                            value={bookingData.customPassengers}
                            onChange={(e) => setBookingData((prev) => ({ ...prev, customPassengers: e.target.value }))}
                            placeholder="Enter number of passengers"
                            className="h-14 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 shadow-sm"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between pt-8">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        size="lg"
                        className="px-10 py-4 text-lg font-bold h-auto border-2 border-gray-400 text-gray-800 hover:bg-gray-100 hover:border-gray-500 bg-white transition-all duration-200 shadow-sm"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5 text-gray-800" />
                        <span className="text-gray-800 font-bold">Back</span>
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!canProceedStep2}
                        size="lg"
                        className="bg-black hover:bg-gray-800 text-white px-10 py-4 text-lg font-bold h-auto shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="text-white font-bold">Continue</span>
                        <ArrowRight className="ml-2 h-5 w-5 text-white" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Method */}
                {currentStep === 3 && (
                  <div className="space-y-10">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Method</h2>
                      <p className="text-lg text-gray-700 font-medium">Choose how you'd like to pay for your ride</p>
                      <Badge className="mt-3 px-4 py-2 text-sm bg-gray-200 text-gray-800 border-2 border-gray-300 font-semibold">
                        Payment is processed after your ride
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {paymentMethods.map((method) => {
                        const IconComponent = method.icon
                        return (
                          <Card
                            key={method.id}
                            className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 bg-white ${
                              bookingData.paymentMethod === method.id
                                ? "border-teal-500 bg-teal-50 shadow-lg"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            onClick={() => setBookingData((prev) => ({ ...prev, paymentMethod: method.id }))}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4">
                                <div
                                  className={`w-16 h-16 rounded-xl ${method.color} flex items-center justify-center shadow-md`}
                                >
                                  <IconComponent className="h-8 w-8 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-bold text-lg text-gray-900">{method.name}</h3>
                                  <p className="text-sm text-gray-700 mt-1 font-medium">{method.description}</p>
                                </div>
                                {bookingData.paymentMethod === method.id && (
                                  <Check className="h-6 w-6 text-teal-500 flex-shrink-0" />
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>

                    <div className="flex justify-between pt-8">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        size="lg"
                        className="px-10 py-4 text-lg font-bold h-auto border-2 border-gray-400 text-gray-800 hover:bg-gray-100 hover:border-gray-500 bg-white transition-all duration-200 shadow-sm"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5 text-gray-800" />
                        <span className="text-gray-800 font-bold">Back</span>
                      </Button>
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!canProceedStep3}
                        size="lg"
                        className="bg-black hover:bg-gray-800 text-white px-10 py-4 text-lg font-bold h-auto shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="text-white font-bold">Continue</span>
                        <ArrowRight className="ml-2 h-5 w-5 text-white" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact Information */}
                {currentStep === 4 && (
                  <div className="space-y-10">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
                      <p className="text-lg text-gray-700 font-medium">We need your details to confirm the booking</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                          <User className="h-5 w-5 text-blue-500" />
                          First Name
                        </Label>
                        <Input
                          type="text"
                          value={bookingData.firstName}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, firstName: e.target.value }))}
                          placeholder="Enter first name"
                          className="h-14 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 shadow-sm"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                          <User className="h-5 w-5 text-blue-500" />
                          Last Name
                        </Label>
                        <Input
                          type="text"
                          value={bookingData.lastName}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, lastName: e.target.value }))}
                          placeholder="Enter last name"
                          className="h-14 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 shadow-sm"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                          <Mail className="h-5 w-5 text-green-500" />
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter email address"
                          className="h-14 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 shadow-sm"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                          <Phone className="h-5 w-5 text-purple-500" />
                          Phone Number
                        </Label>
                        <Input
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter phone number"
                          className="h-14 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-lg font-bold text-gray-900">Special Requests (Optional)</Label>
                      <Textarea
                        value={bookingData.specialRequests}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                        placeholder="Any special requirements or requests..."
                        rows={4}
                        className="w-full px-4 py-3 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 resize-none rounded-lg shadow-sm"
                      />
                    </div>

                    {/* Booking Summary */}
                    <Card className="bg-gradient-to-r from-gray-100 to-teal-50 border-2 border-gray-300 shadow-sm">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl text-gray-900 flex items-center gap-2 font-bold">
                          <Check className="h-5 w-5 text-teal-500" />
                          Booking Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                          <div>
                            <span className="text-gray-700 font-semibold">From:</span>
                            <p className="font-bold text-gray-900 mt-1">{bookingData.pickup}</p>
                          </div>
                          {bookingData.stops.length > 0 && (
                            <div>
                              <span className="text-gray-700 font-semibold">Stops:</span>
                              {bookingData.stops.map((stop, index) => (
                                <p key={stop.id} className="font-bold text-gray-900 mt-1">
                                  {index + 1}. {stop.location}
                                </p>
                              ))}
                            </div>
                          )}
                          <div>
                            <span className="text-gray-700 font-semibold">To:</span>
                            <p className="font-bold text-gray-900 mt-1">{bookingData.destination}</p>
                          </div>
                          <div>
                            <span className="text-gray-700 font-semibold">Date & Time:</span>
                            <p className="font-bold text-gray-900 mt-1">
                              {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-700 font-semibold">Passengers:</span>
                            <p className="font-bold text-gray-900 mt-1">
                              {bookingData.passengers === "custom"
                                ? bookingData.customPassengers
                                : bookingData.passengers}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-700 font-semibold">Payment:</span>
                            <p className="font-bold text-gray-900 mt-1">{selectedPayment?.name}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-between pt-8">
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        size="lg"
                        className="px-10 py-4 text-lg font-bold h-auto border-2 border-gray-400 text-gray-800 hover:bg-gray-100 hover:border-gray-500 bg-white transition-all duration-200 shadow-sm"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5 text-gray-800" />
                        <span className="text-gray-800 font-bold">Back</span>
                      </Button>
                      <Button
                        type="button"
                        onClick={handleSubmitBooking}
                        disabled={!canProceedStep4 || isSubmitting}
                        size="lg"
                        className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 text-lg font-bold h-auto shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span className="text-white font-bold">Confirming...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-white font-bold">Confirm Booking</span>
                            <Check className="ml-2 h-5 w-5 text-white" />
                          </>
                        )}
                      </Button>
                    </div>

                    {bookingSuccess && (
                      <Alert className="border-2 border-green-300 bg-green-50 shadow-sm">
                        <Check className="h-5 w-5 text-green-600" />
                        <AlertDescription className="text-green-800 font-bold text-base">
                          🎉 Booking confirmed! You will receive a confirmation email shortly.
                        </AlertDescription>
                      </Alert>
                    )}

                    {bookingError && (
                      <Alert className="border-2 border-red-300 bg-red-50 shadow-sm">
                        <AlertDescription className="text-base text-red-800 font-bold">
                          ❌ Error: {bookingError}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Route Map Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <RouteMap pickup={bookingData.pickup} destination={bookingData.destination} stops={bookingData.stops} />
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <Card className="mt-10 border-2 border-gray-300 shadow-lg bg-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-12 text-base flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <span className="font-bold text-gray-900">Fully Insured</span>
              </div>
              <Separator orientation="vertical" className="h-8 bg-gray-400" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600 fill-current" />
                </div>
                <span className="font-bold text-gray-900">4.9/5 Rating</span>
              </div>
              <Separator orientation="vertical" className="h-8 bg-gray-400" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <span className="font-bold text-gray-900">24/7 Service</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}