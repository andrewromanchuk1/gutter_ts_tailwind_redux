import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { realWorldBaseQuery } from "../../../core/api/realworld-base-query";
import { GetProfileInDTO } from "./dto/get-profile.in";
import { FollowUserInDTO } from "./dto/follow-user.in";
import { replaceCachedProfile } from "./utils";
import { UpdateUserInDTO } from "./dto/update-user.in";
import { UpdateUserOutDTO } from "./dto/update-user.out";
import { RootState } from "../../../store/store";
import { setUser } from "../../auth/service/slice";

interface ProfileParams {
   username: string
}

interface UpdateProfileParams {
   avatar: string;
   username: string;
   bio: string;
   email: string;
   newPassword?: string;
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
      updateUser: builder.mutation<UpdateUserInDTO, UpdateProfileParams>({
         query: ({
            avatar,
            username,
            bio,
            email,
            newPassword,
         }) => {
            const data: UpdateUserOutDTO = {
               user: {   
                  email,
                  username,
                  bio,
                  image: avatar,
               }
            };
            
            if(newPassword ) {
               data.user.password = newPassword;
            }

            return {
               url: '/user',
               method: 'put',
               data,

            }
         },
         onQueryStarted: async (
            { avatar, username, bio, email}, 
            { dispatch, queryFulfilled, getState }) => {

            await queryFulfilled;
            const state = getState() as RootState;
            await dispatch(
               setUser({
                  token: state.auth.user!.token,
                  email,
                  username,
                  bio,
                  image: avatar,
               })
            )
         },
      })
   })
})

export const { 
   useGetProfileQuery, 
   useFollowUserMutation, 
   useUnfollowUserMutation, 
   useUpdateUserMutation,
} = profileApi;