
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
        getApprovalRequestsListByStatusAndRoleId: builder.query({
            query: (data) => ({
                url: encryptQueryString(`/Approval/GetApprovalRequestsListByStatusAndRoleId/?status=${data.status}&roleId=${data.roleId}`),
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
        }),

        //** Customer */
        getCustomersInfoById: builder.query({
            query: (id) => ({
                url: encryptQueryString(`Customers/GetCustomersBasicInformationById/?customerId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getCustomerAddresssInfoById: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Address/GetAddresssByCustomerId/?customerId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getCustomerContactInfoById: builder.query({
            query: (data) => ({
                url: encryptQueryString(`/Contact/GetContactByCustomerId/?customerId=${Number(data.id)}&searchText=${data.searchText}&searchContactType=${data.contactType}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getCustomerFinacialSetting: builder.query({
            query: (customerId) => ({
                url: encryptQueryString(`/CustomerAccoutingSettings/GetDetailsbyCustomerID/?customerId=${(customerId)}`),
                method: 'GET',
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        //** Supplier */
        getSupplierBasicInfoById: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Supplier/GetSupplierBasicInformationById/?supplierId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getSupplierAddressInfoById: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Address/GetAddresssBySupplierId/?supplierId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getSupplierContactInfoById: builder.query({
            query: (data) => ({
                url: encryptQueryString(`/Contact/GetContactBySupplierId/?supplierId=${Number(data.id)}&searchText=${data.searchText}&searchContactType=${data.contactType}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getSupplierFinacialSetting: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/SupplierFinancialSettings/GetACHWireBySupplierId/?supplierId=${(id)}`),
                method: 'GET',
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        })
    })
})

export const {
    useLazyGetUserCheckListQuery,
    useLazyGetApprovalRequestsListByStatusAndRoleIdQuery,
    useLazyGetApprovalRequestsByApprovalRequestIdQuery,
    useAddUserChecklistResponseMutation,
    useGetValidateCheckListMutation,
    useUpdateApprovalRequestsStatusMutation,
    //** Customer */
    useLazyGetCustomersInfoByIdQuery,
    useLazyGetCustomerAddresssInfoByIdQuery,
    useLazyGetCustomerContactInfoByIdQuery,
    useLazyGetCustomerFinacialSettingQuery,

    //** Supplier */
    useLazyGetSupplierBasicInfoByIdQuery,
    useLazyGetSupplierAddressInfoByIdQuery,
    useLazyGetSupplierContactInfoByIdQuery,
    useLazyGetSupplierFinacialSettingQuery
} = approvalAPI;

export default approvalAPI;