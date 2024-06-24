
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const supplierDocuementsAPI = createApi({
    reducerPath: "supplierDocuementsAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
         
        addSupplierDocuments: builder.mutation({
            query: (requestData) => ({
                url: '/SupplierDocuements/AddSupplierDocuments',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getSupplierDocumentsById: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/SupplierDocuements/GetSupplierDocumentsById/?supplierId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteSupplierDocumentsById: builder.mutation({
            query: (id) => ({
                url: encryptQueryString(`/SupplierDocuements/DeleteSupplierDocumentsById/?supplierDocumentId=${id}`),
                method: 'DELETE',
                body: transformRequest(id)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
       

    })
})

export const {
      useAddSupplierDocumentsMutation,
    useLazyGetSupplierDocumentsByIdQuery, useDeleteSupplierDocumentsByIdMutation 
} = supplierDocuementsAPI

export default supplierDocuementsAPI;