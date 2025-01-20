import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-cg-demo-api-key': process.env.REACT_APP_COINGECKO_KEY,
};

const baseUrl = process.env.REACT_APP_COINGECKO_API_URL;

const createRequest = (url, method = 'GET', body = null) => {
  const request = {
    url,
    method,
    headers: cryptoApiHeaders,
  };

  // Include body only for methods other than GET
  if (method !== 'GET' && body) {
    request.body = JSON.stringify(body);
  }

  return request;
};

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest(`/coins/markets?vs_currency=usd`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coins/${coinId}`),
    }),
    postCryptoData: builder.mutation({
      query: (formData) => createRequest('/crypto-data', 'POST', formData),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, usePostCryptoDataMutation } = cryptoApi;
