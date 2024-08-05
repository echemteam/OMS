using Common.Helper.Export;
using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Appproval;
using OMS.Domain.Entities.API.Request.Approval;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;
using System.Data;

namespace OMS.Application.Services.Approval
{
    public class ApprovalService : BaseServices, IApprovalService
    {
        #region Variable
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public ApprovalService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        #endregion

        public async Task<List<GetUserCheckListByEventIdResponse>> GetUserCheckList(int eventId)
        {
            List<GetUserCheckListByEventIdResponse> checkList = await repositoryManager.approval.GetUserCheckList(eventId);
            if (checkList != null && checkList.Count > 0)
            {
                foreach (var checkListItem in checkList)
                {
                    checkListItem.CheckListItem = await repositoryManager.approval.GetCheckListItemByListId(checkListItem.ChecklistId);
                }
            }
            return checkList!;
        }
        public async Task<AddEntityDTO<int>> AddUserChecklistResponse(AddUserChecklistRequest requestData, int CurrentUserId)
        {
            DataTable CheckListDataTable = ExportHelper.ListToDataTable(requestData.CheckListRequest);
            CheckListDataTable.Columns.Add("UserId", typeof(int));
            foreach (DataRow row in CheckListDataTable.Rows)
            {
                row["UserId"] = CurrentUserId;
            }
            return await repositoryManager.approval.AddUserChecklistResponse(CheckListDataTable);
        }
        public async Task<List<GetValidateCheckListResponse>> GetValidateCheckList(ValidateRequest requestData)
        {
            List<GetValidateCheckListResponse> responses = new();
            if (requestData.CustomerId > 0)
            {
                responses = await repositoryManager.approval.GetValidateCustomer(requestData.CustomerId, requestData.IsSubCustomer);

            }
            else if (requestData.SupplierId > 0)
            {
                responses = await repositoryManager.approval.GetValidateSupplier(requestData.SupplierId);

            }
            return responses;
        }
        public async Task<AddEntityDTO<int>> AddApprovalRequests(AddApprovalRequests requestData, short CurrentUserId)
        {
            ApprovalRequestsDTO approvalRequestsDTO = requestData.ToMapp<AddApprovalRequests, ApprovalRequestsDTO>();
            approvalRequestsDTO.RequestedByUserId = CurrentUserId;
            return await repositoryManager.approval.AddApprovalRequests(approvalRequestsDTO);
        }
        public Task<List<GetApprovalRequestsListByStatusAndRequestedByUserIdResponse>> GetApprovalRequestsListByStatusAndRequestedByUserId(string status, short requestedByUserId)
        {
            return repositoryManager.approval.GetApprovalRequestsListByStatusAndRequestedByUserId(status, requestedByUserId);
        }
        public async Task<GetApprovalRequestsByApprovalRequestIdResponse> GetApprovalRequestsByApprovalRequestId(int approvalRequestId)
        {
            return await repositoryManager.approval.GetApprovalRequestsByApprovalRequestId(approvalRequestId);
        }
    }

}
