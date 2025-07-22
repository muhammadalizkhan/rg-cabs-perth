"use client"

import { MapPin, Navigation, Route } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationInput } from "@/components/locationInput/locationInput"
import type { TripData } from "@/types/location"
import { Stops } from "@/components/stopsManager/stopsManager"

interface TripSectionProps {
  title: string
  tripData: TripData
  onChange: (tripData: TripData) => void
  showCurrentLocation?: boolean
}

export function TripSection({ title, tripData, onChange, showCurrentLocation = false }: TripSectionProps) {
  const updatePickup = (pickup: any) => {
    onChange({ ...tripData, pickup })
  }

  const updateDestination = (destination: any) => {
    onChange({ ...tripData, destination })
  }

  const updateStops = (stops: any) => {
    onChange({ ...tripData, stops })
  }

  return (
    <Card className="border-2 border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-black flex items-center gap-2">
          <Route className="h-5 w-5 text-black" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <LocationInput
          label="Pickup Location"
          value={tripData.pickup}
          onChange={updatePickup}
          placeholder="Enter pickup address in Perth"
          showCurrentLocation={showCurrentLocation}
          icon={<MapPin className="h-4 w-4 text-green-600" />}
        />

        <Stops stops={tripData.stops} onChange={updateStops} />

        <LocationInput
          label="Destination"
          value={tripData.destination}
          onChange={updateDestination}
          placeholder="Enter destination in Perth"
          icon={<Navigation className="h-4 w-4 text-red-600" />}
        />
      </CardContent>
    </Card>
  )
}
