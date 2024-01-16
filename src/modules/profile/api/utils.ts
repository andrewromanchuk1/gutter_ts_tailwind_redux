import { Drafted } from "immer/dist/internal";
import { RootState } from "../../../store/store";
import { Profile } from "./dto/follow-user.in";
import { GetProfileInDTO } from "./dto/get-profile.in";
import { replacesCachedProfileInArticle } from "../../feed/api/utils";

const updateProfile = <T>(
   feedKey: string,
   data: {profile: Profile},
   keys: string[], 
   state: RootState, 
   dispatch: any,
   api: any,   
) => {
   for(
      let i = 0,
         key = keys[i],
         queryItem = state.profileApi.queries[key];
      i < keys.length;
      i++, key = keys[i], queryItem = state.profileApi.queries[key]
   )  {   
         if (!key.startsWith(feedKey)) {
         continue;
      }

      const profileToUpdate = state.profileApi.queries[key]?.data as GetProfileInDTO;

      if(profileToUpdate.profile.username !== data.profile.username) {
         continue;
      }

      dispatch(
         api.util.updateQueryData(
            feedKey,
            queryItem!.originalArgs as T,
            (draft: Drafted<GetProfileInDTO>) => {
               draft.profile.following = data.profile.following;
            }
         )
      )
   }
}

export const replaceCachedProfile = async (
   getState: any,
   queryFulfilled: any,
   dispatch: any,
   profileApi: any,
) => {
   const state = getState() as RootState;
            
   try {
      const { data } = await queryFulfilled;
      const feedKeys = Object.keys(state.profileApi.queries);
      
      updateProfile('getProfile', data, feedKeys, state, dispatch, profileApi);
      replacesCachedProfileInArticle(getState, queryFulfilled, dispatch);
   } catch(e) {}
}