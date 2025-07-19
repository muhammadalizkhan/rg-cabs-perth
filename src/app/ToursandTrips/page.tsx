"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Camera,
  Clock,
  Wine,
  TreePine,
  Building,
  Utensils,
  Mountain,
  CheckCircle,
  ArrowRight,
  Compass,
  Star,
} from "lucide-react"

export default function ToursTripsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-black/10 rounded-full text-black text-sm font-medium mb-6">
              <Compass className="w-4 h-4 mr-2" />
              Perth Sightseeing & Day Trip Specialists
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Tours & Day Trips
              <span className="block text-3xl md:text-4xl font-semibold">Discover Beautiful Perth</span>
            </h1>
            <p className="text-xl text-black/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Nobody should visit Perth and fail to see all of the sights in and around this beautiful city! Allow us to
              help you fit in the sightseeing you've been waiting for. We can arrange for a few hours or a full day,
              depending on your schedule.
            </p>
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
            >
              Plan Your Tour
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Personalized Perth Tours</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We can arrange a tour to suit your needs and fulfill your desired plans with safety. From a few hours to a
              full day adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Flexible Duration</h3>
                <p className="text-gray-700">
                  Choose from a few hours of sightseeing to a full day adventure. We adapt to your schedule and
                  preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Custom Itineraries</h3>
                <p className="text-gray-700">
                  Tailored tours to suit your interests. Visit the attractions you want to see at your own pace with our
                  local expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Safe & Comfortable</h3>
                <p className="text-gray-700">
                  Professional drivers with local knowledge ensure your tour is safe, comfortable, and informative
                  throughout.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Popular Perth Destinations</h3>
              <p className="text-lg text-gray-700">
                Discover the best of Perth and surrounding areas with our guided tours and day trips.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Wine, title: "Swan Valley", desc: "Wine tasting and vineyard tours" },
                { icon: Utensils, title: "Fremantle", desc: "Historic port city and lunch destinations" },
                { icon: Building, title: "Crown Casino", desc: "Entertainment and dining complex" },
                { icon: TreePine, title: "Kings Park", desc: "Magnificent botanical gardens and views" },
                { icon: Camera, title: "Rottnest Island", desc: "Ferry connections and island tours" },
                { icon: Mountain, title: "Perth Hills", desc: "Scenic drives and nature experiences" },
                { icon: Star, title: "City Highlights", desc: "Perth CBD and cultural attractions" },
                { icon: MapPin, title: "Custom Destinations", desc: "Any attraction you want to visit" },
              ].map((destination, index) => (
                <Card
                  key={index}
                  className="bg-white hover:shadow-md transition-all duration-300 border border-gray-200"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                      <destination.icon className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="font-bold text-black mb-2">{destination.title}</h4>
                    <p className="text-gray-600 text-sm">{destination.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Tour Options</h2>
            <p className="text-lg text-gray-700">Choose the perfect tour duration for your Perth adventure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Half Day Tours</h3>
                  <p className="text-gray-700">Perfect for a quick sightseeing experience</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">2-4 hours duration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">1-2 major attractions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">Flexible timing</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">Perfect for busy schedules</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Full Day Tours</h3>
                  <p className="text-gray-700">Complete Perth experience with multiple stops</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">6-8 hours duration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">Multiple attractions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">Lunch stops included</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">Comprehensive experience</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-yellow-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Explore Perth?</h2>
          <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
            Don't miss out on Perth's beautiful sights and attractions. Let us create the perfect tour experience for
            you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg font-semibold"
            >
              Arrange Your Tour
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg rounded-lg bg-transparent"
            >
              Call: (08) 1234 5678
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
