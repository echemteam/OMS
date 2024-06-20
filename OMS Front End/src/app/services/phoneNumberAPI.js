
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const phoneNumberAPI = createApi({
    reducerPath: "phoneNumberAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addContactPhone: builder.mutation({
            query: (requestData) => ({
                url: '/PhoneNumber/AddContactPhone',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        updateContactPhone: builder.mutation({
            query: (requestData) => ({
                url: '/PhoneNumber/UpdateContactPhone',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteContactPhone: builder.mutation({
            query: (id) => ({
                url: encryptQueryString(`/PhoneNumber/DeleteContactPhone/?phoneId=${Number(id)}`),
                method: 'DELETE'
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getPhoneByContactId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/PhoneNumber/GetPhoneByContactId/?contactId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getAllPhoneTypes: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllPhoneTypes'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
    })
})

export const {
    useAddContactPhoneMutation, useUpdateContactPhoneMutation, useDeleteContactPhoneMutation, useLazyGetPhoneByContactIdQuery, useGetAllPhoneTypesQuery
} = phoneNumberAPI

export default phoneNumberAPI;