// utils/earnings.utils.ts
import type { Ride } from "@/types/ride";

export type GroupType = "daily" | "weekly" | "monthly";

export interface EarningsChartData {
  date: string;
  earnings: number;
}

export function groupEarnings(rides: Ride[], type: GroupType = "daily"): EarningsChartData[] {
  if (!Array.isArray(rides)) return [];

  const grouped: Record<string, number> = {};

  rides.forEach((ride) => {
    // safety check
    if (!ride.isCompleteRide || !ride.createdAt || !ride.fare) return;

    const date = new Date(ride.createdAt);
    if (isNaN(date.getTime())) return; // invalid date

    let key: string;

    if (type === "daily") {
      key = date.toISOString().split("T")[0]; // YYYY-MM-DD
    } else if (type === "weekly") {
      const firstDay = new Date(date);
      firstDay.setDate(date.getDate() - date.getDay()); // Sunday start
      key = firstDay.toISOString().split("T")[0];
    } else {
      key = `${date.getFullYear()}-${date.getMonth() + 1}`; // YYYY-M
    }

    grouped[key] = (grouped[key] || 0) + Number(ride.fare);
  });

  // debug log
  console.log("grouped earnings:", grouped);

  return Object.entries(grouped)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([date, earnings]) => ({ date, earnings }));
}
