"use client"

import { Car, Users, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { VehicleType } from "@/types/location"

interface VehicleTypeCardProps {
  selectedVehicle: VehicleType | null
  onChange: (vehicle: VehicleType) => void
}

const vehicleTypes: VehicleType[] = [
  {
    id: "1",
    name: "Card 1",
  },
  {
    id: "2",
    name: "Card Two",
  
  },
  {
    id: "3",
    name: "Card 3",
   
  },
  {
    id: "4",
    name: "Card Four"
  },
    {
        id: "5",
        name: "Other",
    },
]

export function VehicleTypeCard({ selectedVehicle, onChange }: VehicleTypeCardProps) {
  return (
    <Card className="border-2 border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-black flex items-center gap-2">
          <Car className="h-5 w-5 text-black" />
          Select Card type
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {vehicleTypes.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => onChange(vehicle)}
              className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
                selectedVehicle?.id === vehicle.id ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {selectedVehicle?.id === vehicle.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}

              <div className="space-y-3">
               
                <div>
                  <h3 className="font-semibold text-black text-base">{vehicle.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedVehicle && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 font-medium">
              ✓ Selected: {selectedVehicle.name}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
