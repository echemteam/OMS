using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Contract
{
    public interface IApprovalRepository
    {
        Task<List<GetUserCheckListByEventIdResponse>> GetUserCheckList(int eventId);
        Task<List<GetCheckListItemResponse>> GetCheckListItemByListId(int ChecklistId);
        Task<AddEntityDto<int>> AddUserChecklistResponse(DataTable CheckListDataTable);
        Task<List<GetValidateCheckListResponse>> GetValidateCustomer(int mainId, bool? IsSubCustomer);
        Task<List<GetValidateCheckListResponse>> GetValidateSupplier(int mainId);
        Task<AddEntityDto<int>> AddApprovalRequests(ApprovalRequestsDto requestData);
        Task<List<GetApprovalRequestsListByStatusResponse>> GetApprovalRequestsListByStatus(string status);
        Task<GetApprovalRequestsByApprovalRequestIdResponse> GetApprovalRequestsByApprovalRequestId(int approvalRequestId);
        Task<List<GetApprovalConfigurationResponse>> GetApprovalConfiguration();
    }
}
