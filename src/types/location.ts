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

export interface Stop {
  id: string
  location: LocationDetails | null
  isValid: boolean
}

export interface BookingLocation {
  pickup: LocationDetails | null
  destination: LocationDetails | null
  stops: Stop[]
}

export interface RouteInfo {
  distance: string
  duration: string
  estimatedFare: string
  totalDistanceKm: number
  totalDurationMin: number
}

export type LocationInputType = 'pickup' | 'destination' | 'stop'