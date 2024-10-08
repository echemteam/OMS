import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const orderAPI = createApi({
    reducerPath: 'orderAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        checkPoNumberExistOrNot: builder.mutation({
            query: (Details) => ({
                url: '/Order/CheckPoNumberExistOrNot',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getPoNumberDetailsByPoNumber: builder.query({
            query: (number) => ({
                url: encryptQueryString(`/Order/GetPoNumberDetailsByPoNumber/?poNumber=${String(number)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addOrder: builder.mutation({
            query: (data) => ({
                url: '/Order/AddOrder',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getOrders: builder.mutation({
            query: (userQuery) => ({
                url: '/Order/GetOrders',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getOrderDetailByOrderId: builder.query({
            query: (orderId) => ({
                url: encryptQueryString(`Order/GetOrderDetailByOrderId?orderId=${orderId}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),

        getOrderItemsByOrderId: builder.query({
            query: (orderId) => ({
                url: encryptQueryString(`/Order/GetOrderItemsByOrderId/?orderId=${orderId}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteOrder: builder.mutation({
            query: (orderId) => ({
                url: encryptQueryString(`/Order/DeleteOrder/?orderId=${orderId}`),
                method: 'DELETE'
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        downloadDocument: builder.query({
            query: (requestData) => ({
                url: encryptQueryString(`/Common/DownloadDocument/?folderName=${requestData.folderName}&fileName=${requestData.fileName}&keyId=${requestData.keyId}`),
                Method: 'GET',
                responseHandler: (response) => response.blob()
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addOrderDocuments: builder.mutation({
            query: (requestData) => ({
                url: '/Order/AddOrderDocuments',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getAddresssByCustomerId: builder.query({
            query: (customerId) => ({
                url: encryptQueryString(`/Address/GetAddresssByCustomerId/?customerId=${customerId}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse

        }),
        // getContactByCustomerId: builder.query({
        //     query: (data) => ({
        //         url: encryptQueryString(`/Contact/GetContactByCustomerId/?customerId=${Number(data.id)}&searchText=${data.searchText}&searchContactType=${data.contactType}`),
        //         Method: 'GET',
        //     }),
        //     transformResponse: transformSucessResponse,
        //     transformErrorResponse: transformErrorResponse
        // }),
        
        updateOrderAddress: builder.mutation({
            query: (requestData) => ({
                url: '/Order/UpdateOrderAddress',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteOrderItem: builder.mutation({
            query: (orderItemId) => ({
                url: encryptQueryString(`/Order/DeleteOrderItems/?orderItemId=${orderItemId}`),
                method: 'DELETE'
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const { useCheckPoNumberExistOrNotMutation,
    useLazyGetPoNumberDetailsByPoNumberQuery,
    useAddOrderMutation,
    useGetOrdersMutation,
    useLazyGetOrderDetailByOrderIdQuery,
    useLazyGetOrderItemsByOrderIdQuery,
    useDeleteOrderMutation,
    useLazyDownloadDocumentQuery,
    useAddOrderDocumentsMutation,
    useLazyGetAddresssByCustomerIdQuery,
    useLazyGetContactByCustomerIdQuery,
    useUpdateOrderAddressMutation,
    useDeleteOrderItemMutation,
} = orderAPI;

export default orderAPI;