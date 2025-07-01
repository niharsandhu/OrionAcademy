import React from 'react'
import NavBar from '../components/NavBar'
import HeroSection from '../components/landing/HeroSection'
import FeatureSection from '../components/landing/FeatureSection'
import SparkleTitle from '@/components/thik'
import { Separator } from '@/components/ui/separator'
import StatsSection from '@/components/stats'
import EventsSection from '@/components/events-section'
import TestimonialsSection from '@/components/testimonials'
import { BackgroundBoxesDemo } from '@/components/background-footer'

const page = () => {
  return (
    <div className='bg-white'>
      <NavBar/>
      <HeroSection />
      <FeatureSection />
      <SparkleTitle />
      <StatsSection /> 
      <Separator />
      <EventsSection />
      <TestimonialsSection />
      <BackgroundBoxesDemo />
    </div>
  )
}

export default page