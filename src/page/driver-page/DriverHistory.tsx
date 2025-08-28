import { Card } from "@/components/ui/card";
import { useDriverRideHistoryQuery } from "@/redux/features/driver/driver.api";
import LoadingComponent from "@/utils/utils.loading";
import React, { useState, useMemo } from "react";

function DriverHistory() {
  const { data, isLoading } = useDriverRideHistoryQuery('');
  const history = data?.data || [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // rides per page

  const totalPages = useMemo(() => Math.ceil(history.length / itemsPerPage), [history]);

  const currentHistory = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return history.slice(start, end);
  }, [currentPage, history]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (isLoading) return <LoadingComponent />;

  if (history.length === 0)
    return <p className="text-center py-20 text-gray-500 dark:text-gray-400">No ride history found.</p>;

  return (
    <div className="py-16 px-4 md:px-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200 text-center">
        Your Ride History
      </h2>

      <section className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {currentHistory.map((item: any) => (
          <Card
            key={item._id}
            className="p-6 rounded-lg shadow-md dark:shadow-none dark:bg-gray-800 transition-transform hover:scale-105"
          >
            <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">Ride ID: {item._id}</p>
            <p className="text-gray-700 dark:text-gray-300">From: {item.current}</p>
            <p className="text-gray-700 dark:text-gray-300">To: {item.destination}</p>
            <p className="text-gray-700 dark:text-gray-300">Fare: ${item.fare}</p>
            <p
              className={`mt-2 font-medium ${
                item.payment_status === "PAID" ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.payment_status}
            </p>
          </Card>
        ))}
      </section>

      <section className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-5 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Prev
        </button>

        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-5 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Next
        </button>
      </section>
    </div>
  );
}

export default DriverHistory;
