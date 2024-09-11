
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const emailTemplateAPI = createApi({
    reducerPath: "emailTemplateAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addEditEmailTemplate: builder.mutation({
            query: (requestData) => ({
                url: '/EmailTemplates/AddEditEmailTemplate',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getEmailTemplatesList: builder.mutation({
            query: (userQuery) => ({
                url: '/EmailTemplates/GetEmailTemplatesList',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
 

        getEmailTemplateById: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/EmailTemplates/GetEmailTemplateById/?emailTemplateId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        })
    })
})

export const {
    useAddEditEmailTemplateMutation, useGetEmailTemplatesListMutation, useLazyGetEmailTemplateByIdQuery
} = emailTemplateAPI

export default emailTemplateAPI;