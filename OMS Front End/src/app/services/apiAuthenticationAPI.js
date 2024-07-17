import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const  apiAuthenticationAPI= createApi({
    reducerPath: 'apiAuthenticationAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addEditApiAuthentication: builder.mutation({
            query: (data) => ({
                url: '/ApiConfiguration/AddEditApiAuthentication',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiAuthentications: builder.mutation({
            query: (userQuery) => ({
                url: '/ApiConfiguration/GetApiAuthentications',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    
        getApiAuthenticationByAuthId: builder.query({
            query: (authId) => ({
                url: encryptQueryString(`/ApiConfiguration/GetApiAuthenticationByAuthId/?authId=${Number(authId)}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteApiAuthentication: builder.mutation({
            query: (authId) => ({
                url: encryptQueryString(`/ApiConfiguration/DeleteApiAuthentication/?authId=${authId}`),
                method: 'DELETE',
                body: transformRequest(authId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),


    })
})

export const { 
     useAddEditApiAuthenticationMutation,
     useGetApiAuthenticationsMutation,
     useLazyGetApiAuthenticationByAuthIdQuery,
      useDeleteApiAuthenticationMutation,
     } = apiAuthenticationAPI;

export default apiAuthenticationAPI;