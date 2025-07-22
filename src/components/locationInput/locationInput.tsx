"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MapPin, Navigation, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { LocationDetails, LocationInputType } from "@/types/location"
import { LocationServices } from "@/utils/location-services"

interface LocationInputProps {
  label: string
  type: LocationInputType
  value: LocationDetails | null
  onChange: (location: LocationDetails | null) => void
  placeholder: string
  disabled?: boolean
  showCurrentLocation?: boolean
  className?: string
}

export function LocationInput({
  label,
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
  showCurrentLocation = true,
  className = "",
}: LocationInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any | null>(null)
  const [inputValue, setInputValue] = useState(value?.address || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  // Update input value when value prop changes
  useEffect(() => {
    setInputValue(value?.address || "")
  }, [value])

  // Check if Google Maps is loaded
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsGoogleMapsLoaded(true)
        LocationServices.initializeServices()
      } else {
        // Load Google Maps if not already loaded
        if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
          const script = document.createElement("script")
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`
          script.async = true
          script.defer = true
          window.initMap = () => {
            setIsGoogleMapsLoaded(true)
            LocationServices.initializeServices()
          }
          document.head.appendChild(script)
        }
      }
    }
    checkGoogleMaps()
  }, [])

  // Initialize autocomplete
  useEffect(() => {
    if (isGoogleMapsLoaded && inputRef.current && !autocompleteRef.current) {
      try {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ["establishment", "geocode"],
          componentRestrictions: { country: "au" },
          bounds: new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(-32.3, 115.5), // SW Perth bounds
            new window.google.maps.LatLng(-31.6, 116.2), // NE Perth bounds
          ),
          strictBounds: true,
          fields: ["place_id", "formatted_address", "name", "geometry", "types", "address_components"],
        })

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace()
          if (place && place.formatted_address && place.geometry?.location) {
            setIsLoading(false)

            // Check if it's a Perth location
            if (LocationServices.isPerthLocation(place)) {
              const locationDetails: LocationDetails = {
                address: place.formatted_address,
                coordinates: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                },
                placeId: place.place_id,
                name: place.name,
                types: place.types,
              }
              onChange(locationDetails)
              setInputValue(place.formatted_address)
            } else {
              // Show error for non-Perth locations
              alert("Sorry, we only service Perth metropolitan area. Please select a location within Perth.")
              setInputValue("")
              onChange(null)
            }
          }
        })
      } catch (error) {
        console.error("Error initializing Google Maps Autocomplete:", error)
      }
    }

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [isGoogleMapsLoaded, onChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    if (newValue !== value?.address) {
      onChange(null) // Clear the location details when user types
    }

    if (newValue.length > 2) {
      setIsLoading(true)
    }
  }

  const handleCurrentLocation = async () => {
    setIsGettingLocation(true)
    try {
      const coordinates = await LocationServices.getCurrentLocation()
      const locationDetails = await LocationServices.reverseGeocode(coordinates)

      if (locationDetails) {
        // Check if current location is in Perth
        if (
          LocationServices.isPerthLocation({
            geometry: { location: { lat: () => coordinates.lat, lng: () => coordinates.lng } },
          } as any)
        ) {
          onChange(locationDetails)
          setInputValue(locationDetails.address)
        } else {
          alert("Your current location is outside our service area (Perth metropolitan area).")
        }
      }
    } catch (error) {
      console.error("Error getting current location:", error)
      alert("Unable to get your current location. Please ensure location access is enabled.")
    } finally {
      setIsGettingLocation(false)
    }
  }

  const handleClear = () => {
    setInputValue("")
    onChange(null)
  }

  const getIcon = () => {
    switch (type) {
      case "pickup":
        return <MapPin className="h-5 w-5 text-green-600" />
      case "destination":
        return <Navigation className="h-5 w-5 text-red-600" />
      case "stop":
        return <MapPin className="h-5 w-5 text-orange-600" />
      default:
        return <MapPin className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
        {getIcon()}
        {label}
      </Label>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={isGoogleMapsLoaded ? placeholder : "Loading Google Maps..."}
            disabled={disabled || !isGoogleMapsLoaded}
            className="h-14 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 shadow-sm pr-20"
          />

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {isLoading && <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />}
            {inputValue && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-6 w-6 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            )}
          </div>
        </div>

        {showCurrentLocation && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleCurrentLocation}
            disabled={isGettingLocation || !isGoogleMapsLoaded}
            className="h-14 px-4 border-2 border-gray-400 hover:border-teal-500 hover:bg-teal-50 bg-transparent"
          >
            {isGettingLocation ? <Loader2 className="h-5 w-5 animate-spin" /> : <Navigation className="h-5 w-5" />}
          </Button>
        )}
      </div>

      {!isGoogleMapsLoaded && <p className="text-sm text-gray-600 font-medium">Loading Google Maps...</p>}

      {value && (
        <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200">
          ✓ Location confirmed: {value.address}
        </div>
      )}
    </div>
  )
}
