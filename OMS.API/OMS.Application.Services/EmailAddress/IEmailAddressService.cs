using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.EmailAddress
{
    public interface IEmailAddressService
    {
        Task<AddEntityDTO<int>> AddContactEmail(AddContactEmailRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateContactEmail(UpdateContactEmailRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> DeleteContactEmail(int emailId, int deletedBy);
        Task<List<GetEmailByContactIdResponse>> GetEmailByContactId(int contactId);
    }
}
