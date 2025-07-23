"use client"
export default function TermsOfService() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString("en-AU")}</p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* About */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Service</h2>
            <p>
              We operate Australia's most trusted premium taxi service with 200+ professional drivers serving Perth and
              custom requests for all cities nationwide. By using our service, you agree to these terms.
            </p>
          </section>

          {/* Using Our Service */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Using Our Service</h2>
            <ul className="space-y-2">
              <li>• You must be 18 or older to book rides</li>
              <li>• Provide accurate pickup and drop-off information</li>
              <li>• Be ready at your pickup location on time</li>
              <li>• Treat drivers and vehicles with respect</li>
              <li>• Follow all local laws and regulations</li>
            </ul>
          </section>

          {/* Bookings */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bookings</h2>
            <p className="mb-4">
              We provide taxi services primarily in Perth. Custom requests for other cities are subject to availability
              and additional terms.
            </p>
            <ul className="space-y-2">
              <li>• Bookings are confirmed when a driver accepts your request</li>
              <li>• You can cancel bookings before driver arrival</li>
              <li>• Late cancellations may incur fees</li>
              <li>• We reserve the right to refuse service</li>
            </ul>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment</h2>
            <ul className="space-y-2">
              <li>• Payment is due after trip completion</li>
              <li>• We accept cash, card, and digital payments</li>
              <li>• Fares are calculated based on distance and time</li>
              <li>• Additional charges may apply for waiting time or special requests</li>
              <li>• All payments are final unless disputed within 24 hours</li>
            </ul>
          </section>

          {/* Prohibited Use */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Use</h2>
            <p className="mb-2">You may not:</p>
            <ul className="space-y-2">
              <li>• Use our service for illegal activities</li>
              <li>• Harass, threaten, or abuse drivers</li>
              <li>• Damage vehicles or property</li>
              <li>• Provide false information</li>
              <li>• Use our service if you're intoxicated or disruptive</li>
            </ul>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Liability</h2>
            <p className="mb-4">
              We provide transportation services through independent drivers. While we maintain insurance coverage, our
              liability is limited to the maximum extent permitted by law.
            </p>
            <p>
              We are not responsible for lost items, delays due to traffic or weather, or disputes between passengers
              and drivers.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use
              your information.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of our service means you accept any changes.
              We'll notify you of significant updates.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Termination</h2>
            <p>
              We may suspend or terminate your account if you violate these terms. You can delete your account at any
              time through our app or by contacting us.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p>
              These terms are governed by Australian law. Any disputes will be resolved in the courts of Western
              Australia.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="mb-4">Questions about these terms? Contact us:</p>
            <div className="space-y-2">
              <p>
                <strong>Phone:</strong> +61 435 287 287
              </p>
              <p>
                <strong>Email:</strong> rgcabsperth@gmail.com
              </p>
              <p>
                <strong>Address:</strong> 580 Hay Street Perth Australia
              </p>
              <p>
                <strong>Hours:</strong> Available 24/7
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
