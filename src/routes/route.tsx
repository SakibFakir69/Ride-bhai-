import Authlayouts from "@/Layouts/Authlayouts";
import MainLayouts from "@/Layouts/MainLayouts";
import Request from "@/page/driver-page/Request";
import RideManagement from "@/page/driver-page/RideManagement";

import LandingAbout from "@/page/landing/LandingAbout";
import LandingContact from "@/page/landing/LandingContact";
import LandingFAQ from "@/page/landing/LandingFAQ";
import LandingFeatures from "@/page/landing/LandingFeatures";
import LandingHome from "@/page/landing/LandingHome";
import RideHistory from "@/page/rider-page/Ride.History";
import RideSupport from "@/page/rider-page/Ride.Details";
import RideBook from "@/page/rider-page/Rider.Book";
import Profiles from "@/profiles/Profiles";
import Profile from "@/profiles/Profiles";
import React from "react";
import { createBrowserRouter } from "react-router";
import RideDetails from "@/page/rider-page/Ride.Details";
import Earning from "@/page/driver-page/Earning";
import DriverHistory from "@/page/driver-page/DriverHistory";

const RegisterComponent = React.lazy(() => import("@/auth/Regstation"));
const LoginComponents = React.lazy(() => import("@/auth/Login"));

export const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      { index: true, element: <LandingHome/> },   // ✅ default route for "/"
      { path: "features", element: <LandingFeatures /> },
      { path: "about", element: <LandingAbout /> },
      { path: "faq", element: <LandingFAQ /> },
      { path: "contact", element: <LandingContact /> },
      

      // Rider pages
      { path: "ride/book-ride", element: <RideBook /> },
      { path: "ride/ride-details", element: <RideDetails /> },
      { path: "ride/history", element: <RideHistory /> },
      { path: "profile", element: <Profiles userId={""}/> },



      // driver

      {path:'driver/request', element:<Request/>},
      {path:'driver/driver-history' , element:<DriverHistory/>} ,
      {path:'driver/earning', element:<Earning/>}
    
    ],
  },

  // Auth routes
  {
    path: "auth",
    element: <Authlayouts />,
    children: [
      { path: "register", element: <RegisterComponent /> }, // ✅ relative
      { path: "login", element: <LoginComponents /> },      // ✅ relative
    ],
  },
]);
