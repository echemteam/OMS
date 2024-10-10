using OMS.Domain.Entities.API.Request.User;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.User
{
    public interface IUserService
    {
        Task<AddEntityDto<int>> AddUser(AddUserRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> UpdateUser(UpdateUserRequest requestData, short CurrentUserId);
        Task<UserResponse> GetUserByUserId(short userId);
        Task<AddEntityDto<int>> DeleteUser(short userId, short CurrentUserId);
        Task<EntityList<UserListResponse>> GetUsers(ListEntityRequest<BaseFilter> requestData);
        Task<AddEntityDto<int>> UpdateUserPassword(UpdateUserPasswordRequest updateUserPassword, short CurrentUserId);
        Task<List<GetUserLoginLogoutHistoryByUserIdResponse>> GetUserLoginLogoutHistoryByUserId(short userId);
        Task<List<GetUnassignRoleByUserIdResponse>> GetUnAssignedRoleByUserId(short userId);
        Task<EntityList<GetUnassignRoleByUserIdResponse>> GetAssignedRoleByUserId(GetAssignedRoleByUserIdRequest request);
        Task<AddEntityDto<int>> AddAssignRoleToUser(AddAssignRoleToUserRequest userRequest, short CurrentUserId);
    }
}
