"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Clock, Route, DollarSign, AlertCircle } from "lucide-react"
import type { LocationDetails, Stop, RouteInfo } from "@/types/location"
import { LocationServices } from "@/utils/location-services"

interface RouteMapProps {
  pickup: LocationDetails | null
  destination: LocationDetails | null
  stops: Stop[]
  vehicleType?: string
  onRouteCalculated?: (routeInfo: RouteInfo | null) => void
}

export function RouteMap({
  pickup,
  destination,
  stops,
  vehicleType = "sedan",
  onRouteCalculated,
}: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any | null>(null)
  const directionsServiceRef = useRef<any | null>(null)
  const directionsRendererRef = useRef<any | null>(null)
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Initialize map
  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return

      // Wait for Google Maps to load
      let attempts = 0
      const maxAttempts = 50

      const waitForGoogleMaps = () => {
        return new Promise<void>((resolve, reject) => {
          const checkGoogleMaps = () => {
            attempts++
            if (window.google && window.google.maps) {
              resolve()
            } else if (attempts >= maxAttempts) {
              reject(new Error("Google Maps failed to load"))
            } else {
              setTimeout(checkGoogleMaps, 100)
            }
          }
          checkGoogleMaps()
        })
      }

      try {
        await waitForGoogleMaps()

        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          zoom: 11,
          center: { lat: -31.9505, lng: 115.8605 }, // Perth center
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        })

        directionsServiceRef.current = new window.google.maps.DirectionsService()
        directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: "#14b8a6",
            strokeWeight: 5,
            strokeOpacity: 0.8,
          },
          markerOptions: {
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#14b8a6",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          },
        })

        directionsRendererRef.current.setMap(mapInstanceRef.current)
        setIsMapLoaded(true)
        setError(null)
      } catch (error) {
        console.error("Error initializing map:", error)
        setError("Failed to load map. Please refresh the page.")
      }
    }

    initializeMap()
  }, [])

  // Calculate route when locations change
  useEffect(() => {
    if (!pickup || !destination || !directionsServiceRef.current || !directionsRendererRef.current || !isMapLoaded) {
      setRouteInfo(null)
      onRouteCalculated?.(null)
      return
    }

    setIsLoading(true)
    setError(null)

    const validStops = stops
      .filter((stop) => stop.location && stop.isValid)
      .map((stop) => ({
        location: new window.google.maps.LatLng(stop.location!.coordinates.lat, stop.location!.coordinates.lng),
        stopover: true,
      }))

    const request: any = {
      origin: new window.google.maps.LatLng(pickup.coordinates.lat, pickup.coordinates.lng),
      destination: new window.google.maps.LatLng(destination.coordinates.lat, destination.coordinates.lng),
      waypoints: validStops,
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
      optimizeWaypoints: validStops.length > 1,
    }

    directionsServiceRef.current.route(request, (result: any, status: any) => {
      setIsLoading(false)

      if (status === "OK" && result) {
        directionsRendererRef.current?.setDirections(result)

        const route = result.routes[0]
        let totalDistance = 0
        let totalDuration = 0

        route.legs.forEach((leg: any) => {
          totalDistance += leg.distance?.value || 0
          totalDuration += leg.duration?.value || 0
        })

        const distanceKm = totalDistance / 1000
        const durationMin = Math.ceil(totalDuration / 60)
        const estimatedFare = LocationServices.calculateFare(distanceKm, durationMin, vehicleType)

        const routeInfoData: RouteInfo = {
          distance: `${distanceKm.toFixed(1)} km`,
          duration: `${durationMin} min`,
          estimatedFare: `$${estimatedFare.toFixed(2)} AUD`,
          totalDistanceKm: distanceKm,
          totalDurationMin: durationMin,
        }

        setRouteInfo(routeInfoData)
        onRouteCalculated?.(routeInfoData)
      } else {
        let errorMessage = "Could not calculate route. Please check your locations."

        switch (status) {
          case "ZERO_RESULTS":
            errorMessage = "No route found between the selected locations"
            break
          case "OVER_QUERY_LIMIT":
            errorMessage = "Too many requests. Please try again in a moment."
            break
          case "REQUEST_DENIED":
            errorMessage = "Route request was denied. Please check API configuration."
            break
          case "INVALID_REQUEST":
            errorMessage = "Invalid route request. Please check your locations."
            break
        }

        setError(errorMessage)
        onRouteCalculated?.(null)
        console.error("Directions request failed:", status, result)
      }
    })
  }, [pickup, destination, stops, vehicleType, onRouteCalculated, isMapLoaded])

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
          <div ref={mapRef} className="w-full h-80 rounded-lg border-2 border-gray-200 bg-gray-100" />

          {!isMapLoaded && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Loading map...</p>
              </div>
            </div>
          )}

          {isLoading && isMapLoaded && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Calculating optimal route...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 bg-red-50 bg-opacity-90 flex items-center justify-center rounded-lg">
              <div className="text-center px-4">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Route Information */}
        {routeInfo && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Navigation className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800">Distance</p>
              <p className="text-xl font-bold text-blue-900">{routeInfo.distance}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800">Duration</p>
              <p className="text-xl font-bold text-green-900">{routeInfo.duration}</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <DollarSign className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-yellow-800">Est. Fare</p>
              <p className="text-xl font-bold text-yellow-900">{routeInfo.estimatedFare}</p>
            </div>
          </div>
        )}

        {/* Route Details */}
        <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Route Details:</h4>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
            <span className="font-medium text-gray-700">Pickup:</span>
            <span className="text-gray-900 font-semibold flex-1">{pickup.address}</span>
          </div>

          {stops
            .filter((stop) => stop.location && stop.isValid)
            .map((stop, index) => (
              <div key={stop.id} className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="font-medium text-gray-700">Stop {index + 1}:</span>
                <span className="text-gray-900 font-semibold flex-1">{stop.location!.address}</span>
              </div>
            ))}

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="font-medium text-gray-700">Destination:</span>
            <span className="text-gray-900 font-semibold flex-1">{destination.address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
