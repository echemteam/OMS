using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;

namespace OMS.Domain.Repository.Contract
{
    public interface IContactRepository
    {
        Task<AddEntityDTO<int>> AddContact(ContactDTO contact);
        Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerIdId(int customerId);
    }
}
