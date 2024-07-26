
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const thirdPartyAPI = createApi({
    reducerPath: "thirdPartyAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        addEditApiEvent: builder.mutation({
            query: (data) => ({
                url: '/ApiEventManagement/AddEditApiEvent',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiEvents: builder.mutation({
            query: (userQuery) => ({
                url: '/ApiEventManagement/GetApiEvents',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiEventByApiEventId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/GetApiEventByApiEventId/?apiEventId=${Number(id)}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteApiEvent: builder.mutation({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/DeleteApiEvent/?apiEventId=${id}`),
                method: 'DELETE',
                body: transformRequest(id)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addApiEventMapping: builder.mutation({
            query: (data) => ({
                url: '/ApiEventManagement/AddApiEventMapping',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiEventMappings: builder.mutation({
            query: (userQuery) => ({
                url: '/ApiEventManagement/GetApiEventMappings',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteApiEventMapping: builder.mutation({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/DeleteApiEventMapping/?apiEventId=${id}`),
                method: 'DELETE',
                body: transformRequest(id)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

    })
})

export const {
    useAddEditApiEventMutation,
    useAddApiEventMappingMutation,
    useGetApiEventsMutation,
    useGetApiEventMappingsMutation,
    useLazyGetApiEventByApiEventIdQuery,
    useDeleteApiEventMutation,
    useDeleteApiEventMappingMutation,
} = thirdPartyAPI

export default thirdPartyAPI;