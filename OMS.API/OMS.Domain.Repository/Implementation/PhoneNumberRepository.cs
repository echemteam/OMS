using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class PhoneNumberRepository : BaseRepository<Contact>, IPhoneNumberRepository
    {
        #region SP Name
        const string ADDCONTACTPHONE = "AddContactPhone";
        const string DELETECONTACTPHONE = "DeleteContactPhone";
        const string UPDATECONTACTPHONE = "UpdateContactPhone";
        const string GETPHONEBYCONTACTID = "GetPhoneByContactId";
        #endregion

        public PhoneNumberRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        public async Task<AddEntityDTO<int>> AddContactPhone(PhoneDTO phone)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDCONTACTPHONE, new
            {
                phone.PhoneNumber,
                phone.PhoneCode,
                phone.ContactId,
                phone.PhoneTypeId,
                phone.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> UpdateContactPhone(PhoneDTO phone)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATECONTACTPHONE, new
            {
                phone.PhoneId,
                phone.PhoneCode,
                phone.PhoneNumber,
                phone.UpdatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> DeleteContactPhone(int phoneId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETECONTACTPHONE, new
            {
                phoneId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetPhoneByContactIdResponse>> GetPhoneByContactId(int contactId)
        {
            List<GetPhoneByContactIdResponse> getEmailByContactIdResponse = await _context.GetList<GetPhoneByContactIdResponse>(GETPHONEBYCONTACTID, new
            {
                contactId
            }, commandType: CommandType.StoredProcedure);
            return getEmailByContactIdResponse;

        }
    }
}
