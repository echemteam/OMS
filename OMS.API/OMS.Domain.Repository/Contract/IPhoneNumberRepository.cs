using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;

namespace OMS.Domain.Repository.Contract
{
    public interface IPhoneNumberRepository
    {
        Task<AddEntityDTO<int>> AddContactPhone(PhoneDTO phone);
        Task<AddEntityDTO<int>> UpdateContactPhone(PhoneDTO phone);
        Task<AddEntityDTO<int>> DeleteContactPhone(int phoneId, int deletedBy);
        Task<List<GetPhoneByContactIdResponse>> GetPhoneByContactId(int contactId);
    }
}
