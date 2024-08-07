using Dapper;
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
        const string ADDEDITCONTACTEMAIL = "AddEditContactEmail";
        #endregion

        public EmailAddressRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        public async Task<AddEntityDto<int>> AddContactEmail(EmailDto email)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDCONTACTEMAIL, new
            {
                email.EmailAddress,
                email.ContactId,
                email.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> UpdateContactEmail(EmailDto email)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATECONTACTEMAIL, new
            {
                email.EmailId,
                email.EmailAddress,
                email.UpdatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> DeleteContactEmail(int emailId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETECONTACTEMAIL, new
            {
                emailId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetEmailByContactIdResponse>> GetEmailByContactId(int contactId, short ownerTypeId)
        {
            List<GetEmailByContactIdResponse> getEmailByContactIdResponse = await _context.GetList<GetEmailByContactIdResponse>(GETEMAILBYCONTACTID, new
            {
                contactId,
                ownerTypeId
            }, commandType: CommandType.StoredProcedure);
            return getEmailByContactIdResponse;

        }

        public async Task<AddEntityDto<int>> AddEditContactEmail(DataTable emailList, int contactId)
        {
            var parameters = new
            {
                emailList = emailList.AsTableValuedParameter("[dbo].[EmailTypeTable]"),
                contactId
            };
            AddEntityDto<int> responceData = await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITCONTACTEMAIL,
            parameters
            , CommandType.StoredProcedure);
            return responceData;
        }
    }
}
