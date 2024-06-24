using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Address
{
    public interface IAddressServices
    {
        Task<AddEntityDTO<int>> AddAddress(AddAddressRequest requestData, short CurrentUserId);
        Task<List<GetAddresssByCustomerIdResponse>> GetAddresssByCustomerId(int customerId);
        Task<AddEntityDTO<int>> UpdateAddAddress(UpdateAddressRequest requestData, short CurrentUserId);
        Task<List<GetAddresssBySupplierIdResponse>> GetAddresssBySupplierId(int supplierId);
    }
}
