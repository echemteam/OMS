using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.Supplier
{
    public interface ISupplierServices
    {
        Task<AddEntityDTO<int>> AddEditSupplierBasicInformation(AddEditSupplierBasicInformationRequest requestData, short CurrentUserId);
        Task<GetSupplierBasicInformationByIdResponse> GetSupplierBasicInformationById(int supplierId);
        Task<EntityList<GetSuppliersResponse>> GetSuppliers(GetSuppliersRequest queryRequest);
        Task<AddEntityDTO<int>> UpdateSupplierInActiveStatus(UpdateSupplierInActiveStatusRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateSupplierApproveStatus(UpdateSupplierApproveStatusRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateSupplierStatus(UpdateSupplierStatusRequest requestData, short CurrentUserId);
    }
}
