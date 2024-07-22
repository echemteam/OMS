using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Organization;
using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Organization
{
    public class OrganizationService : BaseServices, IOrganizationService
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public OrganizationService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region  Organization Service
        public async Task<AddEntityDTO<int>> AddEditOrganizationProfile(AddEditOrganizationProfileRequest requestData, short CurrentUserId)
        {
            OrganizationProfileDTO organizationProfileDTO = requestData.ToMapp<AddEditOrganizationProfileRequest, OrganizationProfileDTO>();
            organizationProfileDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.organization.AddEditOrganizationProfile(organizationProfileDTO);

        }
        public async Task<GetOrganizationProfileByOrganizationIdResponse> GetOrganizationProfileByOrganizationId(byte organizationId)
        {
            return await repositoryManager.organization.GetOrganizationProfileByOrganizationId(organizationId);
        }
        public async Task<AddEntityDTO<int>> AddEditSmtpSettings(AddEditSmtpSettingsRequest requestData, short CurrentUserId)
        {
            SmtpSettingsDTO smtpSettingsDTO = requestData.ToMapp<AddEditSmtpSettingsRequest, SmtpSettingsDTO>();
            smtpSettingsDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.smtpSettings.AddEditSmtpSettings(smtpSettingsDTO);

        }
        public async Task<GetSmtpSettingsBySmtpSettingIdResponse> GetSmtpSettingsBySmtpSettingId(short smtpSettingId)
        {
            return await repositoryManager.smtpSettings.GetSmtpSettingsBySmtpSettingId(smtpSettingId);
        }

        public async Task<AddEntityDTO<int>> AddEditOrganizationOtherSettings(AddEditOrganizationOtherSettingsRequest requestData, short CurrentUserId)
        {
            OrganizationOtherSettingsDTO organizationOtherSettingsDTO = requestData.ToMapp<AddEditOrganizationOtherSettingsRequest, OrganizationOtherSettingsDTO>();
            organizationOtherSettingsDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationOtherSettings.AddEditOrganizationOtherSettings(organizationOtherSettingsDTO);

        }
        public async Task<GetOrganizationOtherSettingsByIdResponse> GetOrganizationOtherSettingsById(int organizationOtherSettingId)
        {
            return await repositoryManager.organizationOtherSettings.GetOrganizationOtherSettingsById(organizationOtherSettingId);
        }
        #endregion
    }
}
