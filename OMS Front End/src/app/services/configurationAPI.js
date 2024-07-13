
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const configurationAPI = createApi({
    reducerPath: "configurationAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getAllModules: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllModules'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllFunctionalities: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Common/GetAllFunctionalities/?moduleId=${Number(id)}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getAllFunctionalitiesFields: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Common/GetAllFunctionalitiesFields/?functionalityId=${Number(id)}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getApprovalConfigurationRulesByModuleIdAndFunctionalityId: builder.query({
            query: (data) => ({
                url: encryptQueryString(`/ApprovalConfiguration/GetApprovalConfigurationRulesByModuleIdAndFunctionalityId/?moduleId=${Number(data.moduleId)}&functionalityId=${Number(data.functionalityId)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getApprovalConfigurationByApprovalConfigurationId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/ApprovalConfiguration/GetApprovalConfigurationByApprovalConfigurationId/?approvalConfigurationId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addEditApprovalConfiguration: builder.mutation({
            query: (Details) => ({
                url: '/ApprovalConfiguration/AddEditApprovalConfiguration',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const {
    useLazyGetAllFunctionalitiesQuery,
    useLazyGetAllModulesQuery,
    useLazyGetAllFunctionalitiesFieldsQuery,
    useLazyGetApprovalConfigurationRulesByModuleIdAndFunctionalityIdQuery,
    useLazyGetApprovalConfigurationByApprovalConfigurationIdQuery,
    useAddEditApprovalConfigurationMutation


} = configurationAPI

export default configurationAPI;