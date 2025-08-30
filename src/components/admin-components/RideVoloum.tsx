import { useRideVoloumQuery } from "@/redux/features/admin/admin.api";
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

function RideVoloum() {
  const { data, isLoading } = useRideVoloumQuery("");
  if (isLoading) return <LoadingComponent />;

  // Backend e data.totalVoloum thakbe
  const rideData = data?.totalVoloum || [];

  // Convert month number to month name
  const monthNames = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const chartData = rideData.map((item: any) => ({
    month: monthNames[item._id],
    totalRide: item.totalRide,
  }));

  return (
    <div className="w-full p-10 bg-white dark:bg-gray-900 shadow-md rounded-2xl h-96">
      <h2 className="text-xl font-semibold mb-4">Ride Volume (Monthly)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalRide" stroke="#2563eb" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RideVoloum;
