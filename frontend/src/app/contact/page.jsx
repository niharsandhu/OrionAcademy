import ContactForm from "@/components/contact-form"
import { Meteors } from "@/components/meteors"
import NavBar from "@/components/NavBar"

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-black text-white relative overflow-hidden px-4">
        <div className="max-w-6xl mx-auto py-12 relative z-10">
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
              style={{
                textShadow: "2px 2px 4px rgba(255,255,255,0.2)",
              }}
            >
              Contact Nova Academy
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Have questions about your journey to the stars? We're here to help guide your path to success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                <p className="text-gray-400">
                  Ready to begin your cosmic journey? Fill out the form and our team will respond within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-400">contact@nova-academy.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-gray-400">123 Stellar Street, Cosmos City</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl -z-10 backdrop-blur-xl" />
              <div className="p-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        <Meteors />
      </div>
    </>

  )
}

