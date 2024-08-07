using Common.Helper.Enum;
using Common.Helper.Export;
using Common.Helper.Extension;
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
            const string? OwnerTypeIdColumnName = "OwnerTypeId";
            const string? CreatedByColumnName = "CreatedBy";

            string[] contactTypeIds = requestData.ContactTypeId!.Split(',');

            AddEntityDto<int> responceData = new();
            foreach (var singleContactTypeId in contactTypeIds)
            {
                short contactTypeId = short.Parse(singleContactTypeId);

                requestData.ContactTypeId = singleContactTypeId;
                ContactDto contactDto = requestData.ToMapp<AddEditContactRequest, ContactDto>();
                contactDto.CreatedBy = CurrentUserId;

                responceData = await repositoryManager.contact.AddEditContact(contactDto);

                if (responceData.KeyValue > 0)
                {
                    List<AddContactEmailRequest> emailDT = requestData.EmailList!;
                    List<AddContactPhoneRequest> PhoneDT = requestData.PhoneList!;

                    int contactId = responceData.KeyValue;
                    OwnerType ownerTypeId = 0;
                    if (requestData.CustomerId > 0 && responceData.KeyValue > 0)
                    {
                        ownerTypeId = OwnerType.CustomerContact;
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
                            row[OwnerTypeIdColumnName] = ownerTypeId;
                            row[CreatedByColumnName] = CurrentUserId;

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

                if (requestData.CustomerId > 0 && responceData.KeyValue > 0)
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
            return responceData;
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
