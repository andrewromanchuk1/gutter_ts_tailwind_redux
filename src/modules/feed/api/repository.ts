import { createApi } from '@reduxjs/toolkit/query/react'
import { FeedArticle } from './dto/global-feed.in';
import { FEED_PAGE_SIZE } from '../consts';
import { PopularTagsInDTO } from './dto/popular-tags.in';
import { replaceCachedArticle, transformResponse } from './utils';
import { realWorldBaseQuery } from '../../../core/api/realworld-base-query';
import { SingleArticleInDTO } from './dto/single-article.in';
import { ArticleCommentsInDTO } from './dto/article-comments.in';
import { favoriteArticleInDTO } from './dto/favorite-article.in';
import { CreateArticleInDTO } from './dto/create-article.in';
import { CreateArticleOutDTO } from './dto/create-article.out';

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

export interface CreateArticleParams {
   title: string
   description: string
   body: string
   tags?: string
}
 

export const feedApi = createApi({
   reducerPath: 'feedApi',
   baseQuery: realWorldBaseQuery,
   endpoints: (builder) => ({
      // ======== ======== ========
      //           queries
      // ======== ======== ========
      getGlobalFeed: builder.query<FeedData, GlobalFeedParams>({
         keepUnusedDataFor: 1,
         query: ({page, tag, isPersonalFeed}) => ({
            url: isPersonalFeed ? '/articles/feed' : '/articles',
            params: {
               limit: FEED_PAGE_SIZE,
               offset: page * FEED_PAGE_SIZE,
               tag,
            }
         }),
         transformResponse,
      }),
      getProfileFeed: builder.query<FeedData, ProfileFeedParams>({
         keepUnusedDataFor: 1,
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
      // ======== ======== ========
      //          mutations
      // ======== ======== ========
      favoriteArticle: builder.mutation<favoriteArticleInDTO, FavoriteArticleParams>({
         query: ({ slug }) => ({
            url: `/articles/${slug}/favorite`,
            method: 'post',
         }),
         onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
            await replaceCachedArticle(getState, queryFulfilled, dispatch, feedApi)
         },
      }),
      unfavoriteArticle: builder.mutation<favoriteArticleInDTO, FavoriteArticleParams>({
         query: ({ slug }) => ({
            url: `/articles/${slug}/favorite`,
            method: 'delete',
         }),
         onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
            await replaceCachedArticle(getState, queryFulfilled, dispatch, feedApi)
         } 
      }),
      createArticle: builder.mutation<CreateArticleInDTO, CreateArticleParams>({
         query: ({ title, description, body, tags }) => {
            const data: CreateArticleOutDTO = {
               article: {
                  title,
                  description,
                  body,
                  tagList: tags ? tags.split(',').map(e => e.trim()) : [], 
               }
            }

            return {
               url: '/articles',
               method: 'post',
               data
            }
         }
      })
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
   useCreateArticleMutation,
} = feedApi;