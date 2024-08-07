using OMS.Domain.Entities.API.Request.SupplierDocuements;
using OMS.Domain.Entities.API.Response.SupplierDocuements;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.SupplierDocuements
{
    public interface ISupplierDocuementsService
    {
        Task<AddEntityDto<int>> AddSupplierDocuments(AddSupplierDocumentsRequest requestData, short CurrentUserId);
        Task<List<GetSupplierDocumentsByIdResponse>> GetSupplierDocumentsById(int supplierId);
        Task<AddEntityDto<int>> DeleteSupplierDocumentsById(int supplierDocumentId, int deletedBy);
    }
}
