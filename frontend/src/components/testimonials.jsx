import { Star } from "lucide-react"

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-black text-white border-4 border-white rounded-2xl">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Mission Reports</h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our stellar students about their journey through the academic cosmos
            </p>
          </div>
        </div>
        <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Student Explorer",
              year: "Final Year",
              quote: "The platform has made tracking my academic progress so much easier. I always know where I stand!",
              rating: 5,
            },
            {
              name: "Space Cadet",
              year: "Second Year",
              quote: "Never miss an important event or notice. The notification system is truly out of this world!",
              rating: 5,
            },
            {
              name: "Star Navigator",
              year: "Third Year",
              quote:
                "From attendance to assignments, everything is just a click away. It's like having mission control in my pocket!",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col p-6 space-y-4 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm"
            >
              <div className="flex space-x-1">
                {Array(testimonial.rating)
                  .fill(null)
                  .map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
              </div>
              <p className="flex-1 text-gray-400">"{testimonial.quote}"</p>
              <div>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-gray-400">{testimonial.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

