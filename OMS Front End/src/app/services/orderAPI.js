import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const orderAPI = createApi({
    reducerPath: 'orderAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addEditOrderInformation: builder.mutation({
            query: (data) => ({
                url: '/Order/AddEditOrderInformation',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addEditOrderContactInformation: builder.mutation({
            query: (data) => ({
                url: '/Order/AddEditOrderContactInformation',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        checkPoNumberExistOrNot: builder.mutation({
            query: (Details) => ({
                url: '/Order/CheckPoNumberExistOrNot',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getPoNumberDetailsByPoNumber: builder.query({
            query: (number) => ({
                url: encryptQueryString(`/Order/GetPoNumberDetailsByPoNumber/?poNumber=${String(number)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const { useAddEditOrderInformationMutation  , useAddEditOrderContactInformationMutation , useCheckPoNumberExistOrNotMutation , useLazyGetPoNumberDetailsByPoNumberQuery,
} = orderAPI;

export default orderAPI;