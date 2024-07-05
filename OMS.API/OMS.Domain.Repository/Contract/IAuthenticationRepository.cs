using OMS.Domain.Entities.Entity.Roles;
using OMS.Domain.Entities.Entity.User;

namespace OMS.Domain.Repository.Contract
{
    public interface IAuthenticationRepository
    {
        Task<UserDTO> UserLogin(string? userName);
        Task<BaseRolesDTO> GetUserRoles(short? userId);
    }
}
