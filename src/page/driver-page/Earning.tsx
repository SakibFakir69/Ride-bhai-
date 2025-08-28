import { useState, useMemo } from "react";
import { useHandleEarningQuery } from "@/redux/features/driver/driver.api";
import LoadingComponent from "@/utils/utils.loading";
import { LineChart, CartesianGrid, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import type { Ride } from "@/types/ride";
import { groupEarnings, type GroupType } from "@/utils/earning.utils";

function Earning() {
  const { data, isLoading } = useHandleEarningQuery("");
  const [filter, setFilter] = useState<any>("daily");

  console.log(data  , 'Data')

  // ✅ FIX: use data.data instead of data
  const rides:Ride[] = data?.meta?.data || [];
  console.log(rides,"rides",data?.meta?.data)

  // Prepare chart data
  const chartData = useMemo(() => groupEarnings(rides, filter), [rides, filter]);

  if (isLoading) return <LoadingComponent />;

  console.log("rides array:", rides);
  console.log(filter, chartData); // will now show correct daily/weekly/monthly

  return (
    <div className="p-6  rounded-xl shadow-md flex justify-center items-center py-20 flex-col h-screen">
      <h2 className="text-xl font-bold mb-4">Earnings Dashboard</h2>

      {/* Filter dropdown */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as GroupType)}
          className="p-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Chart */}
      <LineChart width={650} height={320} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="earnings" stroke="#4F46E5" activeDot={{ r: 6 }} />
      </LineChart>
    </div>
  );
}

export default Earning;
