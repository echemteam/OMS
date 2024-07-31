
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

        addEditOrganizationLogisticDetails: builder.mutation({
            query: (Details) => ({
                url: '/Organization/AddEditOrganizationLogisticDetails',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getOrganizationLogisticDetails: builder.query({
            query: () => ({
                url: encryptQueryString('/Organization/GetOrganizationLogisticDetails'),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addEditOrganizationBankDetails: builder.mutation({
            query: (Details) => ({
                url: '/Organization/AddEditOrganizationBankDetails',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getOrganizationBankDetails: builder.query({
            query: () => ({
                url: encryptQueryString('/Organization/GetOrganizationBankDetails'),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addEditOrganizationAccountingDetails: builder.mutation({
            query: (Details) => ({
                url: '/Organization/AddEditOrganizationAccountingDetails',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getOrganizationAccountingDetails: builder.query({
            query: () => ({
                url: encryptQueryString('/Organization/GetOrganizationAccountingDetails'),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addEditOrganizationShippingCharges: builder.mutation({
            query: (Details) => ({
                url: '/Organization/AddEditOrganizationShippingCharges',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getOrganizationShippingCharges: builder.query({
            query: () => ({
                url: encryptQueryString('/Organization/GetOrganizationShippingCharges'),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addEditOrganizationOtherCharges: builder.mutation({
            query: (Details) => ({
                url: '/Organization/AddEditOrganizationOtherCharges',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getOrganizationOtherCharges: builder.query({
            query: () => ({
                url: encryptQueryString('/Organization/GetOrganizationOtherCharges'),
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
    useAddEditOrganizationLogisticDetailsMutation,
    useLazyGetOrganizationLogisticDetailsQuery,
    useAddEditOrganizationBankDetailsMutation,
    useLazyGetOrganizationBankDetailsQuery,
    useAddEditOrganizationAccountingDetailsMutation,
    useLazyGetOrganizationAccountingDetailsQuery,
    useAddEditOrganizationShippingChargesMutation,
    useLazyGetOrganizationShippingChargesQuery,
    useAddEditOrganizationOtherChargesMutation,
    useLazyGetOrganizationOtherChargesQuery,
} = organizationAPI

export default organizationAPI;