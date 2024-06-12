using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class EmailAddressRepository : BaseRepository<EmailAddres>, IEmailAddressRepository
    {
        #region SP Name
        const string ADDCONTACTEMAIL = "AddContactEmail";
        const string UPDATECONTACTEMAIL = "UpdateContactEmail";
        const string GETEMAILBYCONTACTID = "GetEmailByContactId";
        const string DELETECONTACTEMAIL = "DeleteContactEmail";
        #endregion

        public EmailAddressRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        public async Task<AddEntityDTO<int>> AddContactEmail(EmailDTO email)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDCONTACTEMAIL, new
            {
                email.EmailAddress,
                email.ContactId,
                email.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> UpdateContactEmail(EmailDTO email)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATECONTACTEMAIL, new
            {
                email.EmailId,
                email.EmailAddress,
                email.UpdatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> DeleteContactEmail(int emailId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETECONTACTEMAIL, new
            {
                emailId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetEmailByContactIdResponse>> GetEmailByContactId(int contactId)
        {
            List<GetEmailByContactIdResponse> getEmailByContactIdResponse = await _context.GetList<GetEmailByContactIdResponse>(GETEMAILBYCONTACTID, new
            {
                contactId
            }, commandType: CommandType.StoredProcedure);
            return getEmailByContactIdResponse;

        }
    }
}
