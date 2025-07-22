import type { LocationCoordinates, LocationDetails } from '@/types/location'
import { google } from 'google-maps'

export class LocationServices {
  private static geocoder: google.maps.Geocoder | null = null
  private static placesService: google.maps.places.PlacesService | null = null

  static initializeServices() {
    if (window.google && window.google.maps) {
      this.geocoder = new google.maps.Geocoder()
      // Create a dummy map for PlacesService
      const dummyMap = new google.maps.Map(document.createElement('div'))
      this.placesService = new google.maps.places.PlacesService(dummyMap)
    }
  }

  static getCurrentLocation(): Promise<LocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    })
  }

  static async reverseGeocode(coordinates: LocationCoordinates): Promise<LocationDetails | null> {
    if (!this.geocoder) {
      this.initializeServices()
      if (!this.geocoder) return null
    }

    return new Promise((resolve) => {
      this.geocoder!.geocode(
        { location: coordinates },
        (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const result = results[0]
            resolve({
              address: result.formatted_address,
              coordinates,
              placeId: result.place_id,
              types: result.types
            })
          } else {
            resolve(null)
          }
        }
      )
    })
  }

  static isPerthLocation(place: google.maps.places.PlaceResult): boolean {
    if (!place.geometry || !place.geometry.location) return false
    
    const location = place.geometry.location
    const lat = location.lat()
    const lng = location.lng()
    
    // Perth metropolitan area bounds (approximate)
    const perthBounds = {
      north: -31.6,
      south: -32.3,
      east: 116.2,
      west: 115.5
    }
    
    return lat >= perthBounds.south && 
           lat <= perthBounds.north && 
           lng >= perthBounds.west && 
           lng <= perthBounds.east
  }

  static calculateFare(distanceKm: number, durationMin: number, vehicleType: string = 'sedan'): number {
    const baseFares = {
      sedan: 5.5,
      suv: 8.0,
      van: 12.0,
      luxury: 15.0
    }
    
    const perKmRates = {
      sedan: 2.2,
      suv: 2.8,
      van: 3.5,
      luxury: 4.0
    }
    
    const baseFare = baseFares[vehicleType as keyof typeof baseFares] || baseFares.sedan
    const perKmRate = perKmRates[vehicleType as keyof typeof perKmRates] || perKmRates.sedan
    
    // Add time-based component (per minute)
    const timeRate = 0.5
    const timeFare = durationMin * timeRate
    
    return baseFare + (distanceKm * perKmRate) + timeFare
  }
}
