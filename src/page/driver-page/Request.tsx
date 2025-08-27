import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useRequestHandelMutation,
  useStatusHandelMutation,
} from "@/redux/features/driver/driver.api";
import type { IRequest } from "@/types/driver.types";
import LoadingComponent from "@/utils/utils.loading";


import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

// after complete , polished

function Request() {
  const { data, isLoading } = useUserInfoQuery("");
  console.log(data?.data?.name);
  const [statusHandel] = useStatusHandelMutation();
  const [requestHandel,{data:lastestDriverRides}] = useRequestHandelMutation();
  console.log(lastestDriverRides , 'lasted Drive rides')

  const { name,_id } = data?.data;

  const [status, setStatus] = useState<boolean>(false);

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

  // request handel

  const requestPayload: IRequest = {
    driver_status: "ACCPET",
  };
  const requestPayload2: IRequest = {
    driver_status: "REJECT",
  };

  const handelaAccpet =async () => {

    try {
      const res = await requestHandel(requestPayload).unwrap();
      console.log(res)
      
    } catch (error) {
      
    }

  };


  const handelReject =async () => {

    try{
      const res= await requestHandel(requestPayload2).unwrap();
      console.log(res);

    }catch(error){
      console.log(error)

    }


  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className=" border w-full  flex justify-center items-center">
      {/* avaiality controll */}

      <section className="w-full  border p-10 flex justify-between  items-center">
        <div className="py-20">
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

      {/* request accpet or reject */}
      <section>

        {lastestDriverRides?.data && (
  <div className="ride-info mt-10 border p-4">
    <p><strong>Fare:</strong> {lastestDriverRides.data.fare}</p>
    <p><strong>Current:</strong> {lastestDriverRides.data.current}</p>
    <p><strong>Destination:</strong> {lastestDriverRides.data.destination}</p>
    <p><strong>Rider ID:</strong> {lastestDriverRides.data.rider_id}</p>
  </div>
)}


      </section>
    </div>
  );
}

export default Request;
