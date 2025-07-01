"use client";
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import toast from "react-hot-toast";

const UploadAttendance = () => {
  const [token, setToken] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (storedToken) {
      setToken(storedToken);
    } else {
      setMessage("Access denied: No token detected");
    }
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("xlsxFile", file);

    try {
      const response = await fetch("http://localhost:3000/attendance/upload-excel", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Attendance uploaded successfully!");
        setMessage("");
      } else {
        setMessage(data.message || "Failed to upload attendance.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full p-6 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4">Upload Attendance</h2>
          <p className="mb-4 text-gray-400">Upload an Excel file with student attendance data.</p>

          <div className="mb-6 p-4 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Excel Format</h3>
            <p className="mb-4 text-gray-400">Your Excel file should have the following columns:</p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-2 text-left text-gray-300">Roll No</th>
                  <th className="p-2 text-left text-gray-300">Course</th>
                  <th className="p-2 text-left text-gray-300">Date</th>
                  <th className="p-2 text-left text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-2 text-gray-400">1</td>
                  <td className="p-2 text-gray-400">Mathematics</td>
                  <td className="p-2 text-gray-400">2023-10-01</td>
                  <td className="p-2 text-gray-400">Present</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2 text-gray-400">2</td>
                  <td className="p-2 text-gray-400">Physics</td>
                  <td className="p-2 text-gray-400">2023-10-01</td>
                  <td className="p-2 text-gray-400">Absent</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="w-full p-3 bg-black/50 border border-white/10 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <button
            onClick={handleUpload}
            className="w-full bg-white hover:bg-slate-200 text-black py-2 rounded-md transition"
          >
            Upload File
          </button>

          {message && <p className="mt-4 text-red-400">{message}</p>}
        </div>

        <div className="mt-6 p-4 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-2">Instructions</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Ensure the Excel file is in the correct format.</li>
            <li>Only .xlsx or .xls files are accepted.</li>
            <li>Verify the data before uploading to avoid errors.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <SidebarProvider className="bg-black min-h-screen flex">
      <AppSidebar />
      <SidebarInset className="w-full p-6">
        <UploadAttendance />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
