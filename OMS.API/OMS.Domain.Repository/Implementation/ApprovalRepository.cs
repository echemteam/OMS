using Dapper;
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
        const string GETAPPROVALREQUESTSLISTBYSTATUSANDREQUESTEDBYUSERID = "GetApprovalRequestsListByStatusAndRequestedByUserId";
        const string GETAPPROVALREQUESTSLISTBYSTATUSANDROLEID = "GetApprovalRequestsListByStatusAndRoleId";
        const string GETAPPROVALREQUESTSBYAPPROVALREQUESTID = "GetApprovalRequestsByApprovalRequestId";
        const string GETAPPROVALCONFIGURATION = "GetApprovalConfiguration";
        const string UPDATEAPPROVALREQUESTSSTATUS = "UpdateApprovalRequestsStatus";
        const string CHECKFIELDVALUEEXISTS = "CheckFieldValueExists";
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
        public async Task<AddEntityDto<int>> AddUserChecklistResponse(DataTable CheckListDataTable)
        {
            var parameters = new
            {
                CheckListResponse = CheckListDataTable.AsTableValuedParameter("[dbo].[CheckListResponseTypeTable]")
            };
            AddEntityDto<int> responceData = await _context.GetSingleAsync<AddEntityDto<int>>(ADDUSERCHECKLISTRESPONSE, parameters, CommandType.StoredProcedure);
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
        public async Task<AddEntityDto<int>> AddApprovalRequests(ApprovalRequestsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDAPPROVALREQUESTS, new
            {
                requestData.ModuleId,
                requestData.FunctionalityId,
                requestData.TableId,
                requestData.FunctionalityEventId,
                requestData.FunctionalitiesFieldId,
                requestData.OldValue,
                requestData.NewValue,
                requestData.RequestedByUserId,
                requestData.OldValueTemplate,
                requestData.NewValueTemplate,
            }, CommandType.StoredProcedure);
        }
        public async Task<List<GetApprovalRequestsListByStatusAndRoleIdResponse>> GetApprovalRequestsListByStatusAndRoleId(string? status, string? roleId, string? eventIds, string? sortOrder, int? moduleId)
        {
            List<GetApprovalRequestsListByStatusAndRoleIdResponse> getAllUsersResponse = await _context.GetList<GetApprovalRequestsListByStatusAndRoleIdResponse>(GETAPPROVALREQUESTSLISTBYSTATUSANDROLEID, new
            {
                roleId,
                status,
                eventIds,
                sortOrder,
                moduleId
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
        public async Task<CheckFieldValueExistsResponse> CheckFieldValueExists(string fieldName, string fieldValue)
        {
            return await _context.GetSingleAsync<CheckFieldValueExistsResponse>(CHECKFIELDVALUEEXISTS, new
            {
                fieldName,
                fieldValue
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> UpdateApprovalRequestsStatus(ApprovalRequestsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATEAPPROVALREQUESTSSTATUS, new
            {
                requestData.ApprovalRequestId,
                requestData.ApprovedByUserId,
                requestData.Status,
                requestData.RejectReason,
            }, CommandType.StoredProcedure);
        }
        public async Task<string> GetPrimaryKeyColumnAsync(string tableName)
        {
            string query = @"
                SELECT COLUMN_NAME
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                WHERE OBJECTPROPERTY(OBJECT_ID(CONSTRAINT_NAME), 'IsPrimaryKey') = 1
                AND TABLE_NAME = @TableName";

            return await _context.GetScaler<string>(query, new { TableName = tableName });
        }
        public async Task Execute(string query, object? parameters = null, CommandType commandType = CommandType.Text)
        {
            await _context.Execute(query, parameters, commandType);
        }
        public async Task<IEnumerable<string>> GetTableColumnsAsync(string tableName)
        {
            string query = @"
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = @TableName";

            return await _context.GetList<string>(query, new { TableName = tableName });
        }
        public async Task<List<GetApprovalConfigurationResponse>> GetApprovalConfiguration()
        {
            List<GetApprovalConfigurationResponse> approvalConfigurationList = await _context.GetList<GetApprovalConfigurationResponse>(GETAPPROVALCONFIGURATION, commandType: CommandType.StoredProcedure);
            return approvalConfigurationList;
        }
    }
}
