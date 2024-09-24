using OMS.Domain.Entities.API.Request.Organization;
using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrganizationRepository
    {
        Task<AddEntityDto<int>> AddEditOrganizationProfile(OrganizationProfileDto requestData);
        Task<GetOrganizationProfileResponse> GetOrganizationProfile();
        Task<EntityList<GetOrganizationHistorysResponse>> GetOrganizationHistorys(GetOrganizationHistoryRequest requestData);
    }
}
