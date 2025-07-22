"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Clock,
  Users,
  ArrowRight,
  ArrowLeft,
  Check,
  Star,
  Shield,
  Phone,
  Mail,
  User,
  Navigation,
  Zap,
  LocateFixed,
  Plus,
  X,
  CreditCard,
  Wallet,
  DollarSign,
  Building,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { LocationCombobox } from "@/components//locationInput/locationInput"

// Comprehensive location data
const allLocations = [
  // Perth Airports
  "Perth Airport (PER)",
  "Perth Domestic Airport",
  "Perth International Airport",

  // Perth CBD and Central Areas
  "Perth CBD",
  "Perth City Centre",
  "Perth Train Station",
  "Perth Bus Station",
  "Elizabeth Quay",
  "Kings Park",
  "Perth Mint",
  "Perth Concert Hall",
  "Perth Convention Centre",

  // Perth Suburbs - North
  "Joondalup",
  "Wanneroo",
  "Butler",
  "Clarkson",
  "Mindarie",
  "Quinns Rocks",
  "Ridgewood",
  "Merriwa",
  "Yanchep",
  "Two Rocks",

  // Perth Suburbs - South
  "Fremantle",
  "Rockingham",
  "Mandurah",
  "Baldivis",
  "Secret Harbour",
  "Safety Bay",
  "Warnbro",
  "Port Kennedy",
  "Singleton",
  "Golden Bay",

  // Perth Suburbs - East
  "Midland",
  "Swan Valley",
  "Guildford",
  "Bassendean",
  "Bayswater",
  "Maylands",
  "Mount Lawley",
  "Inglewood",
  "Morley",
  "Noranda",
  "Beechboro",
  "Caversham",
  "Ellenbrook",
  "The Vines",
  "Upper Swan",
  "Bullsbrook",
  "Chittering",

  // Perth Suburbs - West
  "Cottesloe",
  "Scarborough",
  "Hillarys",
  "Sorrento",
  "Marmion",
  "Duncraig",
  "Warwick",
  "Greenwood",
  "Kingsley",
  "Woodvale",
  "Jandakot",
  "Canning Vale",
  "Willetton",
  "Bull Creek",
  "Leeming",
  "Bateman",
  "Applecross",
  "Mount Pleasant",
  "Como",
  "South Perth",

  // Perth Inner Suburbs
  "Subiaco",
  "Northbridge",
  "West Perth",
  "East Perth",
  "Leederville",
  "North Perth",
  "Highgate",
  "Perth Airport",
  "Belmont",
  "Cloverdale",
  "Kewdale",
  "Welshpool",
  "Victoria Park",
  "Burswood",
  "Crown Perth",
  "Optus Stadium",

  // Shopping Centers
  "Westfield Carousel",
  "Westfield Whitford City",
  "Garden City Shopping Centre",
  "Lakeside Joondalup",
  "Innaloo Shopping Centre",
  "Morley Galleria",
  "Armadale Shopping City",
  "Rockingham Shopping Centre",
  "Mandurah Forum",

  // Hospitals
  "Royal Perth Hospital",
  "Sir Charles Gairdner Hospital",
  "Fremantle Hospital",
  "Joondalup Health Campus",
  "Rockingham General Hospital",
  "Armadale Hospital",
  "Swan District Hospital",

  // Universities
  "University of Western Australia",
  "Curtin University",
  "Murdoch University",
  "Edith Cowan University",
  "Notre Dame University",

  // Other Major Cities
  "Sydney, NSW",
  "Melbourne, VIC",
  "Brisbane, QLD",
  "Adelaide, SA",
  "Gold Coast, QLD",
  "Newcastle, NSW",
  "Canberra, ACT",
  "Darwin, NT",
  "Hobart, TAS",
]

// Passenger options
const passengerOptions = [
  { id: "1-2", label: "1-2 Passengers", value: "1-2" },
  { id: "1-3", label: "1-3 Passengers", value: "1-3" },
  { id: "1-4", label: "1-4 Passengers", value: "1-4" },
  { id: "1,2,3,4", label: "1, 2, 3, 4 Passengers", value: "1,2,3,4" },
  { id: "custom", label: "Custom", value: "custom" },
]

// Payment methods
const paymentMethods = [
  {
    id: "paying-driver",
    name: "Paying Driver",
    description: "Pay the driver directly",
    icon: User,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "ptts-card",
    name: "PTTS Card",
    description: "Public transport card payment",
    icon: CreditCard,
    color: "from-green-500 to-green-600",
  },
  {
    id: "cabcharge",
    name: "Cabcharge",
    description: "Cabcharge account payment",
    icon: Building,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: "credit-card",
    name: "Credit Card",
    description: "Pay with credit/debit card",
    icon: CreditCard,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "cash",
    name: "Cash",
    description: "Cash payment to driver",
    icon: DollarSign,
    color: "from-gray-500 to-gray-600",
  },
  {
    id: "other",
    name: "Other",
    description: "Alternative payment method",
    icon: Wallet,
    color: "from-indigo-500 to-indigo-600",
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
          const locationText = `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
          setBookingData((prev) => ({ ...prev, pickup: locationText }))
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

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Navigation className="h-4 w-4 mr-2" />
            Professional Taxi Service
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Book Your <span className="text-blue-600">Ride</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Professional drivers, premium vehicles, reliable service across Perth
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Step {currentStep} of 4</span>
              <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <span className={currentStep >= 1 ? "text-blue-600 font-medium" : ""}>Trip Details</span>
              <span className={currentStep >= 2 ? "text-blue-600 font-medium" : ""}>Passengers</span>
              <span className={currentStep >= 3 ? "text-blue-600 font-medium" : ""}>Payment</span>
              <span className={currentStep >= 4 ? "text-blue-600 font-medium" : ""}>Contact</span>
            </div>
          </CardContent>
        </Card>

        {/* Main Form */}
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            {/* Step 1: Trip Details */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <CardTitle className="text-3xl mb-3">Trip Details</CardTitle>
                  <CardDescription className="text-lg">Where would you like to go?</CardDescription>
                </div>

                <div className="space-y-6">
                  {/* Pickup Location */}
                  <div className="space-y-2">
                    <Label htmlFor="pickup" className="text-base font-semibold flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-green-500" />
                      Pickup Location
                    </Label>
                    <LocationCombobox
                      value={bookingData.pickup}
                      onValueChange={(value) => setBookingData((prev) => ({ ...prev, pickup: value }))}
                      placeholder="Select pickup location"
                      locations={allLocations}
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      variant="outline"
                      className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                    >
                      <LocateFixed className="h-4 w-4 mr-2" />
                      Use Current Location
                    </Button>
                  </div>

                  {geolocationError && (
                    <Alert variant="destructive">
                      <AlertDescription>{geolocationError}</AlertDescription>
                    </Alert>
                  )}

                  {/* Stops */}
                  {bookingData.stops.map((stop, index) => (
                    <div key={stop.id} className="space-y-2">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-yellow-500" />
                        Stop {index + 1}
                      </Label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <LocationCombobox
                            value={stop.location}
                            onValueChange={(value) => handleStopChange(stop.id, value)}
                            placeholder={`Select stop ${index + 1} location`}
                            locations={allLocations}
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeStop(stop.id)}
                          variant="outline"
                          size="icon"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    onClick={addStop}
                    variant="outline"
                    className="w-full border-dashed border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-600 py-6 bg-transparent"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Stop
                  </Button>

                  {/* Destination */}
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-base font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      Destination
                    </Label>
                    <LocationCombobox
                      value={bookingData.destination}
                      onValueChange={(value) => setBookingData((prev) => ({ ...prev, destination: value }))}
                      placeholder="Select destination"
                      locations={allLocations}
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-base font-semibold flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingData.date}
                        min={getCurrentDate()}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, date: e.target.value }))}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-base font-semibold flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-500" />
                        Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={bookingData.time}
                        min={getMinTime()}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, time: e.target.value }))}
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button type="button" onClick={nextStep} disabled={!canProceedStep1} size="lg" className="px-8">
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Passenger Selection */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <CardTitle className="text-3xl mb-3">Passenger Details</CardTitle>
                  <CardDescription className="text-lg">How many passengers will be traveling?</CardDescription>
                </div>

                <div className="space-y-4">
                  {passengerOptions.map((option) => (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                        bookingData.passengers === option.value
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => setBookingData((prev) => ({ ...prev, passengers: option.value }))}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              bookingData.passengers === option.value
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {bookingData.passengers === option.value && <Check className="h-4 w-4 text-white" />}
                          </div>
                          <div className="flex items-center gap-3">
                            <Users className="h-6 w-6 text-gray-500" />
                            <span className="font-semibold text-lg">{option.label}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {bookingData.passengers === "custom" && (
                    <div className="space-y-2">
                      <Label htmlFor="customPassengers" className="text-base font-semibold">
                        Custom Number of Passengers
                      </Label>
                      <Input
                        id="customPassengers"
                        type="number"
                        min="1"
                        max="20"
                        value={bookingData.customPassengers}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, customPassengers: e.target.value }))}
                        placeholder="Enter number of passengers"
                        className="h-12"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-6">
                  <Button type="button" onClick={prevStep} variant="outline" size="lg" className="px-8 bg-transparent">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button type="button" onClick={nextStep} disabled={!canProceedStep2} size="lg" className="px-8">
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <CardTitle className="text-3xl mb-3">Payment Method</CardTitle>
                  <CardDescription className="text-lg">How would you like to pay? (Payment after ride)</CardDescription>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon
                    return (
                      <Card
                        key={method.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                          bookingData.paymentMethod === method.id
                            ? "border-blue-500 bg-blue-50 shadow-lg"
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => setBookingData((prev) => ({ ...prev, paymentMethod: method.id }))}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-md`}
                            >
                              <IconComponent className="h-7 w-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg">{method.name}</h3>
                              <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                            {bookingData.paymentMethod === method.id && (
                              <Check className="h-6 w-6 text-blue-500 flex-shrink-0" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <div className="flex justify-between pt-6">
                  <Button type="button" onClick={prevStep} variant="outline" size="lg" className="px-8 bg-transparent">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button type="button" onClick={nextStep} disabled={!canProceedStep3} size="lg" className="px-8">
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center">
                  <CardTitle className="text-3xl mb-3">Contact Information</CardTitle>
                  <CardDescription className="text-lg">We need your details to confirm the booking</CardDescription>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-base font-semibold flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-500" />
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={bookingData.firstName}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Enter first name"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-base font-semibold flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-500" />
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={bookingData.lastName}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Enter last name"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4 text-green-500" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-semibold flex items-center gap-2">
                      <Phone className="h-4 w-4 text-purple-500" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests" className="text-base font-semibold">
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    id="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                    placeholder="Any special requirements or requests..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* Booking Summary */}
                <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground font-medium">From:</span>
                        <p className="font-semibold">{bookingData.pickup}</p>
                      </div>
                      {bookingData.stops.length > 0 && (
                        <div>
                          <span className="text-muted-foreground font-medium">Stops:</span>
                          {bookingData.stops.map((stop, index) => (
                            <p key={stop.id} className="font-semibold">
                              {index + 1}. {stop.location}
                            </p>
                          ))}
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground font-medium">To:</span>
                        <p className="font-semibold">{bookingData.destination}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium">Date & Time:</span>
                        <p className="font-semibold">
                          {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium">Passengers:</span>
                        <p className="font-semibold">
                          {bookingData.passengers === "custom" ? bookingData.customPassengers : bookingData.passengers}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium">Payment:</span>
                        <p className="font-semibold">{selectedPayment?.name}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between pt-6">
                  <Button type="button" onClick={prevStep} variant="outline" size="lg" className="px-8 bg-transparent">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmitBooking}
                    disabled={!canProceedStep4 || isSubmitting}
                    size="lg"
                    className="px-8 bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <Check className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>

                {bookingSuccess && (
                  <Alert className="border-green-200 bg-green-50">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 font-medium">
                      ✅ Booking confirmed! You will receive a confirmation email shortly.
                    </AlertDescription>
                  </Alert>
                )}

                {bookingError && (
                  <Alert variant="destructive">
                    <AlertDescription>❌ Error: {bookingError}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <Card className="mt-12">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-12 text-base flex-wrap">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-500" />
                <span className="font-semibold">Fully Insured</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-blue-500" />
                <span className="font-semibold">24/7 Service</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
