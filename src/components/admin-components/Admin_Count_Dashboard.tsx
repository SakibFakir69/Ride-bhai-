import { useAllCountQuery } from "@/redux/features/admin/admin.api";
import LoadingComponent from "@/utils/utils.loading";
import { Users,  CarIcon} from "lucide-react"; // icons

function Admin_Count_Dashboard() {
  const { data, isLoading } = useAllCountQuery("");

  if (isLoading) {
    return <LoadingComponent />;
  }

  const { driver = 0, rider = 0 } = data || {};

  return (
    <div className="w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Driver Card */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition hover:shadow-lg">
        <div>
          <p className="text-gray-500 text-sm">Total Drivers</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{driver}</h2>
        </div>
        <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
          <Users className="h-8 w-8 text-blue-600 dark:text-blue-300" />
        </div>
      </div>

      {/* Rider Card */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition hover:shadow-lg">
        <div>
          <p className="text-gray-500 text-sm">Total Riders</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{rider}</h2>
        </div>
        <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
          <CarIcon className="h-8 w-8 text-green-600 dark:text-green-300" />
        </div>
      </div>
    </div>
  );
}

export default Admin_Count_Dashboard;
