using Common.Helper.ApprovalRules;
using Common.Helper.Enum;
using Common.Helper.Export;
using Common.Helper.Extension;
using Common.Helper.ReplacePlaceholders;
using Newtonsoft.Json;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Request.Appproval;
using OMS.Domain.Entities.API.Request.Approval;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Request.CustomerAccountingNotes;
using OMS.Domain.Entities.API.Request.CustomerDocuments;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Request.SupplierAccoutingSetting;
using OMS.Domain.Entities.API.Request.SupplierFinancialSettings;
using OMS.Domain.Entities.API.Request.supplierPaymentSettings;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.Address;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Entities.Entity.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CustomerDocuments;
using OMS.Domain.Entities.Entity.SuppierBankDetails;
using OMS.Domain.Entities.Entity.SupplierAccoutingSetting;
using OMS.Domain.Entities.Entity.SupplierPaymentSettings;
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
            DataTable CheckListDataTable = ExportHelper.ListToDataTable(requestData.CheckListRequest!);
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
            var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(requestData.FunctionalityEventId);

            var approvalRequestsDto = requestData.ToMapp<AddApprovalRequests, ApprovalRequestsDto>();
            approvalRequestsDto.RequestedByUserId = CurrentUserId;

            if (formatTemplate?.Template != null && formatTemplate.Template != string.Empty && !string.IsNullOrWhiteSpace(formatTemplate.Template) && !string.IsNullOrEmpty(formatTemplate.Template))
            {
                if (!string.IsNullOrEmpty(requestData.OldValue))
                {
                    approvalRequestsDto.OldValueTemplate = ReplacePlaceholdersHelper.ProcessTemplate(requestData.OldValue!, formatTemplate!.Template!);
                }
                if (!string.IsNullOrEmpty(requestData.NewValue))
                {
                    approvalRequestsDto.NewValueTemplate = ReplacePlaceholdersHelper.ProcessTemplate(requestData.NewValue!, formatTemplate!.Template!);
                }
            }
            return await repositoryManager.approval.AddApprovalRequests(approvalRequestsDto);
        }
        public Task<List<GetApprovalRequestsListByStatusAndRoleIdResponse>> GetApprovalRequestsListByStatusAndRoleId(GetApprovalRequestsListByStatusAndRoleIdRequest requestData)
        {
            return repositoryManager.approval.GetApprovalRequestsListByStatusAndRoleId(requestData);
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

                case ApprovalEvent.UpdateCustomerShippingCarrierDetails:
                    return await HandleShppingDeliveryCarriers(responceData.NewValue!, currentUserId);

                case ApprovalEvent.UpdateCustomerShippingDeliveryMethodDetails:
                    return await HandleUpdateShippingDeliveryMethods(responceData.NewValue!, currentUserId);

                case ApprovalEvent.UploadCustomerDocument:
                    return await HandleUploadCustomerDocument(responceData.NewValue!, currentUserId);

                case ApprovalEvent.AddSupplierPhysicalAddress:
                case ApprovalEvent.AddSupplierBankAddress:
                   return await HandleAddSuupplierAddress(responceData.NewValue!, currentUserId);

                case ApprovalEvent.UpdateSupplierPhysicalAddress:
                case ApprovalEvent.UpdateSupplierBankAddress:
                   return await HandleUpdateSupplierAddress(responceData.NewValue!, currentUserId);

                case ApprovalEvent.AddSupplierPrimaryContact:
                case ApprovalEvent.AddSupplierAccountsReceivableContact:
                case ApprovalEvent.UpdateSupplierPrimaryContact:
                case ApprovalEvent.UpdateSupplierAccountsReceivableContact:
                   return await HandleSupplierAddEditContact(responceData.NewValue!, currentUserId);

                case ApprovalEvent.UpdateAchWireFinancialSetting:
                    return await HandleSupplierUpdateAchWireFinancialSetting(responceData.NewValue!, currentUserId);

                case ApprovalEvent.UpdateCreditCardFinancialSetting:
                    return await HandleSupplierUpdateCreditCardFinancialSetting(responceData.NewValue!, currentUserId);

                case ApprovalEvent.UpdateCheckFinancialSetting:
                    return await HandleSupplierUpdateCheckFinancialSetting(responceData.NewValue!, currentUserId);

                case ApprovalEvent.UpdateOtherFinancialSetting:
                    return await HandleSupplierUpdateOtherFinancialSetting(responceData.NewValue!, currentUserId);
                //case ApprovalEvent.UpdateSupplierFinancialSetting:
                //    return await HandleUpdateSupplierFinancialSetting(responceData.NewValue!, currentUserId);
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
            updateAddressDto!.UpdatedBy = currentUserId;

            await repositoryManager.address.UpdateAddAddress(updateAddressDto);

            var updateCustomerRequest = JsonConvert.DeserializeObject<UpdateAddressForCustomerRequest>(newValue);
            await repositoryManager.customers.UpdateAddressForCustomer(updateCustomerRequest, currentUserId);

            return new AddEntityDto<int> { KeyValue = 1 };
        }
        private async Task<AddEntityDto<int>> HandleAddEditContact(string newValue, short currentUserId)
        {
            // Deserialize JSON to a dictionary
            var contactData = JsonConvert.DeserializeObject<Dictionary<string, object>>(newValue);
            contactData["CreatedBy"] = currentUserId;

            // Retrieve and split ContactTypeId
            if (contactData.TryGetValue("ContactTypeId", out var contactTypeIdValue) && contactTypeIdValue is string contactTypeIdString)
            {
                var contactTypeIds = contactTypeIdString.Split(',').Select(id => id.Trim()).ToArray();
                var response = new AddEntityDto<int>();

                foreach (var typeId in contactTypeIds)
                {
                    // Update the ContactTypeId in the dictionary
                    contactData["ContactTypeId"] = typeId;

                    // Convert the dictionary back to ContactDto or an appropriate object for AddEditContact method
                    var contactDto = JsonConvert.DeserializeObject<ContactDto>(JsonConvert.SerializeObject(contactData));

                    // Add or edit the contact
                    var currentResponse = await repositoryManager.contact.AddEditContact(contactDto);

                    if (currentResponse.KeyValue > 0)
                    {
                        // Update the response with the latest KeyValue
                        response.KeyValue = currentResponse.KeyValue;

                        // Handle emails and phones for the current contact
                        await HandleContactEmailsAndPhones(newValue, currentResponse.KeyValue, currentUserId);

                        // Add or edit contact for customer
                        foreach (var typeIds in contactTypeIds)
                        {
                            var shortTypeId = short.Parse(typeIds); // Convert string to short
                            var addEditContactForCustomerRequest = new AddEditContactForCustomerRequest
                            {
                                ContactId = currentResponse.KeyValue,
                                ContactTypeId = shortTypeId,
                                CustomerId = contactDto.CustomerId,
                                CustomerContactId = contactDto.CustomerContactId,
                                IsPrimary = contactDto.IsPrimary,
                            };

                            await repositoryManager.customers.AddEditContactForCustomer(addEditContactForCustomerRequest, currentUserId);
                        }
                    }
                }

                return response;
            }

            throw new ArgumentException("ContactTypeId not found or is invalid.");
        }
        private async Task HandleContactEmailsAndPhones(string newValue, int contactId, short currentUserId)
        {
            var jsonData = JsonConvert.DeserializeObject<AddEditContactRequest>(newValue);

            if (jsonData!.EmailAddressList?.Count > 0)
            {
                var emailDataTable = ExportHelper.ListToDataTable(jsonData.EmailAddressList);
                AddAdditionalColumns(emailDataTable, OwnerType.CustomerContact, currentUserId);
                await repositoryManager.emailAddress.AddEditContactEmail(emailDataTable, contactId);
            }

            if (jsonData.PhoneNumberList?.Count > 0)
            {
                var phoneDataTable = ExportHelper.ListToDataTable(jsonData.PhoneNumberList);
                AddAdditionalColumns(phoneDataTable, OwnerType.CustomerContact, currentUserId);
                await repositoryManager.phoneNumber.AddEditContactPhone(phoneDataTable, contactId);
            }
            //if (contactId > 0)
            //{
            //    var addEditContactForCustomerRequest = JsonConvert.DeserializeObject<AddEditContactForCustomerRequest>(newValue);
            //    addEditContactForCustomerRequest!.ContactId = contactId;
            //    await repositoryManager.customers.AddEditContactForCustomer(addEditContactForCustomerRequest!, currentUserId);
            //}
        }
        private async Task<AddEntityDto<int>> HandleSupplierAddEditContact(string newValue, short currentUserId)
        {
            var contactDto = JsonConvert.DeserializeObject<ContactDto>(newValue);
            contactDto!.CreatedBy = currentUserId;

            var response = await repositoryManager.contact.AddEditContact(contactDto);
            if (response.KeyValue > 0)
            {
                await HandleSupplierContactEmailsAndPhones(newValue, response.KeyValue, currentUserId);
            }
            return response;
        }
        private async Task HandleSupplierContactEmailsAndPhones(string newValue, int contactId, short currentUserId)
        {
            var jsonData = JsonConvert.DeserializeObject<AddEditContactRequest>(newValue);

            if (jsonData!.EmailAddressList?.Count > 0)
            {
                var emailDataTable = ExportHelper.ListToDataTable(jsonData.EmailAddressList);
                AddAdditionalColumns(emailDataTable, OwnerType.SupplierContact, currentUserId);
                await repositoryManager.emailAddress.AddEditContactEmail(emailDataTable, contactId);
            }

            if (jsonData.PhoneNumberList?.Count > 0)
            {
                var phoneDataTable = ExportHelper.ListToDataTable(jsonData.PhoneNumberList);
                AddAdditionalColumns(phoneDataTable, OwnerType.SupplierContact, currentUserId);
                await repositoryManager.phoneNumber.AddEditContactPhone(phoneDataTable, contactId);
            }
            if (contactId > 0)
            {
                var addEditContactForSupplierRequest = JsonConvert.DeserializeObject<AddEditContactForSupplierRequest>(newValue);
                addEditContactForSupplierRequest!.ContactId = contactId;
                await repositoryManager.supplier.AddEditContactForSupplier(addEditContactForSupplierRequest!, currentUserId);
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
        private async Task<AddEntityDto<int>> HandleShppingDeliveryCarriers(string newValue, short currentUserId)
        {
            var customerShppingDeliveryCarriersDto = JsonConvert.DeserializeObject<CustomerShppingDeliveryCarriersDto>(newValue);
            customerShppingDeliveryCarriersDto!.UpdatedBy = currentUserId;
            return await repositoryManager.customerAccountingSettings.UpdateShppingDeliveryCarriers(customerShppingDeliveryCarriersDto);
        }
        private async Task<AddEntityDto<int>> HandleUpdateShippingDeliveryMethods(string newValue, short currentUserId)
        {
            var customerDeliveryMethodsDto = JsonConvert.DeserializeObject<CustomerDeliveryMethodsDto>(newValue);
            customerDeliveryMethodsDto!.UpdatedBy = currentUserId;
            return  await repositoryManager.customerAccountingSettings.UpdateDeliveryMethods(customerDeliveryMethodsDto);

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
        private async Task<AddEntityDto<int>> HandleAddSuupplierAddress(string newValue, short currentUserId)
        {
            var addAddressDto = JsonConvert.DeserializeObject<AddressDto>(newValue);
            addAddressDto!.CreatedBy = currentUserId;

            var response = await repositoryManager.address.AddAddress(addAddressDto);
            if (response.KeyValue > 0)
            {
                var addAddressForSupplierRequest = JsonConvert.DeserializeObject<AddAddressForSupplierRequest>(newValue);
                addAddressForSupplierRequest!.AddressId = response.KeyValue;
                await repositoryManager.supplier.AddAddressForSupplier(addAddressForSupplierRequest, currentUserId);
            }
            return response;
        }
        private async Task<AddEntityDto<int>> HandleUpdateSupplierAddress(string newValue, short currentUserId)
        {
            var updateAddressDto = JsonConvert.DeserializeObject<AddressDto>(newValue);
            updateAddressDto!.UpdatedBy = currentUserId;

            await repositoryManager.address.UpdateAddAddress(updateAddressDto);

            var updateAddressForSupplierRequest = JsonConvert.DeserializeObject<UpdateAddressForSupplierRequest>(newValue);
            await repositoryManager.supplier.UpdateAddressForSupplier(updateAddressForSupplierRequest, currentUserId);

            return new AddEntityDto<int> { KeyValue = 1 };
        }
        private async Task<AddEntityDto<int>> HandleSupplierUpdateAchWireFinancialSetting(string newValue, short currentUserId)
        {
            AddEntityDto<int> responseData = new();
            var requestData = JsonConvert.DeserializeObject<AddEditACHWireRequest>(newValue);
            if (requestData == null)
            {
                throw new ArgumentException("Invalid request data.");
            }
            var supplierFinancialSettingsData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings, currentUserId);
            if (supplierFinancialSettingsData.KeyValue > 0)
            {
                var supplierPaymentSettingsDto = new SupplierPaymentSettingsDto
                {
                    UpdatedBy = currentUserId
                };
                responseData = await repositoryManager.supplierPaymentSettings.AddEditCreditCard(supplierPaymentSettingsDto);
            }
            var suppierBankDetailsDto = new SuppierBankDetailsDto();

            if (requestData.BeneficiaryDetails != null)
            {
                var beneficiaryDetails = requestData.BeneficiaryDetails.ToMapp<BeneficiaryDetailsRequest, SuppierBankDetailsDto>();
                beneficiaryDetails.BankAddressId = await AddEditAddress(requestData.BeneficiaryDetails, r => r.AddressId, currentUserId);
                MergeDto(suppierBankDetailsDto, beneficiaryDetails);
            }

            if (requestData.BankDetails != null)
            {
                var bankDetails = requestData.BankDetails.ToMapp<BankDetailsRequest, SuppierBankDetailsDto>();
                bankDetails.RecipientAddressId = await AddEditAddress(requestData.BankDetails, r => r.AddressId, currentUserId);
                MergeDto(suppierBankDetailsDto, bankDetails);
            }

            if (requestData.OtherDetails != null)
            {
                MergeDto(suppierBankDetailsDto, requestData.OtherDetails.ToMapp<OtherDetailsRequest, SuppierBankDetailsDto>());
            }

            suppierBankDetailsDto.SupplierId = requestData.SupplierId;
            suppierBankDetailsDto.CreatedBy = currentUserId;

            responseData = await repositoryManager.suppierBankDetails.AddEditACHWire(suppierBankDetailsDto);

            return responseData;
        }
        public async Task<AddEntityDto<int>> HandleSupplierUpdateCreditCardFinancialSetting(string newValue, short currentUserId)
        {
            AddEntityDto<int> responseData = new();
            var requestData = JsonConvert.DeserializeObject<AddEditCreditCardRequest>(newValue);
            if (requestData == null)
            {
                throw new ArgumentNullException(nameof(requestData), "The request data is null.");
            }
            var supplierAccoutingSettingDto = requestData.SupplierFinancialSettings?.ToMapp<SupplierFinancialSettingsRequest, SupplierAccoutingSettingDto>();
            if (supplierAccoutingSettingDto != null)
            {
                supplierAccoutingSettingDto.CreatedBy = currentUserId;
            }
            var supplierFinancialSettingsData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, currentUserId);

            var supplierPaymentSettingsDto = requestData.ToMapp<AddEditCreditCardRequest, SupplierPaymentSettingsDto>();
            if (supplierPaymentSettingsDto != null)
            {
                supplierPaymentSettingsDto.CreatedBy = currentUserId;
            }
            if (supplierFinancialSettingsData.KeyValue > 0)
            {
                responseData= await repositoryManager.supplierPaymentSettings.AddEditCreditCard(supplierPaymentSettingsDto!);
            }

            return responseData;
        }
        private async Task<AddEntityDto<int>> HandleSupplierUpdateCheckFinancialSetting(string newValue, short currentUserId)
        {
            AddEntityDto<int> responseData = new();
            var requestData = JsonConvert.DeserializeObject<AddEditCheckRequest>(newValue);

            var supplierFinancialSettingsData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, currentUserId);
            SupplierPaymentSettingsDto supplierPaymentSettingsDto = requestData.ToMapp<AddEditCheckRequest, SupplierPaymentSettingsDto>();
            if (requestData.MailingAddress != null)
            {
                supplierPaymentSettingsDto.CheckMailingAddressId = await AddEditAddress(requestData.MailingAddress, r => r.AddressId, currentUserId);
            }

            supplierPaymentSettingsDto.CreatedBy = currentUserId;
            responseData = await repositoryManager.supplierPaymentSettings.AddEditCheck(supplierPaymentSettingsDto);

            return responseData;
        }
        private async Task<AddEntityDto<int>> HandleSupplierUpdateOtherFinancialSetting(string newValue, short currentUserId)
        {
            var requestData = JsonConvert.DeserializeObject<AddEditOtherRequest>(newValue);

            if (requestData == null)
            {
                throw new ArgumentException("Invalid data format.");
            }
            var responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings, currentUserId);

            if (responceData.KeyValue > 0)
            {
                var supplierPaymentSettingsDto = requestData.ToMapp<AddEditOtherRequest, SupplierPaymentSettingsDto>();
                supplierPaymentSettingsDto.CreatedBy = currentUserId;

                responceData = await repositoryManager.supplierPaymentSettings.AddEditOther(supplierPaymentSettingsDto);
            }
            return responceData;
        }
        private async Task<AddEntityDto<int>> AddEditSupplierFinancialSettings(SupplierFinancialSettingsRequest requestData, short currentUserId)
        {
            SupplierAccoutingSettingDto supplierAccoutingSettingDto = requestData.ToMapp<SupplierFinancialSettingsRequest, SupplierAccoutingSettingDto>();
            supplierAccoutingSettingDto.CreatedBy = currentUserId;
            return await repositoryManager.supplierFinancialSettings.AddEditSupplierFinancialSettings(supplierAccoutingSettingDto);
        }
        private async Task<int> AddEditAddress<T>(T addressRequest, Func<T, int?> getAddressId, short currentUserId) where T : class
        {
            AddressDto addressDto = addressRequest.ToMapp<T, AddressDto>();
            AddEntityDto<int> responseData;

            if (getAddressId(addressRequest) > 0)
            {
                addressDto.UpdatedBy = currentUserId;
                responseData = await repositoryManager.address.UpdateAddAddress(addressDto);
            }
            else
            {
                addressDto.CreatedBy = currentUserId;
                responseData = await repositoryManager.address.AddAddress(addressDto);
            }

            return responseData.KeyValue;
        }
        private void MergeDto(SuppierBankDetailsDto destination, SuppierBankDetailsDto source)
        {
            foreach (var property in typeof(SuppierBankDetailsDto).GetProperties())
            {
                var value = property.GetValue(source);
                if (value != null)
                {
                    property.SetValue(destination, value);
                }
            }
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


