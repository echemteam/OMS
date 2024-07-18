import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const  customerSubCustomerAPI= createApi({
    reducerPath: 'customerSubCustomerAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        getAllSubCompany: builder.query({
            query: (data) => ({
                url: encryptQueryString(`/Common/GetAllSubCompany/?isSubCustomer=${data.isSubCustomer}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addSubCompanyMainCompany: builder.mutation({
            query: (data) => ({
                url: '/Customers/AddSubCompanyMainCompany',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getSubCompanysByMainCompanyId: builder.mutation({
            query: (userQuery) => ({
                url: '/Customers/GetSubCompanysByMainCompanyId',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteSubCompany: builder.mutation({
            query: (subCompanyMainCompanyId) => ({
                url: encryptQueryString(`/Customers/DeleteSubCompany/?subCompanyMainCompanyId=${subCompanyMainCompanyId}`),
                method: 'DELETE',
                body: transformRequest(subCompanyMainCompanyId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),


    })
})

export const { 
    useAddSubCompanyMainCompanyMutation,
     useGetSubCompanysByMainCompanyIdMutation,
     useLazyGetAllSubCompanyQuery,
     useDeleteSubCompanyMutation,
     } = customerSubCustomerAPI;

export default customerSubCustomerAPI;