import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase, } from '../../utils/API/fetchBaseQuery';

const customerSettingsAPI = createApi({
    reducerPath: 'customerSettingsAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({


        //AddEdit Customer Settings
        addEditCustomerSettings: builder.mutation({
            query: (userDetails) => ({
                url: '/CustomerAccoutingSettings/AddEditCustomerSettings',
                method: 'POST',
                body: transformRequest(userDetails)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
     //getSettingDetail by customer Id
        GetDetailsbyCustomerID: builder.query({
            query: (customerId) => ({
                url: encryptQueryString(`/CustomerAccoutingSettings/GetDetailsbyCustomerID/?customerId=${(customerId)}`),
                method: 'GET',
            }),
        
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        //Get All PaymentMethod 
        getAllPaymentMethod: builder.query({
            query: () => ({
                url: `/Common/GetAllPaymentMethod`,
                method: 'GET',
            }),
            transformResponse:transformSucessResponse,
            transformErrorResponse:transformErrorResponse
        }),

        //Get All PaymentTerms
        getAllPaymentTerms: builder.query({
            query: () => ({
                url: `/Common/GetAllPaymentTerms`,
                method: 'GET',
            }),
            transformResponse:transformSucessResponse,
            transformErrorResponse:transformErrorResponse
        }),



    })
})

export const { useAddEditCustomerSettingsMutation,useLazyGetDetailsbyCustomerIDQuery,useLazyGetAllPaymentMethodQuery,useLazyGetAllPaymentTermsQuery,} = customerSettingsAPI;

export default customerSettingsAPI;
