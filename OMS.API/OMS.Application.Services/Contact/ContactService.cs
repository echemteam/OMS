﻿using Common.Helper.ApprovalRules;
using Common.Helper.Enum;
using Common.Helper.Export;
using Common.Helper.Extension;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;
using System.Data;

namespace OMS.Application.Services.Contact
{
    internal class ContactService : BaseServices, IContactService
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public ContactService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region  Contact Service
        public async Task<AddEntityDto<int>> AddEditContact(AddEditContactRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responseData = new();
            var customerId = Convert.ToInt32(requestData.CustomerId);
            var supplierId = Convert.ToInt32(requestData.SupplierId);
            var contactTypeIds = requestData.ContactTypeId!.Split(',').Select(id => id.Trim()).Distinct().ToList(); // Handle multiple contact types

            var approvedContactTypes = new HashSet<ContactType>();

            if (customerId > 0)
            {
                approvedContactTypes.Add(ContactType.InvoiceFollowUp);
                approvedContactTypes.Add(ContactType.InvoiceSubmission);
            }

            // Add contact types based on supplierId
            if (supplierId > 0)
            {
                approvedContactTypes.Add(ContactType.Primary);
                approvedContactTypes.Add(ContactType.AccountsReceivable);
            }

            var approvalRequests = new List<ApprovalRequestsDto>();
            var approvalEventNames = new HashSet<string>();

            foreach (var contactTypeId in contactTypeIds)
            {
                if (Enum.TryParse(contactTypeId, out ContactType contactType))
                {
                    bool isApprovalRequired = (customerId > 0 && (await repositoryManager.customers.GetCustomersBasicInformationById(customerId))?.StatusId == (short)Status.Approved && approvedContactTypes.Contains(contactType)) ||
                                               (supplierId > 0 && (await repositoryManager.supplier.GetSupplierBasicInformationById(supplierId))?.StatusId == (short)Status.Approved && approvedContactTypes.Contains(contactType));
                    if (isApprovalRequired)
                    {
                        string approvalEventName = null!;

                        if (customerId > 0 && requestData.ContactId == 0)
                        {
                            if (contactType == ContactType.InvoiceSubmission)
                                approvalEventName = ApprovalEvent.AddCustomerInvoiceSubmissionContact;
                            else if (contactType == ContactType.InvoiceFollowUp)
                                approvalEventName = ApprovalEvent.AddCustomerInvoiceFollowUpContact;
                        }
                        if (customerId > 0 && requestData.ContactId > 0)
                        {
                            if (contactType == ContactType.InvoiceSubmission)
                                approvalEventName = ApprovalEvent.UpdateCustomerInvoiceSubmissionContact;
                            else if (contactType == ContactType.InvoiceFollowUp)
                                approvalEventName = ApprovalEvent.UpdateCustomerInvoiceFollowUpContact;
                        }
                        if (supplierId > 0 && requestData.ContactId == 0)
                        {
                            if (contactType == ContactType.Primary)
                                approvalEventName = ApprovalEvent.AddSupplierPrimaryContact;
                            else if (contactType == ContactType.AccountsReceivable)
                                approvalEventName = ApprovalEvent.AddSupplierAccountsReceivableContact;
                        }
                        if (supplierId > 0 && requestData.ContactId > 0)
                        {
                            if (contactType == ContactType.Primary)
                                approvalEventName = ApprovalEvent.UpdateSupplierPrimaryContact;
                            else if (contactType == ContactType.AccountsReceivable)
                                approvalEventName = ApprovalEvent.UpdateSupplierAccountsReceivableContact;
                        }
                        if (approvalEventName != null && !approvalEventNames.Contains(approvalEventName))
                        {
                            approvalEventNames.Add(approvalEventName);

                            var approvalRules = await repositoryManager.approval.GetApprovalConfiguration();
                            var matchingRule = approvalRules?.FirstOrDefault(rule => rule.EventName == approvalEventName);

                            var ownerType = customerId > 0 ? OwnerType.CustomerContact : OwnerType.SupplierContact;
                            var existingContactData = requestData.ContactId > 0 ? await FetchContactDetails(Convert.ToInt32(requestData.ContactId), ownerType) : null;

                            requestData.ContactTypeId = contactTypeId;
                            var updatedJsonData = await UpdateContactData(requestData);

                            var updatedExistingJsonData = "";
                            if (existingContactData != null)
                            {
                                existingContactData.ContactTypeId ??= contactTypeId?.ToString();
                                updatedExistingJsonData = await UpdateContactData(existingContactData);
                            }

                            var processApprovalRequest = async () =>
                            {
                                if (matchingRule != null)
                                {
                                    var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(matchingRule.FunctionalityEventId);
                                    var approvalRequest = await ApprovalRuleHelper.ProcessApprovalRequest(
                                        updatedExistingJsonData,
                                        updatedJsonData,
                                        CurrentUserId,
                                        formatTemplate,
                                        matchingRule
                                    );
                                    approvalRequests.Add(approvalRequest);
                                }
                            };

                            if ((customerId > 0 || supplierId > 0) && requestData.ContactId > 0)
                            {
                                bool changesValues = ApprovalRuleHelper.CheckValuesChanged(updatedExistingJsonData, updatedJsonData);

                                if (changesValues)
                                {
                                    await processApprovalRequest();
                                }
                                else
                                {
                                    responseData.ErrorMessage = "No changes detected";
                                }
                            }
                            else
                            {
                                await processApprovalRequest();
                            }
                        }
                    }
                    else
                    {
                        requestData.ContactTypeId = contactTypeId;
                        ContactDto contactDto = requestData.ToMapp<AddEditContactRequest, ContactDto>();
                        contactDto.CreatedBy = CurrentUserId;
                        responseData = await repositoryManager.contact.AddEditContact(contactDto);

                        if (responseData.KeyValue > 0)
                        {
                            List<AddContactEmailRequest> emailDT = requestData.EmailAddressList ?? new List<AddContactEmailRequest>();
                            List<AddContactPhoneRequest> phoneDT = requestData.PhoneNumberList ?? new List<AddContactPhoneRequest>();

                            int contactId = responseData.KeyValue;
                            OwnerType ownerTypeId = requestData.CustomerId > 0 ? OwnerType.CustomerContact : OwnerType.SupplierContact;

                            if (emailDT.Any())
                            {
                                DataTable emailDataTable = ExportHelper.ListToDataTable(emailDT);
                                emailDataTable.Columns.Add("OwnerTypeId", typeof(short));
                                emailDataTable.Columns.Add("CreatedBy", typeof(short));

                                foreach (DataRow row in emailDataTable.Rows)
                                {
                                    row["OwnerTypeId"] = ownerTypeId;
                                    row["CreatedBy"] = CurrentUserId;
                                }
                                await repositoryManager.emailAddress.AddEditContactEmail(emailDataTable, contactId);
                            }

                            if (phoneDT.Any())
                            {
                                DataTable phoneDataTable = ExportHelper.ListToDataTable(phoneDT);
                                phoneDataTable.Columns.Add("OwnerTypeId", typeof(short));
                                phoneDataTable.Columns.Add("CreatedBy", typeof(short));

                                foreach (DataRow row in phoneDataTable.Rows)
                                {
                                    row["OwnerTypeId"] = ownerTypeId;
                                    row["CreatedBy"] = CurrentUserId;
                                }
                                await repositoryManager.phoneNumber.AddEditContactPhone(phoneDataTable, contactId);
                            }
                            short contactTypeIdShort = short.Parse(contactTypeId);
                            if (requestData.CustomerId > 0)
                            {
                                var addEditContactForCustomerRequest = new AddEditContactForCustomerRequest
                                {
                                    CustomerContactId = requestData.CustomerContactId,
                                    CustomerId = requestData.CustomerId,
                                    ContactId = responseData.KeyValue,
                                    ContactTypeId = contactTypeIdShort,
                                    IsPrimary = requestData.IsPrimary
                                };

                                await repositoryManager.customers.AddEditContactForCustomer(addEditContactForCustomerRequest, CurrentUserId);
                            }
                            else if (requestData.SupplierId > 0)
                            {
                                var addEditContactForSupplierRequest = new AddEditContactForSupplierRequest
                                {
                                    SupplierContactId = requestData.SupplierContactId,
                                    SupplierId = requestData.SupplierId,
                                    ContactId = responseData.KeyValue,
                                    ContactTypeId = contactTypeIdShort,
                                    IsPrimary = requestData.IsPrimary
                                };

                                await repositoryManager.supplier.AddEditContactForSupplier(addEditContactForSupplierRequest, CurrentUserId);
                            }
                        }
                    }
                }
            }
            if (approvalRequests.Count > 0)
            {
                foreach (var approvalRequest in approvalRequests)
                {
                    responseData = await repositoryManager.approval.AddApprovalRequests(approvalRequest);
                }
            }
            return responseData;
        }

        private async Task<dynamic> FetchContactDetails(int contactId, OwnerType ownerType)
        {
            dynamic contactDetail;

            if (ownerType == OwnerType.CustomerContact)
            {
                contactDetail = await repositoryManager.contact.GetCustomerContactByContactId(contactId);
            }
            else
            {
                contactDetail = await repositoryManager.contact.GetSupllierContactByContactId(contactId);
            }

            var emailTask = repositoryManager.emailAddress.GetEmailByContactId(contactId, (short)ownerType);
            var phoneTask = repositoryManager.phoneNumber.GetPhoneByContactId(contactId);

            contactDetail.EmailAddressList = await emailTask;
            contactDetail.PhoneNumberList = await phoneTask;

            return contactDetail;
        }

        public async Task<string> UpdateContactData(object requestData)
        {
            var newJObject = JObject.FromObject(requestData);
            string contactTypeIds = "";
            // Check if ContactTypeId exists in the JObject and update it if needed
            if (newJObject["ContactTypeId"] != null)
            {
                // Convert JToken to string
                contactTypeIds = newJObject["ContactTypeId"].ToString();
            }
            var getAllContactTypesResponse = await repositoryManager.commonRepository.GetAllContactTypes();
            var getAllPhoneTypesResponse = await repositoryManager.commonRepository.GetAllPhoneTypes();

            var contactTypeIdList = contactTypeIds.Split(',').Select(id => id.Trim()).ToList();
            var contactTypeDictionary = getAllContactTypesResponse.ToDictionary(
                p => p.ContactTypeId.ToString(),
                p => p.Type
            );

            if (contactTypeDictionary.Count > 0)
            {
                foreach (var contactTypeIdString in contactTypeIdList)
                {
                    if (int.TryParse(contactTypeIdString, out int contactTypeId))
                    {
                        if (contactTypeDictionary.TryGetValue(contactTypeId.ToString(), out var contactTypeName))
                        {
                            if (newJObject["ContactType"] == null)
                            {
                                newJObject["ContactType"] = contactTypeName;
                            }
                        }
                    }
                }
            }

            var phoneTypeDictionary = getAllPhoneTypesResponse.ToDictionary(
                p => p.PhoneTypeId.ToString(),
                p => p.Type
            );

            var phoneList = newJObject["PhoneList"] as JArray ?? new JArray();

            foreach (var phoneItem in phoneList)
            {
                var phoneTypeId = phoneItem["PhoneTypeId"]?.ToString();

                if (phoneTypeDictionary.TryGetValue(phoneTypeId, out var phoneTypeName))
                {
                    phoneItem["PhoneType"] = phoneTypeName;
                }
            }

            return newJObject.ToString(Formatting.None);
        }
        public async Task<string> UpdateContactPhoneTypeNames(object requestData)
        {
            var newJObject = JObject.FromObject(requestData);
            var getPhoneTypesResponse = await repositoryManager.commonRepository.GetAllPhoneTypes();

            var phoneList = newJObject["PhoneList"] as JArray ?? new JArray();

            var phoneTypeDictionary = getPhoneTypesResponse.ToDictionary(
                p => p.PhoneTypeId.ToString(),
                p => p.Type
            );
            foreach (var phoneItem in phoneList)
            {
                var phoneTypeId = phoneItem["PhoneTypeId"]?.ToString();

                if (phoneTypeDictionary.TryGetValue(phoneTypeId, out var phoneTypeName))
                {
                    phoneItem["PhoneType"] = phoneTypeName;
                }
            }

            return newJObject.ToString(Formatting.None);
        }
        public async Task<GetCustomerContactByContactIdResponse> GetCustomerContactByContactId(int contactId)
        {
            var contactDetail = await repositoryManager.contact.GetCustomerContactByContactId(contactId);
            if (contactDetail == null)
            {
                return contactDetail!;
            }
            var ownerTypeId = (short)OwnerType.CustomerContact;

            var emailTask = repositoryManager.emailAddress.GetEmailByContactId(contactId, ownerTypeId);
            var phoneTask = repositoryManager.phoneNumber.GetPhoneByContactId(contactId);

            await Task.WhenAll(emailTask, phoneTask);

            contactDetail!.EmailAddressList = await emailTask;
            contactDetail!.PhoneNumberList = await phoneTask;
            return contactDetail!;
        }

        public async Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerId(int customerId, string searchText, string searchContactType)
        {
            var contactList = await repositoryManager.contact.GetContactByCustomerId(customerId, searchText, searchContactType);
            if (contactList == null || contactList.Count == 0)
            {
                return contactList!;
            }
            var ownerTypeId = (short)OwnerType.CustomerContact;
            var tasks = contactList.Select(async contact =>
            {
                var emailTask = repositoryManager.emailAddress.GetEmailByContactId(contact.ContactId, ownerTypeId);
                var phoneTask = repositoryManager.phoneNumber.GetPhoneByContactId(contact.ContactId);

                var emailAddresses = await emailTask;
                var phoneNumbers = await phoneTask;

                contact.EmailAddressList = await emailTask;
                contact.PhoneNumberList = await phoneTask;
            });
            await Task.WhenAll(tasks);
            return contactList!;
        }


        public async Task<List<GetContactBySupplierIdResponse>> GetContactBySupplierId(int supplierId, string searchText, string searchContactType)
        {
            var contactList = await repositoryManager.contact.GetContactBySupplierId(supplierId, searchText, searchContactType);
            if (contactList == null || contactList.Count == 0)
            {
                return contactList!;
            }

            var ownerTypeId = (short)OwnerType.SupplierContact;
            var tasks = contactList.Select(async contact =>
            {
                var emailTask = repositoryManager.emailAddress.GetEmailByContactId(contact.ContactId, ownerTypeId);
                var phoneTask = repositoryManager.phoneNumber.GetPhoneByContactId(contact.ContactId);

                var emailAddresses = await emailTask;
                var phoneNumbers = await phoneTask;

                contact.EmailAddressList = emailAddresses;
                contact.PhoneNumberList = phoneNumbers;
            });

            await Task.WhenAll(tasks);

            return contactList!;
        }

        public async Task<GetSupllierContactByContactIdResponse> GetSupllierContactByContactId(int contactId)
        {
            var contactDetail = await repositoryManager.contact.GetSupllierContactByContactId(contactId);
            if (contactDetail == null)
            {
                return contactDetail!;
            }
            var ownerTypeId = (short)OwnerType.SupplierContact;

            var emailTask = repositoryManager.emailAddress.GetEmailByContactId(contactId, ownerTypeId);
            var phoneTask = repositoryManager.phoneNumber.GetPhoneByContactId(contactId);
            await Task.WhenAll(emailTask, phoneTask);

            contactDetail!.EmailAddressList = await emailTask;
            contactDetail!.PhoneNumberList = await phoneTask;
            return contactDetail!;
        }

        #endregion

    }
}
