import { ur } from 'zod/v4/locales';



import { MyEnv } from "@/config/config.env";
import { baseAPi } from "@/redux/baseApi";


console.log("Login URL =>", `${MyEnv.api}/api/ride-share/auth/login`);



export const authApi = baseAPi.injectEndpoints({

    endpoints:(builder)=>({

        // create user 

        createUser:builder.mutation({

            query:(userInfo)=>({
                url:"/user/create-user",
                method:"POST",
                data:userInfo,

            })
        }),

        // login 

        login:builder.mutation({
            query:(userInfo)=>({

                url:"/auth/login-user",
                method:"POST",
                data:userInfo,

            })
        }),


        // user info 

        userInfo :builder.query({
            query:()=>({
                 url:'/auth/me',
                 method:"GET"

            }),
            
           
        }),

        // user log out

        userLogout : builder.mutation({
            query:()=>({
                url:"/auth/log-out",
                method:"POST",
            
            }),
            invalidatesTags:['USER']
        })



    })



})


export const {useCreateUserMutation , useLoginMutation,useUserInfoQuery,useUserLogoutMutation} = authApi;