import { baseAPi } from "@/redux/baseApi";
import { base64 } from "zod";
import { ur } from "zod/v4/locales";



export const userApi = baseAPi.injectEndpoints({

    endpoints:(builder)=>({

        // update user 

        updateUser: builder.mutation({
            query:(userData)=>({
                url:`/user/update/${userData._id}`,
                method:"PUT",
                data:userData

            })
        }),

        // ride history 

    userHistory: builder.query({
  query: (params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    minFare?: number;
    maxFare?: number;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
  }) => ({
    url: '/user/history',
    method: 'GET',
    params, // <- This sends filters & pagination as query params
  }),
}),


    })
})



// export 

export const {useUpdateUserMutation,useUserHistoryQuery} = userApi;