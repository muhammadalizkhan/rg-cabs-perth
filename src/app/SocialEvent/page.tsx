"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Users, Music, Trophy, Heart, Wine, Shield, Clock, MapPin, CheckCircle, ArrowRight, PartyPopper, Car, UserCheck } from 'lucide-react'

export default function SocialEventPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-black/10 rounded-full text-black text-sm font-medium mb-6">
              <PartyPopper className="w-4 h-4 mr-2" />
              Group Event Transportation Specialists
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Social Event
              <span className="block text-3xl md:text-4xl font-semibold">Group Transportation</span>
            </h1>
            <p className="text-xl text-black/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              Planning to gather a group of people for a concert, music festival, sporting event, or family gathering? 
              You don't want to cram everyone into the same car. Book a Perth taxi and give yourself full peace of mind.
            </p>
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
            >
              Book Event Transport
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Why Choose Our Social Event Service?</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We are here to serve as your designated driver so that everyone can have a drink without the worry of driving home.
            </p>
          </div>

          <div className="bg-white grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Comfortable Group Travel</h3>
                <p className="text-gray-700">
                  Everyone can travel with plenty of personal space. No more cramming into small cars - enjoy comfort 
                  and convenience for your entire group.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Designated Driver Service</h3>
                <p className="text-gray-700">
                  Everyone can enjoy themselves without worrying about driving home. We ensure safe, responsible 
                  transportation for your entire party.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Door-to-Door Service</h3>
                <p className="text-gray-700">
                  We'll pick you up, allow you to ride in comfort, drop you at the door, and safely return you to 
                  your accommodations.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Perfect For All Social Events</h3>
              <p className="text-lg text-gray-700">
                From intimate gatherings to large celebrations, we've got your transportation covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Music, title: "Concerts", desc: "Live music events and performances" },
                { icon: PartyPopper, title: "Music Festivals", desc: "Multi-day festival transportation" },
                { icon: Trophy, title: "Sporting Events", desc: "Games, matches, and tournaments" },
                { icon: Heart, title: "Family Gatherings", desc: "Reunions and family celebrations" },
                { icon: Wine, title: "Wine Tours", desc: "Vineyard visits and tastings" },
                { icon: UserCheck, title: "Birthday Parties", desc: "Special birthday celebrations" },
                { icon: Car, title: "Night Out", desc: "Bar hopping and nightlife" },
                { icon: CheckCircle, title: "Special Occasions", desc: "Weddings, anniversaries, and more" },
              ].map((event, index) => (
                <Card key={index} className="bg-white hover:shadow-md transition-all duration-300 border border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                      <event.icon className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="font-bold text-black mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-sm">{event.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-yellow-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Ready to Make Your Event Stress-Free?
          </h2>
          <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
            Let us handle the transportation so you can focus on enjoying your special event with friends and family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg font-semibold"
            >
              Book Event Transport
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg rounded-lg bg-transparent"
            >
              Call: (08) 1234 5678
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
