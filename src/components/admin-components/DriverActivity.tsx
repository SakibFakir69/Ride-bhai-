import { useDriverActivityQuery } from "@/redux/features/admin/admin.api";
import LoadingComponent from "@/utils/utils.loading";

import {
  BarChart, Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

function DriverActivity() {
  const { data, isLoading } = useDriverActivityQuery("");
  if (isLoading) return <LoadingComponent />;

  // Use the activity array from backend
  const chartData = data?.activity?.map((item: any) => ({
    driver: item._id,           // x-axis
    totalRides: item.totalRides // y-axis
  }));

  return (
    <div className="w-full  bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4">
      <h2 className="text-xl font-semibold mb-4">Driver Activity</h2>
     
      <ResponsiveContainer  width="60%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="driver" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalRides" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DriverActivity;
