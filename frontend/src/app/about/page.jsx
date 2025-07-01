import { TracingBeamDemo } from "@/components/tracing-brea"
import NavBar from "@/components/NavBar"
import { RocketIcon as RocketLaunch, Target, Users, Building2, Award, Lightbulb } from "lucide-react"
import Image from "next/image"
import Footer from "@/components/Footer"
import { Cover } from "@/components/ui/cover";
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-black text-white mx-12  ">
        {/* Hero Section */}
        <section className="relative w-full py-20 overflow-hidden">
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-white from-neutral-800 via-white to-white">
            All in one student dashboard <br /> at <Cover>Nova Academy</Cover>
          </h1>
          <h1 className="text-xl font-bold tracking-tighter text-center text-white/50">
            Pioneering Education Beyond Boundaries
            <br />
          </h1>
          <p className="text-gray-400 md:text-xl text-center pt-3">
            Nova Academy is where traditional education meets future innovation. We're not just a college; we're a launchpad for the next generation of pioneers. With cutting-edge technology, AI-driven tools, and a student-first approach, we empower learners to excel in academics, streamline attendance with facial recognition, and engage in dynamic events—all in one seamless platform. At Nova Academy, education isn't just about learning; it's about evolving, innovating, and shaping the future. 🚀
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="w-full py-12 md:py-24 border-t border-white/10">
          <div className="px-12 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col space-y-4 border border-gray-200 p-5 rounded-lg">
                <div className="p-3 rounded-full bg-white/5 w-fit">
                  <RocketLaunch className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-gray-400">
                  To create an educational ecosystem that empowers students to reach for the stars, fostering innovation,
                  critical thinking, and personal growth through cutting-edge technology and personalized learning
                  experiences.
                </p>
              </div>
              <div className="flex flex-col space-y-4 border border-gray-200 p-5 rounded-lg">
                <div className="p-3 rounded-full bg-white/5 w-fit">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
                <p className="text-gray-400">
                  To be the leading institution in transformative education, where every student's potential is unleashed
                  to create positive impact in the world, just as explorers chart new territories in space.
                </p>
              </div>
              <div className="flex flex-col space-y-4 border border-gray-200 p-5 rounded-lg">
                <div className="p-3 rounded-full bg-white/5 w-fit">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Our Values</h2>
                <p className="text-gray-400">
                  At Nova Academy, we believe in fostering a culture of curiosity, integrity, and collaboration.
                  We empower students with the tools to innovate, learn without limits, and embrace challenges
                  as opportunities for growth. Our commitment to technology and student success drives everything we do.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Timeline */}

        {/* Campus Features */}
        <section className="w-full py-12 md:py-24 border-t border-white/10">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Our Space Station</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Tech Labs",
                  description: "State-of-the-art laboratories equipped with the latest technology",
                  icon: <Building2 className="w-6 h-6" />,
                },
                {
                  title: "Learning Pods",
                  description: "Modern classroom spaces designed for collaborative learning",
                  icon: <Users className="w-6 h-6" />,
                },
                {
                  title: "Research Centers",
                  description: "Advanced facilities for cutting-edge research and development",
                  icon: <Award className="w-6 h-6" />,
                },
              ].map((facility, index) => (
                <div
                  key={index}
                  className="flex flex-col p-6 space-y-4 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm"
                >
                  <div className="p-3 rounded-full bg-white/5 w-fit">{facility.icon}</div>
                  <h3 className="text-xl font-bold">{facility.title}</h3>
                  <p className="text-gray-400">{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <TracingBeamDemo />
        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 border-t border-white/10">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Join Our Mission?</h2>
              <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed">
                Embark on a journey of discovery and innovation with Nova Academy
              </p>
              <a href='/EventHeadDashboard'>
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-white/90">
                  Create Event
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

