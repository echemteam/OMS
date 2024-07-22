
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
        getOrganizationProfileByOrganizationId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Organization/GetOrganizationProfileByOrganizationId/?organizationId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getOrganizationOtherSettingsById: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Organization/GetOrganizationOtherSettingsById/?organizationOtherSettingId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getSmtpSettingsBySmtpSettingId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Organization/GetSmtpSettingsBySmtpSettingId/?smtpSettingId=${Number(id)}`),
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
    useLazyGetOrganizationProfileByOrganizationIdQuery,
    useLazyGetOrganizationOtherSettingsByIdQuery,
    useLazyGetSmtpSettingsBySmtpSettingIdQuery,

} = organizationAPI

export default organizationAPI;