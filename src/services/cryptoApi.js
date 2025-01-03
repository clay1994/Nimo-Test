import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-cg-demo-api-key': process.env.REACT_APP_COINGECKO_KEY,
}

const baseUrl = process.env.REACT_APP_COINGECKO_API_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest(`/coins/markets?vs_currency=usd`)
        }),
        // getCryotoDetails: builder.query({
        //     query: (coinId) => createRequest(`/coin/${coinId}`)
        // }),
        // getCryotoHistory: builder.query({
        // //     query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        // })
    })
})

export const { useGetCryptosQuery, useGetCryotoDetailsQuery, useGetCryotoHistoryQuery } = cryptoApi;