using OMS.Domain.Entities.API.Request.Organization;
using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Organization
{
    public interface IOrganizationService
    {
        Task<AddEntityDTO<int>> AddEditOrganizationProfile(AddEditOrganizationProfileRequest requestData, short CurrentUserId);
        Task<GetOrganizationProfileResponse> GetOrganizationProfile();
        Task<AddEntityDTO<int>> AddEditSmtpSettings(AddEditSmtpSettingsRequest requestData, short CurrentUserId);
        Task<GetSmtpSettingsResponse> GetSmtpSettings();
        Task<AddEntityDTO<int>> AddEditOrganizationOtherSettings(AddEditOrganizationOtherSettingsRequest requestData, short CurrentUserId);
        Task<GetOrganizationOtherSettingsResponse> GetOrganizationOtherSettings();
        Task<AddEntityDTO<int>> AddEditOrganizationContactDetails(AddEditOrganizationContactDetailsRequest requestData, short CurrentUserId);
        Task<GetOrganizationContactDetailsResponse> GetOrganizationContactDetails();
        Task<AddEntityDTO<int>> AddEditOrganizationLogisticDetails(AddEditOrganizationLogisticDetailsRequest requestData, short CurrentUserId);
        Task<GetOrganizationLogisticDetailsResponse> GetOrganizationLogisticDetails();
        Task<AddEntityDTO<int>> AddEditOrganizationBankDetails(AddEditOrganizationBankDetailsRequest requestData, short CurrentUserId);
        Task<GetOrganizationBankDetailsResponse> GetOrganizationBankDetails();
    }
}
