using Common.Helper.ApprovalRules;
using Common.Helper.Enum;
using Common.Helper.Export;
using Common.Helper.Extension;
using Newtonsoft.Json;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Appproval;
using OMS.Domain.Entities.API.Request.Approval;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Request.CustomerDocuments;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.Address;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Entities.Entity.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CustomerDocuments;
using OMS.Domain.Repository;
using OMS.FileManger.Services;
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
        public Task<List<GetApprovalRequestsListByStatusAndRoleIdResponse>> GetApprovalRequestsListByStatusAndRoleId(string? status, string roleId, string eventIds, string sortOrder)
        {
            return repositoryManager.approval.GetApprovalRequestsListByStatusAndRoleId(status, roleId,eventIds,sortOrder);
        }
        public async Task<GetApprovalRequestsByApprovalRequestIdResponse> GetApprovalRequestsByApprovalRequestId(int approvalRequestId)
        {
            return await repositoryManager.approval.GetApprovalRequestsByApprovalRequestId(approvalRequestId);
        }

        public async Task<CheckFieldValueExistsResponse> CheckFieldValueExists(string fieldName, string fieldValue)
        {
            return await repositoryManager.approval.CheckFieldValueExists(fieldName, fieldValue);
        }

        public async Task<AddEntityDto<int>> UpdateApprovalRequestsStatus(UpdateApprovalRequestsStatusRequest requestData, short currentUserId)
        {
            var response = new AddEntityDto<int>();
            var approvalRequestId = requestData.ApprovalRequestId;
            var responceData = await repositoryManager.approval.GetApprovalRequestsByApprovalRequestId(approvalRequestId);

            if (responceData == null)
            {
                response.ErrorMessage = "Approval request not found.";
                return response;
            }
            var approvalRequestsDto = requestData.ToMapp<UpdateApprovalRequestsStatusRequest, ApprovalRequestsDto>();
            approvalRequestsDto.ApprovedByUserId = currentUserId;

            if (requestData.Status != ApprovalRequestsStatus.Accept)
            {
                approvalRequestsDto.Status = ApprovalRequestsStatus.Reject;
                return await UpdateApprovalStatus(approvalRequestsDto);
            }

            if (responceData.IsFunctional == true && (responceData.NewValue != null || responceData.EventName != null))
            {
                try
                {
                    response = await HandleEvent(responceData, currentUserId);
                    if (response.KeyValue > 0 || response.ErrorMessage != "")
                    {
                        approvalRequestsDto.Status = ApprovalRequestsStatus.Accept;
                    }
                    else
                    {
                        approvalRequestsDto.Status = ApprovalRequestsStatus.Pending;
                    }
                    response = await UpdateApprovalStatus(approvalRequestsDto);
                }
                catch (Exception)
                {
                    approvalRequestsDto.Status = ApprovalRequestsStatus.Pending;
                    response = await UpdateApprovalStatus(approvalRequestsDto);
                }
            }
            else
            {
                response = await HandleFieldApproval(responceData, approvalRequestsDto, requestData);
                if (response.KeyValue > 0 || response.ErrorMessage != "")
                {
                    approvalRequestsDto.Status = ApprovalRequestsStatus.Accept;
                }
                else
                {
                    approvalRequestsDto.Status = ApprovalRequestsStatus.Pending;
                }
                var addEntityDto = await UpdateApprovalStatus(approvalRequestsDto);
            }
            return response;
        }

        private async Task<AddEntityDto<int>> UpdateApprovalStatus(ApprovalRequestsDto approvalRequestsDto)
        {
            return await repositoryManager.approval.UpdateApprovalRequestsStatus(approvalRequestsDto);
        }

        private async Task<AddEntityDto<int>> HandleEvent(GetApprovalRequestsByApprovalRequestIdResponse responceData, short currentUserId)
        {
            switch (responceData.EventName)
            {
                case ApprovalEvent.AddCustomerBillingAddress:
                case ApprovalEvent.AddCustomerShippingAddress:
                    return await HandleAddAddress(responceData.NewValue!, currentUserId);

                case ApprovalEvent.UpdateCustomerBillingAddress:
                case ApprovalEvent.UpdateCustomerShippingAddress:
                    return await HandleUpdateAddress(responceData.NewValue!, currentUserId);

                case ApprovalEvent.AddCustomerInvoiceFollowUpContact:
                case ApprovalEvent.UpdateCustomerInvoiceFollowUpContact:
                case ApprovalEvent.AddCustomerInvoiceSubmissionContact:
                case ApprovalEvent.UpdateCustomerInvoiceSubmissionContact:
                    return await HandleAddEditContact(responceData.NewValue!, currentUserId);

                case ApprovalEvent.UpdateCustomerShippingSetting:
                    return await HandleUpdateShippingSetting(responceData.NewValue!, currentUserId);

                case ApprovalEvent.UploadCustomerDocument:
                    return await HandleUploadCustomerDocument(responceData.NewValue!, currentUserId);

                default:
                    throw new InvalidOperationException("Unknown event type.");
            }
        }

        private async Task<AddEntityDto<int>> HandleAddAddress(string newValue, short currentUserId)
        {
            var addAddressDto = JsonConvert.DeserializeObject<AddressDto>(newValue);
            addAddressDto!.CreatedBy = currentUserId;

            var response = await repositoryManager.address.AddAddress(addAddressDto);
            if (addAddressDto.CustomerId > 0 && response.KeyValue > 0)
            {
                var addAddressForCustomerRequest = JsonConvert.DeserializeObject<AddAddressForCustomerRequest>(newValue);
                addAddressForCustomerRequest!.AddressId = response.KeyValue;
                await repositoryManager.customers.AddAddressForCustomer(addAddressForCustomerRequest, currentUserId);
            }
            if (response.KeyValue > 0 && addAddressDto.IsShippingAndBilling == true && addAddressDto.CustomerId > 0)
            {
                switch ((AddressType)addAddressDto.AddressTypeId!)
                {
                    case AddressType.Billing:
                        addAddressDto.AddressTypeId = (int)AddressType.Shipping;
                        break;

                    case AddressType.Shipping:
                        addAddressDto.AddressTypeId = (int)AddressType.Billing;
                        break;
                }
                response = await repositoryManager.address.AddAddress(addAddressDto);
                var addAddressForCustomerRequest = JsonConvert.DeserializeObject<AddAddressForCustomerRequest>(newValue);
                addAddressForCustomerRequest!.AddressTypeId = addAddressDto.AddressTypeId;
                if (response.KeyValue > 0)
                {
                    addAddressForCustomerRequest!.AddressId = response.KeyValue;
                    await repositoryManager.customers.AddAddressForCustomer(addAddressForCustomerRequest, currentUserId);
                }
            }
            return response;
        }

        private async Task<AddEntityDto<int>> HandleUpdateAddress(string newValue, short currentUserId)
        {
            var updateAddressDto = JsonConvert.DeserializeObject<AddressDto>(newValue);
            updateAddressDto!.CreatedBy = currentUserId;

            await repositoryManager.address.UpdateAddAddress(updateAddressDto);

            var updateCustomerRequest = JsonConvert.DeserializeObject<UpdateAddressForCustomerRequest>(newValue);
            await repositoryManager.customers.UpdateAddressForCustomer(updateCustomerRequest, currentUserId);

            return new AddEntityDto<int> { KeyValue = 1 };
        }

        private async Task<AddEntityDto<int>> HandleAddEditContact(string newValue, short currentUserId)
        {
            var contactDto = JsonConvert.DeserializeObject<ContactDto>(newValue);
            contactDto!.CreatedBy = currentUserId;

            var response = await repositoryManager.contact.AddEditContact(contactDto);
            if (response.KeyValue > 0)
            {
                await HandleContactEmailsAndPhones(newValue, response.KeyValue, currentUserId);
            }
            return response;
        }

        private async Task HandleContactEmailsAndPhones(string newValue, int contactId, short currentUserId)
        {
            var jsonData = JsonConvert.DeserializeObject<AddEditContactRequest>(newValue);

            if (jsonData!.EmailList?.Count > 0)
            {
                var emailDataTable = ExportHelper.ListToDataTable(jsonData.EmailList);
                AddAdditionalColumns(emailDataTable, OwnerType.CustomerContact, currentUserId);
                await repositoryManager.emailAddress.AddEditContactEmail(emailDataTable, contactId);
            }

            if (jsonData.PhoneList?.Count > 0)
            {
                var phoneDataTable = ExportHelper.ListToDataTable(jsonData.PhoneList);
                AddAdditionalColumns(phoneDataTable, OwnerType.CustomerContact, currentUserId);
                await repositoryManager.phoneNumber.AddEditContactPhone(phoneDataTable, contactId);
            }
            if (contactId > 0)
            {
                var addEditContactForCustomerRequest = JsonConvert.DeserializeObject<AddEditContactForCustomerRequest>(newValue);
                addEditContactForCustomerRequest!.ContactId = contactId;
                await repositoryManager.customers.AddEditContactForCustomer(addEditContactForCustomerRequest!, currentUserId);
            }
        }

        private void AddAdditionalColumns(DataTable dataTable, OwnerType ownerType, short currentUserId)
        {
            dataTable.Columns.Add("OwnerTypeId", typeof(short));
            dataTable.Columns.Add("CreatedBy", typeof(short));
            foreach (DataRow row in dataTable.Rows)
            {
                row["OwnerTypeId"] = ownerType;
                row["CreatedBy"] = currentUserId;
            }
        }

        private async Task<AddEntityDto<int>> HandleUpdateShippingSetting(string newValue, short currentUserId)
        {
            var customerShppingDeliveryCarriersDto = JsonConvert.DeserializeObject<CustomerShppingDeliveryCarriersDto>(newValue);
            customerShppingDeliveryCarriersDto!.CreatedBy = currentUserId;
            return await repositoryManager.customerAccountingSettings.UpdateShppingDeliveryCarriers(customerShppingDeliveryCarriersDto);
        }

        private async Task<AddEntityDto<int>> HandleUploadCustomerDocument(string newValue, short currentUserId)
        {
            var documentData = JsonConvert.DeserializeObject<AddCustomerDocumentsRequest>(newValue);
            if (documentData?.DocumentInfoList != null)
            {
                foreach (var document in documentData.DocumentInfoList)
                {
                    if (!string.IsNullOrEmpty(document.Base64File) && !string.IsNullOrEmpty(documentData.StoragePath))
                    {
                        var aesKey = commonSettingService.EncryptionSettings.AESKey!;
                        var aesIv = commonSettingService.EncryptionSettings.AESIV!;
                        document.Attachment = FileManager.SaveEncryptFile(
                            document.Base64File!,
                            Path.Combine(commonSettingService.ApplicationSettings.SaveFilePath!, documentData.StoragePath, documentData.CustomerId.ToString()!),
                            document.Attachment!,
                            aesKey,
                            aesIv
                        );
                    }
                }

                var jsonData = JsonConvert.DeserializeObject<CustomerDocumentsDto>(newValue);
                jsonData!.CreatedBy = currentUserId;
                var modifyData = documentData.DocumentInfoList.Select(data => new { data.Name, data.Attachment, data.DocumentTypeId }).ToList();
                var documentDataTable = ExportHelper.ListToDataTable(modifyData);
                return await repositoryManager.customerDocuments.AddCustomerDocuments(jsonData, documentDataTable);
            }

            return new AddEntityDto<int> { KeyValue = 1 }; // Assuming upload was successful
        }


        private async Task<AddEntityDto<int>> HandleFieldApproval(GetApprovalRequestsByApprovalRequestIdResponse responceData, ApprovalRequestsDto approvalRequestsDto, UpdateApprovalRequestsStatusRequest requestData)
        {
            AddEntityDto<int> response = new();
            int approvalRequestId = requestData.ApprovalRequestId;

            Dictionary<string, object> oldValues = null!;
            Dictionary<string, object> newValues = null!;

            if (!string.IsNullOrEmpty(responceData!.OldValue!))
            {
                oldValues = ApprovalRuleHelper.FiledParseJson(responceData!.OldValue!);
            }

            if (!string.IsNullOrEmpty(responceData.NewValue!))
            {
                newValues = ApprovalRuleHelper.FiledParseJson(responceData.NewValue!);
            }

            string tableName = responceData.TableName!;
            string primaryKeyColumn = await repositoryManager.approval.GetPrimaryKeyColumnAsync(tableName);

            var normalizedColumns = newValues
            .ToDictionary(kvp => kvp.Key.ToLower(), kvp => kvp.Value);


            var tableColumns = await repositoryManager.approval.GetTableColumnsAsync(tableName);
            var validColumns = tableColumns.ToHashSet(StringComparer.OrdinalIgnoreCase);

            var fieldName = responceData.FieldName!.ToLower();
            if (!normalizedColumns.ContainsKey(fieldName) || !validColumns.Contains(fieldName))
            {
                response.ErrorMessage = "FieldName is not valid or no changes detected.";
                response.KeyValue = responceData.ApprovalRequestId ?? 0;

            }

            var newFieldValue = normalizedColumns[fieldName];
            var oldFieldValue = oldValues.GetValueOrDefault(fieldName, string.Empty);

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

            bool recordExists = Convert.ToInt32(primaryKeyValue) > 0;

            string query = "";
            if (recordExists)
            {
                // Update statement
                query = BuildUpdateQuery(tableName, fieldName, primaryKeyColumn);
            }
            //else
            //{
            //    // Insert statement
            //    query = BuildInsertQuery(tableName, fieldName, primaryKeyColumn);
            //}

            await repositoryManager.approval.Execute(query, new Dictionary<string, object>
                {
                      { fieldName, newFieldValue },
                      { primaryKeyColumn, primaryKeyValue! }
                });

            response.ErrorMessage = "";
            response.KeyValue = responceData.ApprovalRequestId ?? 0;

            response = await repositoryManager.approval.UpdateApprovalRequestsStatus(approvalRequestsDto);
            return response;

        }
        private string BuildUpdateQuery(string tableName, string fieldName, string primaryKeyColumn)
        {
            var query = $@"
            UPDATE {tableName}
            SET {fieldName} = @{fieldName}
            WHERE {primaryKeyColumn} = @{primaryKeyColumn};";
            return query;
        }
        //private string BuildInsertQuery(string tableName, string fieldName, string primaryKeyColumn)
        //{
        //    var query = $@"
        //    INSERT INTO {tableName} ({primaryKeyColumn}, {fieldName})
        //    VALUES (@{primaryKeyColumn}, @{fieldName});
        //    "; return query;
        //}

    }

}


