import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Developer accounts are limited to 100 requests over a 24 hour period 
// (50 requests available every 12 hours).
// Please upgrade to a paid plan if you need more requests.

const NEWS_API_KEY = '81f715836f3643e0af244ba8f7ccadb4';

export const newsApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://newsapi.org/v2`,
    }),
    endpoints(builder) {
        return {
            fetchArticles: builder.query({
                // default country USA
                query(arg) {
                    const { country, page } = arg;

                    return {
                        url: `/top-headlines`,
                        headers: { 'x-api-key': `${NEWS_API_KEY}` },
                        params: { country, page },
                    };
                },
            }),

            searchArticle: builder.query({
                // search by q(keyword) | default sort popularity
                query(arg) {
                    const { q, page, sortBy } = arg;

                    return {
                        url: `/everything`,
                        headers: { 'x-api-key': `${NEWS_API_KEY}` },
                        params: { q, page, sortBy, pageSize: 20 },
                    };
                },
            }),

        };
    },
});
  
export const { useFetchArticlesQuery, useSearchArticleQuery } = newsApiSlice;