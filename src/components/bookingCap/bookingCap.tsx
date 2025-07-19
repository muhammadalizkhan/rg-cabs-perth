"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  MapPin,
  Calendar,
  Clock,
  Car,
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
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Australian cities data (for demonstration, a real app would use a geocoding API)
const australianCities = [
  "Sydney, NSW",
  "Melbourne, VIC",
  "Brisbane, QLD",
  "Perth, WA",
  "Adelaide, SA",
  "Gold Coast, QLD",
  "Newcastle, NSW",
  "Canberra, ACT",
  "Sunshine Coast, QLD",
  "Wollongong, NSW",
  "Hobart, TAS",
  "Geelong, VIC",
  "Townsville, QLD",
  "Cairns, QLD",
  "Darwin, NT",
  "Toowoomba, QLD",
  "Ballarat, VIC",
  "Bendigo, VIC",
  "Albury, NSW",
  "Launceston, TAS",
  "Mackay, QLD",
  "Rockhampton, QLD",
  "Bunbury, WA",
  "Bundaberg, QLD",
  "Coffs Harbour, NSW",
  "Wagga Wagga, NSW",
  "Hervey Bay, QLD",
  "Mildura, VIC",
  "Shepparton, VIC",
  "Port Macquarie, NSW",
]

// Popular locations within cities (for demonstration)
const popularLocations = {
  "Perth, WA": [
    "Perth Airport (PER)",
    "Perth CBD",
    "Fremantle",
    "Cottesloe Beach",
    "Subiaco",
    "Northbridge",
    "Kings Park",
    "Scarborough",
    "Joondalup",
    "Mandurah",
    "Rockingham",
    "Baldivis",
    "Ellenbrook",
    "Midland",
    "Armadale",
    "Canning Vale",
    "Cockburn Central",
    "Hillarys",
    "Sorrento",
    "Duncraig",
    "Kalamunda",
    "Guildford",
    "Swan Valley",
    "Elizabeth Quay",
    "Optus Stadium",
    "Crown Perth",
  ],
}

// Vehicle types
const vehicleTypes = [
  {
    id: "economy",
    name: "Economy",
    description: "Comfortable and affordable",
    capacity: "1-3 passengers",
    price: "$25",
    features: ["Air Conditioning", "GPS Navigation", "Clean Vehicle"],
    color: "from-blue-500 to-cyan-500",
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Enhanced comfort and style",
    capacity: "1-4 passengers",
    price: "$35",
    features: ["Leather Seats", "Premium Sound", "Phone Charger"],
    color: "from-purple-500 to-pink-500",
    popular: true,
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Ultimate premium experience",
    capacity: "1-4 passengers",
    price: "$55",
    features: ["Executive Vehicle", "Complimentary Water", "Professional Chauffeur"],
    color: "from-gray-700 to-gray-900",
    popular: false,
  },
  {
    id: "suv",
    name: "SUV",
    description: "Spacious for groups and luggage",
    capacity: "1-6 passengers",
    price: "$45",
    features: ["Extra Space", "Large Boot", "Family Friendly"],
    color: "from-green-500 to-emerald-500",
    popular: false,
  },
]

export default function BookingCap() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    vehicleType: "",
    passengers: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([])
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([])
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [geolocationError, setGeolocationError] = useState<string | null>(null)

  const pickupInputRef = useRef<HTMLInputElement>(null)
  const destinationInputRef = useRef<HTMLInputElement>(null)

  // Get current date (YYYY-MM-DD)
  const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  // Get current time (HH:MM)
  const getCurrentTime = () => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }

  // Initialize with current date/time on component mount
  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      date: getCurrentDate(),
      time: getCurrentTime(),
    }))
  }, [])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupInputRef.current && !pickupInputRef.current.contains(event.target as Node)) {
        setShowPickupSuggestions(false)
      }
      if (destinationInputRef.current && !destinationInputRef.current.contains(event.target as Node)) {
        setShowDestinationSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Location search functionality (simulated for Perth)
  const searchLocations = (query: string, type: string) => {
    if (query.length < 2) {
      if (type === "pickup") setPickupSuggestions([])
      if (type === "destination") setDestinationSuggestions([])
      return
    }

    // For a real application, you would integrate a geocoding API here (e.g., Google Places API)
    // This example simulates searching within Perth's popular locations and general WA cities.
    const allPerthLocations = popularLocations["Perth, WA"] || []
    const relevantCities = australianCities.filter((city) => city.includes("Perth, WA"))

    const combinedLocations = [...new Set([...allPerthLocations, ...relevantCities])] // Remove duplicates

    const filtered = combinedLocations
      .filter((location) => location.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8) // Limit suggestions

    if (type === "pickup") setPickupSuggestions(filtered)
    if (type === "destination") setDestinationSuggestions(filtered)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
    if (field === "pickup") {
      searchLocations(value as string, "pickup")
      setShowPickupSuggestions(true)
    }
    if (field === "destination") {
      searchLocations(value as string, "destination")
      setShowDestinationSuggestions(true)
    }
  }

  const selectLocation = (location: string, type: string) => {
    if (type === "pickup") {
      setBookingData((prev) => ({ ...prev, pickup: location }))
      setShowPickupSuggestions(false)
    }
    if (type === "destination") {
      setBookingData((prev) => ({ ...prev, destination: location }))
      setShowDestinationSuggestions(false)
    }
  }

  const handleUseCurrentLocation = () => {
    setGeolocationError(null) // Clear previous errors
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          // In a real app, you'd use a reverse geocoding API here
          // For example: fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`)
          // For this demo, we'll just set a placeholder or a known Perth location
          setBookingData((prev) => ({
            ...prev,
            pickup: `Current Location (Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)})`,
          }))
          // Optionally, you could show a success message here if needed
        },
        (error) => {
          console.error("Error getting location:", error)
          let errorMessage = "Unable to retrieve your current location. Please enter it manually."
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage =
              "Location access denied. Please enable location permissions for this site in your browser settings."
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = "Location information is unavailable. Please try again later."
          } else if (error.code === error.TIMEOUT) {
            errorMessage = "The request to get user location timed out."
          }
          setGeolocationError(errorMessage)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }, // Increased timeout
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
  const canProceedStep2 = bookingData.vehicleType
  const canProceedStep3 = bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone

  const selectedVehicle = vehicleTypes.find((v) => v.id === bookingData.vehicleType)

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
        // Optionally reset form after successful submission
        setBookingData({
          pickup: "",
          destination: "",
          date: getCurrentDate(),
          time: getCurrentTime(),
          vehicleType: "",
          passengers: 1,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          specialRequests: "",
        })
        setCurrentStep(1) // Go back to first step
        setTimeout(() => setBookingSuccess(false), 5000) // Hide success message after 5 seconds
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

  // Dynamic min time for current date
  const getMinTime = () => {
    if (bookingData.date === getCurrentDate()) {
      return getCurrentTime()
    }
    return "00:00" // No restriction for future dates
  }

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 lg:py-28 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Car className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Book Your Ride</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Book a
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent ml-4">
              Taxi
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick and easy booking in just a few steps. Professional drivers, premium vehicles, guaranteed reliability.
          </p>
        </div>
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step ? "bg-yellow-400 border-yellow-400 text-black" : "border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > step ? <Check className="h-5 w-5" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-12 h-0.5 transition-all duration-300 ${
                      currentStep > step ? "bg-yellow-400" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* Main Booking Form */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Step 1: Trip Details */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Trip Details</h3>
                <p className="text-gray-600">Where would you like to go?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup Location */}
                <div className="relative space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-green-500" />
                    Pickup Location
                  </label>
                  <input
                    ref={pickupInputRef}
                    type="text"
                    value={bookingData.pickup}
                    onChange={(e) => handleInputChange("pickup", e.target.value)}
                    onFocus={() => setShowPickupSuggestions(true)}
                    placeholder="Enter pickup location"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  />
                  {showPickupSuggestions && pickupSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {pickupSuggestions.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => selectLocation(location, "pickup")}
                          className="w-full text-left p-3 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 text-gray-900"
                        >
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                  <Button
                    onClick={handleUseCurrentLocation}
                    variant="outline"
                    className="w-full mt-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 bg-transparent"
                  >
                    <LocateFixed className="h-4 w-4" />
                    Use Current Location
                  </Button>
                  {geolocationError && (
                    <div className="mt-2 p-2 text-sm text-red-700 bg-red-50 rounded-lg">{geolocationError}</div>
                  )}
                </div>
                {/* Destination */}
                <div className="relative space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    Destination
                  </label>
                  <input
                    ref={destinationInputRef}
                    type="text"
                    value={bookingData.destination}
                    onChange={(e) => handleInputChange("destination", e.target.value)}
                    onFocus={() => setShowDestinationSuggestions(true)}
                    placeholder="Enter destination"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  />
                  {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {destinationSuggestions.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => selectLocation(location, "destination")}
                          className="w-full text-left p-3 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 text-gray-900"
                        >
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={bookingData.date}
                    min={getCurrentDate()} // Only allow present and future dates
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900 bg-white"
                  />
                </div>
                {/* Time */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    Time
                  </label>
                  <input
                    type="time"
                    value={bookingData.time}
                    min={getMinTime()} // Only allow present and future times for current day
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900 bg-white"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={nextStep}
                  disabled={!canProceedStep1}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          )}
          {/* Step 2: Vehicle Selection */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Choose Your Vehicle</h3>
                <p className="text-gray-600">Select the perfect ride for your journey</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicleTypes.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => handleInputChange("vehicleType", vehicle.id)}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      bookingData.vehicleType === vehicle.id
                        ? "border-yellow-400 bg-yellow-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {vehicle.popular && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Popular
                      </div>
                    )}
                    <div className="space-y-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${vehicle.color} flex items-center justify-center`}
                      >
                        <Car className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{vehicle.name}</h4>
                        <p className="text-gray-600 text-sm">{vehicle.description}</p>
                        <p className="text-gray-500 text-sm">{vehicle.capacity}</p>
                      </div>
                      <div className="space-y-2">
                        {vehicle.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                            <Check className="h-3 w-3 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{vehicle.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="px-8 py-3 rounded-xl font-semibold group bg-transparent"
                >
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!canProceedStep2}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          )}
          {/* Step 3: Passenger Details */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Passenger Details</h3>
                <p className="text-gray-600">Tell us about yourself</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-500" />
                    First Name
                  </label>
                  <input
                    type="text"
                    value={bookingData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter first name"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-500" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={bookingData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter last name"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-purple-500" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-500" />
                    Number of Passengers
                  </label>
                  <select
                    value={bookingData.passengers}
                    onChange={(e) => handleInputChange("passengers", Number.parseInt(e.target.value))}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} Passenger{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Special Requests (Optional)</label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  placeholder="Any special requirements or requests..."
                  rows={3}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 resize-none text-gray-900 placeholder-gray-500 bg-white"
                />
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="px-8 py-3 rounded-xl font-semibold group bg-transparent"
                >
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!canProceedStep3}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  Review Booking
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          )}
          {/* Step 4: Booking Summary */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Booking Summary</h3>
                <p className="text-gray-600">Review your booking details</p>
              </div>
              <div className="space-y-6">
                {/* Trip Details Card */}
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    Trip Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">From:</span>
                      <p className="font-medium text-gray-900">{bookingData.pickup}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">To:</span>
                      <p className="font-medium text-gray-900">{bookingData.destination}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <p className="font-medium text-gray-900">{new Date(bookingData.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Time:</span>
                      <p className="font-medium text-gray-900">{bookingData.time}</p>
                    </div>
                  </div>
                </div>
                {/* Vehicle Details Card */}
                {selectedVehicle && (
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Car className="h-5 w-5 text-green-500" />
                      Vehicle Details
                    </h4>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedVehicle.color} flex items-center justify-center`}
                      >
                        <Car className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{selectedVehicle.name}</p>
                        <p className="text-sm text-gray-600">{selectedVehicle.description}</p>
                        <p className="text-sm text-gray-500">{selectedVehicle.capacity}</p>
                      </div>
                      <div className="ml-auto text-2xl font-bold text-gray-900">{selectedVehicle.price}</div>
                    </div>
                  </div>
                )}
                {/* Passenger Details Card */}
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-500" />
                    Passenger Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <p className="font-medium text-gray-900">
                        {bookingData.firstName} {bookingData.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="font-medium text-gray-900">{bookingData.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <p className="font-medium text-gray-900">{bookingData.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Passengers:</span>
                      <p className="font-medium text-gray-900">{bookingData.passengers}</p>
                    </div>
                  </div>
                  {bookingData.specialRequests && (
                    <div>
                      <span className="text-gray-500">Special Requests:</span>
                      <p className="font-medium text-gray-900">{bookingData.specialRequests}</p>
                    </div>
                  )}
                </div>
                {/* Trust Indicators */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
                  <div className="flex items-center justify-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-gray-700">Fully Insured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-medium text-gray-700">4.9/5 Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      <span className="font-medium text-gray-700">Instant Confirmation</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="px-8 py-3 rounded-xl font-semibold group bg-transparent"
                >
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmitBooking}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <Check className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    </>
                  )}
                </Button>
              </div>
              {bookingSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center font-medium">
                  Booking confirmed! You will receive a confirmation email shortly.
                </div>
              )}
              {bookingError && (
                <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-center font-medium">
                  Error: {bookingError}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
