using OMS.Domain.Entities.API.Request.Appproval;
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
        Task<List<GetApprovalRequestsListByStatusAndRoleIdResponse>> GetApprovalRequestsListByStatusAndRoleId(string? status, string? roleId, string eventIds, string sortOrder);
        Task<GetApprovalRequestsByApprovalRequestIdResponse> GetApprovalRequestsByApprovalRequestId(int approvalRequestId);
        Task<CheckFieldValueExistsResponse> CheckFieldValueExists(string fieldName, string fieldValue);
        Task<AddEntityDto<int>> UpdateApprovalRequestsStatus(UpdateApprovalRequestsStatusRequest requestData, short CurrentUserId);
    }
}
