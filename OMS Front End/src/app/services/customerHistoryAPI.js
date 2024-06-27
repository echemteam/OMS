import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { transformRequest } from "../../utils/API/requestMiddleware";

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
    })
})

export const {   useGetCustomerAuditHistoryByCustomerIdMutation,} = customerHistoryAPI;

export default customerHistoryAPI;