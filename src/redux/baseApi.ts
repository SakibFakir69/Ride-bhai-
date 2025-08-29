import { createApi } from "@reduxjs/toolkit/query/react";
import { MyEnv } from "@/config/config.env";
import axiosBaseQuery from "./axiosBaseQuery";

console.log(MyEnv);

export const baseAPi = createApi({
  reducerPath: "baseAPi",

  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:5000/api/ride-share",
   
  }),

  tagTypes: ["RIDER", "DRIVER", "ADMIN","USER"],

  endpoints: () => ({}),
});
