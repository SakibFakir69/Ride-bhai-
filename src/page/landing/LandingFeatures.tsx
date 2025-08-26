"use client";

import React from "react";
import { featuresRider } from "@/utils/utils.rider";
import { driverFeatures } from "@/utils/utils.driver";
import { adminFeatures } from "@/utils/utils.admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { driverSafetyFeatures } from "@/utils/utils.safety";

function LandingFeatures() {
  return (
    <section className="w-full py-16">
      {/* Header */}
      <Card className="bg-[#1949D4] text-white dark:bg-black text-center flex flex-col justify-center items-center gap-4 min-h-[220px] w-full py-6">
        <h2 className="md:text-4xl font-semibold">
          Powerful Features for Everyone
        </h2>
        <p className="md:text-lg max-w-2xl">
          Discover comprehensive features designed for riders, drivers, and
          administrators. Experience the future of transportation technology.
        </p>
      </Card>

      {/* Rider Section */}
      <Card className="flex flex-col w-full mt-8">
        <CardHeader className="flex flex-col items-center gap-3">
          <CardTitle className="border p-3 font-semibold text-center bg-blue-400 rounded">
            For Rider
          </CardTitle>
          <CardTitle className="md:text-4xl font-semibold text-center">
            Seamless Ride Experience
          </CardTitle>
          <CardContent className="text-xl text-center max-w-2xl">
            Everything you need for a comfortable, safe, and convenient ride
            experience
          </CardContent>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full">
          {featuresRider.map((item, idx) => (
            <CardContent
              key={idx}
              className="flex items-start space-x-4 p-4 rounded-2xl shadow dark:bg-black bg-white"
            >
              <item.icon className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </CardContent>
          ))}
        </div>
      </Card>

      {/* Driver Section */}
      <Card className="flex flex-col w-full mt-12">
        <CardHeader className="flex flex-col items-center gap-3">
          <CardTitle className="border p-3 font-semibold text-center bg-blue-400 rounded">
            For Driver
          </CardTitle>
          <CardTitle className="md:text-4xl font-semibold text-center">
            Drive & Earn with Confidence
          </CardTitle>
          <CardContent className="text-xl text-center max-w-2xl">
            Professional tools and features to help drivers maximize their
            earnings and efficiency.
          </CardContent>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full">
          {driverFeatures.map((item, idx) => (
            <CardContent
              key={idx}
              className="flex items-start space-x-4 p-4 rounded-2xl shadow dark:bg-black bg-white"
            >
              <item.icon className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </CardContent>
          ))}
        </div>
      </Card>

      {/* Admin Section */}
      <Card className="flex flex-col w-full mt-12 mb-12">
        <CardHeader className="flex flex-col items-center gap-3">
          <CardTitle className="border p-3 font-semibold text-center bg-blue-400 rounded">
            For Administrators
          </CardTitle>
          <CardTitle className="md:text-4xl font-semibold text-center">
            Complete Platform Control
          </CardTitle>
          <CardContent className="text-xl text-center max-w-2xl">
            Comprehensive administrative tools for managing and scaling your
            ride-booking platform.
          </CardContent>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full">
          {adminFeatures.map((item, idx) => (
            <CardContent
              key={idx}
              className="flex items-start space-x-4 p-4 rounded-2xl shadow dark:bg-black bg-white"
            >
              <item.icon className="h-8 w-8 text-red-600" />
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </CardContent>
          ))}
        </div>
      </Card>

      <div className="flex flex-col w-full mt-12 mb-12">
        <div>
          <CardHeader className="flex flex-col items-center gap-3">
            <CardTitle className="border p-3 font-semibold text-center bg-blue-400 rounded">
              Safety First
            </CardTitle>
            <CardTitle className="md:text-4xl font-semibold text-center">
              Your Safety is Our Priority
            </CardTitle>
            <CardContent className="text-xl text-center max-w-2xl">
              Advanced safety features and protocols to ensure every ride is
              secure and worry-free.orm.
            </CardContent>
          </CardHeader>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {driverSafetyFeatures.map((item, idx) => (
            <Card
              key={idx}
              className="flex items-start space-x-4 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 dark:bg-black bg-white"
            >
              <item.icon className="h-10 w-10 text-red-600" />
              <CardContent className="p-0">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg font-semibold">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandingFeatures;
