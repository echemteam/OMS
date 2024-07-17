import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const  apiParametersAPI= createApi({
    reducerPath: 'apiParametersAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({

        addEditApiParameter: builder.mutation({
            query: (data) => ({
                url: '/ApiConfiguration/AddEditApiParameter',
                method: 'POST',
                body: transformRequest(data)
            }),

            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getApiParameters: builder.mutation({
            query: (userQuery) => ({
                url: '/ApiConfiguration/GetApiParameters',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    
        getAllAPIEndpoints: builder.query({
            query: () => ({
                url: encryptQueryString(`/Common/GetAllAPIEndpoints`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getApiParameterByParameterId: builder.query({
            query: (parameterId) => ({
                url: encryptQueryString(`/ApiConfiguration/GetApiParameterByParameterId/?parameterId=${Number(parameterId)}`),
                method: 'GET',
            }),
            // providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        deleteApiParameter: builder.mutation({
            query: (parameterId) => ({
                url: encryptQueryString(`/ApiConfiguration/DeleteApiParameter/?parameterId=${parameterId}`),
                method: 'DELETE',
                body: transformRequest(parameterId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),


    })
})

export const { 
     useAddEditApiParameterMutation,
     useGetApiParametersMutation,
     useLazyGetAllAPIEndpointsQuery,
     useLazyGetApiParameterByParameterIdQuery,
      useDeleteApiParameterMutation,
     } = apiParametersAPI;

export default apiParametersAPI;