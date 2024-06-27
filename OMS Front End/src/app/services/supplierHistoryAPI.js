import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { customFetchBase,  } from '../../utils/API/fetchBaseQuery';
import { transformRequest } from "../../utils/API/requestMiddleware";

const supplierHistoryAPI = createApi({
    reducerPath: 'supplierHistoryAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        getSupplierAuditHistoryBySupplierId: builder.mutation({
            query: (userQuery) => ({
                url: '/Supplier/GetSupplierAuditHistoryBySupplierId',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
 
        transformResponse: transformSucessResponse,
        transformErrorResponse: transformErrorResponse
    }),
    })
})

export const { useGetSupplierAuditHistoryBySupplierIdMutation} = supplierHistoryAPI;

export default supplierHistoryAPI;