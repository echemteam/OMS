
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const addressAPI = createApi({
    reducerPath: "addressAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        GetAllAddressTypes: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllAddressTypes'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllStates: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllStates'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllCities: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllCities'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        addAddress: builder.mutation({
            query: (Details) => ({
                url: '/Address/AddAddress',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getAddresssByCustomerId: builder.query({
            query: (userID) => ({
                url: encryptQueryString(`/Address/GetAddresssByCustomerId/?customerId=${Number(userID)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse

        }),
        updateAddAddress: builder.mutation({
            query: (Details) => ({
                url: '/Address/UpdateAddAddress',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

    })
})

export const {
    useLazyGetAllAddressTypesQuery,
    useLazyGetAllStatesQuery,
    useLazyGetAllCitiesQuery,
    useAddAddressMutation,
    useLazyGetAddresssByCustomerIdQuery,
    useUpdateAddAddressMutation,

} = addressAPI

export default addressAPI;