
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const emailAddressAPI = createApi({
    reducerPath: "emailAddressAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addContactEmail: builder.mutation({
            query: (requestData) => ({
                url: '/EmailAddress/AddContactEmail',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        updateContactEmail: builder.mutation({
            query: (requestData) => ({
                url: '/EmailAddress/UpdateContactEmail',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        // deleteContactEmail: builder.query({
        //     query: (id) => ({
        //         url: encryptQueryString(`/EmailAddress/DeleteContactEmail/?emailId=${Number(id)}`),
        //         Method: 'DELETE',
        //     }),
        //     transformResponse: transformSucessResponse,
        //     transformErrorResponse: transformErrorResponse
        // }),

        deleteContactEmail: builder.mutation({
            query: (id) => ({
                url: encryptQueryString(`/EmailAddress/DeleteContactEmail/?emailId=${id}`),
                method: 'DELETE',
                body: transformRequest(id)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getEmailByContactId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/EmailAddress/GetEmailByContactId/?contactId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        })
    })
})

export const {
    useAddContactEmailMutation, useUpdateContactEmailMutation, useDeleteContactEmailMutation, useLazyGetEmailByContactIdQuery
} = emailAddressAPI

export default emailAddressAPI;