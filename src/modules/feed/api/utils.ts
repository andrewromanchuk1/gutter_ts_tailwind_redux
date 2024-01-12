import { Drafted } from "immer/dist/internal";
import { RootState } from "../../../store/store";
import { Article } from "./dto/favorite-article.in";
import { GlobalFeedInDTO } from "./dto/global-feed.in"
import { GlobalFeedParams } from "./repository";

export const transformResponse = (response: GlobalFeedInDTO) => {
   return {
      articles: response.articles || [],
      articlesCount: response.articlesCount || 0
   }
}

export const replaceCacheArticle = async (
   getState: any,
   queryFulfilled: any,
   dispatch: any,
   feedApi: any,
) => {
   const state = getState() as RootState;
            
   try {
      const { data } = await queryFulfilled;
      const feedKeys = Object.keys(state.feedApi.queries);
      for(
         let i = 0,
            key = feedKeys[i],
            queryItem = state.feedApi.queries[key];
         i < feedKeys.length;
         i++, key = feedKeys[i], queryItem = state.feedApi.queries[key]
      ) {
         if (!key.startsWith('getGlobalFeed')) {
            continue;
         }
         
         dispatch(
            feedApi.util.updateQueryData(
               'getGlobalFeed',
               queryItem!.originalArgs as GlobalFeedParams,
               (draft: Drafted<GlobalFeedInDTO>) => {
                  const updateId = draft.articles.findIndex(
                     (article) => article.slug === data.article.slug
                  );

                  if(updateId >= 0) {
                     draft.articles[updateId] = data.article
                  }
               }
            )
         )
      }
   } catch(e) {}
}