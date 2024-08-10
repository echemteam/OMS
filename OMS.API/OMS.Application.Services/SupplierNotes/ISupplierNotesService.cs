using OMS.Domain.Entities.API.Request.SupplierNotes;
using OMS.Domain.Entities.API.Response.SupplierNotes;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.SupplierNotes
{
    public interface ISupplierNotesService
    {
        Task<AddEntityDto<long>> AddSupplierNotes(AddSupplierNotesRequest requestData, short CurrentUserId);
        Task<List<GetSupplierNotesBySupplierIdResponse>> GetSupplierNotesBySupplierId(int supplierId);
        Task<AddEntityDto<long>> UpdateSupplierNotes(UpdateSupplierNotesRequest requestData, short CurrentUserId);
    }
}
