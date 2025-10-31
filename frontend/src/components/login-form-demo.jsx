"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupFormDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
        role,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login successful!");

      if (role === "student") router.push("/attendance");
      else if (role === "teacher") router.push("/uploadAttendance");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // 🚀 Google OAuth Redirect
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black text-white">
      <h2 className="font-bold text-xl text-neutral-200">Welcome Back</h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-300">
        Login to your account
      </p>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-3 h-[1px] w-full" />

      <form className="my-8" onSubmit={handleLogin}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="role">Select Role</Label>
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700 rounded-md shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 text-white"
          >
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
            <option value="teacher">Teacher</option>
          </select>
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
      </form>

      {/* 🔹 Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-zinc-700"></div>
        <span className="px-3 text-sm text-zinc-400">OR</span>
        <div className="flex-1 h-px bg-zinc-700"></div>
      </div>

      {/* 🔹 Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition duration-200"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        Continue with Google
      </button>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);
