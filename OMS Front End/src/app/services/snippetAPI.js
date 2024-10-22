 
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { customFetchBase } from "../../utils/API/fetchBaseQuery";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";
import { createApi } from "@reduxjs/toolkit/query/react";


const snippetAPI = createApi({
    reducerPath: "snippetAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addSnippet: builder.mutation({
            query: (data) => ({
                url: '/Snippet/AddSnippet',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        updateSnippet: builder.mutation({
            query: (data) => ({
                url: '/Snippet/UpdateSnippet',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getSnippets: builder.mutation({
            query: (userQuery) => ({
                url: '/Snippet/GetSnippets',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getSnippetsBySnippetId: builder.query({
            query: (snippetId) => ({
                url: encryptQueryString(`/Snippet/GetSnippetsBySnippetId/?snippetId=${Number(snippetId)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteSnippetById: builder.mutation({
            query: (snippetId) => ({
                url: encryptQueryString(`/Snippet/DeleteSnippet/?snippetId=${snippetId}`),
                method: 'DELETE',
                body: transformRequest(snippetId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const { useAddSnippetMutation, useUpdateSnippetMutation, useLazyGetSnippetsBySnippetIdQuery,useGetSnippetsMutation, 
    useDeleteSnippetByIdMutation} = snippetAPI;

export default snippetAPI;