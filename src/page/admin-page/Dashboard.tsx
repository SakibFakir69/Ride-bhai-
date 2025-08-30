import Admin_Count_Dashboard from "@/components/admin-components/Admin_Count_Dashboard";
import DriverActivity from "@/components/admin-components/DriverActivity";
import Revenu from "@/components/admin-components/Revenu";
import RideVoloum from "@/components/admin-components/RideVoloum";

function Dashboard() {
  return (
    <div className="py-10 px-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* ---------------- COUNT CARDS ---------------- */}
      <section className="mb-10">
        <Admin_Count_Dashboard />
      </section>

      {/* ---------------- ANALYTICS GRIDS ---------------- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Driver Activity */}
        <DriverActivity />

        {/* Ride Volume */}
        <RideVoloum />
      </section>

      {/* ---------------- REVENUE ---------------- */}
      <section className="mb-10">
        <Revenu />
      </section>

    </div>
  );
}

export default Dashboard;
