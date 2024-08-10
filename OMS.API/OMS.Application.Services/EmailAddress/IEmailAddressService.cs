using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.EmailAddress
{
    public interface IEmailAddressService
    {
        Task<AddEntityDto<int>> AddContactEmail(AddContactEmailRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> UpdateContactEmail(UpdateContactEmailRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> DeleteContactEmail(int emailId, int deletedBy);
    }
}
