using Common.Helper.Enum;
using Common.Helper.Export;
using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Appproval;
using OMS.Domain.Entities.API.Request.Approval;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;
using System.Data;
using System.Text.Json;

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
        public async Task<AddEntityDto<int>> AddUserChecklistResponse(AddUserChecklistRequest requestData, int CurrentUserId)
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
        public async Task<AddEntityDto<int>> AddApprovalRequests(AddApprovalRequests requestData, short CurrentUserId)
        {
            ApprovalRequestsDto approvalRequestsDto = requestData.ToMapp<AddApprovalRequests, ApprovalRequestsDto>();
            approvalRequestsDto.RequestedByUserId = CurrentUserId;
            return await repositoryManager.approval.AddApprovalRequests(approvalRequestsDto);
        }
        public Task<List<GetApprovalRequestsListByStatusAndRoleIdResponse>> GetApprovalRequestsListByStatusAndRoleId(string? status, string roleId)
        {
            return repositoryManager.approval.GetApprovalRequestsListByStatusAndRoleId(status, roleId);
        }
        public async Task<GetApprovalRequestsByApprovalRequestIdResponse> GetApprovalRequestsByApprovalRequestId(int approvalRequestId)
        {
            return await repositoryManager.approval.GetApprovalRequestsByApprovalRequestId(approvalRequestId);
        }
        public async Task<AddEntityDto<int>> UpdateApprovalRequestsStatus(UpdateApprovalRequestsStatusRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> response = new();
            int approvalRequestId = requestData.ApprovalRequestId;
            var responceData = await repositoryManager.approval.GetApprovalRequestsByApprovalRequestId(approvalRequestId);

            object responseData = new();
            var request = new { Status = ApprovalRequestsStatus.Accept };

            if (responceData != null && request.Status == ApprovalRequestsStatus.Accept)
            {
                var oldValues = ParseJson(responceData!.OldValue!);
                var newValues = ParseJson(responceData.NewValue!);

                // Determine the primary key column dynamically
                string tableName = responceData.TableName!;
                string primaryKeyColumn = await repositoryManager.approval.GetPrimaryKeyColumnAsync(tableName);

                var normalizedColumns = newValues
                .ToDictionary(kvp => kvp.Key.ToLower(), kvp => kvp.Value);


                // Retrieve actual columns from the table schema to validate input
                var tableColumns = await repositoryManager.approval.GetTableColumnsAsync(tableName);
                var validColumns = tableColumns.ToHashSet(StringComparer.OrdinalIgnoreCase);

                // Filter columns to ensure only valid columns are used
                //var filteredColumns = normalizedColumns
                //    .Where(kvp => validColumns.Contains(kvp.Key))
                //    .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);



                //string query;
                //if (filteredColumns.ContainsKey(primaryKeyColumn) &&
                //filteredColumns[primaryKeyColumn] is int pkValue && pkValue > 0)
                //{
                //    // Update statement
                //    query = BuildUpdateQuery(tableName, filteredColumns, primaryKeyColumn);
                //}
                //else
                //{
                //    // Insert statement
                //    query = BuildInsertQuery(tableName, filteredColumns);
                //}

                //// Execute the query
                //await repositoryManager.approval.Execute(query, filteredColumns);

                var fieldName = responceData.FieldName!.ToLower();  // FieldName from responseData
                if (!normalizedColumns.ContainsKey(fieldName) || !validColumns.Contains(fieldName))
                {
                    response.ErrorMessage = "FieldName is not valid or no changes detected.";
                    response.KeyValue = responceData.ApprovalRequestId ?? 0;

                }

                var newFieldValue = normalizedColumns[fieldName];
                var oldFieldValue = oldValues.GetValueOrDefault(fieldName, string.Empty);

                // Check if the value has changed
                if (newFieldValue.ToString() == oldFieldValue.ToString())
                {

                    response.ErrorMessage = "No changes detected for the specified field.";
                    response.KeyValue = responceData.ApprovalRequestId ?? 0;

                }

                var primaryKeyValue = normalizedColumns[primaryKeyColumn.ToLower()];
                if (primaryKeyValue == null || Convert.ToInt32(primaryKeyValue) <= 0)
                {

                    response.ErrorMessage = "Invalid or missing primary key value.";
                    response.KeyValue = responceData.ApprovalRequestId ?? 0;
                }


                // Determine if the record exists for update or needs to be inserted
                bool recordExists = Convert.ToInt32(primaryKeyValue) > 0;

                string query;
                if (recordExists)
                {
                    // Update statement
                    query = BuildUpdateQuery(tableName, fieldName, primaryKeyColumn);
                }
                else
                {
                    // Insert statement
                    query = BuildInsertQuery(tableName, fieldName, primaryKeyColumn);
                }

                await repositoryManager.approval.Execute(query, new Dictionary<string, object>
                {
                    { fieldName, newFieldValue },
                    { primaryKeyColumn, primaryKeyValue! }
                });

                response.ErrorMessage = "";
                response.KeyValue = responceData.ApprovalRequestId ?? 0;

            }

            ApprovalRequestsDto approvalRequestsDTO = requestData.ToMapp<UpdateApprovalRequestsStatusRequest, ApprovalRequestsDto>();
            approvalRequestsDTO.ApprovedByUserId = CurrentUserId;
            response = await repositoryManager.approval.UpdateApprovalRequestsStatus(approvalRequestsDTO);

            return response;
        }
        private string BuildUpdateQuery(string tableName, string fieldName, string primaryKeyColumn)
        {
            var query = $@"
            UPDATE {tableName}
            SET {fieldName} = @{fieldName}
            WHERE {primaryKeyColumn} = @{primaryKeyColumn};
            ";
            return query;
        }

        private string BuildInsertQuery(string tableName, string fieldName, string primaryKeyColumn)
        {
            var query = $@"
            INSERT INTO {tableName} ({primaryKeyColumn}, {fieldName})
            VALUES (@{primaryKeyColumn}, @{fieldName});
            ";
            return query;
        }

        private static Dictionary<string, object> ParseJson(string jsonData)
        {
            // Deserialize JSON to a dictionary with string keys and values of type object
            var jsonDict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonData);
            return jsonDict!.ToDictionary(
                kvp => kvp.Key,
                kvp => (object)kvp.Value.ToString()  // Convert JsonElement to string
            );
        }
    }

}
