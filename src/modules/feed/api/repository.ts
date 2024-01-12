import { createApi } from '@reduxjs/toolkit/query/react'
import { FeedArticle } from './dto/global-feed.in';
import { FEED_PAGE_SIZE } from '../consts';
import { PopularTagsInDTO } from './dto/popular-tags.in';
import { replaceCacheArticle, transformResponse } from './utils';
import { realWorldBaseQuery } from '../../../core/api/realworld-base-query';
import { SingleArticleInDTO } from './dto/single-article.in';
import { ArticleCommentsInDTO } from './dto/article-comments.in';
import { favoriteArticleInDTO } from './dto/favorite-article.in';
import { RootState } from '../../../store/store';

interface BaseFeedParams {
   page: number;
}
export interface GlobalFeedParams extends BaseFeedParams {
   tag: string | null;
   isPersonalFeed: boolean;
}

interface ProfileFeedParams extends BaseFeedParams{
   author: string;
   isFavorited?: boolean;
}

export interface FeedData {
   articles: FeedArticle[];
   articlesCount: number;
 }

interface SingleArticleParams {
   slug: string
}
interface FavoriteArticleParams {
   slug: string
}

export const feedApi = createApi({
   reducerPath: 'feedApi',
   baseQuery: realWorldBaseQuery,
   tagTypes: ['Article', 'Articles'],
   endpoints: (builder) => ({
      getGlobalFeed: builder.query<FeedData, GlobalFeedParams>({
         query: ({page, tag, isPersonalFeed}) => ({
            url: isPersonalFeed ? '/articles/feed' : '/articles',
            params: {
               limit: FEED_PAGE_SIZE,
               offset: page * FEED_PAGE_SIZE,
               tag,
            }
         }),
         transformResponse,
         providesTags: result => 
         result 
            ? result?.articles.map(article => ({
               type: 'Article',
               slug: article.slug,
            }))
            : ['Articles'],
      }),
      getProfileFeed: builder.query<FeedData, ProfileFeedParams>({
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
      }),
      getCommentsForArticle: builder.query<ArticleCommentsInDTO, SingleArticleParams>({
         query: ({ slug }) => ({
            url: `/articles/${slug}/comments`
         })
      }),
      favoriteArticle: builder.mutation<favoriteArticleInDTO, FavoriteArticleParams>({
         query: ({ slug }) => ({
            url: `/articles/${slug}/favorite`,
            method: 'post',
         }),
         onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
            await replaceCacheArticle(getState, queryFulfilled, dispatch, feedApi)
         } 
      }),
      unfavoriteArticle: builder.mutation<favoriteArticleInDTO, FavoriteArticleParams>({
         query: ({ slug }) => ({
            url: `/articles/${slug}/favorite`,
            method: 'delete',
         }),
         onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
            await replaceCacheArticle(getState, queryFulfilled, dispatch, feedApi)
         } 
      }),
   })
})

export const { 
   useGetGlobalFeedQuery, 
   useGetProfileFeedQuery,
   useGetPopularTagsQuery,  
   useGetSingleArticleQuery,
   useGetCommentsForArticleQuery,
   useFavoriteArticleMutation,
   useUnfavoriteArticleMutation,
} = feedApi;