using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Contact
{
    public interface IContactService
    {
        Task<AddEntityDTO<int>> AddEditContact(AddEditContactRequest requestData, short CurrentUserId);
        Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerId(int customerId);
    }
}
