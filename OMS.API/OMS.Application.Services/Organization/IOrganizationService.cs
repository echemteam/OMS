using OMS.Domain.Entities.API.Request.Organization;
using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Organization
{
    public interface IOrganizationService
    {
        Task<AddEntityDTO<int>> AddEditOrganizationProfile(AddEditOrganizationProfileRequest requestData, short CurrentUserId);
        Task<GetOrganizationProfileByOrganizationIdResponse> GetOrganizationProfileByOrganizationId(byte organizationId);
        Task<AddEntityDTO<int>> AddEditSmtpSettings(AddEditSmtpSettingsRequest requestData, short CurrentUserId);
        Task<GetSmtpSettingsBySmtpSettingIdResponse> GetSmtpSettingsBySmtpSettingId(short smtpSettingId);
        Task<AddEntityDTO<int>> AddEditOrganizationOtherSettings(AddEditOrganizationOtherSettingsRequest requestData, short CurrentUserId);
        Task<GetOrganizationOtherSettingsByIdResponse> GetOrganizationOtherSettingsById(int organizationOtherSettingId);

    }
}
