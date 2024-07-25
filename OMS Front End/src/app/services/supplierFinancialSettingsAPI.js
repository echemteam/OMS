import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const supplierFinancialSettingsAPI = createApi({
    reducerPath: 'supplierFinancialSettingsAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addEditACHWire: builder.mutation({
            query: (data) => ({
                url: '/SupplierFinancialSettings/AddEditACHWire',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addEditCreditCard: builder.mutation({
            query: (data) => ({
                url: '/SupplierFinancialSettings/AddEditCreditCard',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addEditOther: builder.mutation({
            query: (data) => ({
                url: '/SupplierFinancialSettings/AddEditOther',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        addEditCheck: builder.mutation({
            query: (data) => ({
                url: '/SupplierFinancialSettings/AddEditCheck',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getAllPODeliveryMethod: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllPODeliveryMethod'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),

        getSupplierFinancialSettingsBySupplierId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/SupplierFinancialSettings/GetSupplierFinancialSettingsBySupplierId/?supplierId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse

        }),

        getACHWireBySupplierId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/SupplierFinancialSettings/GetACHWireBySupplierId/?supplierId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse

        }),

        getPaymentSettingsBySupplierId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/SupplierFinancialSettings/GetPaymentSettingsBySupplierId/?supplierId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse

        }),

    })
})

export const {
    useAddEditACHWireMutation,
    useAddEditOtherMutation,
    useAddEditCheckMutation,
    useAddEditCreditCardMutation,
    useLazyGetAllPODeliveryMethodQuery,
    useLazyGetSupplierFinancialSettingsBySupplierIdQuery,
    useLazyGetACHWireBySupplierIdQuery,
    useLazyGetPaymentSettingsBySupplierIdQuery,
} = supplierFinancialSettingsAPI;

export default supplierFinancialSettingsAPI;