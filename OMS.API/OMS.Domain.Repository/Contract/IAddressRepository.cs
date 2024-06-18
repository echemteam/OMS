using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.Entity.Address;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IAddressRepository
    {
        Task<AddEntityDTO<int>> AddAddress(AddressDTO address);
        Task<List<GetAddresssByCustomerIdResponse>> GetAddresssByCustomerId(int customerId);
        Task<AddEntityDTO<int>> UpdateAddAddress(AddressDTO address);
        Task<List<GetAddresssBySupplierIdResponse>> GetAddresssBySupplierId(int supplierId);
    }
}
