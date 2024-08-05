using OMS.Domain.Entities.API.Response.SupplierNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierNotes;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierNotesRepository
    {
        Task<AddEntityDTO<long>> AddSupplierNotes(SupplierNoteDTO addSupplierNotes);
        Task<List<GetSupplierNotesBySupplierIdResponse>> GetSupplierNotesBySupplierId(int supplierId);
        Task<AddEntityDTO<long>> UpdateSupplierNotes(SupplierNoteDTO supplierNotesUpdate);
    }
}
