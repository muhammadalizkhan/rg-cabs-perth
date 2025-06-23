import {
  Plane,
  Building2,
  MapPin,
  Heart,
  Calendar,
  Stethoscope,
  ShoppingBag,
  Route,
  ArrowRight,
  Clock,
  Shield,
  Star,
} from "lucide-react"

const services = [
  {
    id: 1,
    title: "Airport Transfers",
    description: "Seamless pickup and drop-off services to all major airports with flight tracking and meet & greet.",
    icon: Plane,
    color: "from-blue-500 to-cyan-500",
    features: ["Flight Tracking", "Meet & Greet", "24/7 Available"],
    price: "From $45",
    popular: true,
  },
  {
    id: 2,
    title: "Corporate Transfers",
    description:
      "Professional business transportation with executive vehicles and priority booking for corporate clients.",
    icon: Building2,
    color: "from-gray-700 to-gray-900",
    features: ["Executive Vehicles", "Priority Booking", "Business Accounts"],
    price: "From $35",
    popular: false,
  },
  {
    id: 3,
    title: "City Tours",
    description: "Explore Australia's beautiful cities with our guided tour services and knowledgeable local drivers.",
    icon: MapPin,
    color: "from-green-500 to-emerald-500",
    features: ["Local Guides", "Flexible Routes", "Photo Stops"],
    price: "From $80/hr",
    popular: false,
  },
  {
    id: 4,
    title: "Wedding Transportation",
    description: "Make your special day perfect with luxury wedding cars and professional chauffeur services.",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    features: ["Luxury Vehicles", "Decoration Options", "Multiple Trips"],
    price: "From $150",
    popular: false,
  },
  {
    id: 5,
    title: "Event Transportation",
    description: "Group transportation for concerts, sports events, and special occasions with flexible scheduling.",
    icon: Calendar,
    color: "from-purple-500 to-violet-500",
    features: ["Group Bookings", "Event Coordination", "Flexible Timing"],
    price: "From $60",
    popular: false,
  },
  {
    id: 6,
    title: "Medical Appointments",
    description:
      "Reliable and comfortable transportation for medical visits with assistance and wheelchair accessibility.",
    icon: Stethoscope,
    color: "from-red-500 to-orange-500",
    features: ["Wheelchair Access", "Medical Assistance", "Insurance Billing"],
    price: "From $25",
    popular: false,
  },
  {
    id: 7,
    title: "Shopping & Leisure",
    description: "Convenient rides to shopping centers, restaurants, and entertainment venues with wait time options.",
    icon: ShoppingBag,
    color: "from-yellow-500 to-orange-500",
    features: ["Wait Time Options", "Multiple Stops", "Shopping Assistance"],
    price: "From $20",
    popular: false,
  },
  {
    id: 8,
    title: "Long Distance Travel",
    description: "Comfortable intercity travel with premium vehicles for longer journeys across Australia.",
    icon: Route,
    color: "from-indigo-500 to-blue-500",
    features: ["Premium Comfort", "Rest Stops", "Intercity Routes"],
    price: "From $120",
    popular: false,
  },
]

export default function Services() {
  return (
    <section className="relative bg-gradient-to-b from-[#f8f9fa] to-white py-20 lg:py-28 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">Premium Services</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Our
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent ml-4">
              Services
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From airport transfers to special events, we provide premium transportation solutions tailored to your needs
            across Australia.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Popular
                  </div>
                )}

                {/* Gradient background overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                ></div>

                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{service.description}</p>

                    {/* Features */}
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">{service.price}</div>
                      <button className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-gray-900 group-hover:gap-2 transition-all duration-300">
                        Book Now
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover effect border */}
                <div
                  className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:${service.color.replace("from-", "border-").replace("to-", "")} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">24/7 Available</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Fully Insured</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">4.9/5 Rating</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900">Need a custom service?</h3>

              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer personalized transportation solutions for any occasion. Contact us to discuss your specific
                requirements.
              </p>

              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                Get Custom Quote
                <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
