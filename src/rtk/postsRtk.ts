import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiRoot } from "./global";

interface FetchPostsTypes {
  initialEntry: number;
  finalEntry: number | string;
  sort: string | boolean;
  search: string;
}
export const postsApi = createApi({
  reducerPath: "postsReducer",
  baseQuery: fetchBaseQuery({ baseUrl: apiRoot }),
  tagTypes: ["postsFetching"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<any, FetchPostsTypes>({
      query: (data: FetchPostsTypes) => ({
        url: data?.sort
          ? `posts/?_start=${data.initialEntry}&_end=${data.finalEntry}&_sort=${data.sort}&_order=desc&name=${data.search}`
          : data?.search
          ? `posts/?_start=${data.initialEntry}&_end=${data.finalEntry}&name=${data.search}`
          : `posts/?_start=${data.initialEntry}&_end=${data.finalEntry}`,
      }),
      providesTags: ["postsFetching"],
    }),
    totalNoOfPosts: builder.query<any, void>({
      query: () => ({
        url: "posts",
      }),
      providesTags: ["postsFetching"],
    }),
    addNewPost: builder.mutation<any, any>({
      query: (data: any) => ({
        url: "posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["postsFetching"],
    }),
    deletePost: builder.mutation<any, any>({
      query: (id: any) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["postsFetching"],
    }),
    editPost: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `posts/${data?.id}`,
        method: "PUT",
        body: data?.filterdata,
      }),
      invalidatesTags: ["postsFetching"],
    }),
    viewPost: builder.query<any, any>({
      query: (data: any) => ({
        url: `posts/${data?.id}`,
      }),
      providesTags: ["postsFetching"],
    }),
    viewMutationPost: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `posts/${data?.id}`,
        method:"GET"
      }),
      invalidatesTags: ["postsFetching"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useTotalNoOfPostsQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useViewPostQuery,
  useViewMutationPostMutation
} = postsApi;
