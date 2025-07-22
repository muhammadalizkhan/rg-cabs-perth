// Simple Google Maps loader
export class GoogleMapsLoader {
  private static isLoaded = false
  private static isLoading = false
  private static loadPromise: Promise<void> | null = null

  static async load(): Promise<void> {
    if (this.isLoaded) return Promise.resolve()
    if (this.isLoading && this.loadPromise) return this.loadPromise

    this.isLoading = true
    this.loadPromise = new Promise((resolve, reject) => {
      // Check if already loaded
      if (window.google && window.google.maps) {
        this.isLoaded = true
        this.isLoading = false
        resolve()
        return
      }

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      if (!apiKey) {
        reject(new Error("Google Maps API key is missing"))
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true

      script.onload = () => {
        this.isLoaded = true
        this.isLoading = false
        resolve()
      }

      script.onerror = () => {
        this.isLoading = false
        reject(new Error("Failed to load Google Maps"))
      }

      document.head.appendChild(script)
    })

    return this.loadPromise
  }

  static isGoogleMapsLoaded(): boolean {
    return this.isLoaded && window.google && window.google.maps
  }
}
