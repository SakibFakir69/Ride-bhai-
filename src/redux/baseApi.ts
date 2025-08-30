import { createApi } from "@reduxjs/toolkit/query/react";
import { MyEnv } from "@/config/config.env";
import axiosBaseQuery from "./axiosBaseQuery";

console.log(MyEnv);

export const baseAPi = createApi({
  reducerPath: "baseAPi",

  baseQuery: axiosBaseQuery({
    baseUrl: "https://tour-backend-1-avy4.onrender.com/api/ride-share",
  }),

  tagTypes: ["RIDER", "DRIVER", "ADMIN","USER"],

  endpoints: () => ({}),
});
