import { createApi } from "@reduxjs/toolkit/query/react";
import { MyEnv } from "@/config/config.env";
import axiosBaseQuery from "./axiosBaseQuery";

console.log(MyEnv);

export const baseAPi = createApi({
  reducerPath: "baseAPi",

  baseQuery: axiosBaseQuery({
    baseUrl: "https://ride-share-backend-jmx6.onrender.com/api/ride-share",
  }),

  tagTypes: ["RIDER", "DRIVER", "ADMIN","USER"],

  endpoints: () => ({}),
});
