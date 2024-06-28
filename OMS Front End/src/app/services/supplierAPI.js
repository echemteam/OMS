
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const supplierAPI = createApi({
    reducerPath: "supplierAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        addEditSupplierBasicInformation: builder.mutation({
            query: (Details) => ({
                url: '/Supplier/AddEditSupplierBasicInformation',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getSuppliers: builder.mutation({
            query: (userQuery) => ({
                url: '/Supplier/GetSuppliers',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        updateSupplierApproveStatus: builder.mutation({
            query: (Details) => ({
                url: '/Supplier/UpdateSupplierApproveStatus',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        updateSupplierInActiveStatus: builder.mutation({
            query: (Details) => ({
                url: '/Supplier/UpdateSupplierInActiveStatus',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        updateSupplierStatus: builder.mutation({
            query: (Details) => ({
                url: '/Supplier/UpdateSupplierStatus',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getSupplierBasicInformationById: builder.query({
            query: (userID) => ({
                url: encryptQueryString(`/Supplier/GetSupplierBasicInformationById/?supplierId=${Number(userID)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getAllSupplierType: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllSupplierType'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),

        getAllUser: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllUser'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        checkSupplierNameExist: builder.mutation({
            query: (Details) => ({
                url: '/Supplier/checkSupplierNameExist',
                method: 'POST',
                body: transformRequest(Details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        })
    })
})

export const {
    useAddEditSupplierBasicInformationMutation,
    useUpdateSupplierApproveStatusMutation,
    useUpdateSupplierInActiveStatusMutation,
    useUpdateSupplierStatusMutation,
    useGetSuppliersMutation,
    useLazyGetSupplierBasicInformationByIdQuery,
    useLazyGetAllSupplierTypeQuery,
    useLazyGetAllUserQuery,
    useCheckSupplierNameExistMutation,
} = supplierAPI

export default supplierAPI;