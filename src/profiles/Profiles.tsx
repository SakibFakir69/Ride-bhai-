import React, { useEffect, useState } from "react";
import { useUpdateUserMutation } from "@/redux/features/user/user.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type {
  Role,
  AccountStatus,
  AvailabilityStatus,
  DriverStatus,
  IVehicle,
} from "@/types/index";
import clsx from "clsx";
import { ImageIcon } from "lucide-react";

import LoadingComponent from "@/utils/utils.loading";

interface ProfileProps {
  userId: string;
  darkMode?: boolean;
}

// Options
const roleOptions: Role[] = ["ADMIN", "RIDER", "DRIVER"];
const accountStatusOptions: AccountStatus[] = [
  "BLOCK",
  "UNBLOCK",
  "APPROVED",
  "SUSPEND",
];
const availabilityStatusOptions: AvailabilityStatus[] = ["OFFLINE", "ONLINE"];
const driverStatusOptions: DriverStatus[] = [
  "REJECT",
  "ACCEPT",
  "PENDING",
  "NONE",
];

export default function Profile({ userId, darkMode = false }: ProfileProps) {
  const { data: user, isLoading, isError } = useUserInfoQuery(userId);
  const [updateUser] = useUpdateUserMutation();

  // Editing state
  const [isEditing, setIsEditing] = useState(false);

  // Common fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number | undefined>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(email, " -_> email", user?.data?.email);

  // Driver-specific
  const [vehicle, setVehicle] = useState<IVehicle>({
    vehicleNumber: "",
    vehicleModel: "",
    vehicleType: "",
    vehicleColor: "",
  });
  const [availabilityStatus, setAvailabilityStatus] = useState<
    AvailabilityStatus | undefined
  >();
  const [driverStatus, setDriverStatus] = useState<DriverStatus | undefined>();

  // Admin
  const [role, setRole] = useState<Role | undefined>();
  const [accountStatus, setAccountStatus] = useState<
    AccountStatus | undefined
  >();

  // Populate state on load
  useEffect(() => {
    if (user?.data) {
      setName(user.data.name || "");
      setEmail(user.data?.email || "");
      setPhone(user.data.phone);
      setRole(user.data.role);
      setAccountStatus(user.data.account_status);
      setAvailabilityStatus(user.data.availability_status);
      setDriverStatus(user.data.driver_status);
      if (user.data.vehicle) setVehicle(user.data.vehicle);
    }
  }, [user]);

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const payload: any = { id: userId, name, phone };
      if (password) payload.password = password;

      if (role === "DRIVER") {
        payload.vehicle = vehicle;
        payload.availability_status = availabilityStatus;
        payload.driver_status = driverStatus;
      }

      if (role === "ADMIN") {
        payload.role = role;
        payload.account_status = accountStatus;
      }

      await updateUser(payload).unwrap();
      alert("Profile updated successfully!");
      setPassword("");
      setConfirmPassword("");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    if (user?.data) {
      setName(user.data.name || "");
      setPhone(user.data.phone);
      setRole(user.data.role);
      setAccountStatus(user.data.account_status);
      setAvailabilityStatus(user.data.availability_status);
      setDriverStatus(user.data.driver_status);
      if (user.data.vehicle) setVehicle(user.data.vehicle);
      setPassword("");
      setConfirmPassword("");
    }
    setIsEditing(false);
  };

  if(isLoading) return <LoadingComponent/>


  if (isError) return <div>Error loading profile.</div>;

  return (

    <section className="mb-10 h-screen">

      <div>
        <p className="mb-20"> .</p>
      </div>
      
      <div
      className={clsx(
        "p-6 max-w-xl mx-auto rounded shadow space-y-4 transition-colors flex justify-center items-center flex-col ",
        darkMode
          ? "bg-gray-900 text-white  w-full"
          : "dark:bg-slate-950 dark:text-white text-gray-900 py-30 w-full border "
      )}
    >
      <h2 className="text-2xl font-bold">Profile Management</h2>

      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>
      )}


      <div>
        {/* img */}

        
      </div>



      {/* Name */}
      <div className="w-full">
        <label>Name:</label>
        <input
          type="text"
          className="border rounded p-2 w-full text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={!isEditing}
          placeholder="Enter your name"
        />
      </div>

      {/* Email */}
      <div className="w-full">
      
        <label>Email:</label>
        <input
          type="email"
          className="border rounded p-2 w-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          value={email}
          readOnly
        />
      </div>

      {/* Phone */}
      <div className="w-full">
        <label>Phone:</label>
        <input
          type="number"
          className="border rounded p-2 w-full"
          value={phone || ""}
          onChange={(e) => setPhone(Number(e.target.value))}
          readOnly={!isEditing}
        />
      </div>

      {/* Password */}
      {isEditing && (
        <>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              className="border rounded p-2 w-full"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              className="border rounded p-2 w-full"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      {/* Driver Fields */}
      {role === "DRIVER" && (
        <>
          <div>
            <label>Availability:</label>
            <select
              className="border rounded p-2 w-full"
              value={availabilityStatus}
              onChange={(e) =>
                setAvailabilityStatus(e.target.value as AvailabilityStatus)
              }
              disabled={!isEditing}
            >
              {availabilityStatusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Driver Status:</label>
            <select
              className="border rounded p-2 w-full"
              value={driverStatus}
              onChange={(e) => setDriverStatus(e.target.value as DriverStatus)}
              disabled={!isEditing}
            >
              {driverStatusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <h3 className="text-lg font-semibold mt-4">Vehicle Details</h3>
          {(
            [
              "vehicleNumber",
              "vehicleModel",
              "vehicleType",
              "vehicleColor",
            ] as const
          ).map((key) => (
            <div key={key}>
              <label>{key.replace("vehicle", "Vehicle ")}:</label>
              <input
                type="text"
                name={key}
                value={vehicle[key]}
                className="border rounded p-2 w-full"
                onChange={handleVehicleChange}
                readOnly={!isEditing}
              />
            </div>
          ))}
        </>
      )}

      {/* Admin Fields */}
      {role === "ADMIN" && (
        <>
          <div>
            <label>Role:</label>
            <select
              className="border rounded p-2 w-full"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              disabled={!isEditing}
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Account Status:</label>
            <select
              className="border rounded p-2 w-full"
              value={accountStatus}
              onChange={(e) =>
                setAccountStatus(e.target.value as AccountStatus)
              }
              disabled={!isEditing}
            >
              {accountStatusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {/* Save & Cancel Buttons */}
      {isEditing && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Save Profile
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
    </section>
    
  );
}
