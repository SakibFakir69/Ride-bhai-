import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LeafletMap from "@/leaflet-map/LeafletMap";
import { MapPin, Navigation } from "lucide-react";
import { useRideRequestMutation } from "@/redux/features/rider/rider.api";
import { myLocation } from "@/utils/utils.geolocation";
// 1. Define Zod schema
const rideSchema = z.object({
  startPoint: z.string().min(2, "Starting point is required"),
  endPoint: z.string().min(2, "Destination is required"),
});

export default function RideBook() {
  const [ rideRequest ] = useRideRequestMutation();
  
 

  // 2. Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rideSchema),
  });

  // 3. Handle form submission
  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);
    // You can pass data.startPoint and data.endPoint to LeafletMap or API
    const { startPoint, endPoint } = data;

    const payload ={
      current:startPoint,
      destination:endPoint 
    }

    try {
      try {
        const res = await rideRequest(payload).unwrap();
        console.log(res);

        
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-16 md:flex  gap-8 w-full p-3 py-10">
      {/* Form Section */}

      {/* if not take ride show this if not complete ride */}


      <section className="flex-1 w-full  mx-auto space-y-4 flex justify-center items-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4  p-6 rounded-lg shadow-md w-full bg-white dark:bg-black dark:bg-border"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-gray-400 rotate-90" />
              <Input
                placeholder="Starting Position"
                {...register("startPoint")}
                className=""
              />
            </div>
            {errors.startPoint && (
              <span className="text-red-500 text-sm">
                {errors.startPoint.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-600" />
              <Input
                placeholder="Destination"
                {...register("endPoint")}
                className="!border"
              />
            </div>
            {errors.endPoint && (
              <span className="text-red-500 text-sm">
                {errors.endPoint.message}
              </span>
            )}
          </div>

          {/* chose fare */}
          {/* payment metod */}
          {/* stripe */}

          <Button type="submit" className="w-full mt-2">
            Find Rider
          </Button>
        </form>
      </section>

      {/* Map Section */}
      <section className="flex-1 flex min-h-[400px] -z-20">
        <LeafletMap />
      </section>
    </div>
  );
}
