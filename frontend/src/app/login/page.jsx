"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import API from "@/lib/api";

const LoginPageContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Handle Google OAuth callback
  useEffect(() => {
    const token = searchParams.get("token");
    const userRole = searchParams.get("role");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError("Google login failed: " + errorParam);
      return;
    }

    if (token && userRole) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);

      if (userRole === "student") router.push("/attendance");
      else if (userRole === "teacher") router.push("/uploadAttendance");
    }
  }, [searchParams, router]);

  // 🧠 Manual Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/login", { email, password, role });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("role", role);

      alert("Login successful!");
      if (role === "student") router.push("/attendance");
      else router.push("/uploadAttendance");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // 🚀 Google OAuth redirect
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-96 p-6 bg-zinc-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-white text-center">Login</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm text-gray-400">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:border-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400">Role</label>
            <select
              className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded hover:bg-gray-300 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Wrap LoginPageContent inside Suspense
const LoginPage = () => (
  <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
    <LoginPageContent />
  </Suspense>
);

export default LoginPage;
