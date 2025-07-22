export interface LocationCoordinates {
  lat: number
  lng: number
}

export interface LocationDetails {
  address: string
  coordinates: LocationCoordinates
  placeId?: string
  name?: string
  types?: string[]
}

export interface RouteInfo {
  distance: string
  duration: string
  estimatedFare: string
  totalDistanceKm: number
  totalDurationMin: number
}

export type LocationInputType = "pickup" | "destination" | "stop" | undefined

export interface LocationData {
  address: string
  lat: number
  lng: number
  placeId?: string
}

export interface Stop {
  id: string
  location: LocationData | null
  isValid?: boolean
}

export interface RouteData {
  distance: string
  duration: string
  fare: string
}
