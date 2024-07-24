using OMS.Domain.Entities.API.Response.SupplierDocuements;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierDocuements;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierdocuementsRepositery
    {
        Task<AddEntityDTO<int>> AddSupplierDocuments(SupplierDocumentsDTO supplierDocuements);
        Task<List<GetSupplierDocumentsByIdResponse>> GetSupplierDocumentsById(int supplierId);
        Task<AddEntityDTO<int>> DeleteSupplierDocumentsById(int supplierDocumentId, int deletedBy);
        Task<AddEntityDTO<int>> CheckDocumentsExistOrNot(byte? documentTypeId, string? name, int? supplierId);
    }
}
