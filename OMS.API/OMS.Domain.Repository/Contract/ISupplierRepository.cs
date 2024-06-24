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
        Task<AddEntityDTO<int>> AddEditSupplierBasicInformation(SupplierDTO supplier);
        Task<GetSupplierBasicInformationByIdResponse> GetSupplierBasicInformationById(int supplierId);
        Task<EntityList<GetSuppliersResponse>> GetSuppliers(GetSuppliersRequest queryRequest);
        Task<AddEntityDTO<int>> UpdateSupplierInActiveStatus(SupplierDTO supplier);
        Task<AddEntityDTO<int>> UpdateSupplierApproveStatus(SupplierDTO supplier);
        Task<AddEntityDTO<int>> AddAddressForSupplier(AddAddressForSupplierRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateAddressForSupplier(UpdateAddressForSupplierRequest requestData, short updatedBy);
        Task<AddEntityDTO<int>> UpdateSupplierStatus(SupplierDTO supplier);
    }
}
