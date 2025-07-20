import { Users, MapPin, Shield, Clock } from "lucide-react"

export default function AboutUs() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-yellow-500">RG Cab</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Australia's trusted premium taxi service with a network of professional drivers committed to safe, reliable,
            and comfortable transportation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="mb-8">
              <div className="text-6xl lg:text-7xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-xl text-gray-600 font-medium">Professional Drivers</div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Serving Australia Nationwide</h3>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Our extensive network of 200+ professional drivers provides premium taxi services across all major
              Australian cities. We're committed to delivering safe, reliable, and comfortable transportation 24/7.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-700">Licensed and insured drivers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-700">Premium vehicle fleet</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-700">24/7 customer support</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Users className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50k+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <MapPin className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Australian Cities</div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Shield className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Safety Rating</div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
