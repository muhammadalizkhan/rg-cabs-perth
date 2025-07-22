"use client"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LocationInput } from "@/components/locationInput/locationInput"
import type { Stop, LocationDetails } from "@/types/location"

interface StopsManagerProps {
  stops: Stop[]
  onChange: (stops: Stop[]) => void
  disabled?: boolean
}

export function StopsManager({ stops, onChange, disabled = false }: StopsManagerProps) {
  const addStop = () => {
    const newStop: Stop = {
      id: `stop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      location: null,
      isValid: false,
    }
    onChange([...stops, newStop])
  }

  const removeStop = (stopId: string) => {
    onChange(stops.filter((stop) => stop.id !== stopId))
  }

  const updateStop = (stopId: string, location: LocationDetails | null) => {
    const updatedStops = stops.map((stop) => (stop.id === stopId ? { ...stop, location, isValid: !!location } : stop))
    onChange(updatedStops)
  }

  return (
    <div className="space-y-4">
      {stops.length > 0 && (
        <div className="space-y-4">
          {stops.map((stop, index) => (
            <div key={stop.id} className="relative">
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <LocationInput
                    label={`Stop ${index + 1}`}
                    type="stop"
                    value={stop.location}
                    onChange={(location) => updateStop(stop.id, location)}
                    placeholder={`Enter stop ${index + 1} location in Perth`}
                    disabled={disabled}
                    showCurrentLocation={false}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => removeStop(stop.id)}
                  disabled={disabled}
                  className="h-14 px-4 border-2 border-red-200 text-red-600 hover:border-red-400 hover:bg-red-50"
                  title="Remove this stop"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {stops.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={addStop}
          disabled={disabled}
          className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-teal-500 hover:bg-teal-50 text-gray-700 hover:text-teal-700 bg-transparent"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Stop {stops.length > 0 ? `(${stops.length}/5)` : "(Optional)"}
        </Button>
      )}

      {stops.length >= 5 && <p className="text-sm text-gray-500 text-center">Maximum 5 stops allowed</p>}
    </div>
  )
}
