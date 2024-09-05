
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
        addFunctionalitiesResponsiblesUser: builder.mutation({
            query: (Details) => ({
                url: '/ApprovalConfiguration/AddFunctionalitiesResponsiblesUser',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        addEditFunctionalities: builder.mutation({
            query: (Details) => ({
                url: '/ApprovalConfiguration/AddEditFunctionalities',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getFunctionalities: builder.mutation({
            query: (data) => ({
                url: '/ApprovalConfiguration/GetFunctionalities',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getFunctionalityEvents: builder.mutation({
            query: (data) => ({
                url: '/ApprovalConfiguration/GetFunctionalityEvents',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getFunctionalitiesResponsibles: builder.mutation({
            query: (data) => ({
                url: '/ApprovalConfiguration/GetFunctionalitiesResponsibles',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteFunctionalitiesResponsiblesUser: builder.mutation({
            query: (id) => ({
                url: encryptQueryString(`/ApprovalConfiguration/DeleteFunctionalitiesResponsiblesUser/?functionalitiesResponsiblesId=${id}`),
                method: 'DELETE',
                body: transformRequest(id)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getApprovalConfigurationRules: builder.mutation({
            query: (data) => ({
                url: '/ApprovalConfiguration/GetApprovalConfigurationRules',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getAllFunctionalityEventByFunctionalityId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Common/GetAllFunctionalityEventByFunctionalityId/?functionalityId=${Number(id)}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
    })
})

export const {
    useLazyGetAllFunctionalitiesQuery,
    useLazyGetAllModulesQuery,
    useLazyGetAllFunctionalitiesFieldsQuery,
    useLazyGetApprovalConfigurationRulesByModuleIdAndFunctionalityIdQuery,
    useLazyGetApprovalConfigurationByApprovalConfigurationIdQuery,
    useAddEditApprovalConfigurationMutation,
    useAddFunctionalitiesResponsiblesUserMutation,
    useGetFunctionalitiesMutation,
    useAddEditFunctionalitiesMutation,
    useGetApprovalConfigurationRulesMutation,
    useGetFunctionalitiesResponsiblesMutation,
    useGetFunctionalityEventsMutation,
    useDeleteFunctionalitiesResponsiblesUserMutation,
    useLazyGetAllFunctionalityEventByFunctionalityIdQuery,
} = configurationAPI

export default configurationAPI;