﻿using Common.Helper.Export;
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
            AddEntityDTO<int> responceData = new();
            ContactDTO contactDTO = requestData.ToMapp<AddEditContactRequest, ContactDTO>();
            contactDTO.CreatedBy = CurrentUserId;
            responceData = await repositoryManager.contact.AddEditContact(contactDTO);

            if (responceData.KeyValue > 0)
            {

                List<AddContactEmailRequest> emailDT = requestData.EmailList!;
                List<AddContactPhoneRequest> PhoneDT = requestData.PhoneList!;

                int contactId = responceData.KeyValue;

                if (requestData.EmailList != null && requestData.EmailList.Count > 0)
                {
                    DataTable emailDataTable = ExportHelper.ListToDataTable(emailDT);
                    emailDataTable.Columns.Add("CreatedBy", typeof(short));
                    foreach (DataRow row in emailDataTable.Rows)
                    {
                        row["CreatedBy"] = CurrentUserId;
                    }
                    _ = await repositoryManager.emailAddress.AddEditContactEmail(emailDataTable, contactId);

                }
                if (requestData.PhoneList != null && requestData.PhoneList.Count > 0)
                {
                    DataTable phoneDataTable = ExportHelper.ListToDataTable(PhoneDT);
                    phoneDataTable.Columns.Add("CreatedBy", typeof(short));
                    foreach (DataRow row in phoneDataTable.Rows)
                    {
                        row["CreatedBy"] = CurrentUserId;
                    }
                    _ = await repositoryManager.phoneNumber.AddEditContactPhone(phoneDataTable, contactId);
                }
            }

            if (requestData.CustomerId > 0)
            {
                AddEditContactForCustomerRequest addEditContactForCustomerRequest = new()
                {
                    CustomerContactId = requestData.CustomerContactId,
                    CustomerId = requestData.CustomerId,
                    ContactId = responceData.KeyValue,
                    ContactTypeId = requestData.ContactTypeId,
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
                    ContactTypeId = requestData.ContactTypeId,
                    IsPrimary = requestData.IsPrimary
                };
                _ = await repositoryManager.supplier.AddEditContactForSupplier(addEditContactForSupplierRequest, CurrentUserId);
            }
            return responceData;
        }

        public async Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerId(int customerId)
        {
            List<GetContactByCustomerIdResponse> contactList = await repositoryManager.contact.GetContactByCustomerId(customerId);
            if (contactList != null && contactList.Count > 0)
            {
                foreach (var contact in contactList)
                {
                    contact.EmailAddressLst = await repositoryManager.emailAddress.GetEmailByContactId(contact.ContactId);
                    contact.PhoneNumberLsit = await repositoryManager.phoneNumber.GetPhoneByContactId(contact.ContactId);
                }
            }
            return contactList!;
        }

        public async Task<List<GetContactBySupplierIdResponse>> GetContactBySupplierId(int supplierId)
        {
            List<GetContactBySupplierIdResponse> contactList = await repositoryManager.contact.GetContactBySupplierId(supplierId);
            if (contactList != null && contactList.Count > 0)
            {
                foreach (var contact in contactList)
                {
                    contact.EmailAddressLst = await repositoryManager.emailAddress.GetEmailByContactId(contact.ContactId);
                    contact.PhoneNumberLsit = await repositoryManager.phoneNumber.GetPhoneByContactId(contact.ContactId);
                }
            }
            return contactList!;
        }
        #endregion

    }
}
