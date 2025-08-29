import { useState } from "react";
import { useAllRideQuery } from "@/redux/features/admin/admin.api";
import LoadingComponent from "@/utils/utils.loading";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";


function RideOversight() {
  const { data, isLoading } = useAllRideQuery("");
  const allRide = data?.data || [];

  // filters
  const [status, setStatus] = useState("");
  const [driver, setDriver] = useState("");
  const [rider, setRider] = useState("");
  const [date, setDate] = useState("");

  if (isLoading) {
    return <LoadingComponent />;
  }

  // filter logic
  const filteredRides = allRide.filter((ride: any) => {
    const matchStatus = status ? ride.status === status : true;
    const matchDriver = driver ? ride.driver?.name?.toLowerCase().includes(driver.toLowerCase()) : true;
    const matchRider = rider ? ride.rider?.name?.toLowerCase().includes(rider.toLowerCase()) : true;
    const matchDate = date ? ride.date?.startsWith(date) : true;
    return matchStatus && matchDriver && matchRider && matchDate;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-4">
          <Input
            placeholder="Filter by Driver"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
          />
          <Input
            placeholder="Filter by Rider"
            value={rider}
            onChange={(e) => setRider(e.target.value)}
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Select onValueChange={(val) => setStatus(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Rides Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Rides ({filteredRides.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fare</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRides.map((ride: any) => (
                <TableRow key={ride._id}>
                  <TableCell>{ride.driver?.name || "N/A"}</TableCell>
                  <TableCell>{ride.rider?.name || "N/A"}</TableCell>
                  <TableCell>{ride.date?.split("T")[0]}</TableCell>
                  <TableCell>{ride.status}</TableCell>
                  <TableCell>${ride.fare}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRides.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No rides found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default RideOversight;
