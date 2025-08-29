import LoadingComponent from "@/utils/utils.loading";
import { lazy, Suspense, useState } from "react";

const AllDriver = lazy(() => import("./AllDriver"));
const AllUser = lazy(() => import("./AllUser"));

function UserManagement() {
  const [sectionItems, setSelectionItems] = useState("USER");

  const handleSelect = (role: string) => {
    setSelectionItems(role || "USER");
  };

  return (
    <div className="p-4 py-20">
      <div className="space-x-2 mb-4">
        <button
          onClick={() => handleSelect("USER")}
          className={sectionItems === "USER" ? "bg-blue-500 text-white px-4 py-2 rounded" : "px-4 py-2 rounded border"}
        >
          User
        </button>
        <button
          onClick={() => handleSelect("DRIVER")}
          className={sectionItems === "DRIVER" ? "bg-blue-500 text-white px-4 py-2 rounded" : "px-4 py-2 rounded border"}
        >
          Driver
        </button>
      </div>

      <Suspense fallback={<LoadingComponent />}>
        {sectionItems === "USER" && <AllUser />}
        {sectionItems === "DRIVER" && <AllDriver />}
      </Suspense>
    </div>
  );
}

export default UserManagement;
