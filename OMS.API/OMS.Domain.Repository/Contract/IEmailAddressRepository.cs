using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using System.Data;

namespace OMS.Domain.Repository.Contract
{
    public interface IEmailAddressRepository
    {
        Task<AddEntityDto<int>> AddContactEmail(EmailDto email);
        Task<AddEntityDto<int>> UpdateContactEmail(EmailDto email);
        Task<AddEntityDto<int>> DeleteContactEmail(int emailId, int deletedBy);
        Task<List<GetEmailByContactIdResponse>> GetEmailByContactId(int contactId, short ownerTypeId);
        Task<AddEntityDto<int>> AddEditContactEmail(DataTable emailList, int contactId);
    }
}
