
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const documentAPI = createApi({
    reducerPath: "documentAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getAllDocumentTypes: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllDocumentTypes'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        addCustomerDocuments: builder.mutation({
            query: (requestData) => ({
                url: '/CustomerDocuments/AddCustomerDocuments',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getCustomerDocumentsById: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/CustomerDocuments/GetCustomerDocumentsById/?customerId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteCustomerDocumentsById: builder.mutation({
            query: (id) => ({
                url: encryptQueryString(`/CustomerDocuments/DeleteCustomerDocumentsById/?customerDocumentId=${id}`),
                method: 'DELETE',
                body: transformRequest(id)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        downloadCustomerDocument: builder.query({
            query: (requestData) => ({
                url: encryptQueryString(`/CustomerDocuments/DownloadCustomerDocument/?folderName=${requestData.folderName}&fileName=${requestData.fileName}&mainId=${requestData.mainId}`),
                Method: 'GET',
                responseHandler: (response) => response.blob()
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        })

    })
})

export const {
    useLazyGetAllDocumentTypesQuery, useAddCustomerDocumentsMutation,
    useLazyGetCustomerDocumentsByIdQuery, useDeleteCustomerDocumentsByIdMutation, useLazyDownloadCustomerDocumentQuery,
} = documentAPI

export default documentAPI;