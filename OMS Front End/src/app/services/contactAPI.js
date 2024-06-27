
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const contactAPI = createApi({
    reducerPath: "contactAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getAllContactTypes: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllContactTypes'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getContactByCustomerId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Contact/GetContactByCustomerId/?customerId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getContactBySupplierId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Contact/GetContactBySupplierId/?supplierId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addEditContact: builder.mutation({
            query: (requestData) => ({
                url: '/Contact/AddEditContact',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        })

    })
})

export const {
    useLazyGetAllContactTypesQuery, useLazyGetContactByCustomerIdQuery, useAddEditContactMutation , useLazyGetContactBySupplierIdQuery
} = contactAPI

export default contactAPI;