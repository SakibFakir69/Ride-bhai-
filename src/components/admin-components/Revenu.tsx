import { useRideTrendQuery } from "@/redux/features/admin/admin.api";
import LoadingComponent from "@/utils/utils.loading";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Revenue() {
  const { data, isLoading } = useRideTrendQuery("");
  if (isLoading) return <LoadingComponent />;

  // Backend e data.revenue thakbe
  const revenueData = data?.revenue || [];

  // Convert month number to month name
  const monthNames = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const chartData = revenueData.map((item: any) => ({
    month: monthNames[item._id],
    totalRevenue: item.totalRevenue,
  }));

//   map use  transform each element from array and return new element

  return (
    <div className="w-full h-80 bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Revenue Trends</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value}`} />
          <Line type="monotone" dataKey="totalRevenue" stroke="#16a34a" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Revenue;
