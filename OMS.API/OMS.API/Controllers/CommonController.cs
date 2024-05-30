using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Response.Common;
using OMS.Framework;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommonController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public CommonController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        [HttpGet("GetAllRoles")]
        public async Task<IActionResult> GetAllRoles()
        {
            List<GetAllRolesResponse> responseData = await _serviceManager.commonServices.GetAllRoles().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetUnAssignedUserByRoleId")]
        public async Task<IActionResult> GetUnAssignedUserByRoleId(byte roleId)
        {
            List<GetUnAssignedUserByRoleIdResponse> responseData = await _serviceManager.commonServices.GetUnAssignedUserByRoleId(roleId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
    }
}
