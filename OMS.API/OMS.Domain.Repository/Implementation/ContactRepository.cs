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
        const string ADDEDITCONTACT = "AddEditContact";
        const string GETCONTACTBYCUSTOMERID = "GetContactByCustomerId";
        const string ADDEDITCONTACTWITHDATATABLE = "AddEditContactWithDataTable";

        #endregion

        public ContactRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Contact Repository
        public async Task<AddEntityDTO<int>> AddEditContact(ContactDTO contact)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITCONTACT, new
            {
                contact.CustomerContactId,
                contact.ContactId,
                contact.CustomerId,
                contact.ContactTypeId,
                contact.FirstName,
                contact.LastName,
                contact.IsPrimary,
                contact.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerId(int customerId)
        {
            List<GetContactByCustomerIdResponse> getContactByContactIdResponse = await _context.GetList<GetContactByCustomerIdResponse>(GETCONTACTBYCUSTOMERID, new
            {
                customerId
            }, commandType: CommandType.StoredProcedure);
            return getContactByContactIdResponse;

        }
        #endregion
    }
}
