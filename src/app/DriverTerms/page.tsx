"use client"

export default function DriverTerms() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Driver Terms</h1>
          <p className="text-gray-600">Terms and conditions for professional drivers</p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-700 leading-relaxed">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p>
              These terms apply to all drivers working with our premium taxi service. By joining our network of 200+
              professional drivers, you agree to maintain our high standards of service.
            </p>
          </section>

          {/* Requirements */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Driver Requirements</h2>
            <ul className="space-y-2">
              <li>• Valid Australian driver's license (minimum 2 years)</li>
              <li>• Current taxi driver authority/license</li>
              <li>• Clean driving record</li>
              <li>• Pass background check and police clearance</li>
              <li>• Vehicle registration and comprehensive insurance</li>
              <li>• Professional appearance and conduct</li>
            </ul>
          </section>

          {/* Vehicle Standards */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Standards</h2>
            <ul className="space-y-2">
              <li>• Vehicle must be less than 10 years old</li>
              <li>• Regular safety inspections required</li>
              <li>• Clean interior and exterior at all times</li>
              <li>• Working air conditioning and heating</li>
              <li>• GPS navigation system</li>
              <li>• Emergency equipment (first aid kit, fire extinguisher)</li>
            </ul>
          </section>

          {/* Service Standards */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Standards</h2>
            <ul className="space-y-2">
              <li>• Arrive within 10 minutes of estimated time</li>
              <li>• Maintain professional appearance and behavior</li>
              <li>• Assist passengers with luggage when needed</li>
              <li>• Follow the most efficient route unless directed otherwise</li>
              <li>• Keep vehicle clean and odor-free</li>
              <li>• Respect passenger privacy and comfort</li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
            <ul className="space-y-2">
              <li>• Commission-based payment structure</li>
              <li>• Weekly payment processing</li>
              <li>• Direct bank deposit payments</li>
              <li>• Detailed trip and earnings reports provided</li>
              <li>• Fuel and vehicle maintenance are driver responsibility</li>
            </ul>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Activities</h2>
            <ul className="space-y-2">
              <li>• Refusing rides based on destination or passenger</li>
              <li>• Operating under the influence of drugs or alcohol</li>
              <li>• Using mobile phone while driving (except hands-free)</li>
              <li>• Smoking in the vehicle</li>
              <li>• Inappropriate behavior toward passengers</li>
              <li>• Operating without proper licenses or insurance</li>
            </ul>
          </section>

          {/* Safety Requirements */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Requirements</h2>
            <ul className="space-y-2">
              <li>• Follow all traffic laws and regulations</li>
              <li>• Report accidents or incidents immediately</li>
              <li>• Complete mandatory safety training</li>
              <li>• Maintain first aid certification</li>
              <li>• Use GPS tracking system at all times</li>
              <li>• Report safety concerns promptly</li>
            </ul>
          </section>

          {/* Performance Standards */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Standards</h2>
            <ul className="space-y-2">
              <li>• Maintain minimum 4.5-star passenger rating</li>
              <li>• Accept at least 80% of trip requests</li>
              <li>• Complete trips as requested</li>
              <li>• Respond to dispatch within 2 minutes</li>
              <li>• Maintain regular availability schedule</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="mb-4">We may terminate your driver agreement for:</p>
            <ul className="space-y-2">
              <li>• Violation of these terms</li>
              <li>• Poor performance or low ratings</li>
              <li>• Safety violations or incidents</li>
              <li>• Fraudulent activity</li>
              <li>• Loss of required licenses or insurance</li>
            </ul>
            <p className="mt-4">Drivers may terminate their agreement with 14 days written notice.</p>
          </section>

          {/* Support */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Driver Support</h2>
            <p className="mb-4">We provide 24/7 support for our drivers:</p>
            <div className="space-y-2">
              <p>
                <strong>Driver Hotline:</strong> +61 435 287 287
              </p>
              <p>
                <strong>Email:</strong> rgcabsperth@gmail.com
              </p>
              <p>
                <strong>Office:</strong> 580 Hay Street Perth Australia
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