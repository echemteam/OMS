using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerAccountingSettings;

namespace OMS.Domain.Repository.Contract
{
    public interface ICustomerAccountingSettingsRepository
    {
        Task<AddEntityDto<int>> AddEditCustomerSettings(CustomerAccountingSettingsDto requestData);
        Task<GetDetailsByCustomerIdResponse> GetDetailsbyCustomerID(int customerId);
        Task<AddEntityDto<int>> AddCustomerShppingDeliveryCarriersAndDeliveryMethods(CustomerShppingDeliveryCarriersDto requestData);
        Task<AddEntityDto<int>> UpdateShppingDeliveryCarriers(CustomerShppingDeliveryCarriersDto requestData);
        Task<GetShppingDeliveryCarrierAndDeliveryMethodsByIdResponse> GetShppingDeliveryCarrierAndDeliveryMethodsById(int customerId);
        Task<List<GetShppingDeliveryCarriersByCustomerIdResponse>> GetShppingDeliveryCarriersByCustomerId(int customerId);
        Task<List<GetDeliveryMethodsCustomerIdResponse>> GetDeliveryMethodsCustomerId(int customerId);
        Task<AddEntityDto<int>> UpdateDeliveryMethods(CustomerDeliveryMethodsDto requestData);
        Task<AddEntityDto<int>> DeleteCustomerDeliveryCarriersById(int customerDeliveryCarrierId, int deletedBy);
        Task<AddEntityDto<int>> DeleteCustomerDeliveryMethodsById(int customerDeliveryMethodId, int deletedBy);
        Task<AddEntityDto<int>> AddShppingDeliveryCarriers(CustomerShppingDeliveryCarriersDto requestData);
        Task<AddEntityDto<int>> AddDeliveryMethods(CustomerDeliveryMethodsDto requestData);
        Task<GetCustomerDeliveryCarriersByCustomerDeliveryCarrierIdResponse> GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId(int customerDeliveryCarrierId);
        Task<GetCustomerDeliveryMethodByCustomerDeliveryMethodIdResponse> GetCustomerDeliveryMethodByCustomerDeliveryMethodId(int customerDeliveryMethodId);
    }
}