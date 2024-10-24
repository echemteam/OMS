﻿using Common.Helper.Extension;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
            AddEntityDto<int> responceData = new();
            SuppierBankDetailsDto suppierBankDetailsDto = new();
            //var supplierId = Convert.ToInt32(requestData.SupplierId);
            //var supplierData = await repositoryManager.supplier.GetSupplierBasicInformationById(supplierId);
            //var existingSupplierFinancialSettingsData = await repositoryManager.supplierFinancialSettings.GetSupplierFinancialSettingsBySupplierId(supplierId);
            //var existingData = await repositoryManager.supplierPaymentSettings.GetACHWireBySupplierId(supplierId);

            //if (supplierData.StatusId == (short)Status.Approved && existingSupplierFinancialSettingsData != null && existingSupplierFinancialSettingsData.SupplierAccountingSettingId > 0 && existingData.SupplierBankDetailsId > 0)
            //{

            //    if (existingData != null && supplierId > 0 && existingData.BankAddressId > 0 && existingData.RecipientAddressId > 0)
            //    {
            //        existingData.BankAddress = await repositoryManager.supplierPaymentSettings.GetAddressByAddressId(existingData.BankAddressId);
            //        existingData.RecipientAddress = await repositoryManager.supplierPaymentSettings.GetAddressByAddressId(existingData.RecipientAddressId);
            //    }
            //    var approvalEventName = new[]
            //    {
            //       ApprovalEvent.UpdateSupplierFinancialSetting
            //    };

            //    var approvalRules = await repositoryManager.approval.GetApprovalConfiguration();
            //    var matchingRule = approvalRules?.FirstOrDefault(rule => approvalEventName.Contains(rule.EventName));

            //    if (matchingRule != null)
            //    {
            //        var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(matchingRule.FunctionalityEventId);
            //        ApprovalRequestsDto approvalResponceData = await ApprovalRuleHelper.ProcessApprovalRequest(
            //            null,
            //            requestData,
            //            CurrentUserId,
            //            formatTemplate,
            //            matchingRule
            //        );
            //        responceData = await repositoryManager.approval.AddApprovalRequests(approvalResponceData);
            //    }

            //}
            //else
            //{
            var rData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);
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
            suppierBankDetailsDto.SupplierId = requestData.SupplierId;
            suppierBankDetailsDto.CreatedBy = CurrentUserId;
            responceData = await repositoryManager.suppierBankDetails.AddEditACHWire(suppierBankDetailsDto);
            //}
            return responceData;
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
            AddEntityDto<int> responceData = new();
            //var supplierId = Convert.ToInt32(requestData.SupplierId);
            //var supplierData = await repositoryManager.supplier.GetSupplierBasicInformationById(supplierId);
            //var existingData = await repositoryManager.supplierPaymentSettings.GetPaymentSettingsBySupplierId(supplierId);
            //var existingSupplierFinancialSettingsData = repositoryManager.supplierFinancialSettings.GetSupplierFinancialSettingsBySupplierId(supplierId);

            //if (supplierData.StatusId == (short)Status.Approved && existingData.SupplierPaymentSettingId > 0)
            //{
            //    if (existingData != null && supplierId > 0 && existingData.CheckMailingAddressId > 0 && existingData.CheckMailingAddressId > 0)
            //    {
            //        existingData.MailingAddress = await repositoryManager.supplierPaymentSettings.GetAddressByAddressId(existingData.CheckMailingAddressId);
            //    }

            //    var approvalEventName = new[]
            //    {
            //        ApprovalEvent.UpdateSupplierFinancialSetting
            //    };

            //    var approvalRules = await repositoryManager.approval.GetApprovalConfiguration();
            //    var matchingRule = approvalRules?.FirstOrDefault(rule => approvalEventName.Contains(rule.EventName));

            //    if (matchingRule != null)
            //    {
            //        var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(matchingRule.FunctionalityEventId);
            //        ApprovalRequestsDto approvalResponceData = await ApprovalRuleHelper.ProcessApprovalRequest(
            //            null,
            //            requestData,
            //            CurrentUserId,
            //            formatTemplate,
            //            matchingRule
            //        );
            //        responceData = await repositoryManager.approval.AddApprovalRequests(approvalResponceData);
            //    }
            //}
            //else
            //{
            SupplierAccoutingSettingDto supplierAccoutingSettingDto = requestData.SupplierFinancialSettings!.ToMapp<SupplierFinancialSettingsRequest, SupplierAccoutingSettingDto>();
            supplierAccoutingSettingDto.CreatedBy = CurrentUserId;
            responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);

            SupplierPaymentSettingsDto supplierPaymentSettingsDto = requestData.ToMapp<AddEditCreditCardRequest, SupplierPaymentSettingsDto>();
            supplierPaymentSettingsDto.CreatedBy = CurrentUserId;
            responceData = await repositoryManager.supplierPaymentSettings.AddEditCreditCard(supplierPaymentSettingsDto);
            //}
            return responceData;
        }

        public async Task<AddEntityDto<int>> AddEditCheck(AddEditCheckRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responceData = new();
            //var supplierId = Convert.ToInt32(requestData.SupplierId);
            //var supplierData = await repositoryManager.supplier.GetSupplierBasicInformationById(supplierId);
            //var existingSupplierFinancialSettingsData = repositoryManager.supplierFinancialSettings.GetSupplierFinancialSettingsBySupplierId(supplierId);
            //var existingData = await repositoryManager.supplierPaymentSettings.GetPaymentSettingsBySupplierId(supplierId);

            //if (supplierData.StatusId == (short)Status.Approved && existingData?.SupplierPaymentSettingId > 0 && existingData !=null && existingSupplierFinancialSettingsData !=null)
            //{
            //    if (existingData != null && supplierId > 0 && existingData.CheckMailingAddressId > 0 && existingData.CheckMailingAddressId > 0)
            //    {
            //        existingData.MailingAddress = await repositoryManager.supplierPaymentSettings.GetAddressByAddressId(existingData.CheckMailingAddressId);
            //    }

            //    var approvalEventName = new[]
            //    {
            //        ApprovalEvent.UpdateSupplierFinancialSetting
            //    };

            //    var approvalRules = await repositoryManager.approval.GetApprovalConfiguration();
            //    var matchingRule = approvalRules?.FirstOrDefault(rule => approvalEventName.Contains(rule.EventName));

            //    if (matchingRule != null)
            //    {
            //        var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(matchingRule.FunctionalityEventId);
            //        ApprovalRequestsDto approvalResponceData = await ApprovalRuleHelper.ProcessApprovalRequest(
            //            null,
            //            requestData,
            //            CurrentUserId,
            //            formatTemplate,
            //            matchingRule
            //        );
            //        responceData = await repositoryManager.approval.AddApprovalRequests(approvalResponceData);
            //    }
            //}
            //else
            //{
            responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);

            SupplierPaymentSettingsDto supplierPaymentSettingsDto = requestData.ToMapp<AddEditCheckRequest, SupplierPaymentSettingsDto>();
            if (requestData.MailingAddress != null)
            {
                supplierPaymentSettingsDto.CheckMailingAddressId = await AddEditAddress(requestData.MailingAddress, r => r.AddressId, CurrentUserId);
            }
            supplierPaymentSettingsDto.CreatedBy = CurrentUserId;
            responceData = await repositoryManager.supplierPaymentSettings.AddEditCheck(supplierPaymentSettingsDto);
            //}
            return responceData;
        }
        public async Task<AddEntityDto<int>> AddEditOther(AddEditOtherRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responceData = new();
            //var supplierId = Convert.ToInt32(requestData.SupplierId);
            //var supplierData = await repositoryManager.supplier.GetSupplierBasicInformationById(supplierId);
            //var existingData = await repositoryManager.supplierPaymentSettings.GetPaymentSettingsBySupplierId(supplierId);
            //if (supplierData.StatusId == (short)Status.Approved && existingData?.SupplierPaymentSettingId > 0 && existingData != null && existingData != null)
            //{
            //    if (existingData != null && supplierId > 0 && existingData.CheckMailingAddressId > 0 && existingData.CheckMailingAddressId > 0)
            //    {
            //        existingData.MailingAddress = await repositoryManager.supplierPaymentSettings.GetAddressByAddressId(existingData.CheckMailingAddressId);
            //    }

            //    var approvalEventName = new[]
            //    {
            //        ApprovalEvent.UpdateSupplierFinancialSetting
            //    };

            //    var approvalRules = await repositoryManager.approval.GetApprovalConfiguration();
            //    var matchingRule = approvalRules?.FirstOrDefault(rule => approvalEventName.Contains(rule.EventName));

            //    if (matchingRule != null)
            //    {
            //        var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(matchingRule.FunctionalityEventId);
            //        ApprovalRequestsDto approvalResponceData = await ApprovalRuleHelper.ProcessApprovalRequest(
            //            null,
            //            requestData,
            //            CurrentUserId,
            //            formatTemplate,
            //            matchingRule
            //        );
            //        responceData = await repositoryManager.approval.AddApprovalRequests(approvalResponceData);
            //    }
            //}
            //else
            //{
            responceData = await AddEditSupplierFinancialSettings(requestData.SupplierFinancialSettings!, CurrentUserId);

            SupplierPaymentSettingsDto supplierPaymentSettingsDto = requestData.ToMapp<AddEditOtherRequest, SupplierPaymentSettingsDto>();
            supplierPaymentSettingsDto.CreatedBy = CurrentUserId;
            responceData = await repositoryManager.supplierPaymentSettings.AddEditOther(supplierPaymentSettingsDto);
            //}
            return responceData;
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

        public async Task<AddEditACHWireResponse> ModifyAllJsonData(AddEditACHWireRequest requestData)
        {
            // Modify the JSON data using your existing ModifyJsonData method
            var jsonData = await ModifyJsonData(requestData.SupplierFinancialSettings!);
            var supplierFinancialSettingsResponse = JsonConvert.DeserializeObject<SupplierFinancialSettingsResponse>(jsonData);

            var jsonBeneficiaryDetailsData = await ModifyJsonData(requestData.BeneficiaryDetails!);
            var beneficiaryDetailsResponse = JsonConvert.DeserializeObject<BeneficiaryDetailsDataResponse>(jsonBeneficiaryDetailsData);

            var bankDetailsJsonData = await ModifyJsonData(requestData.BankDetails!);
            var bankDetailsResponse = JsonConvert.DeserializeObject<BankDetailsDataResponse>(bankDetailsJsonData);

            var otherDetailsJsonData = await ModifyJsonData(requestData.OtherDetails!);
            var otherDetailsResponse = JsonConvert.DeserializeObject<OtherDetailsResponce>(otherDetailsJsonData);


            // Create a new response object
            var response = new AddEditACHWireResponse
            {
                SupplierFinancialSettings = supplierFinancialSettingsResponse!,
                BeneficiaryDetails = beneficiaryDetailsResponse!,
                BankDetails = bankDetailsResponse!,
                OtherDetails = otherDetailsResponse!,
                SupplierId = requestData.SupplierId
            };

            return response;
        }
        public async Task<AddEditCheckRequestResponse> ModifyAllCheckJsonData(AddEditCheckRequest requestData)
        {
            var jsonData = await ModifyJsonData(requestData.MailingAddress!);
            var mailingAddressResponse = JsonConvert.DeserializeObject<MailingAddressResponce>(jsonData);
            var response = new AddEditCheckRequestResponse
            {
                MailingAddress = mailingAddressResponse
            };
            return response;
        }
        public async Task<string> ModifyJsonData(object requestData)
        {
            var newJsonData = JsonConvert.SerializeObject(requestData);
            var jObject = JObject.Parse(newJsonData);

            var getAllCountriesResponse = await repositoryManager.commonRepository.GetAllCountries();
            var getAllCitiesResponse = await repositoryManager.commonRepository.GetAllCities(Convert.ToInt16((jObject["StateId"] ?? 0)));
            var getAllStatesResponse = await repositoryManager.commonRepository.GetAllStates();
            var getAllPODeliveryMethodResponse = await repositoryManager.commonRepository.GetAllPODeliveryMethod();
            var getAllPaymentTermsResponse = await repositoryManager.commonRepository.GetAllPaymentTerms();
            var getAllPaymentMethodResponse = await repositoryManager.commonRepository.GetAllPaymentMethod();

            var countryData = getAllCountriesResponse.FirstOrDefault(p => p.CountryId == (int)(jObject["CountryId"] ?? 0));
            var stateData = getAllStatesResponse.FirstOrDefault(p => p.StateId == (int)(jObject["StateId"] ?? 0));
            var cityData = getAllCitiesResponse.FirstOrDefault(p => p.CityId == (int)(jObject["CityId"] ?? 0));
            var poDeliveryMethod = getAllPODeliveryMethodResponse.FirstOrDefault(p => p.PODeliveryMethodId == (int)(jObject["PoDeliveryMethodId"] ?? 0));
            var paymentTerm = getAllPaymentTermsResponse.FirstOrDefault(p => p.PaymentTermId == (int)(jObject["PaymentTermId"] ?? 0));
            var paymentMethod = getAllPaymentMethodResponse.FirstOrDefault(p => p.PaymentMethodId == (int)(jObject["InvoiceSubmissionMethod"] ?? 0));

            if (countryData != null)
            {
                jObject["CountryName"] = countryData.Name;
            }
            if (stateData != null)
            {
                jObject["StateName"] = stateData.Name;
            }
            if (cityData != null)
            {
                jObject["CityName"] = cityData.Name;
            }
            if (poDeliveryMethod != null)
            {
                jObject["PODeliveryMethod"] = poDeliveryMethod.PODeliveryMethod;
            }
            if (paymentTerm != null)
            {
                jObject["PaymentTerm"] = paymentTerm.PaymentTerm;
            }
            if (paymentMethod != null)
            {
                jObject["PaymentMethod"] = paymentMethod.Method;
            }
            return jObject.ToString(Formatting.None);
        }

        #endregion
    }
}
