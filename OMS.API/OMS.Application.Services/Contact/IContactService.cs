using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Contact
{
    public interface IContactService
    {
        Task<AddEntityDTO<int>> AddContact(AddContactRequest requestData, short CurrentUserId);
        Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerIdId(int customerId);
    }
}
