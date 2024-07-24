﻿using Common.Helper.Extension;
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
        public async Task<GetOrganizationProfileResponse> GetOrganizationProfile()
        {
            return await repositoryManager.organization.GetOrganizationProfile();
        }
        public async Task<AddEntityDTO<int>> AddEditSmtpSettings(AddEditSmtpSettingsRequest requestData, short CurrentUserId)
        {
            SmtpSettingsDTO smtpSettingsDTO = requestData.ToMapp<AddEditSmtpSettingsRequest, SmtpSettingsDTO>();
            smtpSettingsDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.smtpSettings.AddEditSmtpSettings(smtpSettingsDTO);

        }
        public async Task<GetSmtpSettingsResponse> GetSmtpSettings()
        {
            return await repositoryManager.smtpSettings.GetSmtpSettings();
        }

        public async Task<AddEntityDTO<int>> AddEditOrganizationOtherSettings(AddEditOrganizationOtherSettingsRequest requestData, short CurrentUserId)
        {
            OrganizationOtherSettingsDTO organizationOtherSettingsDTO = requestData.ToMapp<AddEditOrganizationOtherSettingsRequest, OrganizationOtherSettingsDTO>();
            organizationOtherSettingsDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationOtherSettings.AddEditOrganizationOtherSettings(organizationOtherSettingsDTO);

        }
        public async Task<GetOrganizationOtherSettingsResponse> GetOrganizationOtherSettings()
        {
            return await repositoryManager.organizationOtherSettings.GetOrganizationOtherSettings();
        }
        #endregion
    }
}