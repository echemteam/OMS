
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from '../../utils/API/fetchBaseQuery';
import { encryptQueryString } from "../../utils/API/requestMiddleware";
import { transformErrorResponse, transformSucessResponse } from "../../utils/API/responseMiddleware";

const contactAPI = createApi({
    reducerPath: "contactAPI",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getAllContactTypes: builder.query({
            query: () => ({
                url: encryptQueryString('/Common/GetAllContactTypes'),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
    })
})

export const {
    useLazyGetAllContactTypesQuery,
} = contactAPI

export default contactAPI;