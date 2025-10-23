"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import toast from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const QRScanner = () => {
  const [token, setToken] = useState(null);
  const [qrData, setQRData] = useState(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);

  const scannerRef = useRef(null);

  // Fetch token once
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("Access denied: No token detected");
    }
  }, []);

  // Handle QR scan
  const handleScan = useCallback(
    (data) => {
      if (!data || isDataSent) return;

      const extractedData = extractQRData(data);
      if (extractedData) {
        setQRData(extractedData);
        sendQRDataToAPI(extractedData);
        setIsDataSent(true);
      } else {
        setError("Invalid QR code format");
      }
    },
    [isDataSent, token] // dependencies
  );

  const extractQRData = (data) => {
    const match = data.match(/Roll No:\s*(\d+),\s*Event:\s*([\w\s]+)/);
    if (match) return { qrData: `${match[1]}, ${match[2].trim()}` };
    return null;
  };

  const sendQRDataToAPI = async (qrData) => {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/attendance/qr-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(qrData),
      });

      if (!response.ok) throw new Error("Failed to send QR data");

      toast.success("QR data sent successfully!");
      stopScanning();
    } catch (err) {
      console.error("Error sending QR data:", err.message);
      setError("Failed to send QR data");
    } finally {
      cleanQRData();
    }
  };

  const cleanQRData = () => {
    setQRData(null);
    setIsDataSent(false);
  };

  // Start / stop scanning
  const startScanning = () => setScanning(true);
  const stopScanning = () => setScanning(false);

  // Initialize / clear scanner
  useEffect(() => {
    if (scanning) {
      scannerRef.current = new Html5QrcodeScanner("reader", { fps: 5, qrbox: 300 });
      scannerRef.current.render(
        handleScan,
        (err) => console.error("QR Scanner Error:", err)
      );
    } else {
      scannerRef.current?.clear();
    }

    return () => {
      scannerRef.current?.clear();
    };
  }, [scanning, handleScan]);

  return (
    <div className="w-full max-w-md p-5 bg-zinc-900 border border-zinc-800 shadow-lg rounded-lg text-white">
      <h2 className="text-2xl font-semibold text-emerald-400 mb-4">QR Scanner</h2>

      <div id="reader" className="bg-zinc-800 p-4 rounded-md"></div>

      {qrData && (
        <p className="mt-4 text-emerald-400 font-medium">
          Scanned QR Data: {qrData.qrData}
        </p>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      <div className="mt-4 flex gap-4">
        {!scanning ? (
          <button
            onClick={startScanning}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-md transition"
          >
            Start Scanning
          </button>
        ) : (
          <button
            onClick={stopScanning}
            className="w-full bg-red-600 hover:bg-red-500 text-white p-2 rounded-md transition"
          >
            Stop Scanning
          </button>
        )}
      </div>
    </div>
  );
};

const page = () => {
  return (
    <SidebarProvider className="bg-black">
      <AppSidebar />
      <SidebarInset className="flex justify-center items-center w-full p-6">
        <QRScanner />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default page;
