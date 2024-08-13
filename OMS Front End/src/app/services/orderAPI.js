import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const orderAPI = createApi({
    reducerPath: 'orderAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addEditOrderInformation: builder.mutation({
            query: (data) => ({
                url: '/Order/AddEditOrderInformation',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const { useAddEditOrderInformationMutation } = orderAPI;

export default orderAPI;