import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase, defaultBaseQuery } from '../../utils/API/fetchBaseQuery';

const rolesMappingAPI = createApi({
    reducerPath: 'rolesMappingAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        // Add User 
        addRoleMapping: builder.mutation({
            query: (userDetails) => ({
                url: '/RolesMapping/AddRoleMapping',
                method: 'POST',
                body: transformRequest(userDetails)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getUnAssignedUserByRoleId: builder.query({
            query: (userID) => ({
                url: encryptQueryString(`/Common/GetUnAssignedUserByRoleId/?roleId=${Number(userID)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
            
        }),
        getRolesMappingByRoleId: builder.mutation({
            query: (userQuery) => ({

                url: '/RolesMapping/GetRolesMappingByRoleId',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteRolesMapping: builder.mutation({
            query: (userID) => ({
                url: encryptQueryString(`/RolesMapping/DeleteRolesMapping/?userRoleId=${userID}`),
                method: 'DELETE',
                body: transformRequest(userID)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const { 
    useAddRoleMappingMutation,
    useGetRolesMappingByRoleIdMutation,
    useLazyGetUnAssignedUserByRoleIdQuery,
    useDeleteRolesMappingMutation,
} = rolesMappingAPI;

export default rolesMappingAPI;