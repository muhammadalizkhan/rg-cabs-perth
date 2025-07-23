"use client"

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString("en-AU")}</p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* About Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Service</h2>
            <p>
              We are Australia's most trusted premium taxi service with 200+ professional drivers serving Perth and
              allow Custom Request for all cities nationwide. We provide safe, reliable, and comfortable transportation
              24/7.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
            <ul className="mb-4 space-y-1">
              <li>• Name, phone number, and email address</li>
              <li>• Account registration details</li>
              <li>• Emergency contact information</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trip Information</h3>
            <ul className="mb-4 space-y-1">
              <li>• Pickup and drop-off locations</li>
              <li>• Trip history, dates, and times</li>
              <li>• Route information and GPS data during trips</li>
              <li>• Driver and vehicle details</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Information</h3>
            <ul className="mb-4 space-y-1">
              <li>• Payment method details</li>
              <li>• Transaction records and receipts</li>
              <li>• Billing information</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Information</h3>
            <ul className="space-y-1">
              <li>• Device type and operating system</li>
              <li>• App usage data</li>
              <li>• IP address and location data</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="space-y-2">
              <li>• Process taxi booking requests</li>
              <li>• Match you with available drivers in Perth</li>
              <li>• Handle custom requests for other cities nationwide</li>
              <li>• Process payments after trip completion</li>
              <li>• Provide customer support and trip tracking</li>
              <li>• Send booking confirmations and receipts</li>
              <li>• Ensure safety and security of all users</li>
              <li>• Improve our services and app functionality</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">With Drivers</h3>
            <p className="mb-4">
              We share your name, pickup location, destination, and contact details with assigned drivers to complete
              your trip.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">With Service Providers</h3>
            <p className="mb-4">
              We work with trusted third parties for payment processing, mapping services, and customer support.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Requirements</h3>
            <p>We may share information when required by law or to protect the safety of our users and drivers.</p>
          </section>

          {/* Payment Processing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Processing</h2>
            <p>
              We accept payment after trip completion. All payment information is processed securely through encrypted
              systems. We do not store your complete payment details on our servers.
            </p>
          </section>

          {/* Location Data */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Location Data</h2>
            <p>
              We collect location data to provide our taxi service, including pickup and drop-off locations, route
              tracking during trips, and matching you with nearby drivers. Location data is only collected when you're
              using our service.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p>
              We protect your information using industry-standard security measures including encryption, secure
              servers, and limited access controls. However, no system is completely secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="mb-2">Under Australian privacy law, you can:</p>
            <ul className="space-y-1">
              <li>• Access your personal information</li>
              <li>• Request corrections to inaccurate data</li>
              <li>• Request deletion of your information</li>
              <li>• Withdraw consent for optional processing</li>
              <li>• Lodge complaints with privacy authorities</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <p>
              We keep your information for as long as necessary to provide our services and comply with legal
              requirements. Trip records are retained for 7 years for tax and regulatory purposes.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or want to exercise your privacy rights, contact us:
            </p>
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

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes through our
              app or by email. Continued use of our service after changes means you accept the updated policy.
            </p>
          </section>

          {/* Footer */}
          <section className="border-t pt-8 text-center text-gray-500">
            <p>© 2024 RG Cabs Perth. All rights reserved.</p>
            <p className="mt-2">This Privacy Policy complies with the Privacy Act 1988 (Cth).</p>
          </section>
        </div>
      </div>
    </div>
  )
}
