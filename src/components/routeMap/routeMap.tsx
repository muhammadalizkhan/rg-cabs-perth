"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, Route } from "lucide-react"

interface RouteMapProps {
  pickup: string
  destination: string
  stops: Array<{ id: string; location: string }>
}



export function RouteMap({ pickup, destination, stops }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null)
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null)

  const [routeInfo, setRouteInfo] = useState<{
    distance: string
    duration: string
    estimatedFare: string
  } | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !window.google) return

    try {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: -31.9505, lng: 115.8605 }, // Perth center
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      })

      directionsServiceRef.current = new google.maps.DirectionsService()
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: "#14b8a6",
          strokeWeight: 4,
          strokeOpacity: 0.8,
        },
      })

      directionsRendererRef.current.setMap(mapInstanceRef.current)
    } catch (error) {
      console.error("Error initializing map:", error)
      setError("Failed to initialize map")
    }
  }, [])

  // Calculate route when locations change
  useEffect(() => {
    if (!pickup || !destination || !directionsServiceRef.current || !directionsRendererRef.current) {
      return
    }

    setIsLoading(true)
    setError(null)

    const waypoints = stops
      .filter((stop) => stop.location.trim())
      .map((stop) => ({
        location: stop.location,
        stopover: true,
      }))

    const request: google.maps.DirectionsRequest = {
      origin: pickup,
      destination: destination,
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    }

    directionsServiceRef.current.route(request, (result, status) => {
      setIsLoading(false)

      if (status === "OK" && result) {
        directionsRendererRef.current?.setDirections(result)

        const route = result.routes[0]
        const leg = route.legs[0]

        // Calculate total distance and duration for all legs
        let totalDistance = 0
        let totalDuration = 0

        route.legs.forEach((leg) => {
          totalDistance += leg.distance?.value || 0
          totalDuration += leg.duration?.value || 0
        })

        const distanceKm = (totalDistance / 1000).toFixed(1)
        const durationMin = Math.ceil(totalDuration / 60)

        // Simple fare estimation (base rate + distance rate)
        const baseFare = 5.5 // Base fare in AUD
        const perKmRate = 2.2 // Per km rate in AUD
        const estimatedFare = (baseFare + Number.parseFloat(distanceKm) * perKmRate).toFixed(2)

        setRouteInfo({
          distance: `${distanceKm} km`,
          duration: `${durationMin} min`,
          estimatedFare: `$${estimatedFare} AUD`,
        })
      } else {
        setError("Could not calculate route. Please check your locations.")
        console.error("Directions request failed:", status)
      }
    })
  }, [pickup, destination, stops])

  if (!pickup || !destination) {
    return (
      <Card className="border-2 border-gray-300 bg-white shadow-sm">
        <CardContent className="p-8 text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Enter pickup and destination to see route</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-gray-300 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-gray-900 flex items-center gap-2 font-bold">
          <Route className="h-5 w-5 text-teal-500" />
          Route Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Container */}
        <div className="relative">
          <div ref={mapRef} className="w-full h-64 rounded-lg border-2 border-gray-200 bg-gray-100" />
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Calculating route...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 bg-red-50 bg-opacity-90 flex items-center justify-center rounded-lg">
              <p className="text-sm font-medium text-red-700 text-center px-4">{error}</p>
            </div>
          )}
        </div>

        {/* Route Information */}
        {routeInfo && (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Navigation className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-blue-800">Distance</p>
              <p className="text-lg font-bold text-blue-900">{routeInfo.distance}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <Clock className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-green-800">Duration</p>
              <p className="text-lg font-bold text-green-900">{routeInfo.duration}</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Badge className="h-5 w-5 text-yellow-600 mx-auto mb-1 bg-transparent border-0 p-0">💰</Badge>
              <p className="text-sm font-medium text-yellow-800">Est. Fare</p>
              <p className="text-lg font-bold text-yellow-900">{routeInfo.estimatedFare}</p>
            </div>
          </div>
        )}

        {/* Route Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            <span className="font-medium text-gray-700">From:</span>
            <span className="text-gray-900 font-semibold">{pickup}</span>
          </div>

          {stops
            .filter((stop) => stop.location.trim())
            .map((stop, index) => (
              <div key={stop.id} className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="font-medium text-gray-700">Stop {index + 1}:</span>
                <span className="text-gray-900 font-semibold">{stop.location}</span>
              </div>
            ))}

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="font-medium text-gray-700">To:</span>
            <span className="text-gray-900 font-semibold">{destination}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}