using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ContactRepository : BaseRepository<Contact>, IContactRepository
    {
        #region SP Name
        const string ADDCONTACT = "AddContact";
        const string GETCONTACTBYCUSTOMERIDID = "GetContactByCustomerIdId";
        const string GETEMAILBYCONTACTID = "GetEmailByContactId";
        const string GETPHONEBYCONTACTID = "GetPhoneByContactId";
        const string ADDCONTACTEMAIL = "AddContactEmail";
        const string ADDCONTACTPHONE = "AddContactPhone";
        #endregion

        public ContactRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Contact Repository
        public async Task<AddEntityDTO<int>> AddContact(ContactDTO contact)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDCONTACT, new
            {
                contact.CustomerId,
                contact.ContactTypeId,
                contact.FirstName,
                contact.LastName,
                contact.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerIdId(int customerId)
        {
            List<GetContactByCustomerIdResponse> getContactByContactIdResponse = await _context.GetList<GetContactByCustomerIdResponse>(GETCONTACTBYCUSTOMERIDID, new
            {
                customerId
            }, commandType: CommandType.StoredProcedure);
            return getContactByContactIdResponse;

        }

        public async Task<List<GetEmailByContactIdResponse>> GetEmailByContactId(int contactId)
        {
            List<GetEmailByContactIdResponse> getEmailByContactIdResponse = await _context.GetList<GetEmailByContactIdResponse>(GETEMAILBYCONTACTID, new
            {
                contactId
            }, commandType: CommandType.StoredProcedure);
            return getEmailByContactIdResponse;

        }

        public async Task<List<GetPhoneByContactIdResponse>> GetPhoneByContactId(int contactId)
        {
            List<GetPhoneByContactIdResponse> getPhoneByContactIdResponse = await _context.GetList<GetPhoneByContactIdResponse>(GETPHONEBYCONTACTID, new
            {
                contactId
            }, commandType: CommandType.StoredProcedure);
            return getPhoneByContactIdResponse;

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
        #endregion
    }
}
