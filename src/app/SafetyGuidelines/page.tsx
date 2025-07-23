"use client"

export default function SafetyGuidelines() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Guidelines</h1>
          <p className="text-gray-600">Your safety is our top priority</p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* Our Commitment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Safety Commitment</h2>
            <p>
              We maintain the highest safety standards with 200+ professional drivers, regular vehicle inspections, and
              comprehensive background checks. Your safety is our responsibility.
            </p>
          </section>

          {/* Before Your Trip */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Before Your Trip</h2>
            <ul className="space-y-2">
              <li>• Verify driver and vehicle details in the app</li>
              <li>• Check the license plate matches your booking</li>
              <li>• Share your trip details with someone you trust</li>
              <li>• Wait in a safe, well-lit location</li>
              <li>• Have your phone charged and accessible</li>
            </ul>
          </section>

          {/* During Your Trip */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">During Your Trip</h2>
            <ul className="space-y-2">
              <li>• Wear your seatbelt at all times</li>
              <li>• Sit in the back seat when traveling alone</li>
              <li>• Keep your belongings secure</li>
              <li>• Stay alert and aware of your route</li>
              <li>• Trust your instincts - speak up if something feels wrong</li>
              <li>• Don't share personal information unnecessarily</li>
            </ul>
          </section>

          {/* Emergency Procedures */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Procedures</h2>
            <ul className="space-y-2">
              <li>• Call 000 for immediate emergencies</li>
              <li>• Use our in-app emergency button</li>
              <li>• Contact us immediately: +61 435 287 287</li>
              <li>• Ask the driver to stop in a safe, public location</li>
              <li>• Exit the vehicle if you feel unsafe</li>
            </ul>
          </section>

          {/* Driver Standards */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Driver Standards</h2>
            <ul className="space-y-2">
              <li>• Licensed and insured professional drivers</li>
              <li>• Comprehensive background checks</li>
              <li>• Regular vehicle safety inspections</li>
              <li>• Ongoing safety training</li>
              <li>• Zero tolerance for unsafe behavior</li>
              <li>• 24/7 monitoring and support</li>
            </ul>
          </section>

          {/* Vehicle Safety */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Safety</h2>
            <ul className="space-y-2">
              <li>• All vehicles undergo regular safety inspections</li>
              <li>• GPS tracking on all vehicles</li>
              <li>• Emergency equipment in every vehicle</li>
              <li>• Clean and well-maintained fleet</li>
              <li>• Child safety seats available upon request</li>
            </ul>
          </section>

          {/* Reporting Issues */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reporting Safety Issues</h2>
            <p className="mb-4">Report any safety concerns immediately:</p>
            <ul className="space-y-2">
              <li>• Use the in-app report feature</li>
              <li>• Call our 24/7 safety line: +61 435 287 287</li>
              <li>• Email: rgcabsperth@gmail.com</li>
              <li>• All reports are investigated promptly</li>
              <li>• Your identity is protected when reporting</li>
            </ul>
          </section>

          {/* Special Circumstances */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Circumstances</h2>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Late Night Travel</h3>
            <ul className="mb-4 space-y-1">
              <li>• Extra verification of driver details</li>
              <li>• Share trip details with friends/family</li>
              <li>• Stay alert and avoid falling asleep</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Traveling with Children</h3>
            <ul className="mb-4 space-y-1">
              <li>• Request child safety seats in advance</li>
              <li>• Ensure children are properly secured</li>
              <li>• Keep children supervised at all times</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Emergencies</h3>
            <ul className="space-y-1">
              <li>• Call 000 immediately</li>
              <li>• Inform the driver of the situation</li>
              <li>• Request to go to the nearest hospital</li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Contact</h2>
            <div className="bg-red-50 p-6 rounded-lg">
              <p className="mb-4">
                <strong>For immediate emergencies: Call 000</strong>
              </p>
              <div className="space-y-2">
                <p>
                  <strong>24/7 Safety Line:</strong> +61 435 287 287
                </p>
                <p>
                  <strong>Email:</strong> rgcabsperth@gmail.com
                </p>
                <p>
                  <strong>Address:</strong> 580 Hay Street Perth Australia
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
