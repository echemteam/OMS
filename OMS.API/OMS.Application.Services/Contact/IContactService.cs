using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Contact
{
    public interface IContactService
    {
        Task<AddEntityDTO<int>> AddEditContact(AddEditContactRequest requestData, short CurrentUserId);
        Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerIdId(int customerId);
        Task<AddEntityDTO<int>> AddContactEmail(AddContactEmailRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> AddContactPhone(AddContactPhoneRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateContactEmail(UpdateContactEmailRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateContactPhone(UpdateContactPhoneRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> DeleteContactEmail(int emailId, int deletedBy);
        Task<AddEntityDTO<int>> DeleteContactPhone(int phoneId, int deletedBy);
    }
}
