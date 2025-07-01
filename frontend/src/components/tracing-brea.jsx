"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-beam";

export function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className={twMerge("text-xl mb-4")}>{item.title}</p>

            <div className="text-sm  prose prose-sm dark:prose-invert">
              {item?.image && (
                <Image
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}
const dummyContent = [
    {
      title: "Smart Attendance with Facial Recognition",
      description: (
        <>
          <p>
            Say goodbye to manual attendance! Nova Academy leverages advanced facial recognition technology to mark attendance seamlessly. 
            Students simply scan their faces, ensuring a secure and hassle-free process.
          </p>
          <p>
            This AI-powered system reduces proxy attendance and maintains accurate records, making attendance management efficient for both 
            students and faculty.
          </p>
        </>
      ),
      badge: "AI & Security",
      image:
        "/p3.jpeg",
    },
    {
      title: "Track Your Academic Progress",
      description: (
        <>
          <p>
            Students can access their marks, performance analytics, and progress reports in real time. No more waiting for result 
            announcements—everything is available in one place.
          </p>
          <p>
            Nova Academy provides insights into subject-wise performance, helping students focus on areas that need improvement.
          </p>
        </>
      ),
      badge: "Student Success",
      image:
        "/p1.jpeg",
    },
    {
      title: "Create & Join Events Easily",
      description: (
        <>
          <p>
            Event organizers can plan and manage their own events effortlessly through Nova Academy. From hackathons to cultural fests, 
            everything is streamlined with built-in event management tools.
          </p>
          <p>
            Students can explore upcoming events, register, and participate in various activities, creating an engaging campus experience.
          </p>
        </>
      ),
      badge: "Community & Engagement",
      image:
        "/p2.jpeg",
    },
  ];
  