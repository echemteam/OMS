import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { customFetchBase,  } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware";

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
    getEventNameAndUserNameBySupplierId: builder.query({
        query: (userID) => ({
            url: encryptQueryString(`/Common/GetEventNameAndUserNameBySupplierId/?supplierId=${Number(userID)}`),
            Method: 'GET',
        }),
        transformResponse: transformSucessResponse,
        transformErrorResponse: transformErrorResponse

    }),
    })
})

export const { useGetSupplierAuditHistoryBySupplierIdMutation , useLazyGetEventNameAndUserNameBySupplierIdQuery} = supplierHistoryAPI;

export default supplierHistoryAPI;