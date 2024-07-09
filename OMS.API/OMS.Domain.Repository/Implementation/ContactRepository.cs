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
        const string GETCONTACTBYSUPPLIERID = "GetContactBySupplierId";
        const string ADDEDITCONTACTWITHDATATABLE = "AddEditContactWithDataTable";
        const string GETCUSTOMERCONTACTBYCONTACTID = "GetCustomerContactByContactId";
        const string GETSUPLLIERCONTACTBYCONTACTID = "GetSupllierContactByContactId";

        #endregion

        public ContactRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Contact Repository
        public async Task<AddEntityDTO<int>> AddEditContact(ContactDTO contact)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITCONTACT, new
            {
                contact.ContactId,
                contact.CustomerContactId,
                contact.CustomerId,
                contact.ContactTypeId,
                contact.FirstName,
                contact.LastName,
                contact.IsPrimary,
                contact.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<GetCustomerContactByContactIdResponse> GetCustomerContactByContactId(int contactId)
        {
            GetCustomerContactByContactIdResponse getCustomerContactByCustomerIdResponse = await _context.GetFrist<GetCustomerContactByContactIdResponse>(GETCUSTOMERCONTACTBYCONTACTID, new
            {
                contactId
            }, commandType: CommandType.StoredProcedure);
            return getCustomerContactByCustomerIdResponse;

        }
        public async Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerId(int customerId)
        {
            List<GetContactByCustomerIdResponse> getContactByContactIdResponse = await _context.GetList<GetContactByCustomerIdResponse>(GETCONTACTBYCUSTOMERID, new
            {
                customerId
            }, commandType: CommandType.StoredProcedure);
            return getContactByContactIdResponse;

        }

        public async Task<List<GetContactBySupplierIdResponse>> GetContactBySupplierId(int supplierId)
        {
            List<GetContactBySupplierIdResponse> getContactByContactIdResponse = await _context.GetList<GetContactBySupplierIdResponse>(GETCONTACTBYSUPPLIERID, new
            {
                supplierId
            }, commandType: CommandType.StoredProcedure);
            return getContactByContactIdResponse;

        }

        public async Task<GetSupllierContactByContactIdResponse> GetSupllierContactByContactId(int contactId)
        {
            GetSupllierContactByContactIdResponse getSupllierContactByContactIdResponse = await _context.GetFrist<GetSupllierContactByContactIdResponse>(GETSUPLLIERCONTACTBYCONTACTID, new
            {
                contactId
            }, commandType: CommandType.StoredProcedure);
            return getSupllierContactByContactIdResponse;

        }


        #endregion
    }
}
