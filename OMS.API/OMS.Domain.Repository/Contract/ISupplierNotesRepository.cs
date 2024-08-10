using OMS.Domain.Entities.API.Response.SupplierNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierNotes;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierNotesRepository
    {
        Task<AddEntityDto<long>> AddSupplierNotes(SupplierNoteDto addSupplierNotes);
        Task<List<GetSupplierNotesBySupplierIdResponse>> GetSupplierNotesBySupplierId(int supplierId);
        Task<AddEntityDto<long>> UpdateSupplierNotes(SupplierNoteDto supplierNotesUpdate);
    }
}
