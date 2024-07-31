using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Request.Organization;
using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.Address;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Entities.Entity.SuppierBankDetails;
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
        public async Task<AddEntityDTO<int>> AddEditOrganizationContactDetails(AddEditOrganizationContactDetailsRequest requestData, short CurrentUserId)
        {
            OrganizationContactDetailsDto organizationContactDetailsDto = requestData.ToMapp<AddEditOrganizationContactDetailsRequest, OrganizationContactDetailsDto>();
            organizationContactDetailsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationContactDetails.AddEditOrganizationContactDetails(organizationContactDetailsDto);
        }
        public async Task<GetOrganizationContactDetailsResponse> GetOrganizationContactDetails()
        {
            return await repositoryManager.organizationContactDetails.GetOrganizationContactDetails();
        }
        public async Task<AddEntityDTO<int>>AddEditOrganizationLogisticDetails(AddEditOrganizationLogisticDetailsRequest requestData, short CurrentUserId)
        {
            OrganizationLogisticDetailsDto organizationLogisticDetailsDto = requestData.ToMapp<AddEditOrganizationLogisticDetailsRequest, OrganizationLogisticDetailsDto>();
            organizationLogisticDetailsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationLogisticDetails.AddEditOrganizationLogisticDetails(organizationLogisticDetailsDto);
        }
        public async Task<GetOrganizationLogisticDetailsResponse> GetOrganizationLogisticDetails()
        {
            return await repositoryManager.organizationLogisticDetails.GetOrganizationLogisticDetails();
        }
        public async Task<AddEntityDTO<int>> AddEditOrganizationBankDetails(AddEditOrganizationBankDetailsRequest requestData, short CurrentUserId)
        {
            OrganizationBankDetailsDto organizationBankDetailsDto = requestData.ToMapp<AddEditOrganizationBankDetailsRequest, OrganizationBankDetailsDto>();
            organizationBankDetailsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationBankDetails.AddEditOrganizationBankDetails(organizationBankDetailsDto);
        }
        public async Task<GetOrganizationBankDetailsResponse> GetOrganizationBankDetails()
        {
            return await repositoryManager.organizationBankDetails.GetOrganizationBankDetails();
        }
        public async Task<AddEntityDTO<int>> AddEditOrganizationAccountingDetails(AddEditOrganizationAccountingDetailsRequest requestData, short CurrentUserId)
        {
            OrganizationAccountingDetailsDto organizationAccountingDetailsDto = requestData.ToMapp<AddEditOrganizationAccountingDetailsRequest, OrganizationAccountingDetailsDto>();
            organizationAccountingDetailsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationAccountingDetails.AddEditOrganizationAccountingDetails(organizationAccountingDetailsDto);
        }
        public async Task<GetOrganizationAccountingDetailsResponse> GetOrganizationAccountingDetails()
        {
            return await repositoryManager.organizationAccountingDetails.GetOrganizationAccountingDetails();
        }
        public async Task<AddEntityDTO<int>> AddEditOrganizationShippingCharges(AddEditOrganizationShippingChargesRequest requestData, short CurrentUserId)
        {
            OrganizationShippingChargesDto organizationShippingChargesDto = requestData.ToMapp<AddEditOrganizationShippingChargesRequest, OrganizationShippingChargesDto>();
            organizationShippingChargesDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationShippingCharges.AddEditOrganizationShippingCharges(organizationShippingChargesDto);
        }
        public async Task<GetOrganizationShippingChargesResponse> GetOrganizationShippingCharges()
        {
            return await repositoryManager.organizationShippingCharges.GetOrganizationShippingCharges();
        }
        public async Task<AddEntityDTO<int>> AddEditOrganizationOtherCharges(AddEditOrganizationOtherChargesRequest requestData, short CurrentUserId)
        {
            OrganizationOtherChargesDto organizationOtherChargesDto = requestData.ToMapp<AddEditOrganizationOtherChargesRequest, OrganizationOtherChargesDto>();
            organizationOtherChargesDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationOtherCharges.AddEditOrganizationOtherCharges(organizationOtherChargesDto);
        }
        public async Task<GetOrganizationOtherChargesResponse> GetOrganizationOtherCharges()
        {
            return await repositoryManager.organizationOtherCharges.GetOrganizationOtherCharges();
        }
        public async Task<AddEntityDTO<int>> AddEditBusinessAddresses(AddEditOrganizationBusinessAddressesRequest requestData, short CurrentUserId)
        {
            OrganizationBusinessAddressesDto organizationBusinessAddressDto = requestData.ToMapp<AddEditOrganizationBusinessAddressesRequest, OrganizationBusinessAddressesDto>();
            if (requestData.RegisteredAddress != null)
            {
                organizationBusinessAddressDto.RegisteredAddressId = await AddEditAddress(requestData.RegisteredAddress, CurrentUserId);
            }
            if (requestData.PhysicalAddress != null)
            {
                organizationBusinessAddressDto.PhysicalAddressId= await AddEditAddress(requestData.PhysicalAddress, CurrentUserId);
            }
            if (requestData.RemitToAddress != null)
            {
                organizationBusinessAddressDto.RemitToAddressId = await AddEditAddress(requestData.RemitToAddress, CurrentUserId);
            }
            if (requestData.BillToAddress != null)
            {
                organizationBusinessAddressDto.BillToAddressId = await AddEditAddress(requestData.BillToAddress, CurrentUserId);
            }
            if (requestData.LabAddress != null)
            {
                organizationBusinessAddressDto.LabAddressId = await AddEditAddress(requestData.LabAddress, CurrentUserId);
            }
            if (requestData.WarehouseAddress != null)
            {
                organizationBusinessAddressDto.WarehouseAddressId = await AddEditAddress(requestData.WarehouseAddress, CurrentUserId);
            }
            organizationBusinessAddressDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationBusinessAddresses.AddEditBusinessAddresses(organizationBusinessAddressDto);
        }
        public async Task<GetOrganizationBusinessAddressesResponse> GetOrganizationBusinessAddresses()
        {
            return await repositoryManager.organizationBusinessAddresses.GetOrganizationBusinessAddresses();
        }
        private async Task<int> AddEditAddress(AddEditAddressRequest addressRequest, short currentUserId)
        {
            AddressDTO addressDTO = addressRequest.ToMapp<AddEditAddressRequest, AddressDTO>();
            AddEntityDTO<int> responseData;

            if (addressRequest.AddressId > 0)
            {
                addressDTO.UpdatedBy = currentUserId;
                responseData = await repositoryManager.address.UpdateAddAddress(addressDTO);
            }
            else
            {
                addressDTO.CreatedBy = currentUserId;
                responseData = await repositoryManager.address.AddAddress(addressDTO);
            }

            return responseData.KeyValue;
        }
        #endregion
    }
}
