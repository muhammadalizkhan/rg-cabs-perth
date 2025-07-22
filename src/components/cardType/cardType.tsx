"use client"

import { Car } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { VehicleType } from "@/types/location"

interface VehicleTypeCardProps {
  selectedVehicle: VehicleType | null
  onChange: (vehicle: VehicleType) => void
}

const vehicleTypes: VehicleType[] = [
  { id: "1", name: "Paying Driver" },
  { id: "2", name: "PTTS Card" },
  { id: "3", name: "Cabcharge" },
  { id: "4", name: "Credit Card" },
  { id: "5", name: "Cash" },
]

export function VehicleTypeCard({ selectedVehicle, onChange }: VehicleTypeCardProps) {
  return (
    <Card className="border-2 border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-black flex items-center gap-2">
          <Car className="h-5 w-5 text-black" />
          Select Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {vehicleTypes.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => onChange(vehicle)}
              type="button"
              className={`w-full py-3 px-4 text-sm font-medium rounded-lg border transition-all duration-150 ${
                selectedVehicle?.id === vehicle.id
                  ? "border-black bg-gray-100 text-black"
                  : "border-gray-300 text-gray-600 hover:border-black"
              }`}
            >
              {vehicle.name}
            </button>
          ))}
        </div>

        {selectedVehicle && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 text-sm text-green-800 font-medium">
            ✓ Selected: {selectedVehicle.name}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
