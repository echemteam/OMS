
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const approvalAPI = createApi({
    reducerPath: "approvalAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getUserCheckList: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Approval/GetUserCheckList/?eventId=${Number(id)}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        addUserChecklistResponse: builder.mutation({
            query: (requestData) => ({
                url: '/Approval/AddUserChecklistResponse',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getValidateCheckList: builder.mutation({
            query: (requestData) => ({
                url: '/Approval/GetValidateCheckList',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getApprovalRequestsListByStatusAndRequestedByUserId: builder.query({
            query: (data) => ({
                url: encryptQueryString(`/Approval/GetApprovalRequestsListByStatusAndRequestedByUserId/?status=${data.status}&requestedByUserId=${data.requestedByUserId}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getApprovalRequestsByApprovalRequestId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Approval/GetApprovalRequestsByApprovalRequestId/?approvalRequestId=${Number(id)}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        updateApprovalRequestsStatus: builder.mutation({
            query: (requestData) => ({
                url: '/Approval/UpdateApprovalRequestsStatus',
                method: 'POST',
                body: transformRequest(requestData)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        })
    })
})

export const {
    useLazyGetUserCheckListQuery,
    useLazyGetApprovalRequestsListByStatusAndRequestedByUserIdQuery,
    useLazyGetApprovalRequestsByApprovalRequestIdQuery,
    useAddUserChecklistResponseMutation,
    useGetValidateCheckListMutation,
    useUpdateApprovalRequestsStatusMutation
} = approvalAPI;

export default approvalAPI;