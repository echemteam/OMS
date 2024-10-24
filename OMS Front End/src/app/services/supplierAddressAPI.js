
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const supplierAddressAPI = createApi({
    reducerPath: "supplierAddressAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getAddresssBySupplierId: builder.query({
            query: (userID) => ({
                url: encryptQueryString(`/Address/GetAddresssBySupplierId/?supplierId=${Number(userID)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getSupplierAddresssByAddressId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Address/GetSupplierAddresssByAddressId/?addressId=${Number(id)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse

        })
    })
})

export const {
    useLazyGetAddresssBySupplierIdQuery,
    useLazyGetSupplierAddresssByAddressIdQuery
} = supplierAddressAPI

export default supplierAddressAPI;