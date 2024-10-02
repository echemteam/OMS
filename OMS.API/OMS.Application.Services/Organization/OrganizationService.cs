using Common.Helper.EmailHelper;
using Common.Helper.Extension;
using Microsoft.Data.SqlClient;
using MongoDB.Bson;
using MongoDB.Driver;
using MySql.Data.MySqlClient;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Request.Organization;
using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.Address;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;
using System.Data;
using System.Text.Json;

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
        public async Task<AddEntityDto<int>> AddEditOrganizationProfile(AddEditOrganizationProfileRequest requestData, short CurrentUserId)
        {
            OrganizationProfileDto organizationProfileDto = requestData.ToMapp<AddEditOrganizationProfileRequest, OrganizationProfileDto>();
            organizationProfileDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organization.AddEditOrganizationProfile(organizationProfileDto);

        }
        public async Task<GetOrganizationProfileResponse> GetOrganizationProfile()
        {
            return await repositoryManager.organization.GetOrganizationProfile();
        }
        public async Task<AddEntityDto<int>> AddEditSmtpSettings(AddEditSmtpSettingsRequest requestData, short CurrentUserId)
        {
            SmtpSettingsDto smtpSettingsDto = requestData.ToMapp<AddEditSmtpSettingsRequest, SmtpSettingsDto>();
            smtpSettingsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.smtpSettings.AddEditSmtpSettings(smtpSettingsDto);

        }
        public async Task<GetSmtpSettingsResponse> GetSmtpSettings()
        {
            return await repositoryManager.smtpSettings.GetSmtpSettings();
        }

        public async Task<AddEntityDto<int>> AddEditOrganizationOtherSettings(AddEditOrganizationOtherSettingsRequest requestData, short CurrentUserId)
        {
            OrganizationOtherSettingsDto organizationOtherSettingsDto = requestData.ToMapp<AddEditOrganizationOtherSettingsRequest, OrganizationOtherSettingsDto>();
            organizationOtherSettingsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationOtherSettings.AddEditOrganizationOtherSettings(organizationOtherSettingsDto);

        }
        public async Task<GetOrganizationOtherSettingsResponse> GetOrganizationOtherSettings()
        {
            return await repositoryManager.organizationOtherSettings.GetOrganizationOtherSettings();
        }
        public async Task<AddEntityDto<int>> AddEditOrganizationContactDetails(AddEditOrganizationContactDetailsRequest requestData, short CurrentUserId)
        {
            OrganizationContactDetailsDto organizationContactDetailsDto = requestData.ToMapp<AddEditOrganizationContactDetailsRequest, OrganizationContactDetailsDto>();
            organizationContactDetailsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationContactDetails.AddEditOrganizationContactDetails(organizationContactDetailsDto);
        }
        public async Task<GetOrganizationContactDetailsResponse> GetOrganizationContactDetails()
        {
            return await repositoryManager.organizationContactDetails.GetOrganizationContactDetails();
        }
        public async Task<AddEntityDto<int>> AddEditOrganizationLogisticDetails(AddEditOrganizationLogisticDetailsRequest requestData, short CurrentUserId)
        {
            OrganizationLogisticDetailsDto organizationLogisticDetailsDto = requestData.ToMapp<AddEditOrganizationLogisticDetailsRequest, OrganizationLogisticDetailsDto>();
            organizationLogisticDetailsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationLogisticDetails.AddEditOrganizationLogisticDetails(organizationLogisticDetailsDto);
        }
        public async Task<GetOrganizationLogisticDetailsResponse> GetOrganizationLogisticDetails()
        {
            return await repositoryManager.organizationLogisticDetails.GetOrganizationLogisticDetails();
        }
        public async Task<AddEntityDto<int>> AddEditOrganizationBankDetails(AddEditOrganizationBankDetailsRequest requestData, short CurrentUserId)
        {
            OrganizationBankDetailsDto organizationBankDetailsDto = requestData.ToMapp<AddEditOrganizationBankDetailsRequest, OrganizationBankDetailsDto>();
            organizationBankDetailsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationBankDetails.AddEditOrganizationBankDetails(organizationBankDetailsDto);
        }
        public async Task<GetOrganizationBankDetailsResponse> GetOrganizationBankDetails()
        {
            return await repositoryManager.organizationBankDetails.GetOrganizationBankDetails();
        }
        public async Task<AddEntityDto<int>> AddEditOrganizationAccountingDetails(AddEditOrganizationAccountingDetailsRequest requestData, short CurrentUserId)
        {
            OrganizationAccountingDetailsDto organizationAccountingDetailsDto = requestData.ToMapp<AddEditOrganizationAccountingDetailsRequest, OrganizationAccountingDetailsDto>();
            organizationAccountingDetailsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationAccountingDetails.AddEditOrganizationAccountingDetails(organizationAccountingDetailsDto);
        }
        public async Task<GetOrganizationAccountingDetailsResponse> GetOrganizationAccountingDetails()
        {
            return await repositoryManager.organizationAccountingDetails.GetOrganizationAccountingDetails();
        }
        public async Task<AddEntityDto<int>> AddEditOrganizationShippingCharges(AddEditOrganizationShippingChargesRequest requestData, short CurrentUserId)
        {
            OrganizationShippingChargesDto organizationShippingChargesDto = requestData.ToMapp<AddEditOrganizationShippingChargesRequest, OrganizationShippingChargesDto>();
            organizationShippingChargesDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationShippingCharges.AddEditOrganizationShippingCharges(organizationShippingChargesDto);
        }
        public async Task<GetOrganizationShippingChargesResponse> GetOrganizationShippingCharges()
        {
            return await repositoryManager.organizationShippingCharges.GetOrganizationShippingCharges();
        }
        public async Task<AddEntityDto<int>> AddEditOrganizationOtherCharges(AddEditOrganizationOtherChargesRequest requestData, short CurrentUserId)
        {
            OrganizationOtherChargesDto organizationOtherChargesDto = requestData.ToMapp<AddEditOrganizationOtherChargesRequest, OrganizationOtherChargesDto>();
            organizationOtherChargesDto.CreatedBy = CurrentUserId;
            return await repositoryManager.organizationOtherCharges.AddEditOrganizationOtherCharges(organizationOtherChargesDto);
        }
        public async Task<GetOrganizationOtherChargesResponse> GetOrganizationOtherCharges()
        {
            return await repositoryManager.organizationOtherCharges.GetOrganizationOtherCharges();
        }
        public async Task<AddEntityDto<int>> AddEditBusinessAddresses(AddEditOrganizationBusinessAddressesRequest requestData, short CurrentUserId)
        {
            OrganizationBusinessAddressesDto organizationBusinessAddressDto = requestData.ToMapp<AddEditOrganizationBusinessAddressesRequest, OrganizationBusinessAddressesDto>();
            if (requestData.RegisteredAddress != null)
            {
                organizationBusinessAddressDto.RegisteredAddressId = await AddEditAddress(requestData.RegisteredAddress, CurrentUserId);
            }
            if (requestData.PhysicalAddress != null)
            {
                organizationBusinessAddressDto.PhysicalAddressId = await AddEditAddress(requestData.PhysicalAddress, CurrentUserId);
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
            var responseData = await repositoryManager.organizationBusinessAddresses.GetOrganizationBusinessAddresses();

            if (responseData != null)
            {
                if (responseData.RegisteredAddressId > 0)
                {
                    responseData.RegisteredAddress = await repositoryManager.organizationBusinessAddresses.GetAddressByAddressId(responseData.RegisteredAddressId);
                }

                if (responseData.PhysicalAddressId > 0)
                {
                    responseData.PhysicalAddress = await repositoryManager.organizationBusinessAddresses.GetAddressByAddressId(responseData.PhysicalAddressId);
                }

                if (responseData.RemitToAddressId > 0)
                {
                    responseData.RemitToAddress = await repositoryManager.organizationBusinessAddresses.GetAddressByAddressId(responseData.RemitToAddressId);
                }

                if (responseData.BillToAddressId > 0)
                {
                    responseData.BillToAddress = await repositoryManager.organizationBusinessAddresses.GetAddressByAddressId(responseData.BillToAddressId);
                }

                if (responseData.LabAddressId > 0)
                {
                    responseData.LabAddress = await repositoryManager.organizationBusinessAddresses.GetAddressByAddressId(responseData.LabAddressId);
                }

                if (responseData.WarehouseAddressId > 0)
                {
                    responseData.WarehouseAddress = await repositoryManager.organizationBusinessAddresses.GetAddressByAddressId(responseData.WarehouseAddressId);
                }
            }
            return responseData;
        }
        private async Task<int> AddEditAddress(AddEditAddressRequest addressRequest, short currentUserId)
        {
            AddressDto addressDto = addressRequest.ToMapp<AddEditAddressRequest, AddressDto>();
            AddEntityDto<int> responseData;

            if (addressRequest.AddressId > 0)
            {
                addressDto.UpdatedBy = currentUserId;
                responseData = await repositoryManager.address.UpdateAddAddress(addressDto);
            }
            else
            {
                addressDto.CreatedBy = currentUserId;
                responseData = await repositoryManager.address.AddAddress(addressDto);
            }

            return responseData.KeyValue;
        }
        public async Task<EntityList<GetOrganizationHistorysResponse>> GetOrganizationHistorys(GetOrganizationHistoryRequest requestData)
        {
            return await repositoryManager.organization.GetOrganizationHistorys(requestData);
        }

        public async Task<AddEntityDto<int>> SendTestOutboundEmails(SmtpCheckConnection requestData)
        {
            AddEntityDto<int> response = new();

            bool isSentEmail = await SendTestOutboundEmailHelper.SendEmail(requestData);

            if (isSentEmail)
            {
                response.KeyValue = 1;
                response.ErrorMessage = "SMTP Configuration Test Successful";
            }
            else
            {
                response.KeyValue = 0;
                response.ErrorMessage = "Failed to SMTP Configuration. Check your SMTP configuration.";
            }
            return response;
        }

        #endregion
    }
}
