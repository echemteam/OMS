using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.PhoneNumber
{
    public interface IPhoneNumberService
    {
        Task<AddEntityDTO<int>> AddContactPhone(AddContactPhoneRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateContactPhone(UpdateContactPhoneRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> DeleteContactPhone(int phoneId, int deletedBy);
        Task<List<GetPhoneByContactIdResponse>> GetPhoneByContactId(int contactId);
    }
}
