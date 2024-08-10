using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class CustomerNotesRepository : BaseRepository<CustomerNotes>, ICustomerNotesRepository
    {
        #region SP Name
        const string ADDCUSTOMERNOTES = "AddCustomerNotes";
        const string UPDATECUSTOMERNOTES = "UpdateCustomerNotes";
        const string GETCUSTOMERNOTESBYCUSTOMERID = "GetCustomerNotesByCustomerId";
        #endregion

        public CustomerNotesRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region CustomerNotes Repository
        public async Task<AddEntityDto<long>> AddCustomerNotes(CustomerNotesDto addCustomerNotes)
        {
            return await _context.GetSingleAsync<AddEntityDto<long>>(ADDCUSTOMERNOTES, new
            {
                addCustomerNotes.CustomerId,
                addCustomerNotes.Note,
                addCustomerNotes.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<long>> UpdateCustomerNotes(CustomerNotesDto updateCustomerNotes)
        {
            return await _context.GetSingleAsync<AddEntityDto<long>>(UPDATECUSTOMERNOTES, new
            {
                updateCustomerNotes.CustomerNoteId,
                updateCustomerNotes.CustomerId,
                updateCustomerNotes.Note,
                updateCustomerNotes.UpdatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<List<GetCustomerNotesByCustomerIdResponse>> GetCustomerNoteByCustomerId(int customerId)
        {
            List<GetCustomerNotesByCustomerIdResponse> getCustomerNotesByCustomerIdResponses = await _context.GetList<GetCustomerNotesByCustomerIdResponse>(GETCUSTOMERNOTESBYCUSTOMERID, new
            {
                customerId
            }, CommandType.StoredProcedure);
            return getCustomerNotesByCustomerIdResponses;
        }
        #endregion
    }
}
