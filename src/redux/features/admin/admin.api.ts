import { baseAPi } from "@/redux/baseApi";

const adminApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    // all rider

    allDriver: builder.query({
      query: (params) => ({
        url: "/admin/all-driver",
        method: "GET",
        params: params,
      }),
    }),

    // approve or suspend

    handelDriver: builder.mutation({
      query: ({ id, account_status }) => ({
        url: `/admin/drivers/approve/${id}`, // URL param
        method: "PATCH",
        data: { account_status }, // Body with new status
      }),
      invalidatesTags: ["ADMIN"],
    }),

    // all users

    handelUsers: builder.query({
      query: (params) => ({
        url: "/admin/find/all-user",
        method: "GET",
        params: params,
      }),
    }),

    // handel  user account

    handleUserAccount: builder.mutation({
      query: ({ id, account }) => ({
        url: `/admin/block/${id}`,
        method: "PATCH",
        data: { account },
      }),
    }),

    // all ride

    allRide: builder.query({
      query: (params) => ({
        url: "/admin/all-ride",
        method: "GET",
        params: params,
      }),
    }),

    // count

    allCount: builder.query({
      query: () => ({
        url: "/admin/count",
        method: "GET",
      }),
    }),
    // /ride-voloum

    rideVoloum: builder.query({
      query: () => ({
        url: "/admin/ride-voloum",
        method: "GET",
      }),
    }),

    // /ride-trend

    rideTrend: builder.query({
      query: () => ({
        url: "/admin/ride-trend",
        method: "GET",
      }),
    }),
    //
    // /driver-activity

    driverActivity: builder.query({
      query: () => ({
        url: "/admin/driver-activity",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllDriverQuery,
  useHandelDriverMutation,
  useHandelUsersQuery,
  useHandleUserAccountMutation,
  useAllRideQuery,
  useAllCountQuery,
  useDriverActivityQuery,
  useRideTrendQuery,
  useRideVoloumQuery,
} = adminApi;
