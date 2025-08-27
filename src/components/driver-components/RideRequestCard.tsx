import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, Car } from "lucide-react";
import {
  useLastestRideQuery,
  useRequestHandelMutation,
  useRideTimeStatusMutation,
} from "@/redux/features/driver/driver.api";


export default function RideRequestCard() {
  const { data, refetch } = useLastestRideQuery("");
  const [requestHandel] = useRequestHandelMutation();
  const [rideTimeStatus, { data: rideTime }] = useRideTimeStatusMutation();

  console.log(rideTime, "Ride time");

  console.log(data?.data, "data");
  const fare = data?.data?.fare;
  const current = data?.data?.current;
  const destination = data?.data?.destination;

  // const { fare, rider_id, destination, current } = data?.data.rideLatestData;

  const [timeLeft, setTimeLeft] = useState(30);
  const [confirm, setConfirm] = useState(false);
  const [count, setCounter] = useState<number>(0);
  //

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const payload = {
    driver_status: "ACCEPT",
  };

  const payload2 = {
    driver_status: "REJECT",
  };

  const handleAccept = async () => {
    console.log("Ride Accepted ✅");

    try {
      const res = await requestHandel(payload).unwrap();
      console.log(res, "accpet");
      setConfirm(true);
      setCounter(1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async () => {
    console.log("Ride Declined ❌");
    try {
      const res = await requestHandel(payload2).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // pick up
  const pickUp = {
      status_update: { rider_status: 'PICKED_UP' }
  };
  const handelPickup = async () => {
    try {
      const res = await rideTimeStatus( pickUp).unwrap();
      console.log(res, "pick up");
      setCounter(2);
    } catch (error) {
      console.log(error);
    }
  };

  const transit = {
      status_update: { rider_status: 'IN_TRANSIT' }
  };

  // in transit
  const handleIntransit = async () => {
    try {
      const res = await rideTimeStatus(transit).unwrap();
      console.log(res, "in transit");
      setCounter(3);
    } catch (error) {
      console.log(error);
    }
  };
  // complete

 const completePayload = {
  status_update: { rider_status: 'COMPLETED' }
}

  const handleComplete =async () => {
    try {
      const res = await rideTimeStatus(completePayload).unwrap();
      console.log(res, "complete");
      
      setConfirm(false);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(count);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-center items-center   w-full  p-4 mb-20"
    >
      {confirm === false && (
        <Card className="w-full  shadow-xl rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              🚖 New Ride Request
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Countdown */}
            <div>
              <p className="text-center text-sm text-muted-foreground">
                {timeLeft}s remaining
              </p>
              <Progress value={(timeLeft / 30) * 100} className="h-2 mt-2" />
            </div>

            {/* Passenger Info */}
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-yellow-500">⭐ 4.8</p>
              </div>
            </div>

            {/* Ride Details */}
            <div className="space-y-2 text-sm flex gap-x-10">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span>Current: {current}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Detination : {destination}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-500" />
                  <span>{fare / 20} Km</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span>Estimated Time: {(fare / 20) * 2} min</span>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <span>Fare: ${fare} BDT</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleDecline}
                variant="destructive"
                className="flex-1 py-5 text-lg"
              >
                Decline
              </Button>
              <Button
                onClick={handleAccept}
                className="flex-1 py-5 text-lg bg-green-600 hover:bg-green-700"
              >
                Accept
              </Button>
            </div>
          </CardContent>
        </Card>
      )}


      {/* show same data rider , and gave complete true */}

      {confirm && (
        <Card className="border w-full  shadow-xl rounded-2xl  p-20">
          {count === 1 && (
            <button
              onClick={handelPickup}
              className="px-16 py-2.5 rounded bg-red-400 text-white"
            >
              Picked Up{" "}
            </button>
          )}
          {count === 2 && (
            <button
              onClick={handleIntransit}
              className="px-16 py-2.5 rounded text-white bg-green-500"
            >
              In Transit{" "}
            </button>
          )}
          {count === 3 && (
            <button
              onClick={handleComplete}
              className="px-16 rounded py-2.5 bg-blue-600 text-white"
            >
              Completed
            </button>
          )}
        </Card>
      )}
    </motion.div>
  );
}
