using Common.Helper.Export;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Appproval;
using OMS.Domain.Entities.API.Request.Approval;
using OMS.Domain.Entities.API.Response.Approval;
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
            return checkList;
        }
        public async Task<AddEntityDTO<int>> AddUserChecklistResponse(AddUserChecklistRequest requestData, int CurrentUserId)
        {
            //UserCheckListDTO userCheckListDTO = requestData.ToMapp<AddUserChecklistRequest, UserCheckListDTO>();
            //userCheckListDTO.UserId = CurrentUserId;
            DataTable CheckListDataTable = ExportHelper.ListToDataTable(requestData.CheckListRequest);
            CheckListDataTable.Columns.Add("UserId", typeof(int));
            foreach (DataRow row in CheckListDataTable.Rows)
            {
                row["UserId"] = CurrentUserId;
            }
            return await repositoryManager.approval.AddUserChecklistResponse(CheckListDataTable);
        }
        public async Task<List<GetValidateCheckListResponse>> GetValidateCheckList(ValidateRequest validaterequest)
        {
            List<GetValidateCheckListResponse> responses = new();
            if (validaterequest.CustomerId > 0)
            {
                responses = await repositoryManager.approval.getValidateCustomer(validaterequest.CustomerId);

            }
            else if (validaterequest.SupplierId > 0)
            {
                responses = await repositoryManager.approval.getValidateSupplier(validaterequest.SupplierId);

            }
            return responses;
        }
    }

}
