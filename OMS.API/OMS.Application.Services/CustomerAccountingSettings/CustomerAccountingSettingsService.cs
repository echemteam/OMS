using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.CustomerAccountingNotes;
using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerAccountingSettings;
using OMS.Domain.Repository;
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
        public async Task<AddEntityDTO<int>> AddEditCustomerSettings(AddEditCustomerSettingRequest requestData, short CurrentUserId)
        {
            CustomerAccountingSettingsDTO customerAccountingSettingsDTO = requestData.ToMapp<AddEditCustomerSettingRequest, CustomerAccountingSettingsDTO>();
            customerAccountingSettingsDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.AddEditCustomerSettings(customerAccountingSettingsDTO);
        }

        public async Task<AddEntityDTO<int>> AddCustomerShppingDeliveryCarriersAndDeliveryMethods(AddCustomerShppingDeliveryCarriersAndDeliveryMethodsRequest requestData, short CurrentUserId)
        {
            CustomerShppingDeliveryCarriersDTO customerShppingDeliveryCarriersDTO = requestData.ToMapp<AddCustomerShppingDeliveryCarriersAndDeliveryMethodsRequest, CustomerShppingDeliveryCarriersDTO>();
            customerShppingDeliveryCarriersDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.AddCustomerShppingDeliveryCarriersAndDeliveryMethods(customerShppingDeliveryCarriersDTO);
        }

        public async Task<AddEntityDTO<int>> UpdateShppingDeliveryCarriers(UpdateShppingDeliveryCarriersRequest requestData, short CurrentUserId)
        {
            CustomerShppingDeliveryCarriersDTO customerShppingDeliveryCarriersDTO = requestData.ToMapp<UpdateShppingDeliveryCarriersRequest, CustomerShppingDeliveryCarriersDTO>();
            customerShppingDeliveryCarriersDTO.UpdatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.UpdateShppingDeliveryCarriers(customerShppingDeliveryCarriersDTO);
        }

        public async Task<GetShppingDeliveryCarrierAndDeliveryMethodsByIdResponse> GetShppingDeliveryCarrierAndDeliveryMethodsById(int customerId)
        {
            GetShppingDeliveryCarrierAndDeliveryMethodsByIdResponse shppingDetails = await repositoryManager.customerAccountingSettings.GetShppingDeliveryCarrierAndDeliveryMethodsById(customerId);
            if (shppingDetails != null)
            {
                if (shppingDetails.DeliveryAccountId != null)
                {
                    if (shppingDetails.DeliveryAccountId == 1)
                    {
                        shppingDetails.DeliveryMethodsList = await repositoryManager.customerAccountingSettings.GetDeliveryMethodsCustomerId(customerId);
                    }
                    else if (shppingDetails.DeliveryAccountId == 2)
                    {
                        shppingDetails.ShppingDeliveryCarriersList = await repositoryManager.customerAccountingSettings.GetShppingDeliveryCarriersByCustomerId(customerId);
                        shppingDetails.DeliveryMethodsList = await repositoryManager.customerAccountingSettings.GetDeliveryMethodsCustomerId(customerId);
                    }
                }
            }
            return shppingDetails!;
        }

        public async Task<AddEntityDTO<int>> UpdateDeliveryMethods(UpdateDeliveryMethodsRequest requestData, short CurrentUserId)
        {
            CustomerDeliveryMethodsDTO customerDeliveryMethodsDTO = requestData.ToMapp<UpdateDeliveryMethodsRequest, CustomerDeliveryMethodsDTO>();
            customerDeliveryMethodsDTO.UpdatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.UpdateDeliveryMethods(customerDeliveryMethodsDTO);
        }

        public async Task<AddEntityDTO<int>> DeleteCustomerDeliveryCarriersById(int customerDeliveryCarrierId, int deletedBy)
        {
            return await repositoryManager.customerAccountingSettings.DeleteCustomerDeliveryCarriersById(customerDeliveryCarrierId, deletedBy);
        }

        public async Task<AddEntityDTO<int>> DeleteCustomerDeliveryMethodsById(int customerDeliveryMethodId, int deletedBy)
        {
            return await repositoryManager.customerAccountingSettings.DeleteCustomerDeliveryMethodsById(customerDeliveryMethodId, deletedBy);

        }

        public async Task<AddEntityDTO<int>> AddShppingDeliveryCarriers(AddShppingDeliveryCarriersRequest requestData, short CurrentUserId)
        {
            CustomerShppingDeliveryCarriersDTO customerShppingDeliveryCarriersDTO = requestData.ToMapp<AddShppingDeliveryCarriersRequest, CustomerShppingDeliveryCarriersDTO>();
            customerShppingDeliveryCarriersDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.AddShppingDeliveryCarriers(customerShppingDeliveryCarriersDTO);
        }

        public async Task<AddEntityDTO<int>> AddDeliveryMethods(AddDeliveryMethodsRequest requestData, short CurrentUserId)
        {
            CustomerDeliveryMethodsDTO customerDeliveryMethodsDTO = requestData.ToMapp<AddDeliveryMethodsRequest, CustomerDeliveryMethodsDTO>();
            customerDeliveryMethodsDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.customerAccountingSettings.AddDeliveryMethods(customerDeliveryMethodsDTO);
        }
        #endregion
    }
}
