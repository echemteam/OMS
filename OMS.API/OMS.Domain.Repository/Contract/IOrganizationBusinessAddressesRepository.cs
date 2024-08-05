using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrganizationBusinessAddressesRepository
    {
        Task<AddEntityDTO<int>> AddEditBusinessAddresses(OrganizationBusinessAddressesDto requestData);
        Task<GetOrganizationBusinessAddressesResponse> GetOrganizationBusinessAddresses();
        Task<GetAddressResponse> GetAddressByAddressId(int? addressId);
    }
}
