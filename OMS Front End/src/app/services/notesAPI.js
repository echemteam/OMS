import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase, defaultBaseQuery } from '../../utils/API/fetchBaseQuery';

const notesAPI = createApi({
    reducerPath: 'notesAPI',
    baseQuery: customFetchBase,
    // baseQuery: defaultBaseQuery,
    endpoints: (builder) => ({

        addCustomerNotes: builder.mutation({
            query: (data) => ({
                url: '/CustomerNotes/AddCustomerNotes',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        updateCustomerNotes: builder.mutation({
            query: (data) => ({
                url: '/CustomerNotes/UpdateCustomerNotes',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getCustomerNoteByCustomerId: builder.query({
            query: (customerId) => ({
                url: encryptQueryString(`/CustomerNotes/GetCustomerNoteByCustomerId/?customerId=${Number(customerId)}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),




    })
})

export const { useAddCustomerNotesMutation,useUpdateCustomerNotesMutation,useLazyGetCustomerNoteByCustomerIdQuery} = notesAPI;

export default notesAPI;