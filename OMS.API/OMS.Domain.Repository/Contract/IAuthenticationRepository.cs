using OMS.Domain.Entities.API.Request.Authentication;
using OMS.Domain.Entities.API.Response.Authentication;
using OMS.Domain.Entities.Entity.User;

namespace OMS.Domain.Repository.Contract
{
    public interface IAuthenticationRepository
    {
        Task<UserDTO> UserLogin(string? userName);
    }
}
