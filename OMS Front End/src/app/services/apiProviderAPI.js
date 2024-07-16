import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const  apiProviderAPI= createApi({
    reducerPath: 'apiProviderAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addEditApiProvider: builder.mutation({
            query: (data) => ({
                url: '/ApiConfiguration/AddEditApiProvider',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiProviders: builder.mutation({
            query: (userQuery) => ({
                url: '/ApiConfiguration/GetApiProviders',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    
        getApiProviderByProviderId: builder.query({
            query: (providerId) => ({
                url: encryptQueryString(`/ApiConfiguration/GetApiProviderByProviderId/?providerId=${Number(providerId)}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteApiProvider: builder.mutation({
            query: (providerId) => ({
                url: encryptQueryString(`/ApiConfiguration/DeleteApiProvider/?providerId=${providerId}`),
                method: 'DELETE',
                body: transformRequest(providerId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),


    })
})

export const { useAddEditApiProviderMutation,
    useGetApiProvidersMutation,
     useLazyGetApiProviderByProviderIdQuery,
     useDeleteApiProviderMutation,
     } = apiProviderAPI;

export default apiProviderAPI;