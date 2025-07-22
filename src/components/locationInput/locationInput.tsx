"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MapPin, Navigation, Loader2, X, Search } from "lucide-react"
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
  const [inputValue, setInputValue] = useState(value?.address || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [suggestions, setSuggestions] = useState<LocationDetails[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setInputValue(value?.address || "")
  }, [value])

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setIsGoogleMapsLoaded(true)
        LocationServices.initializeServices()
        return
      }

      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement("script")
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

        if (!apiKey) {
          console.error("Google Maps API key is missing")
          return
        }

        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`
        script.async = true
        script.defer = true

        window.initGoogleMaps = () => {
          setIsGoogleMapsLoaded(true)
          LocationServices.initializeServices()
        }

        script.onerror = () => {
          console.error("Failed to load Google Maps API")
        }

        document.head.appendChild(script)
      }
    }

    loadGoogleMaps()
  }, [])

  // Search for places
  const searchPlaces = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    setIsLoading(true)
    try {
      const results = await LocationServices.searchPlaces(query)
      setSuggestions(results)
      setShowSuggestions(results.length > 0)
    } catch (error) {
      console.error("Error searching places:", error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    if (newValue !== value?.address) {
      onChange(null) // Clear the location details when user types
    }

    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    // Set new timeout for search
    const timeout = setTimeout(() => {
      searchPlaces(newValue)
    }, 500)

    setSearchTimeout(timeout)
  }

  const handleSuggestionClick = (suggestion: LocationDetails) => {
    setInputValue(suggestion.address)
    onChange(suggestion)
    setShowSuggestions(false)
    setSuggestions([])
  }

  const handleCurrentLocation = async () => {
    setIsGettingLocation(true)
    try {
      const coordinates = await LocationServices.getCurrentLocation()

      // Ensure coordinates is of the correct type expected by isPerthLocation
      if (LocationServices.isPerthLocation && typeof LocationServices.isPerthLocation === "function") {
        if (LocationServices.isPerthLocation(coordinates as any)) {
          const locationDetails = await LocationServices.reverseGeocode(coordinates)
          if (locationDetails) {
            onChange(locationDetails)
            setInputValue(locationDetails.address)
          }
        } else {
          alert("Your current location is outside our service area (Perth metropolitan area).")
        }
      }
    } catch (error) {
      console.error("Error getting current location:", error)
      alert(error instanceof Error ? error.message : "Unable to get your current location.")
    } finally {
      setIsGettingLocation(false)
    }
  }

  const handleClear = () => {
    setInputValue("")
    onChange(null)
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
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
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={isGoogleMapsLoaded ? placeholder : "Loading Google Maps..."}
            disabled={disabled || !isGoogleMapsLoaded}
            className="h-14 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 shadow-sm pr-20"
          />

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {isLoading && <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />}
            {!isLoading && inputValue && (
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
            <Search className="h-4 w-4 text-gray-400" />
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.placeId}-${index}`}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus:bg-gray-50 focus:outline-none"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">{suggestion.name || "Location"}</div>
                      <div className="text-sm text-gray-600">{suggestion.address}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {showCurrentLocation && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleCurrentLocation}
            disabled={isGettingLocation || !isGoogleMapsLoaded}
            className="h-14 px-4 border-2 border-gray-400 hover:border-teal-500 hover:bg-teal-50 bg-transparent"
            title="Use current location"
          >
            {isGettingLocation ? <Loader2 className="h-5 w-5 animate-spin" /> : <Navigation className="h-5 w-5" />}
          </Button>
        )}
      </div>

      {!isGoogleMapsLoaded && (
        <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
          Loading Google Maps... Please ensure you have a stable internet connection.
        </div>
      )}

      {value && (
        <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200">
          ✓ Location confirmed: {value.address}
        </div>
      )}
    </div>
  )
}
