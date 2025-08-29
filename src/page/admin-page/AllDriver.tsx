import { Card, CardContent } from "@/components/ui/card";
import { useAllDriverQuery, useHandelDriverMutation } from "@/redux/features/admin/admin.api";
import LoadingComponent from "@/utils/utils.loading";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { toast, ToastContainer } from "react-toastify";
import type clsx from "clsx";
import { twMerge } from "tailwind-merge";


function AllDriver() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(""); 
  const [availability, setAvailability] = useState(""); 


  const { data, isLoading,refetch } = useAllDriverQuery({
  search: search.trim(),
  account_status: status.trim(),       // from dropdown "SUSPEND"/"APPROVED"
  availability_status: availability.trim(), // from dropdown "ONLINE"/"OFFLINE"
});
console.log({ search, status, availability });

const handleReset = ()=>{
    setStatus('');
    setAvailability("")
    setSearch('')

}







  const allDriverData = data?.data || [];

  const filterItems: string[] = ["SUSPEND", "APPROVED"];


//   approve or rejcet



const [handelDriver] = useHandelDriverMutation(); // or use the mutation hook

const handleApproved = async (id: string) => {
  try {
    const res = await handelDriver({ id, account_status: "APPROVED" }).unwrap();
    toast.success("Driver Approved");
    refetch();
  } catch (error: any) {
    console.log(error.message);
  }
};

const handleSuspend = async (id: string) => {
  try {
    const res = await handelDriver({ id, account_status: "SUSPEND" }).unwrap();
    toast.success("Driver Suspended");
    refetch();
    
  } catch (error: any) {
    console.log(error.message);
  }
};




  if (isLoading) return <LoadingComponent />;

  console.log(allDriverData);
  console.log(status, availability);

  return (
    <div className="py-20 px-4 h-screen mb-10">
      {/*  Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md border dark:border-gray-700">
        <div className="flex gap-x-10 w-full p-6">
          {/* Search Input */}
          <ToastContainer/>
          <div className="relative flex-1 w-x">
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 pl-10 rounded border dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition px-20"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-400">
              🔍
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-4 py-2 rounded hover:bg-teal-300 border dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none hover:text-white  dark:hover:bg-gray-700 transition">
                {status || "Select your Items"}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40">
              {filterItems.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setStatus(option)} // ✅ use onClick
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-4 py-2 rounded border hover:bg-teal-400  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none hover:text-white dark:hover:bg-gray-700 transition">
                {availability || "Select your Items"}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40">
              {["ONLINE", "OFFLINE"].map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setAvailability(option)} // ✅ use onClick
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button onClick={handleReset} className="px-10 border rounded bg-blue-500 text-white hover:bg-blue-300">Rest</button>
        </div>
      </div>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allDriverData.map((driver: any) => (
          <Card
            key={driver._id}
            className="p-5 shadow-md rounded-2xl border hover:shadow-lg transition bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <CardContent className="space-y-4">
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {driver.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {driver.name}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {driver.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              {driver.phone && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📞 {driver.phone}
                </p>
              )}

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {driver.account}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {driver.account_status}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-lg bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  {driver.availability_status}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  {driver.driver_status}
                </span>
              </div>

              {/* Created Date */}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Joined: {new Date(driver.createdAt).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <Button onClick={()=> handleApproved(driver._id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg transition">
                  Approve
                </Button>
             <Button
  onClick={() => handleSuspend(driver._id)}
  className={twMerge(
    "flex-1 text-white text-sm py-2 rounded-lg transition",
    driver.account_status === "SUSPEND"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-gray-300 hover:bg-gray-400"
  )}
>
  Suspend
</Button>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AllDriver;
