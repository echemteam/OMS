using ClientIPAuthentication;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Authentication;
using OMS.Domain.Entities.API.Response.Authentication;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[CheckClientIpActionFilter]
    public class AuthenticationController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public AuthenticationController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        [HttpGet("GetAllEntries")]
        public string GetAllEntries()
        {
            return $"Hello api is working..!!";
        }

        #region User Login
        [HttpPost("UserLogin")]
        public IActionResult UserLogin(AuthenticationRequest authData)
        {
            AuthenticationResponse authResponce = new();

            if (authData != null)
            {
                authResponce = _serviceManager.authenticationService.UserLogin(authData).Result;
            }
            return APISucessResponce(authResponce);
        }
        #endregion
    }
}
