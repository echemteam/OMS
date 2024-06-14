
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
        })

    })
})

export const {
    useLazyGetAllDocumentTypesQuery, useAddCustomerDocumentsMutation
} = documentAPI

export default documentAPI;