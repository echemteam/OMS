using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrganizationShippingChargesRepository
    {
        Task<AddEntityDto<int>> AddEditOrganizationShippingCharges(OrganizationShippingChargesDto requestData);
        Task<GetOrganizationShippingChargesResponse> GetOrganizationShippingCharges();
    }
}
