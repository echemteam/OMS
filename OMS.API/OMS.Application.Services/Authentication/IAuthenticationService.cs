using OMS.Domain.Entities.API.Request.Authentication;
using OMS.Domain.Entities.API.Request.User;
using OMS.Domain.Entities.API.Response.Authentication;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Authentication
{
    public interface IAuthenticationService
    {
        Task<AuthenticationResponse> UserLogin(AuthenticationRequest authenticationRequest);
        Task<AddEntityDto<int>> AddUserLoginLogoutHistory(AddUserLoginLogoutHistoryRequest requestData,string iPAddress);
    }
}
