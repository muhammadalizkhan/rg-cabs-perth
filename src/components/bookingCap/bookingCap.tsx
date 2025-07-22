"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { GoogleMapsAutocomplete } from "@/components/googleMapsAutocomplete/googleMapsAutocomplete"
import { RouteMap } from "@/components/routeMap/routeMap"
import { LocationStops } from "./location-stops"
import { MapPin, Navigation, Calendar, Clock, Users, Car, Phone, Mail, User, Plus, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from "@/hooks/use-toast"

interface LocationData {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  placeId?: string
}

interface Stop {
  id: string
  location: string
  coordinates?: {
    lat: number
    lng: number
  }
  placeId?: string
}

interface BookingFormData {
  pickup: LocationData | null
  destination: LocationData | null
  stops: Stop[]
  date: string
  time: string
  vehicleType: string
  passengers: string
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests: string
}

export default function BookingCap() {
  const [formData, setFormData] = useState<BookingFormData>({
    pickup: null,
    destination: null,
    stops: [],
    date: "",
    time: "",
    vehicleType: "",
    passengers: "1",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  // Get current location
  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location services",
        variant: "destructive"
      })
      return
    }

    setIsGettingLocation(true)
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // Reverse geocode to get address
          const geocoder = new google.maps.Geocoder()
          const response = await geocoder.geocode({
            location: { lat: latitude, lng: longitude }
          })

          if (response.results[0]) {
            const location: LocationData = {
              address: response.results[0].formatted_address,
              coordinates: { lat: latitude, lng: longitude },
              placeId: response.results[0].place_id
            }
            setCurrentLocation(location)
            toast({
              title: "Location found",
              description: "Current location detected successfully"
            })
          }
        } catch (error) {
          console.error("Geocoding error:", error)
          toast({
            title: "Location error",
            description: "Could not get address for current location",
            variant: "destructive"
          })
        } finally {
          setIsGettingLocation(false)
        }
      },
      (error) => {
        setIsGettingLocation(false)
        let message = "Could not get your location"
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location access denied. Please enable location permissions."
            break
          case error.POSITION_UNAVAILABLE:
            message = "Location information unavailable"
            break
          case error.TIMEOUT:
            message = "Location request timed out"
            break
        }
        
        toast({
          title: "Location error",
          description: message,
          variant: "destructive"
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    )
  }

  // Use current location for pickup
  const useCurrentLocationForPickup = () => {
    if (currentLocation) {
      setFormData(prev => ({ ...prev, pickup: currentLocation }))
      toast({
        title: "Location set",
        description: "Current location set as pickup"
      })
    }
  }

  // Handle location changes
  const handleLocationChange = (
    field: 'pickup' | 'destination',
    address: string,
    placeDetails?: google.maps.places.PlaceResult
  ) => {
    const locationData: LocationData = {
      address,
      coordinates: placeDetails?.geometry?.location ? {
        lat: placeDetails.geometry.location.lat(),
        lng: placeDetails.geometry.location.lng()
      } : { lat: 0, lng: 0 },
      placeId: placeDetails?.place_id
    }

    setFormData(prev => ({
      ...prev,
      [field]: locationData
    }))
  }

  // Handle stops changes
  const handleStopsChange = (stops: Stop[]) => {
    setFormData(prev => ({ ...prev, stops }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.pickup || !formData.destination) {
      toast({
        title: "Missing locations",
        description: "Please select both pickup and destination locations",
        variant: "destructive"
      })
      return
    }

    if (!formData.date || !formData.time || !formData.vehicleType) {
      toast({
        title: "Missing details",
        description: "Please fill in all required booking details",
        variant: "destructive"
      })
      return
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Missing contact info",
        description: "Please fill in all contact information",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const bookingData = {
        pickup: formData.pickup.address,
        pickupCoordinates: formData.pickup.coordinates,
        destination: formData.destination.address,
        destinationCoordinates: formData.destination.coordinates,
        stops: formData.stops.map(stop => ({
          location: stop.location,
          coordinates: stop.coordinates
        })),
        date: formData.date,
        time: formData.time,
        vehicleType: formData.vehicleType,
        passengers: formData.passengers,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        specialRequests: formData.specialRequests
      }

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        toast({
          title: "Booking submitted!",
          description: "We'll contact you shortly to confirm your booking"
        })
        
        // Reset form
        setFormData({
          pickup: null,
          destination: null,
          stops: [],
          date: "",
          time: "",
          vehicleType: "",
          passengers: "1",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          specialRequests: ""
        })
      } else {
        throw new Error(result.error || 'Booking failed')
      }
    } catch (error) {
      setSubmitStatus('error')
      toast({
        title: "Booking failed",
        description: error instanceof Error ? error.message : "Please try again or call us directly",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Book Your Ride</h1>
        <p className="text-xl text-gray-600">Premium transportation services across Perth</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <Card className="border-2 border-gray-300 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
              <Car className="h-6 w-6 text-teal-500" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Location Section */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-blue-900">Quick Location Access</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    {isGettingLocation ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Navigation className="h-4 w-4 mr-2" />
                    )}
                    Get Current Location
                  </Button>
                </div>
                
                {currentLocation && (
                  <div className="space-y-2">
                    <p className="text-sm text-blue-800">
                      <strong>Current location:</strong> {currentLocation.address}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={useCurrentLocationForPickup}
                      className="border-green-300 text-green-700 hover:bg-green-100"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Use as Pickup
                    </Button>
                  </div>
                )}
              </div>

              {/* Pickup Location */}
              <GoogleMapsAutocomplete
                label="Pickup Location"
                value={formData.pickup?.address || ""}
                onChange={(value, placeDetails) => handleLocationChange('pickup', value, placeDetails)}
                placeholder="Enter pickup address in Perth"
                icon={<MapPin className="h-5 w-5 text-teal-500" />}
                types={['address', 'establishment', 'geocode']}
              />

              {/* Stops */}
              <LocationStops
                stops={formData.stops}
                onChange={handleStopsChange}
              />

              {/* Destination Location */}
              <GoogleMapsAutocomplete
                label="Destination"
                value={formData.destination?.address || ""}
                onChange={(value, placeDetails) => handleLocationChange('destination', value, placeDetails)}
                placeholder="Enter destination address in Perth"
                icon={<Navigation className="h-5 w-5 text-red-500" />}
                types={['address', 'establishment', 'geocode']}
              />

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-teal-500" />
                    Date
                  </Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    min={getMinDate()}
                    required
                    className="h-14 text-base font-semibold bg-white border-2 border-gray-400"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-teal-500" />
                    Time
                  </Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    required
                    className="h-14 text-base font-semibold bg-white border-2 border-gray-400"
                  />
                </div>
              </div>

              {/* Vehicle Type and Passengers */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <Car className="h-5 w-5 text-teal-500" />
                    Vehicle Type
                  </Label>
                  <Select value={formData.vehicleType} onValueChange={(value) => setFormData(prev => ({ ...prev, vehicleType: value }))}>
                    <SelectTrigger className="h-14 text-base font-semibold bg-white border-2 border-gray-400">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan (1-4 passengers)</SelectItem>
                      <SelectItem value="suv">SUV (1-6 passengers)</SelectItem>
                      <SelectItem value="van">Van (1-8 passengers)</SelectItem>
                      <SelectItem value="luxury">Luxury Car (1-4 passengers)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <Users className="h-5 w-5 text-teal-500" />
                    Passengers
                  </Label>
                  <Select value={formData.passengers} onValueChange={(value) => setFormData(prev => ({ ...prev, passengers: value }))}>
                    <SelectTrigger className="h-14 text-base font-semibold bg-white border-2 border-gray-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} passenger{num > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2">Contact Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                      <User className="h-5 w-5 text-teal-500" />
                      First Name
                    </Label>
                    <Input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Enter first name"
                      required
                      className="h-14 text-base font-semibold bg-white border-2 border-gray-400"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                      <User className="h-5 w-5 text-teal-500" />
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Enter last name"
                      required
                      className="h-14 text-base font-semibold bg-white border-2 border-gray-400"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                      <Mail className="h-5 w-5 text-teal-500" />
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                      required
                      className="h-14 text-base font-semibold bg-white border-2 border-gray-400"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
                      <Phone className="h-5 w-5 text-teal-500" />
                      Phone
                    </Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                      required
                      className="h-14 text-base font-semibold bg-white border-2 border-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-3">
                <Label className="text-lg font-bold text-gray-900">Special Requests (Optional)</Label>
                <Textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                  placeholder="Any special requirements or requests..."
                  className="min-h-[100px] text-base bg-white border-2 border-gray-400"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-bold bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Submitting Booking...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Booking Submitted!
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Try Again
                  </>
                ) : (
                  'Book Now'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Route Map */}
        <div className="space-y-6">
          <RouteMap
            pickup={formData.pickup?.address || ""}
            destination={formData.destination?.address || ""}
            stops={formData.stops}
          />
          
          {/* Contact Info Card */}
          <Card className="border-2 border-teal-300 bg-teal-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-teal-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-teal-600" />
                  <span className="font-semibold text-teal-800">+61 435 287 287</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-teal-600" />
                  <span className="font-semibold text-teal-800">rgcabsperth@gmail.com</span>
                </div>
                <p className="text-sm text-teal-700 mt-4">
                  Available 24/7 for bookings and support
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
