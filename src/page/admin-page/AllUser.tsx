import { Card, CardContent } from "@/components/ui/card";


import { useHandelUsersQuery, useHandleUserAccountMutation } from "@/redux/features/admin/admin.api";
import LoadingComponent from "@/utils/utils.loading";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToastContainer, toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

function AllUser() {
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState("");

  const { data, isLoading, refetch } = useHandelUsersQuery({
    search: search.trim(),
    account: account.trim(), // BLOCK / UNBLOCK
  });

  const [handleUserAccount] = useHandleUserAccountMutation()


  const handleReset = () => {
    setSearch("");
    setAccount("");
  };

  const handleBlock = async (id: string) => {
    try {
      await handleUserAccount({ id, account: "BLOCK" }).unwrap();
      toast.success("User Blocked");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUnblock = async (id: string) => {
    try {
      await handleUserAccount({ id, account: "UNBLOCK" }).unwrap();
      toast.success("User Unblocked");
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <LoadingComponent />;

  const allUserData = data?.data || [];
  const accountOptions:string[] = ["BLOCK", "UNBLOCK"];

  return (
    <div className="py-20 px-4 h-screen mb-10">
      <ToastContainer />

      {
        allUserData.length===0 && <p>No Data founed</p>
      }

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md border dark:border-gray-700">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 py-2 px-4 rounded border dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none hover:bg-teal-400 dark:hover:bg-gray-700 transition">
              {account || "Select Account Status"}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40">
            {accountOptions.map((option) => (
              <DropdownMenuItem key={option} onClick={() => setAccount(option)}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={handleReset}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
        >
          Reset
        </Button>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allUserData.map((user: any) => (
          <Card
            key={user._id}
            className="p-5 shadow-md rounded-2xl border hover:shadow-lg transition bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <CardContent className="space-y-4">
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{user.name}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>

              {/* Phone */}
              {user.phone && (
                <p className="text-sm text-gray-600 dark:text-gray-300">📞 {user.phone}</p>
              )}

              {/* Account Status */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {user.account_status}
                </span>
              </div>

              {/* Joined Date */}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => handleUnblock(user._id)}
                  className={twMerge(
                    "flex-1 text-white text-sm py-2 rounded-lg transition",
                    user.account_status === "UNBLOCK"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                >
                  Unblock
                </Button>

                <Button
                  onClick={() => handleBlock(user._id)}
                  className={twMerge(
                    "flex-1 text-white text-sm py-2 rounded-lg transition",
                    user.account_status === "BLOCK"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                >
                  Block
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AllUser;
