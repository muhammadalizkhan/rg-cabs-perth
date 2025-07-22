"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MapPin, Navigation, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleMapsLoader } from "@/lib/googlemaps"
import type { LocationData } from "@/types/location"

interface LocationInputProps {
  label: string
  value: LocationData | null
  onChange: (location: LocationData | null) => void
  placeholder: string
  showCurrentLocation?: boolean
  icon?: React.ReactNode
}

export function LocationInput({
  label,
  value,
  onChange,
  placeholder,
  showCurrentLocation = false,
  icon,
}: LocationInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [inputValue, setInputValue] = useState(value?.address || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Update input when value changes
  useEffect(() => {
    setInputValue(value?.address || "")
  }, [value])

  // Initialize Google Maps and Autocomplete
  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        setIsLoading(true)
        await GoogleMapsLoader.load()

        if (!inputRef.current) return

        // Create autocomplete with Perth bounds
        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
          types: ["establishment", "geocode"],
          componentRestrictions: { country: "au" },
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(-32.3, 115.5), // SW Perth
            new google.maps.LatLng(-31.6, 116.2), // NE Perth
          ),
          strictBounds: true,
          fields: ["place_id", "formatted_address", "geometry", "name"],
        })

        // Listen for place selection
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace()

          if (place && place.geometry && place.geometry.location) {
            const location: LocationData = {
              address: place.formatted_address || place.name || "",
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              placeId: place.place_id,
            }

            // Check if it's in Perth area
            if (isInPerth(location.lat, location.lng)) {
              onChange(location)
              setInputValue(location.address)
              setError(null)
            } else {
              setError("Please select a location within Perth metropolitan area")
              setInputValue("")
              onChange(null)
            }
          }
        })

        setIsReady(true)
        setError(null)
      } catch (err) {
        setError("Failed to load location services")
        console.error("Google Maps initialization error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAutocomplete()

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [onChange])

  const isInPerth = (lat: number, lng: number): boolean => {
    return lat >= -32.3 && lat <= -31.6 && lng >= 115.5 && lng <= 116.2
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported")
      return
    }

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        if (!isInPerth(latitude, longitude)) {
          setError("Your current location is outside Perth area")
          setIsLoading(false)
          return
        }

        try {
          const geocoder = new google.maps.Geocoder()
          const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
              if (status === "OK" && results) {
                resolve(results)
              } else {
                reject(new Error("Geocoding failed"))
              }
            })
          })

          if (result[0]) {
            const location: LocationData = {
              address: result[0].formatted_address,
              lat: latitude,
              lng: longitude,
              placeId: result[0].place_id,
            }
            onChange(location)
            setInputValue(location.address)
            setError(null)
          }
        } catch (err) {
          setError("Failed to get address for current location")
        } finally {
          setIsLoading(false)
        }
      },
      (error) => {
        setError("Unable to get your location")
        setIsLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    if (newValue !== value?.address) {
      onChange(null)
    }
  }

  const clearInput = () => {
    setInputValue("")
    onChange(null)
    setError(null)
  }

  return (
    <div className="space-y-3">
      <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
        {icon || <MapPin className="h-5 w-5 text-teal-600" />}
        {label}
      </Label>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={isReady ? placeholder : "Loading..."}
            disabled={!isReady}
            className="h-14 text-base font-semibold bg-white border-2 border-gray-400 pr-10"
          />

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
            ) : inputValue ? (
              <Button type="button" variant="ghost" size="sm" onClick={clearInput} className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>

        {showCurrentLocation && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={getCurrentLocation}
            disabled={!isReady || isLoading}
            className="h-14 px-4 bg-transparent"
          >
            <Navigation className="h-5 w-5" />
          </Button>
        )}
      </div>

      {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">{error}</div>}

      {value && (
        <div className="text-sm text-green-600 bg-green-50 p-2 rounded border border-green-200">✓ {value.address}</div>
      )}

      {!isReady && !error && (
        <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">
          Loading location services...
        </div>
      )}
    </div>
  )
}
