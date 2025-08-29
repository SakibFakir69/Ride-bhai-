import RideRequestCard from "@/components/driver-components/RideRequestCard";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useLastestRideQuery,

  useStatusHandelMutation,
} from "@/redux/features/driver/driver.api";

import LoadingComponent from "@/utils/utils.loading";
import { useState } from "react";


import { twMerge } from "tailwind-merge";

// after complete , polished

function Request() {
  const { data, isLoading } = useUserInfoQuery("");
  console.log(data?.data?.name);
  const [statusHandel] = useStatusHandelMutation();
  const { data: latestRide } = useLastestRideQuery(" ");

  console.log("founed", latestRide);

  const name = data?.data?.name ?? "";
  const _id = data?.data?._id ?? "";
  const isCompleteRide = data?.data?.isCompleteRide;
  console.log(isCompleteRide);

  const [status, setStatus] = useState(false);

  const handelStatus = async () => {
    setStatus((prev) => !prev);

    try {
      const payload = {
        user_status: status ? "ONLINE" : "OFFLINE",
      };

      if (status) {
        const res = await statusHandel(payload).unwrap();
        console.log(res);
      } else {
        const res = await statusHandel(payload).unwrap();
        console.log(res);
      }
      console.log(payload);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className=" border w-full  flex justify-center items-center  py-10 flex-col">
      {/* avaiality controll */}

      <section className="w-full    p-6 flex justify-between  items-center ">
        <div className="py-10">
          <h1 className="md:text-4xl  font-semibold">Driver</h1>

          <h2 className="font-semibold ">Welcome back ,{name}</h2>
          {_id}
        </div>

        {/* controll */}

        <div>
          <button
            onClick={handelStatus}
            className={twMerge(
              "md:px-16 px-12 py-2 border rounded font-semibold text-white",

              status ? "bg-green-500" : "bg-red-500"
            )}
          >
            {status ? "Online" : "Offline"}
          </button>
        </div>
      </section>

      <section>

        {latestRide && !latestRide.data?.isCompleteRide && <RideRequestCard /> }

        {!latestRide && <p className="text-center border ">No Rider Founed</p>}

      </section>
    </div>
  );
}

export default Request;
