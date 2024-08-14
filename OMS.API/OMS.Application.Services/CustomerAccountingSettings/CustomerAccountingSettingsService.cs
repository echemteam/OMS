using Common.Helper.Enum;
using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.CustomerAccountingNotes;
using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerAccountingSettings;
using OMS.Domain.Repository;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.Services.Contract;

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
            CustomerAccountingSettingsDto customerAccountingSettingsDto = requestData.ToMapp<AddEditCustomerSettingRequest, CustomerAccountingSettingsDto>();
            customerAccountingSettingsDto.CreatedBy = CurrentUserId;
            AddEntityDto<int> responceData = await repositoryManager.customerAccountingSettings.AddEditCustomerSettings(customerAccountingSettingsDto);
            if (responceData.KeyValue > 0)
            {
                CustomerShppingDeliveryCarriersDto customerShppingDeliveryCarriersDto = new()
                {
                    CustomerId = requestData.CustomerId,
                };
                customerShppingDeliveryCarriersDto.CreatedBy = CurrentUserId;
                customerShppingDeliveryCarriersDto.DeliveryAccountId = ((int)DeliveryAccount.OurAccount);
                customerShppingDeliveryCarriersDto.IsByDefault = true;
                responceData = await repositoryManager.customerAccountingSettings.AddCustomerShppingDeliveryCarriersAndDeliveryMethods(customerShppingDeliveryCarriersDto);
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
            CustomerShppingDeliveryCarriersDto customerShppingDeliveryCarriersDto = requestData.ToMapp<UpdateShppingDeliveryCarriersRequest, CustomerShppingDeliveryCarriersDto>();
            customerShppingDeliveryCarriersDto.UpdatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.UpdateShppingDeliveryCarriers(customerShppingDeliveryCarriersDto);
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
            CustomerDeliveryMethodsDto customerDeliveryMethodsDto = requestData.ToMapp<UpdateDeliveryMethodsRequest, CustomerDeliveryMethodsDto>();
            customerDeliveryMethodsDto.UpdatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.UpdateDeliveryMethods(customerDeliveryMethodsDto);
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
