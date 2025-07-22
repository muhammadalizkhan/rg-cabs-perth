export const config = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,

  perthBounds: {
    north: -31.6,
    south: -32.3,
    east: 116.2,
    west: 115.5,
  },

  maxStops: 5,
  maxPassengers: 20,

  business: {
    name: "RG Cabs Perth Transfers",
    phone: "+61 435 287 287",
    email: "rgcabsperth@gmail.com",
  },
}
