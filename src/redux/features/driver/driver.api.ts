import { ur } from 'zod/v4/locales';

import { baseAPi } from "@/redux/baseApi";




const driverApi = baseAPi.injectEndpoints({

    endpoints:(builder)=>({




        // status 

        statusHandel:builder.mutation({

            query:(status)=>({
                url:"/drivers/online-status",
                method:"PATCH",
                data:status,
            })



        }),

        requestHandel:builder.mutation({

            query:(statusType)=>({
                url:"/drivers/request",
                method:"PATCH",
                data:statusType,

            })
        }),

        // lasted ride

        lastestRide:builder.query({
            query:()=>({

                url:"/drivers/lastest-ride",
                method:"GET"

            })
        })


    })

})



export const {useStatusHandelMutation, useRequestHandelMutation} = driverApi;