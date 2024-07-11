
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const configurationAPI = createApi({
    reducerPath: "configurationAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getAllFunctionalities: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllFunctionalities'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllModules: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllModules'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        // addAddress: builder.mutation({
        //     query: (Details) => ({
        //         url: '/Address/AddAddress',
        //         method: 'POST',
        //         body: transformRequest(Details)
        //     }),
        //     transformResponse: transformSucessResponse,
        //     transformErrorResponse: transformErrorResponse
        // }),
        // getCustomerAddresssByAddressId: builder.query({
        //     query: (id) => ({
        //         url: encryptQueryString(`/Address/GetCustomerAddresssByAddressId/?addressId=${Number(id)}`),
        //         Method: 'GET',
        //     }),
        //     transformResponse: transformSucessResponse,
        //     transformErrorResponse: transformErrorResponse
        // }),

    })
})

export const {
    useLazyGetAllFunctionalitiesQuery,
    useLazyGetAllModulesQuery,
    // useLazyGetCustomerAddresssByAddressIdQuery,

} = configurationAPI

export default configurationAPI;