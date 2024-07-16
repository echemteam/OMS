import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const  apiEndPointsAPI= createApi({
    reducerPath: 'apiEndPointsAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addEditApiEndpoint: builder.mutation({
            query: (data) => ({
                url: '/ApiConfiguration/AddEditApiEndpoint',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiEndpoints: builder.mutation({
            query: (userQuery) => ({
                url: '/ApiConfiguration/GetApiEndpoints',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    
        getAllAPIProviders: builder.query({
            query: () => ({
                url: encryptQueryString(`/Common/GetAllAPIProviders`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getApiEndpointByEndpointId: builder.query({
            query: (endpointId) => ({
                url: encryptQueryString(`/ApiConfiguration/GetApiEndpointByEndpointId/?endpointId=${Number(endpointId)}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteApiEndpoint: builder.mutation({
            query: (endpointId) => ({
                url: encryptQueryString(`/ApiConfiguration/DeleteApiEndpoint/?endpointId=${endpointId}`),
                method: 'DELETE',
                body: transformRequest(endpointId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),


    })
})

export const { 
     useAddEditApiEndpointMutation,
     useGetApiEndpointsMutation,
     useLazyGetAllAPIProvidersQuery,
     useLazyGetApiEndpointByEndpointIdQuery,
      useDeleteApiEndpointMutation,
     } = apiEndPointsAPI;

export default apiEndPointsAPI;