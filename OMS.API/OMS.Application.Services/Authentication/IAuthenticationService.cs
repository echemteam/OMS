using OMS.Domain.Entities.API.Request.Authentication;
using OMS.Domain.Entities.API.Response.Authentication;
using OMS.Domain.Entities.Entity.User;

namespace OMS.Application.Services.Authentication
{
    public interface IAuthenticationService
    {
        Task<AuthenticationResponse> UserLogin(AuthenticationRequest authenticationRequest);
    }
}
