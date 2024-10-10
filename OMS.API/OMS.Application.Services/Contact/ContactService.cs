using Common.Helper.Enum;
using Common.Helper.Export;
using Common.Helper.Extension;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Contact;
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

                requestData.ContactTypeId = singleContactTypeId;
                ContactDto contactDto = requestData.ToMapp<AddEditContactRequest, ContactDto>();
                contactDto.CreatedBy = CurrentUserId;

                responceData = await repositoryManager.contact.AddEditContact(contactDto);

                if (responceData.KeyValue > 0)
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

                            bool changesValues = ApprovalRuleHelper.CheckValuesChanged(updatedExistingJsonData, updatedJsonData);

                            if (changesValues)
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
                            }
                            else
                            {
                                responseData.ErrorMessage = "No changes detected";
                            }
                        }
                    }
                    else if (requestData.SupplierId > 0 && responceData.KeyValue > 0)
                    {
                        ownerTypeId = OwnerType.SupplierContact;
                    }

                    if (requestData.EmailList != null && requestData.EmailList.Count > 0)
                    {
                        DataTable emailDataTable = ExportHelper.ListToDataTable(emailDT);
                        emailDataTable.Columns.Add(OwnerTypeIdColumnName, typeof(short));
                        emailDataTable.Columns.Add(CreatedByColumnName, typeof(short));

                        foreach (DataRow row in emailDataTable.Rows)
                        {
                            List<AddContactEmailRequest> emailDT = requestData.EmailAddressList ?? new List<AddContactEmailRequest>();
                            List<AddContactPhoneRequest> phoneDT = requestData.PhoneNumberList ?? new List<AddContactPhoneRequest>();

                        }
                        _ = await repositoryManager.emailAddress.AddEditContactEmail(emailDataTable, contactId);

                    }
                    if (requestData.PhoneList != null && requestData.PhoneList.Count > 0)
                    {
                        DataTable phoneDataTable = ExportHelper.ListToDataTable(PhoneDT);
                        phoneDataTable.Columns.Add(OwnerTypeIdColumnName, typeof(short));
                        phoneDataTable.Columns.Add(CreatedByColumnName, typeof(short));

                        foreach (DataRow row in phoneDataTable.Rows)
                        {
                            row[OwnerTypeIdColumnName] = ownerTypeId;
                            row[CreatedByColumnName] = CurrentUserId;
                        }
                        _ = await repositoryManager.phoneNumber.AddEditContactPhone(phoneDataTable, contactId);
                    }
                }
            }
            if (approvalRequests.Count > 0)
            {
                foreach (var approvalRequest in approvalRequests)
                {
                    AddEditContactForCustomerRequest addEditContactForCustomerRequest = new()
                    {
                        CustomerContactId = requestData.CustomerContactId,
                        CustomerId = requestData.CustomerId,
                        ContactId = responceData.KeyValue,
                        ContactTypeId = contactTypeId,
                        IsPrimary = requestData.IsPrimary
                    };

                    _ = await repositoryManager.customers.AddEditContactForCustomer(addEditContactForCustomerRequest, CurrentUserId);
                }
                else if (requestData.SupplierId > 0)
                {
                    AddEditContactForSupplierRequest addEditContactForSupplierRequest = new()
                    {
                        SupplierContactId = requestData.SupplierContactId,
                        SupplierId = requestData.SupplierId,
                        ContactId = responceData.KeyValue,
                        ContactTypeId = contactTypeId,
                        IsPrimary = requestData.IsPrimary
                    };
                    _ = await repositoryManager.supplier.AddEditContactForSupplier(addEditContactForSupplierRequest, CurrentUserId);
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
