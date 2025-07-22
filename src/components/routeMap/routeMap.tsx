"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Route, Navigation, Clock, DollarSign } from "lucide-react"
import { GoogleMapsLoader } from "@/lib/googlemaps"
import type { TripData, RouteData } from "@/types/location"

interface RouteMapProps {
  outboundTrip: TripData
  returnTrip?: TripData | null
  onRouteChange?: (route: RouteData | null) => void
}

export function RouteMap({ outboundTrip, returnTrip, onRouteChange }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any | null>(null)
  const directionsService = useRef<any | null>(null)
  const directionsRenderer = useRef<any | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initMap = async () => {
      try {
        await GoogleMapsLoader.load()

        if (!mapRef.current) return

        mapInstance.current = new google.maps.Map(mapRef.current, {
          zoom: 11,
          center: { lat: -31.9505, lng: 115.8605 },
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

        directionsService.current = new google.maps.DirectionsService()
        directionsRenderer.current = new google.maps.DirectionsRenderer({
          polylineOptions: {
            strokeColor: "#000000",
            strokeWeight: 3,
            strokeOpacity: 0.8,
          },
          markerOptions: {
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: "#000000",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          },
        })

        directionsRenderer.current.setMap(mapInstance.current)
      } catch (err) {
        setError("Failed to load map")
      }
    }

    initMap()
  }, [])

  useEffect(() => {
    if (!outboundTrip.pickup || !outboundTrip.destination || !directionsService.current) {
      setRouteData(null)
      onRouteChange?.(null)
      return
    }

    setIsLoading(true)
    setError(null)

    const waypoints = outboundTrip.stops
      .filter((stop) => stop.location)
      .map((stop) => ({
        location: new google.maps.LatLng(stop.location!.lat, stop.location!.lng),
        stopover: true,
      }))

    const request: any = {
      origin: new google.maps.LatLng(outboundTrip.pickup.lat, outboundTrip.pickup.lng),
      destination: new google.maps.LatLng(outboundTrip.destination.lat, outboundTrip.destination.lng),
      waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    }

    directionsService.current.route(request, (result: any, status: any) => {
      setIsLoading(false)

      if (status === "OK" && result) {
        directionsRenderer.current?.setDirections(result)

        let totalDistance = 0
        let totalDuration = 0

        result.routes[0].legs.forEach((leg: any) => {
          totalDistance += leg.distance?.value || 0
          totalDuration += leg.duration?.value || 0
        })

        // If return trip exists, double the values
        if (returnTrip && returnTrip.pickup && returnTrip.destination) {
          totalDistance *= 2
          totalDuration *= 2
        }

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
  }, [outboundTrip, returnTrip, onRouteChange])

  if (!outboundTrip.pickup || !outboundTrip.destination) {
    return (
      <Card className="border-2 border-gray-200 bg-white shadow-sm">
        <CardContent className="p-8 text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Enter pickup and destination to see route</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-black flex items-center gap-2">
          <Route className="h-5 w-5 text-black" />
          Route Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div ref={mapRef} className="w-full h-64 rounded-lg bg-gray-100 border border-gray-200" />
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm font-medium text-black">Calculating route...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 bg-red-50 flex items-center justify-center rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {routeData && (
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Navigation className="h-4 w-4 text-black mx-auto mb-1" />
              <p className="text-xs text-gray-600 font-medium">Distance</p>
              <p className="text-sm font-bold text-black">{routeData.distance}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Clock className="h-4 w-4 text-black mx-auto mb-1" />
              <p className="text-xs text-gray-600 font-medium">Duration</p>
              <p className="text-sm font-bold text-black">{routeData.duration}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <DollarSign className="h-4 w-4 text-black mx-auto mb-1" />
              <p className="text-xs text-gray-600 font-medium">Est. Fare</p>
              <p className="text-sm font-bold text-black">{routeData.fare}</p>
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-black mb-2">Route Details:</h4>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
            <span className="font-medium text-black">From:</span>
            <span className="text-gray-700 text-xs">{outboundTrip.pickup.address}</span>
          </div>
          {outboundTrip.stops
            .filter((s) => s.location)
            .map((stop, i) => (
              <div key={stop.id} className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0" />
                <span className="font-medium text-black">Stop {i + 1}:</span>
                <span className="text-gray-700 text-xs">{stop.location!.address}</span>
              </div>
            ))}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0" />
            <span className="font-medium text-black">To:</span>
            <span className="text-gray-700 text-xs">{outboundTrip.destination.address}</span>
          </div>
          {returnTrip && returnTrip.pickup && returnTrip.destination && (
            <div className="pt-2 mt-2 border-t border-gray-300">
              <p className="text-xs font-medium text-black mb-1">Return Trip Included</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
