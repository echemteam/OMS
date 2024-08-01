﻿using Dapper;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApprovalRepository : BaseRepository<Approval>, IApprovalRepository
    {
        #region SP
        const string GETUSERCHECKLISTBYEVENTBYID = "GetUserCheckListByEventId";
        const string GETCHECKLISTITEMBYLISTID = "GetCheckListItemByListId";
        const string ADDUSERCHECKLISTRESPONSE = "AddUserCheckListResponse";
        const string VALIDATECUSTOMERDATA = "ValidateCustomerData";
        const string VALIDATESUPPLIERDATA = "ValidateSupplierData";
        const string ADDAPPROVALREQUESTS = "AddApprovalRequests";
        const string GETAPPROVALREQUESTSLISTBYSTATUS = "GetApprovalRequestsListByStatus";
        const string GETAPPROVALREQUESTSBYAPPROVALREQUESTID = "GetApprovalRequestsByApprovalRequestId";
        #endregion

        public ApprovalRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        public async Task<List<GetUserCheckListByEventIdResponse>> GetUserCheckList(int eventId)
        {
            List<GetUserCheckListByEventIdResponse> response = await _context.GetList<GetUserCheckListByEventIdResponse>(GETUSERCHECKLISTBYEVENTBYID, new
            {
                eventId
            }, commandType: CommandType.StoredProcedure);
            return response;

        }
        public async Task<List<GetCheckListItemResponse>> GetCheckListItemByListId(int ChecklistId)
        {
            List<GetCheckListItemResponse> getEmailByContactIdResponse = await _context.GetList<GetCheckListItemResponse>(GETCHECKLISTITEMBYLISTID, new
            {
                ChecklistId
            }, commandType: CommandType.StoredProcedure);
            return getEmailByContactIdResponse;

        }
        public async Task<AddEntityDTO<int>> AddUserChecklistResponse(DataTable CheckListDataTable)
        {
            var parameters = new
            {
                CheckListResponse = CheckListDataTable.AsTableValuedParameter("[dbo].[CheckListResponseTypeTable]")
            };
            AddEntityDTO<int> responceData = await _context.GetSingleAsync<AddEntityDTO<int>>(ADDUSERCHECKLISTRESPONSE, parameters, CommandType.StoredProcedure);
            return responceData;
        }
        public async Task<List<GetValidateCheckListResponse>> GetValidateCustomer(int customerId, bool? isSubCustomer)
        {
            List<GetValidateCheckListResponse> getApprovalCheckList = await _context.GetList<GetValidateCheckListResponse>(VALIDATECUSTOMERDATA, new
            {
                customerId,
                isSubCustomer
            }, commandType: CommandType.StoredProcedure);
            return getApprovalCheckList;

        }
        public async Task<List<GetValidateCheckListResponse>> GetValidateSupplier(int supplierId)
        {
            List<GetValidateCheckListResponse> getApprovalCheckList = await _context.GetList<GetValidateCheckListResponse>(VALIDATESUPPLIERDATA, new
            {
                supplierId
            }, commandType: CommandType.StoredProcedure);
            return getApprovalCheckList;

        }
        public async Task<AddEntityDTO<int>> AddApprovalRequests(ApprovalRequestsDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDAPPROVALREQUESTS, new
            {
                requestData.ModuleId,
                requestData.FunctionalityId,
                requestData.TableId,
                requestData.FunctionalitiesFieldId,
                requestData.OldValue,
                requestData.NewValue,
                requestData.RequestedByUserId,
            }, CommandType.StoredProcedure);
        }
        public async Task<List<GetApprovalRequestsListByStatusResponse>> GetApprovalRequestsListByStatus(string status)
        {
            List<GetApprovalRequestsListByStatusResponse> getAllUsersResponse = await _context.GetList<GetApprovalRequestsListByStatusResponse>(GETAPPROVALREQUESTSLISTBYSTATUS, new
            {
                status
            }, commandType: CommandType.StoredProcedure);
            return getAllUsersResponse;
        }

        public async Task<GetApprovalRequestsByApprovalRequestIdResponse> GetApprovalRequestsByApprovalRequestId(int approvalRequestId)
        {
            GetApprovalRequestsByApprovalRequestIdResponse approvalRequestsDetails = await _context.GetFrist<GetApprovalRequestsByApprovalRequestIdResponse>(GETAPPROVALREQUESTSBYAPPROVALREQUESTID, new
            {
                approvalRequestId
            }, CommandType.StoredProcedure);
            return approvalRequestsDetails;
        }
    }
}
