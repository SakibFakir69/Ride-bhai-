
import { baseAPi } from "@/redux/baseApi";


export const riderApi = baseAPi.injectEndpoints({
    

    endpoints:(builder)=>({


        // request to ride

        rideRequest:builder.mutation({

            query:(destination)=>({
                url:'/ride/request',
                method:"POST",
                data:destination,
            }),
          
            invalidatesTags:["RIDER"]
        }),

        rideDetails:builder.query({

            query:()=>({

                url:"/user/ride-details",
                method:"GET",

            })
        })





    })


})

export const {useRideRequestMutation, useRideDetailsQuery} = riderApi;