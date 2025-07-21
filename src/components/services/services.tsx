"use client"

import Link from "next/link"
import {
  Plane,
  Building2,
  MapPin,
  Heart,
  Calendar,
  Route,
  ArrowRight,
  Clock,
  Shield,
  Star,
  Car,
  Package,
  Baby,
  Accessibility,
} from "lucide-react"
import { useRouter } from 'next/navigation'


const services = [
  {
    id: 1,
    title: "Airport Transfers Perth",
    description:
      "Professional airport pickup and drop-off services with flight tracking and punctual arrivals to all Perth terminals.",
    icon: Plane,
    color: "from-blue-500 to-cyan-500",
    features: ["Flight Tracking", "Meet & Greet", "24/7 Available"],
    price: "From $55",
    href: "/AirportTransfersPerth",
    popular: true,
  },
  {
    id: 2,
    title: "Corporate Transfer",
    description:
      "Executive business transportation with premium vehicles and professional service for corporate clients and meetings.",
    icon: Building2,
    color: "from-gray-700 to-gray-900",
    features: ["Executive Vehicles", "Priority Booking", "Business Accounts"],
    price: "From $65",
    href: "/Corporate",
    popular: false,
  },
  {
    id: 3,
    title: "Tours/Day Trips",
    description:
      "Explore Perth's beautiful attractions with guided tour services and knowledgeable local drivers for sightseeing adventures.",
    icon: MapPin,
    color: "from-green-500 to-emerald-500",
    features: ["Local Guides", "Flexible Routes", "Photo Stops"],
    price: "From $150/hr",
    href: "/ToursandTrips",
    popular: false,
  },
  {
    id: 4,
    title: "PerthTaxiVan",
    description:
      "Spacious group transportation with large vehicles perfect for families, events, and group outings around Perth.",
    icon: Car,
    color: "from-pink-500 to-rose-500",
    features: ["Large Capacity", "Group Bookings", "Event Transport"],
    price: "From $105",
    href: "/PerthTaxiVan",
    popular: false,
  },
  {
    id: 5,
    title: "Social Event",
    description:
      "Group transportation for parties, concerts, sporting events, and celebrations with flexible scheduling and safe returns.",
    icon: Calendar,
    color: "from-purple-500 to-violet-500",
    features: ["Group Bookings", "Event Coordination", "Safe Returns"],
    price: "From $85",
    href: "/SocialEvent",
    popular: false,
  },
  {
    id: 6,
    title: "Special Occasion",
    description:
      "Premium transportation for weddings, anniversaries, and special celebrations with advance booking up to one year ahead.",
    icon: Heart,
    color: "from-red-500 to-orange-500",
    features: ["Advance Booking", "Special Events", "Premium Service"],
    price: "From $120",
    href: "/SpecialEvent",
    popular: false,
  },
  {
    id: 7,
    title: "Wheelchair Transfer",
    description:
      "Accessible transportation with wheelchair-friendly vehicles for medical appointments, shopping, and personal trips.",
    icon: Accessibility,
    color: "from-yellow-500 to-orange-500",
    features: ["Wheelchair Access", "Medical Trips", "Shopping Assistance"],
    price: "From $70",
    href: "/WheelchairTransfers",
    popular: false,
  },
  {
    id: 8,
    title: "Parcel Delivery",
    description:
      "Fast and reliable courier service for urgent deliveries, medical samples, documents, and packages across Perth.",
    icon: Package,
    color: "from-indigo-500 to-blue-500",
    features: ["ASAP Delivery", "Medical Samples", "Urgent Documents"],
    price: "From $35",
    href: "/ParcelDelivery",
    popular: false,
  },
  {
    id: 9,
    title: "FIFO Transfer",
    description:
      "Reliable fly-in fly-out transportation for mining and remote workers with 24/7 availability and regular schedules.",
    icon: Route,
    color: "from-teal-500 to-cyan-500",
    features: ["24/7 Service", "Regular Schedules", "Worker Transport"],
    price: "From $60",
    href: "/FIFOTransfer",
    popular: false,
  },
  {
    id: 10,
    title: "Baby Capsules",
    description:
      "Child-safe transportation with Australian safety standard compliant baby capsules and car seats for all ages.",
    icon: Baby,
    color: "from-emerald-500 to-green-500",
    features: ["Safety Certified", "All Ages", "Advance Booking"],
    price: "From $65",
    href: "/BabyCapsules",
    popular: false,
  },
]

export default function Services() {
  const router = useRouter()

  return (
    <section className="relative bg-gradient-to-b from-[#f8f9fa] to-white py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
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
            across Perth and surrounding areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-black/15 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {service.popular && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Popular
                  </div>
                )}

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                ></div>

                <div className="relative z-10 space-y-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{service.description}</p>

                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">{service.price}</div>
                      <Link
                        href={service.href}
                        className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-gray-900 group-hover:gap-2 transition-all duration-300"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:${service.color.replace("from-", "border-").replace("to-", "")} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>
              </div>
            )
          })}
        </div>

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

              <div className="flex flex-col items-center space-y-3 mt-6">
                <button
                  onClick={() => router.push('/contact')}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <Link
                  href="/AllServices"
                  className="text-yellow-500 hover:text-yellow-600 font-medium transition-colors duration-200 flex items-center group"
                >
                  View all Services
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
