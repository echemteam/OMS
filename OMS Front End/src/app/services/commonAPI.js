
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
        getAllAccountType: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllAccountType'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllOrderMethod: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllOrderMethod'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllIncoterm: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllIncoterm'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllDocumentByOwnerId: builder.query({
            query: (data) => ({
                url: encryptQueryString(`/Common/GetAllDocumentByOwnerId/?ownerId=${data.ownerId}&ownerType=${data.ownerType}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getNotesHistory: builder.query({
            query: (data) => ({
                url: encryptQueryString(`/Common/GetNotesHistory/?entityId=${data.entityId}&ownerId=${data.ownerId}&ownerTypeId=${data.ownerTypeId}&noteType=${data.noteType}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllModulesWithPendingRequestCount: builder.query({
            query: (isPending) => ({
                url: encryptQueryString(`/Common/GetAllModulesWithPendingRequestCount?isPending=${isPending}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
    })
})

export const {
    useGetAllDeliveryCarriersQuery, useGetAllDeliveryMethodsQuery, useLazyGetAllDeliveryAccountsQuery, useLazyGetAllUserQuery, 
    useUpdateResponsibleUserMutation,useLazyGetAllCustomersQuery,useGetAllSubCustomerByCustomerIdMutation , useLazyGetAllAccountTypeQuery
    , useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery, useLazyGetAllAddressesByCustomerIdAndAddressTypeIdQuery,useAddApprovalRequestsMutation,
    useLazyGetAllOrderMethodQuery,
    useLazyGetAllIncotermQuery, useLazyGetAllDocumentByOwnerIdQuery, useLazyGetNotesHistoryQuery,useLazyGetAllModulesWithPendingRequestCountQuery,
} = commonAPI

export default commonAPI;