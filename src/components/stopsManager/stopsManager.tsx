"use client"

import { Plus, Trash2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LocationInput } from "@/components/locationInput/locationInput"
import type { Stop, LocationData } from "@/types/location"

interface StopsProps {
  stops: Stop[]
  onChange: (stops: Stop[]) => void
}

export function Stops({ stops, onChange }: StopsProps) {
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
      {stops.map((stop, index) => (
        <div key={stop.id} className="flex gap-2 items-end">
          <div className="flex-1">
            <LocationInput
              label={`Stop ${index + 1}`}
              value={stop.location}
              onChange={(location) => updateStop(stop.id, location)}
              placeholder="Enter stop location in Perth"
              icon={<MapPin className="h-5 w-5 text-orange-600" />}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => removeStop(stop.id)}
            className="h-14 px-4 text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      ))}

      {stops.length < 3 && (
        <Button
          type="button"
          variant="outline"
          onClick={addStop}
          className="w-full h-12 border-dashed border-gray-300 hover:border-teal-500 bg-transparent"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Stop ({stops.length}/3)
        </Button>
      )}
    </div>
  )
}
