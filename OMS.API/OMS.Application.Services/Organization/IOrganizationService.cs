using OMS.Domain.Entities.API.Request.Organization;
using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.Organization
{
    public interface IOrganizationService
    {
        Task<AddEntityDto<int>> AddEditOrganizationProfile(AddEditOrganizationProfileRequest requestData, short CurrentUserId);
        Task<GetOrganizationProfileResponse> GetOrganizationProfile();
        Task<AddEntityDto<int>> AddEditSmtpSettings(AddEditSmtpSettingsRequest requestData, short CurrentUserId);
        Task<GetSmtpSettingsResponse> GetSmtpSettings();
        Task<AddEntityDto<int>> AddEditOrganizationOtherSettings(AddEditOrganizationOtherSettingsRequest requestData, short CurrentUserId);
        Task<GetOrganizationOtherSettingsResponse> GetOrganizationOtherSettings();
        Task<AddEntityDto<int>> AddEditOrganizationContactDetails(AddEditOrganizationContactDetailsRequest requestData, short CurrentUserId);
        Task<GetOrganizationContactDetailsResponse> GetOrganizationContactDetails();
        Task<AddEntityDto<int>> AddEditOrganizationLogisticDetails(AddEditOrganizationLogisticDetailsRequest requestData, short CurrentUserId);
        Task<GetOrganizationLogisticDetailsResponse> GetOrganizationLogisticDetails();
        Task<AddEntityDto<int>> AddEditOrganizationBankDetails(AddEditOrganizationBankDetailsRequest requestData, short CurrentUserId);
        Task<GetOrganizationBankDetailsResponse> GetOrganizationBankDetails();
        Task<AddEntityDto<int>> AddEditOrganizationAccountingDetails(AddEditOrganizationAccountingDetailsRequest requestData, short CurrentUserId);
        Task<GetOrganizationAccountingDetailsResponse> GetOrganizationAccountingDetails();
        Task<AddEntityDto<int>> AddEditOrganizationShippingCharges(AddEditOrganizationShippingChargesRequest requestData, short CurrentUserId);
        Task<GetOrganizationShippingChargesResponse> GetOrganizationShippingCharges();
        Task<AddEntityDto<int>> AddEditOrganizationOtherCharges(AddEditOrganizationOtherChargesRequest requestData, short CurrentUserId);
        Task<GetOrganizationOtherChargesResponse> GetOrganizationOtherCharges();
        Task<AddEntityDto<int>> AddEditBusinessAddresses(AddEditOrganizationBusinessAddressesRequest requestData, short CurrentUserId);
        Task<GetOrganizationBusinessAddressesResponse> GetOrganizationBusinessAddresses();
        Task<EntityList<GetOrganizationHistorysResponse>> GetOrganizationHistorys(GetOrganizationHistoryRequest requestData);
    }
}
