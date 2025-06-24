"use client"
import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqData = [
  {
    id: 1,
    question: "How do I book a taxi?",
    answer:
      "You can book a taxi through our website, mobile app, or by calling our 24/7 hotline. Simply enter your pickup location, destination, and preferred time to get started.",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, PayPal, Apple Pay, Google Pay, and cash payments. Payment is processed securely through our encrypted system.",
  },
  {
    id: 3,
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify your booking up to 15 minutes before the scheduled pickup time without any charges. Cancellations within 15 minutes may incur a small fee.",
  },
  {
    id: 4,
    question: "Are your drivers licensed and insured?",
    answer:
      "All our drivers are fully licensed, background-checked, and insured. We maintain the highest safety standards and regularly train our drivers for professional service.",
  },
  {
    id: 5,
    question: "Do you operate 24/7?",
    answer:
      "Yes, RG Cab operates 24 hours a day, 7 days a week across all major Australian cities. Our customer support is also available round the clock.",
  },
  {
    id: 6,
    question: "What areas do you service?",
    answer:
      "We provide taxi services across 15+ major Australian cities including Sydney, Melbourne, Brisbane, Perth, Adelaide, and many more regional areas.",
  },
  {
    id: 7,
    question: "How much does a ride cost?",
    answer:
      "Our pricing varies by vehicle type and distance. Economy rides start from $25, Premium from $35, and Luxury from $55. You'll see the exact fare before confirming your booking.",
  },
  {
    id: 8,
    question: "Can I request a specific driver?",
    answer:
      "While we can't guarantee specific drivers, you can add preferences in your booking notes. Our system will try to accommodate your request when possible.",
  },
]

export default function FAQs() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about RG Cab services. Can't find the answer you're looking for?
            <span className="text-black font-medium"> Contact our support team.</span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-1">
          {faqData.map((faq) => (
            <div key={faq.id} className="border-b border-gray-100 last:border-b-0">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full py-8 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors duration-200 group"
              >
                <span className="text-lg lg:text-xl font-medium text-gray-900 pr-8 group-hover:text-black transition-colors duration-200">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  {openItems.includes(faq.id) ? (
                    <Minus className="w-5 h-5 text-gray-600 transition-transform duration-200" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-600 transition-transform duration-200" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems.includes(faq.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-8 pr-8">
                  <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Still have questions?</span>
          </div>
          <div className="mt-4">
            <button className="text-black font-medium hover:text-gray-700 transition-colors duration-200">
              Get in touch with our team →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
