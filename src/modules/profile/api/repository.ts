import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { realWorldBaseQuery } from "../../../core/api/realworld-base-query";
import { GetProfileInDTO } from "./dto/get-profile.in";
import { FollowUserInDTO } from "./dto/follow-user.in";
import { replaceCachedProfile } from "./utils";

interface ProfileParams {
   username: string
}

export const profileApi = createApi({
   reducerPath: 'profileApi',
   baseQuery: realWorldBaseQuery,
   endpoints: (builder) => ({
      getProfile: builder.query<GetProfileInDTO, ProfileParams>({
         query: ({username}) => ({
            url: `/profiles/${username}`
         })
      }),
      followUser: builder.mutation<FollowUserInDTO, ProfileParams>({
         query: ({username}) => ({
            url: `/profiles/${username}/follow`,
            method: 'post'
         }),
         onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
            await replaceCachedProfile(getState, queryFulfilled, dispatch, profileApi)
         },
      }),
      unfollowUser: builder.mutation<FollowUserInDTO, ProfileParams>({
         query: ({username}) => ({
            url: `/profiles/${username}/follow`,
            method: 'delete'
         }),
         onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
            await replaceCachedProfile(getState, queryFulfilled, dispatch, profileApi )
         },
      }),
   })
})

export const { useGetProfileQuery, useFollowUserMutation, useUnfollowUserMutation, } = profileApi;