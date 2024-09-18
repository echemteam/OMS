using Common.Helper.ApprovalRules;
using Common.Helper.Enum;
using Common.Helper.Extension;
using Newtonsoft.Json;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Request.CustomerAccountingNotes;
using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerAccountingSettings;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;
using System.Reflection;

namespace OMS.Application.Services.CustomerAccountingSettings
{
    public class CustomerAccountingSettingsService : BaseServices, ICustomerAccoutingSettingsService
    {
        #region variable
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public CustomerAccountingSettingsService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        #endregion

        #region Services
        public async Task<GetDetailsByCustomerIdResponse> GetDetailsbyCustomerID(int customerId)
        {
            return await repositoryManager.customerAccountingSettings.GetDetailsbyCustomerID(customerId);
        }
        public async Task<AddEntityDto<int>> AddEditCustomerSettings(AddEditCustomerSettingRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responceData = new();
            if (requestData.CustomerAccountingSettingId > 0)
            {
                var existingData = await repositoryManager.customerAccountingSettings.GetDetailsbyCustomerID(Convert.ToInt32(requestData.CustomerId)).ConfigureAwait(false);
                var oldJsonData = JsonConvert.SerializeObject(existingData);
                var newJsonData = JsonConvert.SerializeObject(requestData);
                var existingscustomerData = await repositoryManager.customers.GetCustomersBasicInformationById(Convert.ToInt16(requestData.CustomerId));

                if (existingscustomerData.StatusId == (short)Status.Approved)
                {
                    var oldDataDict = JsonConvert.DeserializeObject<Dictionary<string, object>>(oldJsonData);
                    var newDataDict = JsonConvert.DeserializeObject<Dictionary<string, object>>(newJsonData);

                    var approvalRules = await repositoryManager.approval.GetApprovalConfiguration();
                    var requestProperties = typeof(AddEditCustomerSettingRequest).GetProperties(BindingFlags.Public | BindingFlags.Instance);

                    foreach (var rule in approvalRules)
                    {
                        var fieldName = rule.FieldName;
                        if (string.IsNullOrEmpty(fieldName))
                        {
                            continue;
                        }
                        if (oldDataDict!.TryGetValue(fieldName, out var oldValue) &&
                            newDataDict!.TryGetValue(fieldName, out var newValue))
                        {
                            bool valuesChanged = (oldValue == null && newValue != null) ||
                                                 (oldValue != null && !oldValue.Equals(newValue));

                            if (valuesChanged)
                            {
                                var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(rule.FunctionalityEventId);
                                var approvalResponseData = await ApprovalRuleHelper.ProcessApprovalRequest(
                                    oldJsonData,
                                    newJsonData,
                                    CurrentUserId,
                                    formatTemplate,
                                    rule
                                );
                                responceData = await repositoryManager.approval.AddApprovalRequests(approvalResponseData);
                                if (responceData.KeyValue > 0)
                                {
                                    if (oldDataDict!.TryGetValue(fieldName, out var updatedValue) && valuesChanged)
                                    {
                                        var propertyInfo = requestData.GetType().GetProperty(fieldName);
                                        if (propertyInfo != null && updatedValue != null)
                                        {
                                            Type targetType = propertyInfo.PropertyType;
                                            if (targetType.IsGenericType && targetType.GetGenericTypeDefinition() == typeof(Nullable<>))
                                            {
                                                targetType = Nullable.GetUnderlyingType(targetType);
                                            }
                                            var convertedValue = Convert.ChangeType(updatedValue, targetType);
                                            propertyInfo.SetValue(requestData, convertedValue);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                CustomerAccountingSettingsDto customerAccountingSettingsDto = requestData.ToMapp<AddEditCustomerSettingRequest, CustomerAccountingSettingsDto>();
                customerAccountingSettingsDto.CreatedBy = CurrentUserId;
                responceData = await repositoryManager.customerAccountingSettings.AddEditCustomerSettings(customerAccountingSettingsDto);

                if (requestData.CustomerAccountingSettingId == null)
                {
                    CustomerShppingDeliveryCarriersDto customerShppingDeliveryCarriersDto = new()
                    {
                        CustomerId = requestData.CustomerId,
                        CreatedBy = CurrentUserId,
                        DeliveryAccountId = (int)DeliveryAccount.OurAccount,
                        IsByDefault = true
                    };

                    _ = await repositoryManager.customerAccountingSettings.AddCustomerShppingDeliveryCarriersAndDeliveryMethods(customerShppingDeliveryCarriersDto);
                }

            }
            return responceData;

        }

        public async Task<AddEntityDto<int>> AddEditCustomerInvoice(AddEditCustomerInvoiceRequest requestData, short CurrentUserId)
        {
            CustomerAccountingSettingsDto customerAccountingSettingsDto = requestData.ToMapp<AddEditCustomerInvoiceRequest, CustomerAccountingSettingsDto>();
            customerAccountingSettingsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.AddEditCustomerInvoice(customerAccountingSettingsDto);
        }

        public async Task<AddEntityDto<int>> AddCustomerShppingDeliveryCarriersAndDeliveryMethods(AddCustomerShppingDeliveryCarriersAndDeliveryMethodsRequest requestData, short CurrentUserId)
        {
            CustomerShppingDeliveryCarriersDto customerShppingDeliveryCarriersDto = requestData.ToMapp<AddCustomerShppingDeliveryCarriersAndDeliveryMethodsRequest, CustomerShppingDeliveryCarriersDto>();
            customerShppingDeliveryCarriersDto.CreatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.AddCustomerShppingDeliveryCarriersAndDeliveryMethods(customerShppingDeliveryCarriersDto);
        }

        public async Task<AddEntityDto<int>> UpdateShppingDeliveryCarriers(UpdateShppingDeliveryCarriersRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responceData = new();
            var customerId = Convert.ToInt32(requestData.CustomerId);
            var existingData = await repositoryManager.customers.GetCustomersBasicInformationById(customerId);

            var exstingCarriersData = await repositoryManager.customerAccountingSettings.GetShppingDeliveryCarriersByCustomerId(customerId);

            var carrierData = exstingCarriersData
                .FirstOrDefault(carrier => carrier.CustomerDeliveryCarrierId == requestData.CustomerDeliveryCarrierId);
            

            if (existingData.StatusId == (short)Status.Approved)
            {
                var approvalEventName = new[]
                {
                  ApprovalEvent.UpdateCustomerShippingSetting
                };

                var approvalRules = await repositoryManager.approval.GetApprovalConfiguration();
                var matchingRule = approvalRules?.FirstOrDefault(rule => approvalEventName.Contains(rule.EventName));

                if (matchingRule != null)
                {
                    var oldJsonData = JsonConvert.SerializeObject(carrierData);
                    var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(matchingRule.FunctionalityEventId);
                    ApprovalRequestsDto approvalResponceData = await ApprovalRuleHelper.ProcessApprovalRequest(
                        oldJsonData,
                        requestData,
                        CurrentUserId,
                        formatTemplate,
                        matchingRule
                    );
                    responceData = await repositoryManager.approval.AddApprovalRequests(approvalResponceData);
                }
            }
            else
            {
                CustomerShppingDeliveryCarriersDto customerShppingDeliveryCarriersDto = requestData.ToMapp<UpdateShppingDeliveryCarriersRequest, CustomerShppingDeliveryCarriersDto>();
                customerShppingDeliveryCarriersDto.UpdatedBy = CurrentUserId;
                responceData = await repositoryManager.customerAccountingSettings.UpdateShppingDeliveryCarriers(customerShppingDeliveryCarriersDto);
            }
            return responceData;
        }

        public async Task<GetShppingDeliveryCarrierAndDeliveryMethodsByIdResponse> GetShppingDeliveryCarrierAndDeliveryMethodsById(int customerId)
        {
            GetShppingDeliveryCarrierAndDeliveryMethodsByIdResponse shppingDetails = await repositoryManager.customerAccountingSettings.GetShppingDeliveryCarrierAndDeliveryMethodsById(customerId);
            if (shppingDetails?.DeliveryAccountId != null)
            {
                var deliveryAccountId = (DeliveryAccount)shppingDetails.DeliveryAccountId;

                if (deliveryAccountId == DeliveryAccount.OurAccount)
                {
                    shppingDetails.DeliveryMethodsList = await repositoryManager.customerAccountingSettings.GetDeliveryMethodsCustomerId(customerId);
                }
                else if (deliveryAccountId == DeliveryAccount.CollectAccount)
                {
                    shppingDetails.ShppingDeliveryCarriersList = await repositoryManager.customerAccountingSettings.GetShppingDeliveryCarriersByCustomerId(customerId);
                    shppingDetails.DeliveryMethodsList = await repositoryManager.customerAccountingSettings.GetDeliveryMethodsCustomerId(customerId);
                }
            }

            return shppingDetails!;
        }

        public async Task<AddEntityDto<int>> UpdateDeliveryMethods(UpdateDeliveryMethodsRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responceData = new();
            var customerId = Convert.ToInt32(requestData.CustomerId);
            var existingData = await repositoryManager.customers.GetCustomersBasicInformationById(customerId);

            var exstingCarriersData = await repositoryManager.customerAccountingSettings.GetDeliveryMethodsCustomerId(customerId);

            var deliveryMethodData = exstingCarriersData
                .FirstOrDefault(carrier => carrier.DeliveryMethodId == requestData.CustomerDeliveryMethodId);

            if (existingData.StatusId == (short)Status.Approved)
            {
                var approvalEventName = new[]
                {
                  ApprovalEvent.UpdateCustomerShippingSetting
                };

                var approvalRules = await repositoryManager.approval.GetApprovalConfiguration();
                var matchingRule = approvalRules?.FirstOrDefault(rule => approvalEventName.Contains(rule.EventName));

                if (matchingRule != null)
                {
                    var oldJsonData = JsonConvert.SerializeObject(deliveryMethodData);
                    var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(matchingRule.FunctionalityEventId);
                    ApprovalRequestsDto approvalResponceData = await ApprovalRuleHelper.ProcessApprovalRequest(
                        oldJsonData,
                        requestData,
                        CurrentUserId,
                        formatTemplate,
                        matchingRule
                    );
                    responceData = await repositoryManager.approval.AddApprovalRequests(approvalResponceData);
                }
            }
            else
            {
                CustomerDeliveryMethodsDto customerDeliveryMethodsDto = requestData.ToMapp<UpdateDeliveryMethodsRequest, CustomerDeliveryMethodsDto>();
                customerDeliveryMethodsDto.UpdatedBy = CurrentUserId;
                responceData = await repositoryManager.customerAccountingSettings.UpdateDeliveryMethods(customerDeliveryMethodsDto);
            }
            return responceData;
        }

        public async Task<AddEntityDto<int>> DeleteCustomerDeliveryCarriersById(int customerDeliveryCarrierId, int deletedBy)
        {
            return await repositoryManager.customerAccountingSettings.DeleteCustomerDeliveryCarriersById(customerDeliveryCarrierId, deletedBy);
        }

        public async Task<AddEntityDto<int>> DeleteCustomerDeliveryMethodsById(int customerDeliveryMethodId, int deletedBy)
        {
            return await repositoryManager.customerAccountingSettings.DeleteCustomerDeliveryMethodsById(customerDeliveryMethodId, deletedBy);

        }

        public async Task<AddEntityDto<int>> AddShppingDeliveryCarriers(AddShppingDeliveryCarriersRequest requestData, short CurrentUserId)
        {
            CustomerShppingDeliveryCarriersDto customerShppingDeliveryCarriersDto = requestData.ToMapp<AddShppingDeliveryCarriersRequest, CustomerShppingDeliveryCarriersDto>();
            customerShppingDeliveryCarriersDto.CreatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.AddShppingDeliveryCarriers(customerShppingDeliveryCarriersDto);
        }

        public async Task<AddEntityDto<int>> AddDeliveryMethods(AddDeliveryMethodsRequest requestData, short CurrentUserId)
        {
            CustomerDeliveryMethodsDto customerDeliveryMethodsDto = requestData.ToMapp<AddDeliveryMethodsRequest, CustomerDeliveryMethodsDto>();
            customerDeliveryMethodsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.AddDeliveryMethods(customerDeliveryMethodsDto);
        }
        public Task<GetCustomerDeliveryCarriersByCustomerDeliveryCarrierIdResponse> GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId(int customerDeliveryCarrierId)
        {
            return repositoryManager.customerAccountingSettings.GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId(customerDeliveryCarrierId);
        }

        public Task<GetCustomerDeliveryMethodByCustomerDeliveryMethodIdResponse> GetCustomerDeliveryMethodByCustomerDeliveryMethodId(int customerDeliveryMethodId)
        {
            return repositoryManager.customerAccountingSettings.GetCustomerDeliveryMethodByCustomerDeliveryMethodId(customerDeliveryMethodId);
        }


        #endregion
    }
}
