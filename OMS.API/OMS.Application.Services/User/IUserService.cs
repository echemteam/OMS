using OMS.Domain.Entities.API.Request.User;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.User
{
    public interface IUserService
    {
        Task<AddEntityDTO<int>> AddUser(AddUserRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateUser(UpdateUserRequest requestData, short CurrentUserId);
        Task<UserResponse> GetUserByUserId(short userId);
        Task<AddEntityDTO<int>> DeleteUser(short userId, short CurrentUserId);
        Task<EntityList<UserListResponse>> GetUsers(ListEntityRequest<BaseFilter> requestData);
        Task<AddEntityDTO<int>> UpdateUserPassword(UpdateUserPasswordRequest updateUserPassword, short CurrentUserId);
    }
}
