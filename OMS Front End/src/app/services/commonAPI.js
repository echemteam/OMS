
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const commonAPI = createApi({
    reducerPath: "commonAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getAllDeliveryCarriers: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllDeliveryCarriers'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllDeliveryMethods: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllDeliveryMethods'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllDeliveryAccounts: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllDeliveryAccounts'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllUser: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllUser'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),

        updateResponsibleUser: builder.mutation({
            query: (requestData) => ({
                url: '/Common/UpdateResponsibleUser',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addApprovalRequests: builder.mutation({
            query: (requestData) => ({
                url: '/Approval/AddApprovalRequests',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getAllCustomers: builder.query({
            query: () => ({
                url: `/Common/GetAllCustomers`,
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getAllSubCustomerByCustomerId: builder.mutation({
            query: (id) => ({
                url: `/Common/GetAllSubCustomerByCustomerId?customerId=${(id)}`,
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getAllContactsByCustomerIdAndContactTypeId: builder.query({
            query: (data) => ({
                url: encryptQueryString(`/Common/GetAllContactsByCustomerIdAndContactTypeId/?customerId=${data.customerId}&contactTypeId=${data.contactTypeId}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getAllAddressesByCustomerIdAndAddressTypeId: builder.query({
            query: (data) => ({
                url: encryptQueryString(`/Common/GetAllAddressesByCustomerIdAndAddressTypeId/?customerId=${data.customerId}&addressTypeId=${data.addressTypeId}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

    })
})

export const {
    useGetAllDeliveryCarriersQuery, useGetAllDeliveryMethodsQuery, useLazyGetAllDeliveryAccountsQuery, useLazyGetAllUserQuery,
    useUpdateResponsibleUserMutation,useLazyGetAllCustomersQuery,useGetAllSubCustomerByCustomerIdMutation
    , useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery, useLazyGetAllAddressesByCustomerIdAndAddressTypeIdQuery
} = commonAPI

export default commonAPI;