
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const organizationAPI = createApi({
    reducerPath: "organizationAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addEditOrganizationProfile: builder.mutation({
            query: (Details) => ({
                url: '/Organization/AddEditOrganizationProfile',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addEditSmtpSettings: builder.mutation({
            query: (Details) => ({
                url: '/Organization/AddEditSmtpSettings',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addEditOrganizationOtherSettings: builder.mutation({
            query: (Details) => ({
                url: '/Organization/AddEditOrganizationOtherSettings',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getOrganizationProfile: builder.query({
            query: () => ({
                url: encryptQueryString('/Organization/GetOrganizationProfile'),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getOrganizationOtherSettings: builder.query({
            query: () => ({
                url: encryptQueryString('/Organization/GetOrganizationOtherSettings'),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getSmtpSettings: builder.query({
            query: () => ({
                url: encryptQueryString('/Organization/GetSmtpSettings'),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        
        addEditOrganizationContactDetails: builder.mutation({
            query: (Details) => ({
                url: '/Organization/AddEditOrganizationContactDetails',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getOrganizationContactDetails: builder.query({
            query: () => ({
                url: encryptQueryString('/Organization/GetOrganizationContactDetails'),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const {
    useAddEditOrganizationProfileMutation,
    useAddEditSmtpSettingsMutation,
    useAddEditOrganizationOtherSettingsMutation,
    useLazyGetOrganizationProfileQuery,
    useLazyGetOrganizationOtherSettingsQuery,
    useLazyGetSmtpSettingsQuery,
    useAddEditOrganizationContactDetailsMutation,
    useLazyGetOrganizationContactDetailsQuery,

} = organizationAPI

export default organizationAPI;