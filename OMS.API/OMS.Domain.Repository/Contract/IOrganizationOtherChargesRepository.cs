using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrganizationOtherChargesRepository
    {
        Task<AddEntityDto<int>> AddEditOrganizationOtherCharges(OrganizationOtherChargesDto requestData);
        Task<GetOrganizationOtherChargesResponse> GetOrganizationOtherCharges();
    }
}
