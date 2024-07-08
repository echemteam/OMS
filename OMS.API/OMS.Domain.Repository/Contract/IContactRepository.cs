﻿using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;

namespace OMS.Domain.Repository.Contract
{
    public interface IContactRepository
    {
        Task<AddEntityDTO<int>> AddEditContact(ContactDTO contact);
        Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerId(int customerId);
        Task<List<GetContactBySupplierIdResponse>> GetContactBySupplierId(int supplierId);
        Task<GetCustomerContactByContactIdResponse> GetCustomerContactByContactId(int contactId);
        Task<GetSupllierContactByContactIdResponse> GetSupllierContactByContactId(int contactId);
    }
}
