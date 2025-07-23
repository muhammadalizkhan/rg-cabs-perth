
export default function CookiePolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString("en-AU")}</p>
        </div>
        <div className="space-y-12 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit our website or use our app. They help us
              provide a better experience and improve our services.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies</h3>
            <p className="mb-4">Required for our service to work properly. These cannot be disabled.</p>
            <ul className="mb-6 space-y-1">
              <li>- Login and authentication</li>
              <li>- Booking process functionality</li>
              <li>- Security and fraud prevention</li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Cookies</h3>
            <p className="mb-4">Help us understand how you use our service to improve performance.</p>
            <ul className="mb-6 space-y-1">
              <li>• Page load times and errors</li>
              <li>• Popular features and pages</li>
              <li>• App crash reports</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Functional Cookies</h3>
            <p className="mb-4">Remember your preferences and settings.</p>
            <ul className="mb-6 space-y-1">
              <li>• Language preferences</li>
              <li>• Location settings</li>
              <li>• Saved addresses</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
            <p className="mb-4">Help us understand user behavior to improve our service.</p>
            <ul className="space-y-1">
              <li>• Usage statistics</li>
              <li>• Popular routes and destinations</li>
              <li>• Service performance metrics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="mb-4">We use services from trusted partners that may set their own cookies:</p>
            <ul className="space-y-2">
              <li>• Google Maps for location services</li>
              <li>• Payment processors for secure transactions</li>
              <li>• Analytics services for service improvement</li>
              <li>• Customer support platforms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
            <p className="mb-4">You can control cookies through:</p>
            <ul className="space-y-2">
              <li>• Your browser settings</li>
              <li>• Our app privacy settings</li>
              <li>• Device privacy controls</li>
              <li>• Opting out of analytics services</li>
            </ul>
            <p className="mt-4">Note: Disabling essential cookies may affect the functionality of our service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions</h2>
            <p className="mb-4">Questions about our cookie policy?</p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> rgcabsperth@gmail.com
              </p>
              <p>
                <strong>Phone:</strong> +61 435 287 287
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
