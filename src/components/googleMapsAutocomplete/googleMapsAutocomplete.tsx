"use client"

import type * as React from "react"
import { useState, useRef, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  types = ["establishment", "geocode"],
}: GoogleMapsAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)

  // Check if Google Maps is loaded
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsGoogleMapsLoaded(true)
      } else {
        // Load Google Maps if not already loaded
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
        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
          types,
          componentRestrictions: { country: "au" }, // Restrict to Australia
          fields: ["place_id", "formatted_address", "name", "geometry", "types"],
        })

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace()
          if (place && place.formatted_address) {
            setIsLoading(false)
            onChange(place.formatted_address, place)
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
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-lg font-bold text-gray-900 flex items-center gap-3">
        {icon}
        {label}
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={isGoogleMapsLoaded ? placeholder : "Loading Google Maps..."}
          disabled={disabled || !isGoogleMapsLoaded}
          className="h-14 text-base font-semibold bg-white border-2 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 shadow-sm pr-10"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />
          </div>
        )}
      </div>
      {!isGoogleMapsLoaded && <p className="text-sm text-gray-600 font-medium">Loading Google Maps...</p>}
    </div>
  )
}