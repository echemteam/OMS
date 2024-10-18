 
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { customFetchBase } from "../../utils/API/fetchBaseQuery";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";
import { createApi } from "@reduxjs/toolkit/query/react";


const snippetEmailTemplateAPI = createApi({
    reducerPath: "snippetEmailTemplateAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        getUnAssignedSnippetByEmailTemplateId: builder.query({
            query: (emailTemplateId) => ({
                url: encryptQueryString(`/Common/GetUnAssignedSnippetByEmailTemplateId/?emailTemplateId=${Number(emailTemplateId)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addAssignedSnippet: builder.mutation({
            query: ({emailTemplateId,snippetId}) => ({
                url: `/Snippet/AddAssignedSnippet`,
                method: 'POST',
                body: transformRequest({emailTemplateId,snippetId})
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getAssignedSnippetByEmailTemplateId: builder.mutation({
            query: (details) => ({
                url: `/Snippet/GetAssignedSnippetByEmailTemplateId`,
                method: 'POST',
                body: transformRequest(details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteAssignedSnippetBySnippetEmailTemplateId: builder.mutation({
            query: (snippetEmailTemplateId) => ({
                url: encryptQueryString(`/Snippet/deleteAssignedSnippetBySnippetEmailTemplateId/?snippetEmailTemplateId=${snippetEmailTemplateId}`),
                method: 'DELETE',
                body: transformRequest(snippetEmailTemplateId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const { useLazyGetUnAssignedSnippetByEmailTemplateIdQuery,
    useAddAssignedSnippetMutation,
    useGetAssignedSnippetByEmailTemplateIdMutation,
    useDeleteAssignedSnippetBySnippetEmailTemplateIdMutation} = snippetEmailTemplateAPI;

export default snippetEmailTemplateAPI;