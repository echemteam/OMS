import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const securityRoleAPI = createApi({
    reducerPath: 'securityRoleAPI',
    baseQuery: customFetchBase,
    // tagTypes: ['SecurityRole'],
    endpoints: (builder) => ({

        // Get Roles List
        getRoles: builder.mutation({
            query: (userQuery) => ({

                url: '/Roles/GetRoles',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        // Add Roles 
        addRoles: builder.mutation({
            query: (userDetails) => ({
                url: '/Roles/AddRoles',
                method: 'POST',
                body: transformRequest(userDetails)
            }),
            // invalidatesTags: ['Roles'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        // Update Roles
        updateRoles: builder.mutation({
            query: (userDetails) => ({
                url: '/Roles/UpdateRoles',
                method: 'POST',
                body: transformRequest(userDetails)
            }),
            invalidatesTags: ['Roles'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        // Get Roles Details by Id
        getRoleByRoleId: builder.query({
            query: (userID) => ({
                url: encryptQueryString(`/Roles/GetRoleByRoleId/?id=${Number(userID)}`),
                method: 'GET',
            }),
            providesTags: ['Roles'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        // Delete Roles
        deleteRoles: builder.mutation({
            query: (userID) => ({
                url: encryptQueryString(`/Roles/DeleteRoles/?roleId=${userID}`),
                method: 'DELETE',
                body: transformRequest(userID)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const { useGetRolesMutation,
    useAddRolesMutation,
    useUpdateRolesMutation,
    useDeleteRolesMutation,
    useLazyGetRoleByRoleIdQuery,
} = securityRoleAPI;

export default securityRoleAPI;