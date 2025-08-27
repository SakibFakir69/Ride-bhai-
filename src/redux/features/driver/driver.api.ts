import { ur } from "zod/v4/locales";

import { baseAPi } from "@/redux/baseApi";

const driverApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    statusHandel: builder.mutation({
      query: (status) => ({
        url: "/drivers/online-status",
        method: "PATCH",
        data: status,
      }),
    }),
    requestHandel: builder.mutation({
      query: (statusType) => ({
        url: "/drivers/request",
        method: "PATCH",
        data: statusType,
      }),
      invalidatesTags: ["DRIVER"], // ✅ after accepting/rejecting ride, refresh DRIVER data
    }),
    lastestRide: builder.query({
      query: () => ({
        url: "/drivers/lastest-ride",
        method: "GET",
      }),
      providesTags: ["DRIVER"], // ✅ mark this query for invalidation
    }),


    // ride time status 

    rideTimeStatus : builder.mutation({
        query:(status)=>({
            url:"/drivers/ride/status",
            method:"PATCH",
            data:status
        })
    })



  }),
});

export const {
  useStatusHandelMutation,
  useRequestHandelMutation,
  useLastestRideQuery,
  useRideTimeStatusMutation
} = driverApi;
