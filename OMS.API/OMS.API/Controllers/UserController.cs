using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.User;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    //[CheckClientIpActionFilter]
    public class UserController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public UserController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region User API  
        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser(AddUserRequest requestData)
        {
            var addItem = await _serviceManager.userService.AddUser(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UpdateUserRequest requestData)
        {
            AddEntityDto<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.userService.UpdateUser(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce<object>(responseData);
        }

        [HttpGet("GetUserByUserId")]
        public async Task<IActionResult> GetUserByUserId(short userId)
        {
            if (userId > 0)
            {
                var user = await _serviceManager.userService.GetUserByUserId(userId).ConfigureAwait(true);
                return APISucessResponce<object>(user);
            }
            return APISucessResponce(userId);
        }

        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser(short userId)
        {
            if (userId > 0)
            {
                var deleteItem = await _serviceManager.userService.DeleteUser(userId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(userId);
        }

        [HttpPost("GetUsers")]
        public async Task<IActionResult> GetUsers([FromBody] ListEntityRequest<BaseFilter> requestData)
        {
            var userList = await _serviceManager.userService.GetUsers(requestData);
            return APISucessResponce<object>(userList);
        }

        [HttpPost("UpdateUserPassword")]
        public async Task<IActionResult> UpdateUserPassword(UpdateUserPasswordRequest updateUserPassword)
        {
            AddEntityDto<int> responseData = new();
            if (updateUserPassword != null)
            {
                responseData = await _serviceManager.userService.UpdateUserPassword(updateUserPassword, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce<object>(responseData);
        }

        [HttpGet("GetUserLoginLogoutHistoryByUserId")]
        public async Task<IActionResult> GetUserLoginLogoutHistoryByUserId(short userId)
        {
            List<GetUserLoginLogoutHistoryByUserIdResponse> responseData = await _serviceManager.userService.GetUserLoginLogoutHistoryByUserId(userId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
        #endregion 
    }
}
