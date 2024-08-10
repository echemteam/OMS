using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.Entity.Address;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IAddressRepository
    {
        Task<AddEntityDto<int>> AddAddress(AddressDto address);
        Task<List<GetAddresssByCustomerIdResponse>> GetAddresssByCustomerId(int customerId);
        Task<AddEntityDto<int>> UpdateAddAddress(AddressDto address);
        Task<List<GetAddresssBySupplierIdResponse>> GetAddresssBySupplierId(int supplierId);
        Task<GetCustomerAddresssByAddressIdResponse> GetCustomerAddresssByAddressId(int addressId);
        Task<GetSupplierAddresssByAddressIdResponse> GetSupplierAddresssByAddressId(int addressId);
        Task<AddEntityDto<int>> DeleteAddress(int addressId, short deletedBy);
    }
}
