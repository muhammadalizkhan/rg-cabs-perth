"use client"

import { Plus, Trash2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LocationInput } from "@/components/locationInput/locationInput"
import type { Stop, LocationData } from "@/types/location"


interface StopsProps {
  stops: Stop[]
  onChange: (stops: Stop[]) => void
  title?: string
}

export function Stops({ stops, onChange, title = "Stops" }: StopsProps) {
  const addStop = () => {
    const newStop: Stop = {
      id: `stop-${Date.now()}`,
      location: null,
    }
    onChange([...stops, newStop])
  }

  const removeStop = (id: string) => {
    onChange(stops.filter((stop) => stop.id !== id))
  }

  const updateStop = (id: string, location: LocationData | null) => {
    onChange(stops.map((stop) => (stop.id === id ? { ...stop, location } : stop)))
  }

  return (
    <div className="space-y-4">
      {stops.length > 0 && (
        <div className="space-y-4">
          {stops.map((stop, index) => (
            <div key={stop.id} className="flex gap-3 items-end">
              <div className="flex-1">
                <LocationInput
                  label={`${title} ${index + 1}`}
                  value={stop.location}
                  onChange={(location) => updateStop(stop.id, location)}
                  placeholder={`Enter ${title.toLowerCase()} ${index + 1} location in Perth`}
                  icon={<MapPin className="h-4 w-4 text-orange-600" />}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeStop(stop.id)}
                className="h-12 px-3 text-red-600 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 bg-white transition-all duration-200"
                title="Remove this stop"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {stops.length < 3 && (
        <Button
          type="button"
          variant="outline"
          onClick={addStop}
          className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 text-black bg-white transition-all duration-200 font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {title} ({stops.length}/3)
        </Button>
      )}
    </div>
  )
}
