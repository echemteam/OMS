using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Appproval;
using OMS.Domain.Entities.API.Request.Approval;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    //[CheckClientIpActionFilter]
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

        [HttpPost("AddUserChecklistResponse")]
        public async Task<IActionResult> AddUserChecklistResponse(AddUserChecklistRequest requestData)
        {
            var addCheckList = await _serviceManager.approvalService.AddUserChecklistResponse(requestData, CurrentUserId);
            return APISucessResponce(addCheckList);
        }
        [HttpPost("GetValidateCheckList")]
        public async Task<IActionResult> GetValidateCheckList(ValidateRequest requestData)
        {
            List<GetValidateCheckListResponse> responseData = await _serviceManager.approvalService.GetValidateCheckList(requestData).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpPost("AddApprovalRequests")]
        public async Task<IActionResult> AddApprovalRequests(AddApprovalRequests requestData)
        {
            var addItem = await _serviceManager.approvalService.AddApprovalRequests(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }
        [HttpPost("GetApprovalRequestsListByStatusAndRoleId")]
        public async Task<IActionResult> GetApprovalRequestsListByStatusAndRoleId(GetApprovalRequestsListByStatusAndRoleIdRequest requestData)
        {
            List<GetApprovalRequestsListByStatusAndRoleIdResponse> responseData = await _serviceManager.approvalService.GetApprovalRequestsListByStatusAndRoleId(requestData).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
        [HttpGet("GetApprovalRequestsByApprovalRequestId")]
        public async Task<IActionResult> GetApprovalRequestsByApprovalRequestId(int approvalRequestId)
        {
            if (approvalRequestId > 0)
            {
                var approvalRequestsDetails = await _serviceManager.approvalService.GetApprovalRequestsByApprovalRequestId(approvalRequestId).ConfigureAwait(true);
                return APISucessResponce<object>(approvalRequestsDetails);
            }
            return APISucessResponce(approvalRequestId);
        }

        [HttpPost("CheckFieldValueExists")]
        public async Task<IActionResult> CheckFieldValueExists(string fieldName, string fieldValue)
        {
            if (fieldValue != null && fieldName !=null )
            {
                var checkValues = await _serviceManager.approvalService.CheckFieldValueExists(fieldName, fieldValue!);
                return APISucessResponce(checkValues);
            }
            return APISucessResponce(fieldName, fieldValue!);
        }

        [HttpPost("UpdateApprovalRequestsStatus")]
        public async Task<IActionResult> UpdateApprovalRequestsStatus(UpdateApprovalRequestsStatusRequest requestData)
        {
            AddEntityDto<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.approvalService.UpdateApprovalRequestsStatus(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(responseData);
        }
        #endregion
    }
}
