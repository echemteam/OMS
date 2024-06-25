using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Appproval;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ApprovalController : BaseController
    {
        #region Private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public ApprovalController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region API
        [HttpGet("GetUserCheckList")]
        public async Task<IActionResult> GetUserCheckList(int eventId)
        {
            List<GetUserCheckListByEventIdResponse> responseData = await _serviceManager.approvalService.GetUserCheckList(eventId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpPost("AddUserCheckList")]
        public async Task<IActionResult> AddUserCheckList(AddUserCheckListRequest requestData)
        {
            var addCheckList = await _serviceManager.approvalService.AddUserCheckList(requestData, CurrentUserId);
            return APISucessResponce(addCheckList);
        }
        #endregion
    }
}
