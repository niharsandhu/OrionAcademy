"use client";
import { Rocket, Calendar, GraduationCap, Bell } from "lucide-react"
import { SparklesHeading } from "./sparkle-heading"
import React from "react";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/glowing-stars";

export function GlowingStarsBackgroundCardPreview() {
  return (
    <div className="flex py-20 items-center justify-center antialiased">
      <GlowingStarsBackgroundCard>
        <GlowingStarsTitle>Next.js 14</GlowingStarsTitle>
        <div className="flex justify-between items-end">
          <GlowingStarsDescription>
            The power of full-stack to the frontend. Read the release notes.
          </GlowingStarsDescription>
          <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
            <Icon />
          </div>
        </div>
      </GlowingStarsBackgroundCard>
    </div>
  );
}

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-4 w-4 text-white stroke-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
};

export default function SparkleTitle() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-24 bg-white text-black">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <p className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-md/relaxed">
              Your all-in-one command center for academic excellence. Track your journey through the academic cosmos.
            </p>
            <SparklesHeading />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center space-y-4 p-6 border border-white/10 rounded-lg bg-black backdrop-blur-sm">
            <div className="p-3 rounded-full bg-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white ">Academic Records</h3>
            <p className="text-gray-400 text-center">Track your marks and academic performance across all subjects</p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 border border-white/10 rounded-lg bg-black backdrop-blur-sm">
            <div className="p-3 rounded-full bg-white">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Attendance Tracker</h3>
            <p className="text-gray-400 text-center">Monitor your attendance and maintain your academic orbit</p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 border border-white/10 rounded-lg bg-black backdrop-blur-sm">
            <div className="p-3 rounded-full bg-white">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Campus Events</h3>
            <p className="text-gray-400 text-center">
              Stay updated with latest events and activities in your academic universe
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 border border-white/10 rounded-lg bg-black backdrop-blur-sm">
            <div className="p-3 rounded-full bg-white">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Important Notices</h3>
            <p className="text-gray-400 text-center">Receive mission-critical updates and circulars instantly</p>
          </div>
        </div>
      </div>
    </section>
  )
}

