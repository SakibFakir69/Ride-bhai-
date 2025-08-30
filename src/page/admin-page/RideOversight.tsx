import { useState } from "react";
import { useAllRideQuery } from "@/redux/features/admin/admin.api";
import LoadingComponent from "@/utils/utils.loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

function RideOversight() {
  const [date, setDate] = useState<Date | undefined>();
  const [isCompleteRide, setIsCompleteRide] = useState(""); // true or false
  const [riderStatus, setRiderStatus] = useState("");

  // ✅ Format date for backend
  const formattedDate = date ? date.toISOString().split("T")[0] : "";

  const { data, isLoading } = useAllRideQuery({
    createdAt: formattedDate,
    isCompleteRide: isCompleteRide || undefined,
    ride_status: riderStatus || undefined,
  });

  console.log(data?.data, { date, isCompleteRide, riderStatus });

  const allRide = data?.data || [];

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="p-6 space-y-6 py-20">
      {/* Filters */}
      <div className="flex shadow justify-center items-center">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        {/* Rider Status Filter */}
        <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-4">
          <Select onValueChange={(val) => setRiderStatus(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
              <SelectItem value="PICKED_UP">Pick up</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        {/* Complete Ride Filter */}
        <CardContent>
          <p>Complete Ride</p>
          <Select onValueChange={(val) => setIsCompleteRide(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Complete Ride" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        {/* Date Filter */}
        <CardContent>
          <p>Select Date</p>
          <input
            type="date"
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </CardContent>
      </div>

      {/* Rides Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Rides</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Fare</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Driver Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Complete?</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allRide.length > 0 ? (
                allRide.map((ride: any) => (
                  <TableRow key={ride._id}>
                    <TableCell>
                      {new Date(ride.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{ride.rider_id?.name || "N/A"}</TableCell>
                    <TableCell>{ride.current}</TableCell>
                    <TableCell>{ride.destination}</TableCell>
                    <TableCell>{ride.fare}</TableCell>
                    <TableCell>{ride.rider_status}</TableCell>
                    <TableCell>{ride.driver_status}</TableCell>
                    <TableCell>{ride.payment_status}</TableCell>
                    <TableCell>
                      {ride.isCompleteRide ? "✅ Yes" : "❌ No"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    No rides found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default RideOversight;
