import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const dictionaryAPI = createApi({
    reducerPath: 'dictionaryAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addEditDictionary: builder.mutation({
            query: (data) => ({
                url: '/Dictionary/AddEditDictionary',
                method: 'POST',
                body: transformRequest(data)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        GetAllDictionary: builder.mutation({
            query: (userQuery) => ({
                url: '/Dictionary/GetAllDictionary',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    
        getDictionaryByDictonaryId: builder.query({
            query: (dictionaryId) => ({
                url: encryptQueryString(`/Dictionary/GetDictionaryByDictonaryId/?dictionaryId=${Number(dictionaryId)}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteDictionary: builder.mutation({
            query: (dictionaryId) => ({
                url: encryptQueryString(`/Dictionary/DeleteDictionary/?dictionaryId=${dictionaryId}`),
                method: 'DELETE',
                body: transformRequest(dictionaryId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

    })
})

export const { useAddEditDictionaryMutation, useGetAllDictionaryMutation,
    useLazyGetDictionaryByDictonaryIdQuery,
    useDeleteDictionaryMutation, } = dictionaryAPI;

export default dictionaryAPI;