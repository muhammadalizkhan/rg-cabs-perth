"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Route, Navigation, Clock, DollarSign } from "lucide-react"
import { GoogleMapsLoader } from "@/lib/googlemaps"
import type { LocationData, Stop, RouteData } from "@/types/location"


interface RouteMapProps {
  pickup: LocationData | null
  destination: LocationData | null
  stops: Stop[]
  onRouteChange?: (route: RouteData | null) => void
}

export function RouteMap({ pickup, destination, stops, onRouteChange }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<google.maps.Map | null>(null)
  const directionsService = useRef<google.maps.DirectionsService | null>(null)
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      try {
        await GoogleMapsLoader.load()

        if (!mapRef.current) return

        mapInstance.current = new google.maps.Map(mapRef.current, {
          zoom: 11,
          center: { lat: -31.9505, lng: 115.8605 }, // Perth center
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        })

        directionsService.current = new google.maps.DirectionsService()
        directionsRenderer.current = new google.maps.DirectionsRenderer({
          polylineOptions: {
            strokeColor: "#14b8a6",
            strokeWeight: 4,
          },
        })

        directionsRenderer.current.setMap(mapInstance.current)
      } catch (err) {
        setError("Failed to load map")
      }
    }

    initMap()
  }, [])

  // Calculate route
  useEffect(() => {
    if (!pickup || !destination || !directionsService.current) {
      setRouteData(null)
      onRouteChange?.(null)
      return
    }

    setIsLoading(true)
    setError(null)

    const waypoints = stops
      .filter((stop) => stop.location)
      .map((stop) => ({
        location: new google.maps.LatLng(stop.location!.lat, stop.location!.lng),
        stopover: true,
      }))

    const request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(pickup.lat, pickup.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    }

    directionsService.current.route(request, (result, status) => {
      setIsLoading(false)

      if (status === "OK" && result) {
        directionsRenderer.current?.setDirections(result)

        // Calculate totals
        let totalDistance = 0
        let totalDuration = 0

        result.routes[0].legs.forEach((leg) => {
          totalDistance += leg.distance?.value || 0
          totalDuration += leg.duration?.value || 0
        })

        const distanceKm = totalDistance / 1000
        const durationMin = Math.ceil(totalDuration / 60)
        const fare = 5.5 + distanceKm * 2.2

        const route: RouteData = {
          distance: `${distanceKm.toFixed(1)} km`,
          duration: `${durationMin} min`,
          fare: `$${fare.toFixed(2)}`,
        }

        setRouteData(route)
        onRouteChange?.(route)
      } else {
        setError("Could not calculate route")
        onRouteChange?.(null)
      }
    })
  }, [pickup, destination, stops, onRouteChange])

  if (!pickup || !destination) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Enter pickup and destination to see route</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-5 w-5 text-teal-500" />
          Route Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div ref={mapRef} className="w-full h-64 rounded-lg bg-gray-100" />
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm">Calculating route...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 bg-red-50 flex items-center justify-center rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {routeData && (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Navigation className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-blue-800">Distance</p>
              <p className="font-bold text-blue-900">{routeData.distance}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Clock className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-green-800">Duration</p>
              <p className="font-bold text-green-900">{routeData.duration}</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
              <p className="text-xs text-yellow-800">Est. Fare</p>
              <p className="font-bold text-yellow-900">{routeData.fare}</p>
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="font-medium">From:</span>
            <span className="text-gray-700">{pickup.address}</span>
          </div>
          {stops
            .filter((s) => s.location)
            .map((stop, i) => (
              <div key={stop.id} className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="font-medium">Stop {i + 1}:</span>
                <span className="text-gray-700">{stop.location!.address}</span>
              </div>
            ))}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="font-medium">To:</span>
            <span className="text-gray-700">{destination.address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
