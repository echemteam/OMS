import { createApi } from "@reduxjs/toolkit/query/react";
import { transformSucessResponse, transformErrorResponse } from "../../utils/API/responseMiddleware";
import { encryptQueryString, transformRequest } from "../../utils/API/requestMiddleware"
import { customFetchBase } from '../../utils/API/fetchBaseQuery';

const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: customFetchBase,
    tagTypes: ['User'],
    endpoints: (builder) => ({

        // Get User List
        getUsers: builder.mutation({
            query: (userQuery) => ({

                url: '/User/GetUsers',
                method: 'POST',
                body: transformRequest(userQuery)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        // Add User 
        addUser: builder.mutation({
            query: (userDetails) => ({
                url: '/User/AddUser',
                method: 'POST',
                body: transformRequest(userDetails)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        // Update User
        updateUser: builder.mutation({
            query: (userDetails) => ({
                url: '/User/UpdateUser',
                method: 'POST',
                body: transformRequest(userDetails)
            }),
            invalidatesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        // Get User Details by Id
        getUserByUserId: builder.query({
            query: (userID) => ({
                url: encryptQueryString(`/User/GetUserByUserId/?userId=${Number(userID)}`),
                method: 'GET',
            }),
            providesTags: ['User'],
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        // Delete User
        deleteUser: builder.mutation({
            query: (userID) => ({
                url: encryptQueryString(`/User/DeleteUser/?userId=${userID}`),
                method: 'DELETE',
                body: transformRequest(userID)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),

        updateUserPassword: builder.mutation({
            query: (userId) => ({
                url: `/User/UpdateUserPassword`,
                method: 'POST',
                body: transformRequest(userId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getUserLoginLogoutHistoryByUserId: builder.query({
            query: (userId) => ({
                url: encryptQueryString(`/User/GetUserLoginLogoutHistoryByUserId/?userId=${userId}`),
                method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse,
        }),
        getUnAssignedRoleByUserId: builder.query({
            query: (userId) => ({
                url: encryptQueryString(`/User/getUnAssignedRoleByUserId/?userId=${Number(userId)}`),
                Method: 'GET',
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        assignRoleToUser: builder.mutation({
            query: ({userId,roleId}) => ({
                url: `/User/AddAssignRoleToUser`,
                method: 'POST',
                body: transformRequest({userId,roleId})
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        getAssignedRoleDetails: builder.mutation({
            query: (details) => ({
                url: `/User/GetAssignedRoleByUserId`,
                method: 'POST',
                body: transformRequest(details)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
        deleteRolesMapping: builder.mutation({
            query: (userRoleId) => ({
                url: encryptQueryString(`/RolesMapping/DeleteRolesMapping/?userRoleId=${userRoleId}`),
                method: 'DELETE',
                body: transformRequest(userRoleId)
            }),
            transformResponse: transformSucessResponse,
            transformErrorResponse: transformErrorResponse
        }),
    })
})

export const { useGetUsersMutation,
    useAddUserMutation,
    useUpdateUserPasswordMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useLazyGetUserByUserIdQuery,
    useLazyGetUserLoginLogoutHistoryByUserIdQuery,
    useLazyGetUnAssignedRoleByUserIdQuery,
    useAssignRoleToUserMutation,
    useGetAssignedRoleDetailsMutation,
    useDeleteRolesMappingMutation
} = userAPI;

export default userAPI;