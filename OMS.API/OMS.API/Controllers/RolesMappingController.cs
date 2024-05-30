using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.RoleMapping;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RolesMappingController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public RolesMappingController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Roles Mapping API  
        [HttpPost("AddRoleMapping")]
        public async Task<IActionResult> AddRoleMapping(AddRoleMappingRequest requestData)
        {
            var addItem = await _serviceManager.rolesMappingServices.AddRoleMapping(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("GetRolesMappingByRoleId")]
        public async Task<IActionResult> GetRolesMappingByRoleId(GetRolesMappingByRoleIdRequest requestData)
        {
            var roleMappingList = await _serviceManager.rolesMappingServices.GetRolesMappingByRoleId(requestData);
            return APISucessResponce<object>(roleMappingList);
        }

        [HttpDelete("DeleteRolesMapping")]
        public async Task<IActionResult> DeleteRolesMapping(int userRoleId)
        {
            if (userRoleId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.rolesMappingServices.DeleteRolesMapping(userRoleId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(userRoleId);
        }
        #endregion
    }
}
