using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using System.Data;

namespace OMS.Domain.Repository.Contract
{
    public interface IEmailAddressRepository
    {
        Task<AddEntityDTO<int>> AddContactEmail(EmailDTO email);
        Task<AddEntityDTO<int>> UpdateContactEmail(EmailDTO email);
        Task<AddEntityDTO<int>> DeleteContactEmail(int emailId, int deletedBy);
        Task<List<GetEmailByContactIdResponse>> GetEmailByContactId(int contactId);
        Task<AddEntityDTO<int>> AddEditContactEmail(DataTable emailList, int contactId);
    }
}
