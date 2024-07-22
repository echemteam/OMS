using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrganizationOtherSettingsRepository
    {
        Task<AddEntityDTO<int>> AddEditOrganizationOtherSettings(OrganizationOtherSettingsDTO requestData);
        Task<GetOrganizationOtherSettingsByIdResponse> GetOrganizationOtherSettingsById(int organizationOtherSettingId);

    }
}
