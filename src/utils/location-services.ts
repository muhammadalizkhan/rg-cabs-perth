import type { LocationCoordinates, LocationDetails } from "@/types/location"

export class LocationServices {
  private static geocoder: google.maps.Geocoder | null = null
  private static placesService: google.maps.places.PlacesService | null = null
  private static isInitialized = false

  static async initializeServices(): Promise<boolean> {
    if (this.isInitialized) return true

    try {
      if (window.google && window.google.maps) {
        this.geocoder = new google.maps.Geocoder()
        const dummyMap = new google.maps.Map(document.createElement("div"))
        this.placesService = new google.maps.places.PlacesService(dummyMap)
        this.isInitialized = true
        return true
      }
      return false
    } catch (error) {
      console.error("Error initializing location services:", error)
      return false
    }
  }

  static getCurrentLocation(): Promise<LocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          let errorMessage = "Unable to get your location"
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied. Please enable location permissions."
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information unavailable."
              break
            case error.TIMEOUT:
              errorMessage = "Location request timed out."
              break
          }
          reject(new Error(errorMessage))
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 300000, 
        },
      )
    })
  }

  static async reverseGeocode(coordinates: LocationCoordinates): Promise<LocationDetails | null> {
    if (!this.geocoder) {
      await this.initializeServices()
      if (!this.geocoder) return null
    }

    return new Promise((resolve) => {
      this.geocoder!.geocode({ location: coordinates }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const result = results[0]
          resolve({
            address: result.formatted_address,
            coordinates,
            placeId: result.place_id,
            types: result.types,
          })
        } else {
          console.error("Reverse geocoding failed:", status)
          resolve(null)
        }
      })
    })
  }

  static isPerthLocation(coordinates: LocationCoordinates): boolean {
    const { lat, lng } = coordinates

    const perthBounds = {
      north: -31.6,
      south: -32.3,
      east: 116.2,
      west: 115.5,
    }

    return lat >= perthBounds.south && lat <= perthBounds.north && lng >= perthBounds.west && lng <= perthBounds.east
  }

  static async searchPlaces(query: string): Promise<LocationDetails[]> {
    if (!this.placesService || !query.trim()) return []

    return new Promise((resolve) => {
      const request = {
        query: query,
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(-32.3, 115.5), // Southwest Perth bounds
          new google.maps.LatLng(-31.6, 116.2), // Northeast Perth bounds
        ),
        fields: ["place_id", "formatted_address", "name", "geometry", "types"],
      }

      this.placesService!.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const perthResults = results
            .filter((place) => {
              if (!place.geometry?.location) return false
              const coords = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }
              return this.isPerthLocation(coords)
            })
            .map((place) => ({
              address: place.formatted_address || "",
              coordinates: {
                lat: place.geometry!.location!.lat(),
                lng: place.geometry!.location!.lng(),
              },
              placeId: place.place_id,
              name: place.name,
              types: place.types,
            }))
            .slice(0, 5) // Limit to 5 results

          resolve(perthResults)
        } else {
          resolve([])
        }
      })
    })
  }

  static calculateFare(distanceKm: number, durationMin: number, vehicleType = "sedan"): number {
    const baseFares = {
      sedan: 5.5,
      suv: 8.0,
      van: 12.0,
      luxury: 15.0,
    }

    const perKmRates = {
      sedan: 2.2,
      suv: 2.8,
      van: 3.5,
      luxury: 4.0,
    }

    const baseFare = baseFares[vehicleType as keyof typeof baseFares] || baseFares.sedan
    const perKmRate = perKmRates[vehicleType as keyof typeof perKmRates] || perKmRates.sedan

    // Add time-based component (per minute)
    const timeRate = 0.5
    const timeFare = durationMin * timeRate

    return baseFare + distanceKm * perKmRate + timeFare
  }
}
