import { createApi } from '@reduxjs/toolkit/query/react'
import { GlobalFeedInDTO } from './dto/global-feed.in';
import { FEED_PAGE_SIZE } from '../consts';
import { PopularTagsInDTO } from './dto/popular-tags.in';
import { transformResponse } from './utils';
import { realWorldBaseQuery } from '../../../core/api/realworld-base-query';
import { SingleArticleInDTO } from './dto/single-article.in';

interface BaseFeedParams {
   page: number;
}
interface GlobalFeedParams extends BaseFeedParams {
   tag: string | null;
}

interface ProfileFeedParams extends BaseFeedParams{
   author: string;
   isFavorited?: boolean;
}

interface SingleArticleParams {
   slug: string
}

export const feedApi = createApi({
   reducerPath: 'feedApi',
   baseQuery: realWorldBaseQuery,
   endpoints: (builder) => ({
      getGlobalFeed: builder.query<GlobalFeedInDTO, GlobalFeedParams>({
         query: ({page, tag}) => ({
            url: '/articles',
            params: {
               limit: FEED_PAGE_SIZE,
               offset: page * FEED_PAGE_SIZE,
               tag,
            }
         }),
         transformResponse,
      }),
      getProfileFeed: builder.query<GlobalFeedInDTO, ProfileFeedParams>({
         query: ({page, author, isFavorited = false}) => ({
            url: '/articles',
            params: {
               author: isFavorited ? undefined : author,
               limit: FEED_PAGE_SIZE,
               offset: page * FEED_PAGE_SIZE,
               favorited: !isFavorited ? undefined : author,
            }
         }),
         transformResponse,
      }),
      getPopularTags: builder.query<PopularTagsInDTO, any>({
         query: () => ({
            url: '/tags'
         })
      }),
      getSingleArticle: builder.query<SingleArticleInDTO, SingleArticleParams>({
         query: ({ slug }) => ({
            url: `/articles/${slug}`
         })
      })
   })
})

export const { 
   useGetGlobalFeedQuery, 
   useGetProfileFeedQuery,
   useGetPopularTagsQuery,  
   useGetSingleArticleQuery,
} = feedApi;