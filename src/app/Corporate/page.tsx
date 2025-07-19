"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Briefcase,
    Clock,
    Users,
    Calendar,
    Target,
    TrendingUp,
    Coffee,
    MapPin,
    CheckCircle,
    ArrowRight,
    Building,
    Handshake,
} from "lucide-react"
import ContactUs from "@/components/contactUs/contactUs"

export default function CorporateTransferPage() {
    return (
        <div className="min-h-screen bg-white">
            <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-black/10 rounded-full text-black text-sm font-medium mb-6">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Professional Business Transportation
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
                            Corporate Transfer
                            <span className="block text-3xl md:text-4xl font-semibold">Business Travel Solutions</span>
                        </h1>
                        <p className="text-xl text-black/80 mb-8 max-w-4xl mx-auto leading-relaxed">
                            Our Perth corporate transfer is becoming more and more popular among business travelers looking for a
                            reliable and flexible transfer service that offers an easygoing, yet professional style.
                        </p>
                        <Button
                            size="lg"
                            className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
                        >
                            Book Corporate Transfer
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-black mb-4">Professional Business Transport</h2>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            We understand how conferences, meetings, and business retreats operate on a precise schedule. We'll get
                            you to your destination quickly and professionally.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                                    <Clock className="w-8 h-8 text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-4">Precise Scheduling</h3>
                                <p className="text-gray-700">
                                    We understand business operates on tight schedules. Count on us for punctual, reliable service that
                                    respects your time.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                                    <Handshake className="w-8 h-8 text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-4">Professional Style</h3>
                                <p className="text-gray-700">
                                    Easygoing yet professional service that maintains the right balance for business travelers and
                                    corporate events.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6">
                                    <Users className="w-8 h-8 text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-4">Team Transportation</h3>
                                <p className="text-gray-700">
                                    From individual executives to entire teams, we can accommodate your group size and transport everyone
                                    together.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="rounded-2xl p-8">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-black mb-4">Corporate Services We Provide</h3>
                            <p className="text-lg text-gray-700">
                                We make ourselves available to transfer your team wherever you're looking to go.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: Building, title: "Conferences", desc: "Professional conference transportation" },
                                { icon: Handshake, title: "Business Meetings", desc: "Reliable meeting transfers" },
                                { icon: Coffee, title: "Corporate Retreats", desc: "Team retreat transportation" },
                                { icon: Target, title: "Sales Events", desc: "Sales meeting and event transport" },
                                { icon: TrendingUp, title: "Team Building", desc: "Team building event transfers" },
                                { icon: MapPin, title: "Golf Outings", desc: "Corporate golf event transport" },
                                { icon: Calendar, title: "Scheduled Transfers", desc: "Regular business transfers" },
                                { icon: CheckCircle, title: "Custom Solutions", desc: "Tailored corporate transport" },
                            ].map((service, index) => (
                                <Card key={index} className="bg-white hover:shadow-md transition-all duration-300 border border-gray-200">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                                            <service.icon className="w-6 h-6 text-black" />
                                        </div>
                                        <h4 className="font-bold text-black mb-2">{service.title}</h4>
                                        <p className="text-gray-600 text-sm">{service.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <ContactUs />
            <section className="py-16 bg-gradient-to-r from-yellow-400 to-amber-500">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                        Ready for Professional Corporate Transport?
                    </h2>
                    <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
                        Join the growing number of businesses who trust us for reliable, professional transportation services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-lg font-semibold"
                        >
                            Book Corporate Transfer
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
