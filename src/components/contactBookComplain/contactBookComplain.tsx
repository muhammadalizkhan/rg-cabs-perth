"use client"
import Link from "next/link"
import { Phone, Car, MessageSquareWarning, ArrowRight, Shield, Star } from "lucide-react"
import { useRouter } from "next/navigation"

const services = [
  {
    id: 1,
    title: "Contact Us",
    description:
      "Get in touch with our support team for any queries, questions, or assistance you need with our services.",
    icon: Phone,
    color: "from-blue-500 to-cyan-500",
    features: ["24/7 Support", "Quick Response", "Expert Help"],
    price: "Free Support",
    href: "/contact",
    popular: false,
  },
  {
    id: 2,
    title: "Book Now",
    description: "Book your taxi ride instantly. Quick, reliable, and convenient transportation at your fingertips.",
    icon: Car,
    color: "from-gray-700 to-gray-900",
    features: ["Instant Booking", "Real-time Tracking", "Multiple Vehicles"],
    price: "Book Ride",
    href: "/BookNow",
    popular: false,
  },
  {
    id: 3,
    title: "Complain",
    description:
      "Share your feedback or report any issues with our service. We value your input and address concerns promptly.",
    icon: MessageSquareWarning,
    color: "from-green-500 to-emerald-500",
    features: ["Quick Resolution", "Feedback System", "Priority Handling"],
    price: "Submit Issue",
    href: "/Complain",
    popular: false,
  },
]

export default function ContactBookComplain() {
  const router = useRouter()

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">Customer Support</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            How Can We
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent ml-4">
              Help You?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from the options below to get started. We're here to assist you with bookings, support, and feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
      </div>
    </section>
  )
}
