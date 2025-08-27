
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



        })


    })

})



export const {useStatusHandelMutation} = driverApi;