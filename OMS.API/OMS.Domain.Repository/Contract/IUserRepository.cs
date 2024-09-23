using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.User;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IUserRepository
    {
        Task<AddEntityDto<int>> AddUser(UserDto addUser);
        Task<AddEntityDto<int>> UpdateUser(UserDto updateUser);
        Task<UserResponse> GetUserByUserId(short userId);
        Task<AddEntityDto<int>> DeleteUser(short userId, short deletedBy);
        Task<EntityList<UserListResponse>> GetUsers(ListEntityRequest<BaseFilter> requestData);
        Task<AddEntityDto<int>> UpdateUserPassword(UserDto updateUserPassword);
        Task<List<GetUserLoginLogoutHistoryByUserIdResponse>> GetUserLoginLogoutHistoryByUserId(short userId);
    }
}
