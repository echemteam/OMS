
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

        getApiEventParameters: builder.mutation({
            query: (userQuery) => ({
                url: '/ApiEventManagement/GetApiEventParameters',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiParameterMappings: builder.mutation({
            query: (userQuery) => ({
                url: '/ApiEventManagement/GetApiParameterMappings',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getAllAPIParametersByEndpointId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/GetAllAPIParametersByEndpointId?endpointId=${id}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getAllEventParameterByEventId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/GetAllEventParameterByEventId?apiEventId=${id}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteApiEventMapping: builder.mutation({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/DeleteApiEventMapping/?apiEventMappingId=${id}`),
                method: 'DELETE',
                body: transformRequest(id)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addEditApiEventParameter: builder.mutation({
            query: (data) => ({
                url: '/ApiEventManagement/AddEditApiEventParameter',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiEventParameterByApiEventParametersId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/GetApiEventParameterByApiEventParametersId/?apiEventId=${Number(id)}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteApiEventParameter: builder.mutation({
            query: (request) => ({
                url: encryptQueryString(`/ApiEventManagement/DeleteApiEventParameter/?parameterId=${request.parameterId}&apiEventParametersId=${request.apiEventParametersId}`),
                method: 'DELETE',
                body: transformRequest(request)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteApiParameterMapping: builder.mutation({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/DeleteApiParameterMapping/?apiParameterMappingId=${id}`),
                method: 'DELETE',
                body: transformRequest(id)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addApiParameterMapping: builder.mutation({
            query: (data) => ({
                url: '/ApiEventManagement/AddApiParameterMapping',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getAllApiEventParameterByApiEventId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Common/GetAllApiEventParameterByApiEventId/?apiEventId=${Number(id)}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addEditApiEventRequiredField: builder.mutation({
            query: (data) => ({
                url: '/ApiEventManagement/AddEditApiEventRequiredField',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiEventRequiredFieldByApiEventRequiredFieldId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/GetApiEventRequiredFieldByApiEventRequiredFieldId/?apiEventRequiredFieldId=${Number(id)}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getAllRequiredFieldsByEventId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/GetAllRequiredFieldsByEventId/?apiEventId=${Number(id)}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteApiEventRequiredField: builder.mutation({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/DeleteApiEventRequiredField/?apiEventRequiredFieldId=${id}`),
                method: 'DELETE',
                body: transformRequest(id)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteApiEventRequiredFieldsMapping: builder.mutation({
            query: (id) => ({
                url: encryptQueryString(`/ApiEventManagement/DeleteApiEventRequiredFieldsMapping/?apiEventRequiredFieldsMappingId=${id}`),
                method: 'DELETE',
                body: transformRequest(id)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiEventRequiredFields: builder.mutation({
            query: (data) => ({
                url: '/ApiEventManagement/GetApiEventRequiredFields',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiEventRequiredFieldsMappings: builder.mutation({
            query: (data) => ({
                url: '/ApiEventManagement/GetApiEventRequiredFieldsMappings',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addApiEventRequiredFieldsMapping: builder.mutation({
            query: (data) => ({
                url: '/ApiEventManagement/AddApiEventRequiredFieldsMapping',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        thirdPartyAPICall: builder.mutation({
            query: (data) => ({
                url: '/ApiConfiguration/ThirdPartyAPICall',
                method: 'POST',
                body: transformRequest(data)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiEventLogByEventId: builder.mutation({
            query: (data) => ({
                url: '/ApiEventManagement/GetApiEventLogByEventId',
                method: 'POST',
                body: transformRequest(data)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const {
    useAddEditApiEventMutation,
    useAddApiEventMappingMutation,
    useAddEditApiEventRequiredFieldMutation,
    useAddApiEventRequiredFieldsMappingMutation,


    useAddApiParameterMappingMutation,
    useAddEditApiEventParameterMutation,
    useGetApiEventsMutation,
    useGetApiEventRequiredFieldsMutation,
    useLazyGetAllAPIParametersByEndpointIdQuery,
    useLazyGetAllEventParameterByEventIdQuery,
    useGetApiParameterMappingsMutation,
    useGetApiEventMappingsMutation,

    useGetApiEventRequiredFieldsMappingsMutation,

    useGetApiEventParametersMutation,
    useLazyGetApiEventByApiEventIdQuery,
    useLazyGetApiEventParameterByApiEventParametersIdQuery,
    useLazyGetApiEventRequiredFieldByApiEventRequiredFieldIdQuery,
    useLazyGetAllRequiredFieldsByEventIdQuery,


    useLazyGetAllApiEventParameterByApiEventIdQuery,
    useDeleteApiEventMutation,
    useDeleteApiEventMappingMutation,
    useDeleteApiEventParameterMutation,
    useDeleteApiParameterMappingMutation,
    useDeleteApiEventRequiredFieldMutation,
    useDeleteApiEventRequiredFieldsMappingMutation,

    useThirdPartyAPICallMutation,
    useGetApiEventLogByEventIdMutation,
} = thirdPartyAPI

export default thirdPartyAPI;