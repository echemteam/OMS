
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const commonAPI = createApi({
    reducerPath: "commonAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getAllDeliveryCarriers: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllDeliveryCarriers'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllDeliveryMethods: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllDeliveryMethods'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        })
    })
})

export const {
    useLazyGetAllDeliveryCarriersQuery, useLazyGetAllDeliveryMethodsQuery
} = commonAPI

export default commonAPI;