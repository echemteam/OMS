﻿using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Appproval;
using OMS.Domain.Entities.API.Request.Approval;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [CheckClientIpActionFilter]
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
        [HttpGet("GetApprovalRequestsListByStatusAndRequestedByUserId")]
        public async Task<IActionResult> GetApprovalRequestsListByStatusAndRequestedByUserId(string status, short requestedByUserId)
        {
            List<GetApprovalRequestsListByStatusAndRequestedByUserIdResponse> responseData = await _serviceManager.approvalService.GetApprovalRequestsListByStatusAndRequestedByUserId(status, requestedByUserId).ConfigureAwait(true);
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
        #endregion
    }
}
