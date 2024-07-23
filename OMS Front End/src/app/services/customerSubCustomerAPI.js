import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const customerSubCustomerAPI = createApi({
    reducerPath: 'customerSubCustomerAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        getAllApproveCustomerForLinking: builder.query({
            query: (customerId) => ({
                url: encryptQueryString(`/Common/GetAllApproveCustomerForLinking?customerId=${customerId}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addSubCustomer: builder.mutation({
            query: (data) => ({
                url: '/Customers/AddSubCustomer',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getSubCustomerByCustomerId: builder.mutation({
            query: (userQuery) => ({
                url: '/Customers/GetSubCustomerByCustomerId',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteSubCustomer: builder.mutation({
            query: (subCustomerMainCustomerId) => ({
                url: encryptQueryString(`/Customers/DeleteSubCustomer/?subCustomerMainCustomerId=${subCustomerMainCustomerId}`),
                method: 'DELETE',
                body: transformRequest(subCustomerMainCustomerId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),


    })
})

export const {
    useAddSubCustomerMutation,
    useGetSubCustomerByCustomerIdMutation,
    useLazyGetAllApproveCustomerForLinkingQuery,
    useDeleteSubCustomerMutation,
} = customerSubCustomerAPI;

export default customerSubCustomerAPI;