using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.API.Response.SupplierNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Entities.Entity.SupplierNotes;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Repository.Implementation
{
    internal class SupplierNotesRepository : BaseRepository<SupplierNotes>, ISupplierNotesRepository
    {
        #region SP Name
        const string ADDSUPPLIERNOTES = "AddSupplierNotes";
        const string GETSUPPLIERNOTESBYSUPPLIERID = "GetSupplierNotesBySupplierId";
        const string UPDATESUPPLIERNOTES = "UpdateSupplierNotes";
        #endregion
        public SupplierNotesRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        #region SupplierNotes Repository
        public async Task<AddEntityDTO<long>> AddSupplierNotes(SupplierNoteDTO addSupplierNotes)
        {
            return await _context.GetSingleAsync<AddEntityDTO<long>>(ADDSUPPLIERNOTES, new
            {
                addSupplierNotes.SupplierId,
                addSupplierNotes.Note,
                addSupplierNotes.CreatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetSupplierNotesBySupplierIdResponse>> GetSupplierNotesBySupplierId(int supplierId)
        {
            List<GetSupplierNotesBySupplierIdResponse> getSupplierNotesBySupplierIdResponse = await _context.GetList<GetSupplierNotesBySupplierIdResponse>(GETSUPPLIERNOTESBYSUPPLIERID, new
            {
                supplierId
            }, CommandType.StoredProcedure);
            return getSupplierNotesBySupplierIdResponse;
        }

        public async Task<AddEntityDTO<long>> UpdateSupplierNotes(SupplierNoteDTO supplierNotesUpdate)
        {
            return await _context.GetSingleAsync<AddEntityDTO<long>>(UPDATESUPPLIERNOTES, new
            {
                supplierNotesUpdate.SupplierNoteId,
                supplierNotesUpdate.SupplierId,
                supplierNotesUpdate.Note,
                supplierNotesUpdate.UpdatedBy,
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
