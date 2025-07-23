"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Loader2, X, Locate } from "lucide-react"
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
  className?: string
}

export function LocationInput({
  label,
  value,
  onChange,
  placeholder,
  showCurrentLocation = false,
  icon,
  className = "",
}: LocationInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any | null>(null)
  const [inputValue, setInputValue] = useState(value?.address || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isInitializedRef = useRef(false)

  // Stable callback to prevent re-initialization
  const handlePlaceChanged = useCallback(() => {
    const place = autocompleteRef.current?.getPlace()
    if (place && place.geometry && place.geometry.location) {
      const location: LocationData = {
        address: place.formatted_address || place.name || "",
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        placeId: place.place_id,
      }
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
  }, [onChange])

  useEffect(() => {
    setInputValue(value?.address || "")
  }, [value])

  useEffect(() => {
    const initializeAutocomplete = async () => {
      // Prevent multiple initializations
      if (isInitializedRef.current || !inputRef.current) return

      try {
        setIsLoading(true)
        await GoogleMapsLoader.load()

        if (!inputRef.current) return

        autocompleteRef.current = new (window as any).google.maps.places.Autocomplete(inputRef.current, {
          types: ["establishment", "geocode"],
          componentRestrictions: { country: "au" },
          bounds: new (window as any).google.maps.LatLngBounds(
            new (window as any).google.maps.LatLng(-32.3, 115.5),
            new (window as any).google.maps.LatLng(-31.6, 116.2),
          ),
          strictBounds: true,
          fields: ["place_id", "formatted_address", "geometry", "name"],
        })

        autocompleteRef.current.addListener("place_changed", handlePlaceChanged)

        isInitializedRef.current = true
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
      if (autocompleteRef.current && isInitializedRef.current) {
        ;(window as any).google.maps.event.clearInstanceListeners(autocompleteRef.current)
        autocompleteRef.current = null
        isInitializedRef.current = false
      }
    }
  }, []) // Remove onChange from dependencies

  // Update the place_changed listener when handlePlaceChanged changes
  useEffect(() => {
    if (autocompleteRef.current && isInitializedRef.current) {
      ;(window as any).google.maps.event.clearListeners(autocompleteRef.current, "place_changed")
      autocompleteRef.current.addListener("place_changed", handlePlaceChanged)
    }
  }, [handlePlaceChanged])

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
          const geocoder = new (window as any).google.maps.Geocoder()
          const result = await new Promise<any[]>((resolve, reject) => {
            geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results: any[], status: string) => {
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
    <div className={`space-y-3 ${className}`}>
      <Label className="text-base font-semibold text-black flex items-center gap-2">
        {icon}
        {label}
      </Label>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={isReady ? placeholder : "Loading..."}
            disabled={!isReady}
            className={`h-12 text-sm font-medium bg-white border-2 transition-all duration-200 pr-10 ${
              value
                ? "border-black bg-gray-50 text-black font-semibold"
                : "border-gray-300 text-gray-700 hover:border-gray-400 focus:border-black"
            }`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            ) : inputValue ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearInput}
                className="h-6 w-6 p-0 hover:bg-gray-100"
              >
                <X className="h-3 w-3 text-gray-500" />
              </Button>
            ) : null}
          </div>
        </div>
        {showCurrentLocation && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
            disabled={!isReady || isLoading}
            className="h-12 px-3 border-2 border-gray-300 hover:border-black hover:bg-gray-50 bg-white transition-all duration-200"
            title="Use current location"
          >
            <Locate className="h-4 w-4 text-black" />
          </Button>
        )}
      </div>
      {error && (
        <div className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">{error}</div>
      )}
      {value && (
        <div className="text-xs text-green-700 bg-green-50 px-3 py-2 rounded-md border border-green-200 font-medium">
          ✓ Selected: {value.address}
        </div>
      )}
      {!isReady && !error && (
        <div className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-md border border-blue-200">
          Loading location services...
        </div>
      )}
    </div>
  )
}
