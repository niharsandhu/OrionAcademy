import CollegeMap from "@/components/CollegeMap";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">College Campus Map</h1>
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <CollegeMap />
      </div>
    </div>
  );
}
