
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString } from "../../utils/API/requestMiddleware";
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
    })
})

export const {
    useLazyGetAllAddressTypesQuery,
    useLazyGetAllStatesQuery,
    useLazyGetAllCitiesQuery,
} = addressAPI

export default addressAPI;