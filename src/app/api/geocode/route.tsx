import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const type = searchParams.get("type") || "search"
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  if (!query && type === "search") {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  if ((!lat || !lon) && type === "reverse") {
    return NextResponse.json({ error: "Lat and lon parameters are required for reverse geocoding" }, { status: 400 })
  }

  try {
    let url = ""

    if (type === "reverse") {
      url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
    } else {
      // Remove country restriction to allow global search
      url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query!)}&limit=8&addressdetails=1&bounded=0`
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "RideBookingApp/1.0",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Geocoding error:", error)
    return NextResponse.json({ error: "Failed to fetch location data" }, { status: 500 })
  }
}
