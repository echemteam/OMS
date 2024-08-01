using OMS.Domain.Entities.API.Request.Authentication;
using OMS.Domain.Entities.API.Response.Authentication;

namespace OMS.Application.Services.Authentication
{
    public interface IAuthenticationService
    {
        Task<AuthenticationResponse> UserLogin(AuthenticationRequest authenticationRequest);
    }
}
