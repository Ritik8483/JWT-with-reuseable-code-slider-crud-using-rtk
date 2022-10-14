import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface authType {
  email: string;
  password: string;
  token:string;
  cookie:any
}

export const authApi = createApi({
  reducerPath: "authentication",
  baseQuery: fetchBaseQuery({ baseUrl: "https://testtourapp.herokuapp.com/" }),
  endpoints: (builder) => ({
    loginAuthUser: builder.mutation<authType, any>({
      query: (data) => {
        // console.log(data, "fome rtk");
        return {
          url: "/users/signin",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginAuthUserMutation } = authApi;
