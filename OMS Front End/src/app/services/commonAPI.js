
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

        getAllContactsByCustomerIdAndContactTypeId: builder.query({
            query: (data) => ({
                url: encryptQueryString(`/Common/GetAllContactsByCustomerIdAndContactTypeId/?customerId=${data.customerId}&contactTypeId=${data.contactTypeId}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

    })
})

export const {
    useGetAllDeliveryCarriersQuery, useGetAllDeliveryMethodsQuery, useLazyGetAllDeliveryAccountsQuery, useLazyGetAllUserQuery,
    useUpdateResponsibleUserMutation, useLazyGetAllContactsByCustomerIdAndContactTypeIdQuery,

} = commonAPI

export default commonAPI;