using Common.Helper.Enum;
using Common.Helper.Extension;
using Newtonsoft.Json;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.Entity.Address;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Address
{
    public class AddressServices : BaseServices, IAddressServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public  AddressServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Address Services
        public async Task<AddEntityDto<int>> AddAddress(AddAddressRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responseData = new();
            var customerId = Convert.ToInt32(requestData.CustomerId);
            var supplierId = Convert.ToInt32(requestData.SupplierId);
            var addressTypeIds = requestData.AddressTypeId!.Split(',').Select(id => id.Trim()).Distinct().ToList(); // Handle multiple address types

            var approvedAddressTypes = new HashSet<AddressType>
            {
                AddressType.Billing,
                AddressType.Shipping,
                AddressType.HQ,
                AddressType.Bank
            };

            var approvalRequests = new List<ApprovalRequestsDto>();
            var approvalEventNames = new HashSet<string>();

            foreach (var addressTypeId in addressTypeIds)
            {
                if (Enum.TryParse(addressTypeId, out AddressType addressType))
                {
                    bool isApprovalRequired = (customerId > 0 && (await repositoryManager.customers.GetCustomersBasicInformationById(customerId))?.StatusId == (short)Status.Approved && approvedAddressTypes.Contains(addressType)) ||
                                               (supplierId > 0 && (await repositoryManager.supplier.GetSupplierBasicInformationById(supplierId))?.StatusId == (short)Status.Approved && approvedAddressTypes.Contains(addressType));

                    if (isApprovalRequired)
                    {
                        string approvalEventName = null;

                        if (customerId > 0)
                        {
                            if (addressType == AddressType.Billing)
                                approvalEventName = ApprovalEvent.AddCustomerBillingAddress;
                            else if (addressType == AddressType.Shipping)
                                approvalEventName = ApprovalEvent.AddCustomerShippingAddress;
                        }

                        if (supplierId > 0)
                        {
                            if (addressType == AddressType.HQ)
                                approvalEventName = ApprovalEvent.AddSupplierPhysicalAddress;
                            else if (addressType == AddressType.Bank)
                                approvalEventName = ApprovalEvent.AddSupplierBankAddress;
                        }

                        if (approvalEventName != null && !approvalEventNames.Contains(approvalEventName))
                        {
                            approvalEventNames.Add(approvalEventName);
                            var updatedJsonData = await ModifyUpdateAddressJson(requestData, addressTypeId);

                            var approvalRules = await repositoryManager.approval.GetApprovalConfiguration();
                            var matchingRule = approvalRules?.FirstOrDefault(rule => rule.EventName == approvalEventName);

                            if (matchingRule != null)
                            {
                                requestData.AddressTypeId = addressTypeId;
                                var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(matchingRule.FunctionalityEventId);
                                var approvalRequest = await ApprovalRuleHelper.ProcessApprovalRequest(
                                    null,
                                    requestData,
                                    CurrentUserId,
                                    formatTemplate,
                                    matchingRule
                                );
                                approvalRequests.Add(approvalRequest);
                            }
                        }
                    }
                    else
                    {
                        requestData.AddressTypeId = addressTypeId;
                        AddressDto addressDto = requestData.ToMapp<AddAddressRequest, AddressDto>();
                        addressDto.CreatedBy = CurrentUserId;
                        responseData = await repositoryManager.address.AddAddress(addressDto);

                if (responceData.KeyValue > 0)
                {
                    await LinkSameAddress(requestData, responceData.KeyValue, CurrentUserId);
                }

                if (responceData.KeyValue > 0 && requestData.IsShippingAndBilling == true && requestData.CustomerId > 0)
                {
                    if (int.TryParse(singleAddressTypeId, out int addressTypeId))
                    {
                        switch (addressTypeId)
                        {
                            case (int)AddressType.Billing:
                                requestData.AddressTypeId = ((int)AddressType.Shipping).ToString();
                                break;

                            case (int)AddressType.Shipping:
                                requestData.AddressTypeId = ((int)AddressType.Billing).ToString();
                                break;
                        }
                    }
                    var duplicateResponseData = await repositoryManager.address.AddAddress(addressDto);
                    await LinkSameAddress(requestData, duplicateResponseData.KeyValue, CurrentUserId);
                }
            }
            return responceData;
        }

        private async Task LinkSameAddress(AddAddressRequest requestData, int addressId, short CurrentUserId)
        {
            if (requestData.CustomerId > 0)
            {
                AddAddressForCustomerRequest addAddressForCustomerRequest = new()
                {
                    CustomerId = requestData.CustomerId,
                    AddressId = addressId,
                    AddressTypeId = short.Parse(requestData.AddressTypeId!),
                    IsPreferredShipping = requestData.IsPreferredShipping,
                    IsPreferredBilling = requestData.IsPreferredBilling
                };

                _ = await repositoryManager.customers.AddAddressForCustomer(addAddressForCustomerRequest, CurrentUserId);
            }
            else if (requestData.SupplierId > 0)
            {
                AddAddressForSupplierRequest addAddressForCustomerRequest = new()
                {
                    SupplierId = requestData.SupplierId,
                    AddressId = addressId,
                    AddressTypeId = short.Parse(requestData.AddressTypeId!)
                };
                _ = await repositoryManager.supplier.AddAddressForSupplier(addAddressForCustomerRequest, CurrentUserId);
            }
        }
        public Task<List<GetAddresssByCustomerIdResponse>> GetAddresssByCustomerId(int customerId)
        {
            return repositoryManager.address.GetAddresssByCustomerId(customerId);
        }

        public Task<GetCustomerAddresssByAddressIdResponse> GetCustomerAddresssByAddressId(int addressId)
        {
            return repositoryManager.address.GetCustomerAddresssByAddressId(addressId);
        }


        public async Task<AddEntityDto<int>> UpdateAddAddress(UpdateAddressRequest requestData, short CurrentUserId)
        {
            var responseData = new AddEntityDto<int>();
            var supplierId = Convert.ToInt32(requestData.SupplierId);
            var addressId = Convert.ToInt32(requestData.AddressId);
            var existingSupplierData = await repositoryManager.supplier.GetSupplierBasicInformationById(supplierId);

            if (existingSupplierData?.StatusId == (short)Status.Approved)
            {
                var approvalEventNames = new List<string>();

                switch (requestData.AddressTypeId)
                {
                    case (short)AddressType.HQ:
                        approvalEventNames.Add(ApprovalEvent.UpdateSupplierPhysicalAddress);
                        break;
                    case (short)AddressType.Bank:
                        approvalEventNames.Add(ApprovalEvent.UpdateSupplierBankAddress);
                        break;
                }
                GetSupplierAddresssByAddressIdResponse existingSupplierAddressData = await repositoryManager.address.GetSupplierAddresssByAddressId(addressId);
                var updatedExstingJsonData = await ModifyAddAddressJson(existingSupplierAddressData);
                var updatedJsonData = await ModifyAddAddressJson(requestData);

                bool changesValues = ApprovalRuleHelper.CheckValuesChanged(updatedExstingJsonData, updatedJsonData);
                if (changesValues)
                {
                    var approvalRules = await repositoryManager.approval.GetApprovalConfiguration();
                    var matchingRule = approvalRules?.FirstOrDefault(rule => approvalEventNames.Contains(rule.EventName!));

                    if (matchingRule != null)
                    {
                        var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(matchingRule.FunctionalityEventId);
                        var approvalResponseData = await ApprovalRuleHelper.ProcessApprovalRequest(
                            updatedExstingJsonData,
                            updatedJsonData,
                            CurrentUserId,
                            formatTemplate,
                            matchingRule
                        );

                        responseData = await repositoryManager.approval.AddApprovalRequests(approvalResponseData);
                    }
                    else
                    {
                        responseData = await UpdateAddressDirectly(requestData, CurrentUserId);
                    }
                }
                else
                {
                    responseData.ErrorMessage = "No changes detected";
                }
            }
            else
            {
                responseData = await UpdateAddressDirectly(requestData, CurrentUserId);
            }

            return responseData;
        }

        public async Task<string> ModifyAddAddressJson(object requestData)
        {
            var newJsonData = JsonConvert.SerializeObject(requestData);
            var jObject = JObject.Parse(newJsonData);

            var getAllCountriesResponse = await repositoryManager.commonRepository.GetAllCountries();
            var getAllCitiesResponse = await repositoryManager.commonRepository.GetAllCities(Convert.ToInt16((jObject["StateId"] ?? 0)));
            var getAllStatesResponse = await repositoryManager.commonRepository.GetAllStates();
            var getAllAddressTypesResponse = await repositoryManager.commonRepository.GetAllAddressTypes();

            var countryData = getAllCountriesResponse.FirstOrDefault(p => p.CountryId == (int)(jObject["CountryId"] ?? 0));
            var stateData = getAllStatesResponse.FirstOrDefault(p => p.StateId == (int)(jObject["StateId"] ?? 0));
            var cityData = getAllCitiesResponse.FirstOrDefault(p => p.CityId == (int)(jObject["CityId"] ?? 0));
            var addressData = getAllAddressTypesResponse.FirstOrDefault(p => p.AddressTypeId == (int)(jObject["AddressTypeId"] ?? 0));

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
            if (addressData != null)
            {
                jObject["AddressType"] = addressData.Type;
            }
            return jObject.ToString(Formatting.None);
        }
        public async Task<string> ModifyUpdateAddressJson(object requestData, string addressTypeIds)
        {
            var newJObject = JObject.FromObject(requestData);

            var getAllCountriesResponse = await repositoryManager.commonRepository.GetAllCountries();
            var getAllCitiesResponse = await repositoryManager.commonRepository.GetAllCities(Convert.ToInt16((newJObject["StateId"] ?? 0)));
            var getAllStatesResponse = await repositoryManager.commonRepository.GetAllStates();
            var getAllAddressTypesResponse = await repositoryManager.commonRepository.GetAllAddressTypes();

            var countryDictionary = getAllCountriesResponse.ToDictionary(
                p => p.CountryId.ToString(),
                p => p.Name
            );
            var stateDictionary = getAllStatesResponse.ToDictionary(
                p => p.StateId.ToString(),
                p => p.Name
            );
            var cityDictionary = getAllCitiesResponse.ToDictionary(
                p => p.CityId.ToString(),
                p => p.Name
            );
            var addressTypeDictionary = getAllAddressTypesResponse.ToDictionary(
                p => p.AddressTypeId.ToString(),
                p => p.Type
            );


            var countryId = (newJObject["CountryId"] ?? 0).ToString();
            if (countryDictionary.TryGetValue(countryId, out var countryName))
            {
                newJObject["CountryName"] = countryName;
            }

            var stateId = (newJObject["StateId"] ?? 0).ToString();
            if (stateDictionary.TryGetValue(stateId, out var stateName))
            {
                newJObject["StateName"] = stateName;
            }

            var cityId = (newJObject["CityId"] ?? 0).ToString();
            if (cityDictionary.TryGetValue(cityId, out var cityName))
            {
                newJObject["CityName"] = cityName;
            }
            var addressType = (newJObject["AddressTypeId"] ?? 0).ToString();
            if (addressTypeDictionary.TryGetValue(addressType, out var type))
            {
                newJObject["AddressType"] = type;
            }
            return newJObject.ToString(Formatting.None);
        }
        private async Task<AddEntityDto<int>> UpdateAddressDirectly(UpdateAddressRequest requestData, short CurrentUserId)
        {
            var addressDto = requestData.ToMapp<UpdateAddressRequest, AddressDto>();
            addressDto.UpdatedBy = CurrentUserId;
            AddEntityDto<int> responceData = await repositoryManager.address.UpdateAddAddress(addressDto);

            if (requestData.CustomerId > 0 && responceData.KeyValue > 0)
            {
                UpdateAddressForCustomerRequest updateAddressForCustomerRequest = new()
                {
                    CustomerAddressId = requestData.CustomerAddressId,
                    CustomerId = requestData.CustomerId,
                    AddressId = requestData.AddressId,
                    AddressTypeId = addressDto.AddressTypeId,
                    IsPreferredShipping = requestData.IsPreferredShipping,
                    IsPreferredBilling = requestData.IsPreferredBilling
                };

                _ = await repositoryManager.customers.UpdateAddressForCustomer(updateAddressForCustomerRequest, CurrentUserId);
            }
            else if (requestData.SupplierId > 0 && responceData.KeyValue > 0)
            {
                UpdateAddressForSupplierRequest updateAddressForCustomerRequest = new()
                {
                    SupplierId = requestData.SupplierId,
                    AddressId = requestData.AddressId,
                    AddressTypeId = addressDto.AddressTypeId
                };
                _ = await repositoryManager.supplier.UpdateAddressForSupplier(updateAddressForCustomerRequest, CurrentUserId);
            }
            return responceData;
        }

        public Task<List<GetAddresssBySupplierIdResponse>> GetAddresssBySupplierId(int supplierId)
        {
            return repositoryManager.address.GetAddresssBySupplierId(supplierId);
        }

        public Task<GetSupplierAddresssByAddressIdResponse> GetSupplierAddresssByAddressId(int addressId)
        {
            return repositoryManager.address.GetSupplierAddresssByAddressId(addressId);
        }
        public async Task<AddEntityDto<int>> DeleteAddress(int addressId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.address.DeleteAddress(addressId, deletedBy);
        }
        #endregion
    }
}
