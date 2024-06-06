
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const basicdetailAPI = createApi({
    reducerPath: "basicdetailAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getAllGroupTypes: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllGroupTypes'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllTerritories: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllTerritories'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllCountries: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllCountries'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        addCustomersBasicInformation: builder.mutation({
            query: (Details) => ({
                url: '/Customers/AddCustomersBasicInformation',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const {
    useLazyGetAllGroupTypesQuery,
    useLazyGetAllTerritoriesQuery,
    useLazyGetAllCountriesQuery,
    useAddCustomersBasicInformationMutation,
} = basicdetailAPI

export default basicdetailAPI;