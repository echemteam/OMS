using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.User;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IUserRepository
    {
        Task<AddEntityDTO<int>> AddUser(UserDTO addUser);
        Task<AddEntityDTO<int>> UpdateUser(UserDTO updateUser);
        Task<UserResponse> GetUserByUserId(short userId);
        Task<AddEntityDTO<int>> DeleteUser(short userId, short deletedBy);
        Task<EntityList<UserListResponse>> GetUsers(ListEntityRequest<BaseFilter> requestData);
        Task<AddEntityDTO<int>> UpdateUserPassword(UserDTO updateUserPassword);
    }
}
