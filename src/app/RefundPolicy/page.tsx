"use client"

export default function RefundPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString("en-AU")}</p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p>
              We strive to provide excellent service. If you're not satisfied with your trip, we offer refunds under
              specific circumstances outlined below.
            </p>
          </section>

          {/* Eligible Refunds */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligible for Refund</h2>
            <ul className="space-y-2">
              <li>• Driver no-show after 15 minutes without notification</li>
              <li>• Significant route deviation without passenger consent</li>
              <li>• Vehicle breakdown during trip</li>
              <li>• Overcharging or billing errors</li>
              <li>• Service not provided as booked</li>
              <li>• Safety concerns or unprofessional driver behavior</li>
            </ul>
          </section>

          {/* Not Eligible */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Eligible for Refund</h2>
            <ul className="space-y-2">
              <li>• Passenger no-show or late cancellation</li>
              <li>• Traffic delays or road closures</li>
              <li>• Weather-related delays</li>
              <li>• Change of mind after trip completion</li>
              <li>• Disputes over fare calculation (unless billing error)</li>
              <li>• Trips completed as requested</li>
            </ul>
          </section>

          {/* Cancellation Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
            <ul className="space-y-2">
              <li>• Free cancellation before driver dispatch</li>
              <li>• Free cancellation within 2 minutes of booking</li>
              <li>• $5 cancellation fee if driver is en route</li>
              <li>• $10 cancellation fee if driver has arrived</li>
              <li>• No refund for passenger no-show</li>
            </ul>
          </section>

          {/* How to Request */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
            <ol className="space-y-2">
              <li>1. Contact us within 24 hours of your trip</li>
              <li>2. Provide your booking reference number</li>
              <li>3. Explain the reason for your refund request</li>
              <li>4. Include any supporting evidence (photos, screenshots)</li>
              <li>5. We'll review and respond within 2 business days</li>
            </ol>
          </section>

          {/* Processing Time */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Time</h2>
            <ul className="space-y-2">
              <li>• Cash payments: Immediate refund or credit</li>
              <li>• Card payments: 3-5 business days</li>
              <li>• Digital wallet: 1-3 business days</li>
              <li>• Bank transfer: 5-7 business days</li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="mb-4">To request a refund or ask questions:</p>
            <div className="space-y-2">
              <p><strong>Phone:</strong> +61 435 287 287</p>
              <p><strong>Email:</strong> rgcabsperth@gmail.com</p>
              <p><strong>Hours:</strong> Available 24/7</p>
            </div>
          </section>

          {/* Footer */}
          <section className="border-t pt-8 text-center text-gray-500">
            <p>© 2024 RG Cabs Perth. All rights reserved.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
