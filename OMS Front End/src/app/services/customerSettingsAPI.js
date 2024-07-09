import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase, } from '../../utils/API/fetchBaseQuery';

const customerSettingsAPI = createApi({
    reducerPath: 'customerSettingsAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({


        //AddEdit Customer Settings
        addEditCustomerSettings: builder.mutation({
            query: (userDetails) => ({
                url: '/CustomerAccoutingSettings/AddEditCustomerSettings',
                method: 'POST',
                body: transformRequest(userDetails)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        //getSettingDetail by customer Id
        GetDetailsbyCustomerID: builder.query({
            query: (customerId) => ({
                url: encryptQueryString(`/CustomerAccoutingSettings/GetDetailsbyCustomerID/?customerId=${(customerId)}`),
                method: 'GET',
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        //Get All PaymentMethod 
        getAllPaymentMethod: builder.query({
            query: () => ({
                url: `/Common/GetAllPaymentMethod`,
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        //Get All PaymentTerms
        getAllPaymentTerms: builder.query({
            query: () => ({
                url: `/Common/GetAllPaymentTerms`,
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addCustomerShppingDeliveryCarriersAndDeliveryMethods: builder.mutation({
            query: (requestData) => ({
                url: '/CustomerAccoutingSettings/AddCustomerShppingDeliveryCarriersAndDeliveryMethods',
                method: 'POST',
                body: transformRequest(requestData)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getShppingDeliveryCarrierAndDeliveryMethodsById: builder.query({
            query: (customerId) => ({
                url: `/CustomerAccoutingSettings/GetShppingDeliveryCarrierAndDeliveryMethodsById?customerId=${(customerId)}`,
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        //** Delivery Carriers */
        addShppingDeliveryCarriers: builder.mutation({
            query: (requestData) => ({
                url: '/CustomerAccoutingSettings/AddShppingDeliveryCarriers',
                method: 'POST',
                body: transformRequest(requestData)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteCustomerDeliveryCarriersById: builder.mutation({
            query: (requestId) => ({
                url: encryptQueryString(`/CustomerAccoutingSettings/DeleteCustomerDeliveryCarriersById/?CustomerDeliveryCarrierId=${requestId}`),
                method: 'DELETE',
                body: transformRequest(requestId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        updateShppingDeliveryCarriers: builder.mutation({
            query: (requestData) => ({
                url: '/CustomerAccoutingSettings/UpdateShppingDeliveryCarriers',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getCustomerDeliveryCarriersByCustomerDeliveryCarrierId: builder.query({
            query: (id) => ({
                url: `/CustomerAccoutingSettings/GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId?customerDeliveryCarrierId=${(id)}`,
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        //** Delivery Methods */
        addDeliveryMethods: builder.mutation({
            query: (requestData) => ({
                url: '/CustomerAccoutingSettings/AddDeliveryMethods',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteCustomerDeliveryMethodsById: builder.mutation({
            query: (requestId) => ({
                url: encryptQueryString(`/CustomerAccoutingSettings/DeleteCustomerDeliveryMethodsById/?CustomerDeliveryMethodId=${requestId}`),
                method: 'DELETE',
                body: transformRequest(requestId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        updateDeliveryMethods: builder.mutation({
            query: (requestData) => ({
                url: '/CustomerAccoutingSettings/UpdateDeliveryMethods',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getCustomerDeliveryMethodByCustomerDeliveryMethodId: builder.query({
            query: (id) => ({
                url: `/CustomerAccoutingSettings/GetCustomerDeliveryMethodByCustomerDeliveryMethodId?customerDeliveryMethodId=${(id)}`,
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

    })
})

export const { useAddEditCustomerSettingsMutation, useLazyGetDetailsbyCustomerIDQuery, useLazyGetAllPaymentMethodQuery, useLazyGetAllPaymentTermsQuery,
    useAddCustomerShppingDeliveryCarriersAndDeliveryMethodsMutation, useLazyGetShppingDeliveryCarrierAndDeliveryMethodsByIdQuery,
    useAddShppingDeliveryCarriersMutation, useDeleteCustomerDeliveryCarriersByIdMutation, useDeleteCustomerDeliveryMethodsByIdMutation,
    useAddDeliveryMethodsMutation, useUpdateShppingDeliveryCarriersMutation, useUpdateDeliveryMethodsMutation,
    useLazyGetCustomerDeliveryCarriersByCustomerDeliveryCarrierIdQuery, useLazyGetCustomerDeliveryMethodByCustomerDeliveryMethodIdQuery,
} = customerSettingsAPI;

export default customerSettingsAPI;
