import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const supplierNotesAPI = createApi({
    reducerPath: 'supplierNotesAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addSupplierNotes: builder.mutation({
            query: (data) => ({
                url: '/SupplierNotes/AddSupplierNotes',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getSupplierNotesBySupplierId: builder.query({
            query: (customerId) => ({
                url: encryptQueryString(`/SupplierNotes/GetSupplierNotesBySupplierId/?supplierId=${Number(customerId)}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        updateSupplierNotes: builder.mutation({
            query: (data) => ({
                url: '/SupplierNotes/UpdateSupplierNotes',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),


    })
})

export const { useAddSupplierNotesMutation,

    useLazyGetSupplierNotesBySupplierIdQuery,
    useUpdateSupplierNotesMutation
} = supplierNotesAPI;

export default supplierNotesAPI;