import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const securityPermissionsAPI = createApi({
    reducerPath: 'securityPermissionsAPI',
    baseQuery: customFetchBase,
    tagTypes: ['SecurityPermissions'],
    endpoints: (builder) => ({

        getAllPagesByRoleId: builder.query({
            query: (id) => ({
                url: encryptQueryString(`/Security/GetAllPagesByRoleId/?id=${Number(id)}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        getAllRoles: builder.query({
            query: () => ({
                url: `/Common/GetAllRoles`,
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        // Add Security Permissions
        addSecurityPermissions: builder.mutation({
            query: (details) => ({
                url: '/Security/AddSecurityPermissions',
                method: 'POST',
                body: transformRequest(details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const {
    useLazyGetAllPagesByRoleIdQuery, useLazyGetAllRolesQuery,
    useAddSecurityPermissionsMutation
} = securityPermissionsAPI;

export default securityPermissionsAPI;