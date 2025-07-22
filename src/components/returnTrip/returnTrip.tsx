"use client"
import { MapPin, Navigation, Calendar, Clock, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationInput } from "@/components/locationInput/locationInput"
import { Stops } from "@/components/stopsManager/stopsManager"
import type { ReturnTripData, TripData } from "@/types/location"

interface ReturnTripSectionProps {
  returnTripData: ReturnTripData
  onChange: (returnTripData: ReturnTripData) => void
  outboundTrip?: TripData
  minDate?: string
}

export function ReturnTripSection({ returnTripData, onChange, outboundTrip, minDate }: ReturnTripSectionProps) {
  const generateTimeOptions = () => {
    const times = []
    for (let hour = 6; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        times.push(timeString)
      }
    }
    return times
  }

  const updatePickup = (pickup: any) => {
    onChange({ ...returnTripData, pickup })
  }

  const updateDestination = (destination: any) => {
    onChange({ ...returnTripData, destination })
  }

  const updateStops = (stops: any) => {
    onChange({ ...returnTripData, stops })
  }

  const updateDate = (date: string) => {
    onChange({ ...returnTripData, date })
  }

  const updateTime = (time: string) => {
    onChange({ ...returnTripData, time })
  }

  const autoFillFromOutbound = () => {
    if (outboundTrip?.pickup && outboundTrip?.destination) {
      onChange({
        ...returnTripData,
        pickup: outboundTrip.destination,
        destination: outboundTrip.pickup,
        stops: [],
      })
    }
  }

  return (
    <Card className="border-2 border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-black flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-black" />
          Return Trip Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {outboundTrip?.pickup && outboundTrip?.destination && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={autoFillFromOutbound}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Auto-fill from outbound trip (reverse)
            </button>
          </div>
        )}

        <div className="space-y-6">
          <LocationInput
            label="Return Pickup Location"
            value={returnTripData.pickup}
            onChange={updatePickup}
            placeholder="Enter return pickup address in Perth"
            icon={<MapPin className="h-4 w-4 text-green-600" />}
          />

          <Stops stops={returnTripData.stops} onChange={updateStops} title="Return Stops" />

          <LocationInput
            label="Return Destination"
            value={returnTripData.destination}
            onChange={updateDestination}
            placeholder="Enter return destination in Perth"
            icon={<Navigation className="h-4 w-4 text-red-600" />}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
          <div className="space-y-3">
            <Label className="text-base font-semibold text-black flex items-center gap-2">
              <Calendar className="h-4 w-4 text-black" />
              Return Date
            </Label>
            <Input
              type="date"
              value={returnTripData.date}
              onChange={(e) => updateDate(e.target.value)}
              min={minDate}
              className="h-12 text-sm font-medium bg-white border-2 border-gray-300 text-black hover:border-gray-400 focus:border-black transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold text-black flex items-center gap-2">
              <Clock className="h-4 w-4 text-black" />
              Return Time
            </Label>
            <Select value={returnTripData.time} onValueChange={updateTime} required>
              <SelectTrigger className="h-12 text-sm font-medium bg-white border-2 border-gray-300 text-black hover:border-gray-400 focus:border-black transition-all duration-200">
                <SelectValue placeholder="Select return time" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200">
                {generateTimeOptions().map((t) => (
                  <SelectItem key={t} value={t} className="text-black hover:bg-gray-50 focus:bg-gray-50">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
