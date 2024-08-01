using OMS.Domain.Entities.API.Request.Appproval;
using OMS.Domain.Entities.API.Request.Approval;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Approval
{
    public interface IApprovalService
    {
        Task<List<GetUserCheckListByEventIdResponse>> GetUserCheckList(int eventId);
        Task<AddEntityDTO<int>> AddUserChecklistResponse(AddUserChecklistRequest requestData, int CurrentUserId);
        Task<List<GetValidateCheckListResponse>> GetValidateCheckList(ValidateRequest requestData);
    }
}
