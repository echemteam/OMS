﻿using OMS.Domain.Entities.API.Request.Appproval;
using OMS.Domain.Entities.API.Request.Approval;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Approval
{
    public interface IApprovalService
    {
        Task<List<GetUserCheckListByEventIdResponse>> GetUserCheckList(int eventId);
        Task<AddEntityDto<int>> AddUserChecklistResponse(AddUserChecklistRequest requestData, int CurrentUserId);
        Task<List<GetValidateCheckListResponse>> GetValidateCheckList(ValidateRequest requestData);
        Task<AddEntityDto<int>> AddApprovalRequests(AddApprovalRequests requestData, short CurrentUserId);
        Task<List<GetApprovalRequestsListByStatusResponse>> GetApprovalRequestsListByStatus(string status);
        Task<GetApprovalRequestsByApprovalRequestIdResponse> GetApprovalRequestsByApprovalRequestId(int approvalRequestId);
    }
}
