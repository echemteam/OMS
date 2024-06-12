
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
        addContact: builder.mutation({
            query: (requestData) => ({
                url: '/Contact/AddContact',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addContactEmail: builder.mutation({
            query: (requestData) => ({
                url: '/Contact/AddContactEmail',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addContactPhone: builder.mutation({
            query: (requestData) => ({
                url: '/Contact/AddContactPhone',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        updateContactEmail: builder.mutation({
            query: (requestData) => ({
                url: '/Contact/UpdateContactEmail',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        updateContactPhone: builder.mutation({
            query: (requestData) => ({
                url: '/Contact/UpdateContactPhone',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteContactEmail: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Contact/DeleteContactEmail/?emailId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteContactPhone: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Contact/DeleteContactPhone/?phoneId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const {
    useLazyGetAllContactTypesQuery, useLazyGetContactByCustomerIdQuery, useAddContactMutation, useAddContactEmailMutation, useAddContactPhoneMutation,
    useUpdateContactEmailMutation, useUpdateContactPhoneMutation, useLazyDeleteContactEmailQuery, useLazyDeleteContactPhoneQuery
} = contactAPI

export default contactAPI;