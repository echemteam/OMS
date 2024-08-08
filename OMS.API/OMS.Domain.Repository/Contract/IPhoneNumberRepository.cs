using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using System.Data;

namespace OMS.Domain.Repository.Contract
{
    public interface IPhoneNumberRepository
    {
        Task<AddEntityDto<int>> AddContactPhone(PhoneDto phone);
        Task<AddEntityDto<int>> UpdateContactPhone(PhoneDto phone);
        Task<AddEntityDto<int>> DeleteContactPhone(int phoneId, int deletedBy);
        Task<List<GetPhoneByContactIdResponse>> GetPhoneByContactId(int contactId);
        Task<AddEntityDto<int>> AddEditContactPhone(DataTable phoneList, int contactId);
    }
}
