using OMS.Domain.Entities.Entity.Roles;
using OMS.Domain.Entities.Entity.User;

namespace OMS.Domain.Repository.Contract
{
    public interface IAuthenticationRepository
    {
        Task<UserDto> UserLogin(string? userName);
        Task<BaseRolesDto> GetUserRoles(short? userId);
    }
}
