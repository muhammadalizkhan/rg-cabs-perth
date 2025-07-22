"use client"

import type * as React from "react"
import { useState, useRef, useEffect } from "react"
import { Loader2, MapPin, Navigation } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

interface GoogleMapsAutocompleteProps {
  label: string
  value: string
  onChange: (value: string, placeDetails?: google.maps.places.PlaceResult) => void
  placeholder: string
  icon?: React.ReactNode
  disabled?: boolean
  types?: string[]
}

export function GoogleMapsAutocomplete({
  label,
  value,
  onChange,
  placeholder,
  icon,
  disabled = false,
  types = ["address", "establishment", "geocode"],
}: GoogleMapsAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)
  const [suggestions, setSuggestions] = useState<google.maps.places.PlaceResult[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Perth bounds for restricting search results
  const perthBounds = {
    north: -31.6,
    south: -32.3,
    east: 116.2,
    west: 115.6
  }

  // Check if Google Maps is loaded
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsGoogleMapsLoaded(true)
      } else {
        if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
          const script = document.createElement("script")
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`
          script.async = true
          script.defer = true
          window.initMap = () => {
            setIsGoogleMapsLoaded(true)
          }
          document.head.appendChild(script)
        }
      }
    }
    checkGoogleMaps()
  }, [])

  // Initialize autocomplete when Google Maps is loaded
  useEffect(() => {
    if (isGoogleMapsLoaded && inputRef.current && !autocompleteRef.current) {
      try {
        // Create Perth bounds
        const bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(perthBounds.south, perthBounds.west),
          new google.maps.LatLng(perthBounds.north, perthBounds.east)
        )

        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
          types,
          componentRestrictions: { country: "au" },
          bounds: bounds,
          strictBounds: true, // Strictly enforce Perth bounds
          fields: [
            "place_id", 
            "formatted_address", 
            "name", 
            "geometry", 
            "types",
            "address_components"
          ],
        })

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace()
          if (place && place.formatted_address) {
            // Verify the place is in Perth area
            if (place.geometry?.location) {
              const lat = place.geometry.location.lat()
              const lng = place.geometry.location.lng()
              
              if (lat >= perthBounds.south && lat <= perthBounds.north && 
                  lng >= perthBounds.west && lng <= perthBounds.east) {
                setIsLoading(false)
                setShowSuggestions(false)
                onChange(place.formatted_address, place)
              } else {
                // Location is outside Perth
                setIsLoading(false)
                onChange("", undefined)
                alert("Please select a location within Perth area")
              }
            } else {
              setIsLoading(false)
              onChange(place.formatted_address, place)
            }
          }
        })
      } catch (error) {
        console.error("Error initializing Google Maps Autocomplete:", error)
      }
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [isGoogleMapsLoaded, types, onChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    
    if (newValue.length > 2) {
      setIsLoading(true)
      searchPlaces(newValue)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  const searchPlaces = async (query: string) => {
    if (!isGoogleMapsLoaded || !window.google) return

    try {
      const service = new google.maps.places.PlacesService(document.createElement('div'))
      const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(perthBounds.south, perthBounds.west),
        new google.maps.LatLng(perthBounds.north, perthBounds.east)
      )

      const request = {
        query: `${query} Perth WA Australia`,
        bounds: bounds,
        fields: ['place_id', 'formatted_address', 'name', 'geometry', 'types']
      }

      service.textSearch(request, (results, status) => {
        setIsLoading(false)
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // Filter results to only Perth area
          const perthResults = results.filter(place => {
            if (place.geometry?.location) {
              const lat = place.geometry.location.lat()
              const lng = place.geometry.location.lng()
              return lat >= perthBounds.south && lat <= perthBounds.north && 
                     lng >= perthBounds.west && lng <= perthBounds.east
            }
            return false
          }).slice(0, 5) // Limit to 5 suggestions

          setSuggestions(perthResults)
          setShowSuggestions(perthResults.length > 0)
        } else {
          setSuggestions([])
          setShowSuggestions(false)
        }
      })
    } catch (error) {
      console.error("Error searching places:", error)
      setIsLoading(false)
    }
  }

  const selectSuggestion = (place: google.maps.places.PlaceResult) => {
    if (place.formatted_address) {
      onChange(place.formatted_address, place)
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser")
      return
    }

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        // Check if current location is in Perth area
        if (latitude < perthBounds.south || latitude > perthBounds.north ||
            longitude < perthBounds.west || longitude > perthBounds.east) {
          setIsLoading(false)
          alert("Your current location is outside the Perth service area")
          return
        }

        try {
          const geocoder = new google.maps.Geocoder()
          const response = await geocoder.geocode({
            location: { lat: latitude, lng: longitude }
          })

          if (response.results[0]) {
            const place = response.results[0]
            onChange(place.formatted_address, {
              ...place,
              geometry: {
                location: new google.maps.LatLng(latitude, longitude)
              }
            } as google.maps.places.PlaceResult)
          }
        } catch (error) {
          console.error("Geocoding error:", error)
          alert("Could not get address for current location")
        } finally {
          setIsLoading(false)
        }
      },
      (error) => {
        setIsLoading(false)
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
        
        alert(message)
      }
    )
  }

  return (
    <div className="space-y-3 relative">
      <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
        {icon}
        {label}
      </Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder={isGoogleMapsLoaded ? placeholder : "Loading Google Maps..."}
            disabled={disabled || !isGoogleMapsLoaded}
            className="h-14 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 shadow-sm pr-10"
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true)
              }
            }}
            onBlur={() => {
              // Delay hiding suggestions to allow clicking
              setTimeout(() => setShowSuggestions(false), 200)
            }}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />
            </div>
          )}
          
          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 bg-white border-2 border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
              {suggestions.map((place, index) => (
                <button
                  key={place.place_id || index}
                  type="button"
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-200 last:border-b-0 flex items-center gap-3"
                  onClick={() => selectSuggestion(place)}
                >
                  <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">{place.name}</div>
                    <div className="text-sm text-gray-600">{place.formatted_address}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={getCurrentLocation}
          disabled={isLoading || !isGoogleMapsLoaded}
          className="h-14 w-14 border-2 border-gray-400 hover:border-teal-500"
          title="Use current location"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Navigation className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {!isGoogleMapsLoaded && (
        <p className="text-sm text-gray-600 font-medium">Loading Google Maps...</p>
      )}
    </div>
  )
}
