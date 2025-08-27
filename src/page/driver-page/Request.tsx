import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useStatusHandelMutation } from "@/redux/features/driver/driver.api";
import LoadingComponent from "@/utils/utils.loading";


import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

// after complete , polished

function Request() {
  const { data, isLoading } = useUserInfoQuery("");
  console.log(data?.data?.name);
  const [statusHandel] = useStatusHandelMutation();

  const { name } = data?.data;

  const [status, setStatus] = useState<boolean>(false);

  const handelStatus = async () => {
    setStatus((prev) => !prev);

    const payload={
      user_status: status ? "ONLINE" : "OFFLINE"
    }

    if (status) {
      const res = await statusHandel(payload).unwrap();
      console.log(res);
    } else {
      const res = await statusHandel(payload).unwrap();
      console.log(res);
    }
    console.log(payload)
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
    </div>
  );
}

export default Request;
