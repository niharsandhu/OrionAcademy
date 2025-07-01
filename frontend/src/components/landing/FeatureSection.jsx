'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const FeatureSection = () => {
    return (
        <section className="min-h-[75vh] flex items-center justify-center py-12 md:py-24 bg-black text-white rounded-3xl border-4 border-white">
            <div className="flex flex-col space-y-8 max-w-2xl">
                <h1 className="text-6xl font-bold tracking-tighter">
                    All-in-One Student
                    <span className="block mt-2 text-7xl underline underline-offset-8">Dashboard</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px]">
                    Manage your academic journey effortlessly. Upload attendance with facial recognition, stay updated on campus events, and register seamlessly—all in one place.
                </p>
                <div className="flex gap-4">
                    <Link href="/uploadAttendance">
                        <Button size="lg" className="text-sm px-8">
                            Upload Attendance
                        </Button>
                    </Link>
                    <Link href="/event">
                        <Button size="lg" variant="outline" className="text-sm px-8 text-black">
                            Explore Events
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="hidden md:flex justify-center relative w-[600px] h-[600px]">
                <Image
                    src="/image.png"
                    alt="Illustration of students using the dashboard to manage attendance and events"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </section>
    )
}

export default FeatureSection
