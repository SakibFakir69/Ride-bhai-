import { useRideDetailsQuery } from "@/redux/features/rider/rider.api";
import LoadingComponent from "@/utils/utils.loading";
import { DollarSignIcon } from "lucide-react";

import { FaMapMarkerAlt, FaCar, FaClock } from "react-icons/fa";

function RideDetails() {
  const { data: rideDetails, isLoading, isError } = useRideDetailsQuery("");

  console.log(rideDetails);

  if (isLoading) return <LoadingComponent />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-6 text-center">
          <div className="text-red-400 text-5xl mb-4">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Error Loading Ride Details
          </h2>
          <p className="text-gray-300">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  if (!rideDetails || !rideDetails.data?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-6 text-center">
          <div className="text-blue-400 text-5xl mb-4">
            <i className="fas fa-car-side"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            No Ride Details Found
          </h2>
          <p className="text-gray-300">
            It looks like you don't have any rides yet.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br ">
      {/* Main Content */}
      <div className="flex-1 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Your Rides ({rideDetails.meta.totalRide})
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rideDetails.data.map((ride: any, index: number) => {
              const { date, time } = formatDate(ride.createdAt);

              return (
                <div
                  key={index}
                  className="dark:bg-gray-800  rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <FaCar className="text-blue-400 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold dark:text-white text-black">
                      Ride #{ride.id || index + 1}
                    </h2>
                  </div>

                  <div className="dark:text-gray-300 mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-green-500" /> From:{" "}
                    {ride.current}
                  </div>
                  <div className="dark:text-gray-300 mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-green-600" /> To:{" "}
                    {ride.destination}
                  </div>
                  <div className="dark:text-gray-300 mb-2 flex items-center">
                    <FaClock className="mr-2 text-gray-400" /> {date} at {time}
                  </div>

                   <div className="dark:text-gray-300 mb-2 flex items-center">
                    <DollarSignIcon className="mr-2 text-blue-400" /> {ride.fare} BDT
                  </div>

                  <div className="mt-4">
                    <span className="text-gray-400 text-sm">Status:</span>{" "}
                    <span
                      className={`font-semibold ${
                        ride.rider_status === "completed"
                          ? "text-green-400"
                          : ride.rider_status === "pending"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {ride.payment_status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}

export default RideDetails;
