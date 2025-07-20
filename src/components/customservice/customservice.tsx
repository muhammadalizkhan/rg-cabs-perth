"use client"

import { Clock, Shield, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

export default function CustomService() {
  const router = useRouter()

  return (
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
              onClick={() => router.push("/contact")}
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
  )
}
