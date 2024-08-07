using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;

namespace OMS.Domain.Repository.Contract
{
    public interface IContactRepository
    {
        Task<AddEntityDto<int>> AddEditContact(ContactDto contact);
        Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerId(int customerId, string searchText, string searchContactType);
        Task<List<GetContactBySupplierIdResponse>> GetContactBySupplierId(int supplierId, string searchText, string searchContactType);
        Task<GetCustomerContactByContactIdResponse> GetCustomerContactByContactId(int contactId);
        Task<GetSupllierContactByContactIdResponse> GetSupllierContactByContactId(int contactId);
    }
}
