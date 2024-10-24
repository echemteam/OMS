using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Security;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [CheckClientIpActionFilter]
    public class SecurityController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public SecurityController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        [HttpGet("GetAllPagesByRoleId")]
        public async Task<IActionResult> GetAllPagesByRoleId(int id)
        {
            if (id > 0)
            {
                var application = await _serviceManager.securityServices.GetAllPagesByRoleId(id).ConfigureAwait(true);
                return APISucessResponce<object>(application);
            }
            return APISucessResponce(id);
        }

        [HttpPost("AddSecurityPermissions")]
        public async Task<IActionResult> AddSecurityPermissions(AddSecurityPermissionsRequestList requestData)
        {

            var addApplication = await _serviceManager.securityServices.AddSecurityPermissions(requestData, CurrentUserId);
            return APISucessResponce(addApplication);
        }

    }
}
