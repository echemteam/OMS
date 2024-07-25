using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Application.Services.SupplierAccoutingSetting;
using OMS.Domain.Entities.API.Request.Address;
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
        public async Task<AddEntityDTO<int>> AddEditACHWire(AddEditACHWireRequest requestData, short CurrentUserId)
        {
            SuppierBankDetailsDTO suppierBankDetailsDTO = new();

            var responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);
            suppierBankDetailsDTO = requestData.ToMapp<AddEditACHWireRequest, SuppierBankDetailsDTO>();
            if (requestData.BankAddress != null)
            {
                suppierBankDetailsDTO.BankAddressId = await AddEditAddress(requestData.BankAddress, CurrentUserId);
            }
            if (requestData.RecipientAddress != null)
            {
                suppierBankDetailsDTO.RecipientAddressId = await AddEditAddress(requestData.RecipientAddress, CurrentUserId);
            }
            suppierBankDetailsDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.suppierBankDetails.AddEditACHWire(suppierBankDetailsDTO);
        }
        public async Task<AddEntityDTO<int>> AddEditCreditCard(AddEditCreditCardRequest requestData, short CurrentUserId)
        {
            SupplierAccoutingSettingDTO supplierAccoutingSettingDTO = requestData.SupplierFinancialSettings!.ToMapp<SupplierFinancialSettingsRequest, SupplierAccoutingSettingDTO>();
            supplierAccoutingSettingDTO.CreatedBy = CurrentUserId;
            var responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);

            SupplierPaymentSettingsDTO supplierPaymentSettingsDTO = requestData.ToMapp<AddEditCreditCardRequest, SupplierPaymentSettingsDTO>();
            supplierPaymentSettingsDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.supplierPaymentSettings.AddEditCreditCard(supplierPaymentSettingsDTO);
        }

        public async Task<AddEntityDTO<int>> AddEditCheck(AddEditCheckRequest requestData, short CurrentUserId)
        {
            var responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);

            SupplierPaymentSettingsDTO supplierPaymentSettingsDTO = requestData.ToMapp<AddEditCheckRequest, SupplierPaymentSettingsDTO>();
            if (requestData.MailingAddress != null)
            {
                supplierPaymentSettingsDTO.CheckMailingAddressId = await AddEditAddress(requestData.MailingAddress, CurrentUserId);
            }
            supplierPaymentSettingsDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.supplierPaymentSettings.AddEditCheck(supplierPaymentSettingsDTO);
        }
        public async Task<AddEntityDTO<int>> AddEditOther(AddEditOtherRequest requestData, short CurrentUserId)
        {
            var responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);

            SupplierPaymentSettingsDTO supplierPaymentSettingsDTO = requestData.ToMapp<AddEditOtherRequest, SupplierPaymentSettingsDTO>();
            supplierPaymentSettingsDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.supplierPaymentSettings.AddEditOther(supplierPaymentSettingsDTO);
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

        private async Task<AddEntityDTO<int>> AddEditSupplierFinancialSettings(SupplierFinancialSettingsRequest requestData, short currentUserId)
        {
            SupplierAccoutingSettingDTO supplierAccoutingSettingDTO = requestData.ToMapp<SupplierFinancialSettingsRequest, SupplierAccoutingSettingDTO>();
            supplierAccoutingSettingDTO.CreatedBy = currentUserId;
            return await repositoryManager.supplierFinancialSettings.AddEditSupplierFinancialSettings(supplierAccoutingSettingDTO);
        }

        public Task<GetSupplierFinancialSettingsBySupplierIdResponse> GetSupplierFinancialSettingsBySupplierId(int supplierId)
        {
            return repositoryManager.supplierFinancialSettings.GetSupplierFinancialSettingsBySupplierId(supplierId);
        }
        public async Task<GetACHWireBySupplierIdResponse> GetACHWireBySupplierId(int supplierId)
        {
            var responseData = await repositoryManager.supplierPaymentSettings.GetACHWireBySupplierId(supplierId);

            if (supplierId > 0)
            {
                responseData.BankAddress = await repositoryManager.supplierPaymentSettings.GetAddressByAddressId(responseData.BankAddressId);
                responseData.RecipientAddress = await repositoryManager.supplierPaymentSettings.GetAddressByAddressId(responseData.RecipientAddressId);
            }
            return responseData;
        }
        public async Task<GetPaymentSettingsBySupplierIdResponse> GetPaymentSettingsBySupplierId(int supplierId)
        {
            var responseData = await repositoryManager.supplierPaymentSettings.GetPaymentSettingsBySupplierId(supplierId);
            if (responseData != null && supplierId > 0)
            {
                responseData.MailingAddress = await repositoryManager.supplierPaymentSettings.GetAddressByAddressId(responseData.CheckMailingAddressId);
            }
            return responseData!;
        }
        #endregion
    }
}
