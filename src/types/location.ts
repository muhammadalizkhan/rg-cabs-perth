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

export interface TripData {
  pickup: LocationData | null
  destination: LocationData | null
  stops: Stop[]
}

export interface ReturnTripData {
  pickup: LocationData | null
  destination: LocationData | null
  stops: Stop[]
  date: string
  time: string
}

export interface VehicleType {
  id: string
  name: string
}

export interface RouteData {
  distance: string
  duration: string
  fare: string
}

export interface RouteInfo {
  distance: string
  duration: string
  estimatedFare: string
  totalDistanceKm: number
  totalDurationMin: number
}

export interface BookingData {
  outboundTrip: {
    pickup: string
    pickupCoordinates: LocationCoordinates
    destination: string
    destinationCoordinates: LocationCoordinates
    stops: Array<{
      address: string
      coordinates: LocationCoordinates
    }>
  }
  returnTrip?: {
    pickup: string | null
    pickupCoordinates: LocationCoordinates | null
    destination: string | null
    destinationCoordinates: LocationCoordinates | null
    stops: Array<{
      address: string
      coordinates: LocationCoordinates
    }>
    date: string
    time: string
  } | null
  hasReturnTrip: boolean
  vehicleType: VehicleType
  date: string
  time: string
  passengers: number
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests?: string
  routeInfo?: RouteData | null
}

export type LocationInputType = "pickup" | "destination" | "stop"

export interface ValidationError {
  field: string
  message: string
}

export interface FormState {
  isValid: boolean
  errors: ValidationError[]
}

export interface BookingResponse {
  success: boolean
  message: string
  bookingId?: string
  error?: string
}
