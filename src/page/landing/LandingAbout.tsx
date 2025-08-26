

import React from 'react'
import AboutSection from './components/AboutSection'

// statsData.js
import { Calendar, Users, Truck, MapPin, CheckCircle, Activity } from "lucide-react";
 const statsData = [
  {
    title: "Founded",
    value: "2019",
    icon: Calendar,
  },
  {
    title: "Active Users",
    value: "1M+",
    icon: Users,
  },
  {
    title: "Drivers",
    value: "50K+",
    icon: Truck,
  },
  {
    title: "Cities",
    value: "100+",
    icon: MapPin,
  },
  {
    title: "Rides Completed",
    value: "10M+",
    icon: CheckCircle,
  },
  {
    title: "Uptime",
    value: "99.9%",
    icon: Activity,
  },
];


import { Card, CardContent, CardTitle } from '@/components/ui/card';

import  { ScrollTimeline }  from '@/components/lightswind/scroll-timeline.js'

// import ScrollTimeline from "@/components/lightswind/scroll-timeline.js"

import TeamMemberSection from '@/components/ui/teammember.js';




function LandingAbout() {
  return (
    <section>
 <AboutSection/>


 <div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {statsData.map((item, idx) => (
          <Card
            key={idx}
            className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 dark:bg-black bg-white"
          >
            <item.icon className="h-10 w-10 text-blue-600 mb-4" />
            <CardContent className="text-center p-0">
              <CardTitle className="text-2xl font-bold">{item.value}</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">{item.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <ScrollTimeline/>
      </div>

      <div>
        <TeamMemberSection/>
      </div>
 </div>




      
    </section>
  )
}

export default LandingAbout
