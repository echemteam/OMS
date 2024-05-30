import { createApi } from '@reduxjs/toolkit/query/react';
import { transformErrorResponse, transformSucessResponse } from '../../utils/API/responseMiddleware';
import { defaultBaseQuery } from '../../utils/API/fetchBaseQuery';
import { transformRequest } from '../../utils/API/requestMiddleware';

const authapi = createApi({
  baseQuery: defaultBaseQuery, // Replace with your API endpoint
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: '/Authentication/UserLogin', // Replace with your authentication endpoint
        method: 'POST',
        body: transformRequest(credentials)
      }),
      invalidatesTags: ['authentication'],
      transformResponse: transformSucessResponse,
      transformErrorResponse: transformErrorResponse
    }),
  }),
});

export const { useUserLoginMutation } = authapi;
export default authapi;
