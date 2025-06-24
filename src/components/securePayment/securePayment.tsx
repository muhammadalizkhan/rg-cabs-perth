"use client"
import { Shield, Check, Star} from "lucide-react"


export default function SecurePayment() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Pay Your Way</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We accept all popular payment methods in Australia. Book your ride now and pay the driver using your
            preferred method at the end of your journey.
          </p>
        </div>
        <div className="bg-gray-50 rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How Payment Works</h3>
            <p className="text-lg text-gray-600">Simple, secure, and convenient payment process</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Book Your Ride</h4>
              <p className="text-gray-600 text-sm">No payment required during booking</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Enjoy Your Trip</h4>
              <p className="text-gray-600 text-sm">Relax while our driver takes you safely</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Choose Payment</h4>
              <p className="text-gray-600 text-sm">Select your preferred payment method</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                4
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Pay & Go</h4>
              <p className="text-gray-600 text-sm">Complete payment and receive receipt</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="h-6 w-6 text-yellow-400" />
              <span className="text-yellow-400 font-medium">100% Secure</span>
            </div>

            <h3 className="text-3xl font-bold mb-4">Ready to Book Your Ride?</h3>
            <p className="text-gray-300 mb-8 text-lg">
              No upfront payment required. Choose from all major Australian payment methods when you complete your
              journey.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <span>No booking fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <span>Pay after your ride</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <span>All methods accepted</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">4.9/5</span>
              </div>
              <p className="text-gray-400">
                Trusted by <span className="text-white font-semibold">50,000+</span> customers across Australia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
