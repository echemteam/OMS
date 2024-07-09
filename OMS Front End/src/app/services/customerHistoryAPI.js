import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";

const customerHistoryAPI = createApi({
    reducerPath: 'customerHistoryAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        getCustomerAuditHistoryByCustomerId: builder.mutation({
            query: (userQuery) => ({
                url: '/Customers/GetCustomerAuditHistoryByCustomerId',
                method: 'POST',
                body: transformRequest(userQuery)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getEventNameAndUserNameByCustomerId: builder.query({
            query: (userID) => ({
                url: encryptQueryString(`/Common/GetEventNameAndUserNameByCustomerId/?customerId=${Number(userID)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
    
        }),
    })
})

export const { useGetCustomerAuditHistoryByCustomerIdMutation , useLazyGetEventNameAndUserNameByCustomerIdQuery } = customerHistoryAPI;

export default customerHistoryAPI;