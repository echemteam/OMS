using OMS.Domain.Entities.API.Response.Address;
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
        #endregion
    }
}
