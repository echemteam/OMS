using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Roles;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [CheckClientIpActionFilter]
    public class RolesController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public RolesController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Add Roles API
        [HttpPost("AddRoles")]
        public async Task<IActionResult> AddRoles(AddRolesRequest requestData)
        {

            var addItem = await _serviceManager.rolesServices.AddRoles(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("UpdateRoles")]
        public async Task<IActionResult> UpdateRoles(UpdateRolesRequest requestData)
        {
            AddEntityDto<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.rolesServices.UpdateRoles(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce<object>(responseData);
        }

        [HttpDelete("DeleteRoles")]
        public async Task<IActionResult> DeleteRoles(int roleId)
        {
            if (roleId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.rolesServices.DeleteRoles(roleId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(roleId);
        }

        [HttpPost("GetRoles")]
        public async Task<IActionResult> GetRoles([FromBody] ListEntityRequest<BaseFilter> requestData)
        {
            var roleList = await _serviceManager.rolesServices.GetRoles(requestData);
            return APISucessResponce<object>(roleList);
        }

        [HttpGet("GetRoleByRoleId")]
        public async Task<IActionResult> GetRoleByRoleId(int roleId)
        {
            if (roleId > 0)
            {
                var role = await _serviceManager.rolesServices.GetRoleByRoleId(roleId).ConfigureAwait(true);
                return APISucessResponce<object>(role);
            }
            return APISucessResponce(roleId);
        }
        #endregion
    }
}
