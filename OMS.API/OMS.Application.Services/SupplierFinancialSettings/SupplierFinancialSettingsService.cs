using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Application.Services.SupplierAccoutingSetting;
using OMS.Domain.Entities.API.Request.SupplierAccoutingSetting;
using OMS.Domain.Entities.API.Request.SupplierFinancialSettings;
using OMS.Domain.Entities.API.Request.supplierPaymentSettings;
using OMS.Domain.Entities.API.Response.SuppierBankDetails;
using OMS.Domain.Entities.API.Response.SupplierFinancialSettings;
using OMS.Domain.Entities.API.Response.supplierPaymentSettings;
using OMS.Domain.Entities.Entity.Address;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SuppierBankDetails;
using OMS.Domain.Entities.Entity.SupplierAccoutingSetting;
using OMS.Domain.Entities.Entity.SupplierPaymentSettings;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.SupplierFinancialSettings
{
    public class SupplierFinancialSettingsService : BaseServices, ISupplierFinancialSettingsService
    {
        #region variable
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public SupplierFinancialSettingsService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        #endregion

        #region Supplier Financial Settings Service
        public async Task<AddEntityDto<int>> AddEditACHWire(AddEditACHWireRequest requestData, short CurrentUserId)
        {
            SuppierBankDetailsDto suppierBankDetailsDto = new();
            var responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);
            if (requestData.BeneficiaryDetails != null)
            {
                var beneficiaryDetails = requestData.BeneficiaryDetails.ToMapp<BeneficiaryDetailsRequest, SuppierBankDetailsDto>();
                beneficiaryDetails.BankAddressId = await AddEditAddress(requestData.BeneficiaryDetails, r => r.AddressId, CurrentUserId);
                MergeDto(suppierBankDetailsDto, beneficiaryDetails);
            }
            if (requestData.BankDetails != null)
            {
                var bankDetails = requestData.BankDetails.ToMapp<BankDetailsRequest, SuppierBankDetailsDto>();
                bankDetails.RecipientAddressId = await AddEditAddress(requestData.BankDetails, r => r.AddressId, CurrentUserId);
                MergeDto(suppierBankDetailsDto, bankDetails);
            }
            if (requestData.OtherDetails != null)
            {
                MergeDto(suppierBankDetailsDto, requestData.OtherDetails.ToMapp<OtherDetailsRequest, SuppierBankDetailsDto>());
            }
            suppierBankDetailsDto.SupplierId=requestData.SupplierId;
            suppierBankDetailsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.suppierBankDetails.AddEditACHWire(suppierBankDetailsDto);
        }
        private void MergeDto(SuppierBankDetailsDto destination, SuppierBankDetailsDto source)
        {
            foreach (var property in typeof(SuppierBankDetailsDto).GetProperties())
            {
                var value = property.GetValue(source);
                if (value != null)
                {
                    property.SetValue(destination, value);
                }
            }
        }
        public async Task<AddEntityDto<int>> AddEditCreditCard(AddEditCreditCardRequest requestData, short CurrentUserId)
        {
            SupplierAccoutingSettingDto supplierAccoutingSettingDto = requestData.SupplierFinancialSettings!.ToMapp<SupplierFinancialSettingsRequest, SupplierAccoutingSettingDto>();
            supplierAccoutingSettingDto.CreatedBy = CurrentUserId;
            var responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);

            SupplierPaymentSettingsDto supplierPaymentSettingsDto = requestData.ToMapp<AddEditCreditCardRequest, SupplierPaymentSettingsDto>();
            supplierPaymentSettingsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.supplierPaymentSettings.AddEditCreditCard(supplierPaymentSettingsDto);
        }

        public async Task<AddEntityDto<int>> AddEditCheck(AddEditCheckRequest requestData, short CurrentUserId)
        {
            var responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);

            SupplierPaymentSettingsDto supplierPaymentSettingsDto = requestData.ToMapp<AddEditCheckRequest, SupplierPaymentSettingsDto>();
            if (requestData.MailingAddress != null)
            {
                supplierPaymentSettingsDto.CheckMailingAddressId = await AddEditAddress(requestData.MailingAddress, r => r.AddressId, CurrentUserId);
            }
            supplierPaymentSettingsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.supplierPaymentSettings.AddEditCheck(supplierPaymentSettingsDto);
        }
        public async Task<AddEntityDto<int>> AddEditOther(AddEditOtherRequest requestData, short CurrentUserId)
        {
            var responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);

            SupplierPaymentSettingsDto supplierPaymentSettingsDto = requestData.ToMapp<AddEditOtherRequest, SupplierPaymentSettingsDto>();
            supplierPaymentSettingsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.supplierPaymentSettings.AddEditOther(supplierPaymentSettingsDto);
        }

        private async Task<int> AddEditAddress<T>(T addressRequest, Func<T, int?> getAddressId, short currentUserId) where T : class
        {
            AddressDto addressDto = addressRequest.ToMapp<T, AddressDto>();
            AddEntityDto<int> responseData;

            if (getAddressId(addressRequest) > 0)
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

        private async Task<AddEntityDto<int>> AddEditSupplierFinancialSettings(SupplierFinancialSettingsRequest requestData, short currentUserId)
        {
            SupplierAccoutingSettingDto supplierAccoutingSettingDto = requestData.ToMapp<SupplierFinancialSettingsRequest, SupplierAccoutingSettingDto>();
            supplierAccoutingSettingDto.CreatedBy = currentUserId;
            return await repositoryManager.supplierFinancialSettings.AddEditSupplierFinancialSettings(supplierAccoutingSettingDto);
        }

        public Task<GetSupplierFinancialSettingsBySupplierIdResponse> GetSupplierFinancialSettingsBySupplierId(int supplierId)
        {
            return repositoryManager.supplierFinancialSettings.GetSupplierFinancialSettingsBySupplierId(supplierId);
        }
        public async Task<GetACHWireBySupplierIdResponse> GetACHWireBySupplierId(int supplierId)
        {
            var responseData = await repositoryManager.supplierPaymentSettings.GetACHWireBySupplierId(supplierId);

            if (responseData != null && supplierId > 0 && responseData.BankAddressId > 0 && responseData.RecipientAddressId > 0)
            {
                responseData.BankAddress = await repositoryManager.supplierPaymentSettings.GetAddressByAddressId(responseData.BankAddressId);
                responseData.RecipientAddress = await repositoryManager.supplierPaymentSettings.GetAddressByAddressId(responseData.RecipientAddressId);
            }
            return responseData!;
        }
        public async Task<GetPaymentSettingsBySupplierIdResponse> GetPaymentSettingsBySupplierId(int supplierId)
        {
            var responseData = await repositoryManager.supplierPaymentSettings.GetPaymentSettingsBySupplierId(supplierId);
            if (responseData != null && supplierId > 0 && responseData.CheckMailingAddressId > 0)
            {
                responseData.MailingAddress = await repositoryManager.supplierPaymentSettings.GetAddressByAddressId(responseData.CheckMailingAddressId);
            }
            return responseData!;
        }
        #endregion
    }
}
