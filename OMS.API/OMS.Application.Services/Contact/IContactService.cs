﻿using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Contact
{
    public interface IContactService
    {
        Task<AddEntityDto<int>> AddEditContact(AddEditContactRequest requestData, short CurrentUserId);
        Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerId(int customerId, string searchText, string searchContactType);
        Task<List<GetContactBySupplierIdResponse>> GetContactBySupplierId(int supplierId, string searchText, string searchContactType);
        Task<GetCustomerContactByContactIdResponse> GetCustomerContactByContactId(int contactId);
        Task<GetSupllierContactByContactIdResponse> GetSupllierContactByContactId(int contactId);
    }
}
