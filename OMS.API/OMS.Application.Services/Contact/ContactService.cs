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
        public async Task<AddEntityDTO<int>> AddEditContact(AddEditContactRequest requestData, short CurrentUserId)
        {
            const string? OwnerTypeIdColumnName = "OwnerTypeId";
            const string? CreatedByColumnName = "CreatedBy";

            string[] contactTypeIds = requestData.ContactTypeId!.Split(',');

            AddEntityDTO<int> responceData = new();
            foreach (var singleContactTypeId in contactTypeIds)
            {
                short contactTypeId = short.Parse(singleContactTypeId);

                requestData.ContactTypeId = singleContactTypeId;
                ContactDTO contactDTO = requestData.ToMapp<AddEditContactRequest, ContactDTO>();
                contactDTO.CreatedBy = CurrentUserId;

                responceData = await repositoryManager.contact.AddEditContact(contactDTO);

                if (responceData.KeyValue > 0)
                {
                    List<AddContactEmailRequest> emailDT = requestData.EmailList!;
                    List<AddContactPhoneRequest> PhoneDT = requestData.PhoneList!;

                    int contactId = responceData.KeyValue;
                    OwnerType ownerTypeId = 0; ;
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
            GetCustomerContactByContactIdResponse contactDetail = await repositoryManager.contact.GetCustomerContactByContactId(contactId);
            OwnerType ownerTypeId = OwnerType.CustomerContact;

            contactDetail.EmailAddressList = await repositoryManager.emailAddress.GetEmailByContactId(contactId, (short)ownerTypeId);
            contactDetail.PhoneNumberList = await repositoryManager.phoneNumber.GetPhoneByContactId(contactId);
            return contactDetail!;
        }

        public async Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerId(int customerId, string searchText, string searchContactType)
        {
            List<GetContactByCustomerIdResponse> contactList = await repositoryManager.contact.GetContactByCustomerId(customerId, searchText, searchContactType);
            OwnerType ownerTypeId = OwnerType.CustomerContact;

            if (contactList != null && contactList.Count > 0)
            {
                foreach (var contact in contactList)
                {
                    contact.EmailAddressList = await repositoryManager.emailAddress.GetEmailByContactId(contact.ContactId, (short)ownerTypeId);
                    contact.PhoneNumberList = await repositoryManager.phoneNumber.GetPhoneByContactId(contact.ContactId);
                }
            }
            return contactList!;
        }

        public async Task<List<GetContactBySupplierIdResponse>> GetContactBySupplierId(int supplierId, string searchText, string searchContactType)
        {
            List<GetContactBySupplierIdResponse> contactList = await repositoryManager.contact.GetContactBySupplierId(supplierId, searchText, searchContactType);
            OwnerType ownerTypeId = OwnerType.SupplierContact;

            if (contactList != null && contactList.Count > 0)
            {
                foreach (var contact in contactList)
                {
                    contact.EmailAddressList = await repositoryManager.emailAddress.GetEmailByContactId(contact.ContactId, (short)ownerTypeId);
                    contact.PhoneNumberList = await repositoryManager.phoneNumber.GetPhoneByContactId(contact.ContactId);
                }
            }
            return contactList!;
        }

        public async Task<GetSupllierContactByContactIdResponse> GetSupllierContactByContactId(int contactId)
        {
            GetSupllierContactByContactIdResponse contactDetail = await repositoryManager.contact.GetSupllierContactByContactId(contactId);
            OwnerType ownerTypeId = OwnerType.SupplierContact;

            contactDetail.EmailAddressList = await repositoryManager.emailAddress.GetEmailByContactId(contactId, (short)ownerTypeId);
            contactDetail.PhoneNumberList = await repositoryManager.phoneNumber.GetPhoneByContactId(contactId);
            return contactDetail!;
        }

        #endregion

    }
}
