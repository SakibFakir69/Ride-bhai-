import type React from "react";



// children 
export interface IChildren{
    children:React.ReactNode
}
// src/types/user.types.ts



export type AccountStatus = "BLOCK" | "UNBLOCK" | "APPROVED" | "SUSPEND";
export type Role = "ADMIN" | "RIDER" | "DRIVER";
export type AvailabilityStatus = "OFFLINE" | "ONLINE";
export type DriverStatus = "REJECT" | "ACCEPT" | "PENDING" | "NONE";









export interface IVehicle {
  vehicleNumber?: string;
  vehicleModel?: string;
  vehicleType?: string;
  vehicleColor?: string;
}

export interface IUser {
  id?: string;
  name?: string;
  email: string;
  phone?: number;
  password?: string;      // optional for editing profile
  role?: Role;

  // Driver-specific fields
  availability_status?: AvailabilityStatus;
  driver_status?: DriverStatus;

  // Account status
  account_status?: AccountStatus;

  // Vehicle info for drivers
  vehicle?: IVehicle;
}
