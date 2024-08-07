using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Supplier;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierRepository
    {
        Task<AddEditResponse> AddEditSupplierBasicInformation(SupplierDto supplier);
        Task<GetSupplierBasicInformationByIdResponse> GetSupplierBasicInformationById(int supplierId);
        Task<EntityList<GetSuppliersResponse>> GetSuppliers(GetSuppliersRequest queryRequest);
        Task<AddEntityDto<int>> UpdateSupplierInActiveStatus(SupplierDto supplier);
        Task<AddEntityDto<int>> UpdateSupplierApproveStatus(SupplierDto supplier);
        Task<AddEntityDto<int>> AddAddressForSupplier(AddAddressForSupplierRequest requestData, short createdBy);
        Task<AddEntityDto<int>> UpdateAddressForSupplier(UpdateAddressForSupplierRequest requestData, short updatedBy);
        Task<AddEntityDto<int>> UpdateSupplierStatus(SupplierDto supplier);
        Task<AddEntityDto<int>> CheckSupplierNameExist(SupplierDto supplier);
        Task<EntityList<GetSupplierAuditHistoryBySupplierIdResponse>> GetSupplierAuditHistoryBySupplierId(GetSupplierAuditHistoryBySupplierIdRequest queryRequest);
        Task<AddEntityDto<int>> AddEditContactForSupplier(AddEditContactForSupplierRequest requestData, short createdBy);
        Task<List<GetSupplierDetailsBySupplierNameResponse>> GetSupplierDetailsBySupplierName(string supplierName);

    }
}
