export default function StatsSection() {
    return (
      <section className="w-full py-12 md:py-24 bg-black text-white">
        <div className="px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 border-4 border-gray-800 py-8 rounded-lg">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-4xl font-bold">98%</div>
              <div className="text-sm text-gray-400 text-center">Attendance Rate</div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-4xl font-bold">50+</div>
              <div className="text-sm text-gray-400 text-center">Active Clubs</div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-4xl font-bold">1000+</div>
              <div className="text-sm text-gray-400 text-center">Students</div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-4xl font-bold">100+</div>
              <div className="text-sm text-gray-400 text-center">Events/Year</div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  