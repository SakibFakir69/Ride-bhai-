import { baseAPi } from "@/redux/baseApi";
import { ur } from "zod/v4/locales";

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
      invalidatesTags:['ADMIN']
    }),


    // all users 

    handelUsers:builder.query({
        query:(params)=>({
            url:'/admin/find/all-user',
            method:"GET",
            params:params,
        })
    }),

    // handel  user account 

    handleUserAccount:builder.mutation({
        query:({id, account})=>({
            url:`/admin/block/${id}`,
            method:"PATCH",
            data:{account}
        })

    })



  }),
});

export const { useAllDriverQuery, useHandelDriverMutation, useHandelUsersQuery , useHandleUserAccountMutation } = adminApi;
