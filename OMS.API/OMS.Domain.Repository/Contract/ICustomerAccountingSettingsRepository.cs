using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerAccountingSettings;

namespace OMS.Domain.Repository.Contract
{
    public interface ICustomerAccountingSettingsRepository
    {
        Task<AddEntityDTO<int>> AddEditCustomerSettings(CustomerAccountingSettingsDTO customerAccountingSettingsDTO);
        Task<GetDetailsByCustomerIdResponse> GetDetailsbyCustomerID(int customerId);
        Task<AddEntityDTO<int>> AddCustomerShppingDeliveryCarriersAndDeliveryMethods(CustomerShppingDeliveryCarriersDTO Carriers);
        Task<AddEntityDTO<int>> UpdateShppingDeliveryCarriers(CustomerShppingDeliveryCarriersDTO updateCarriers);
        Task<GetShppingDeliveryCarrierAndDeliveryMethodsByIdResponse> GetShppingDeliveryCarrierAndDeliveryMethodsById(int customerId);
        Task<List<GetShppingDeliveryCarriersByCustomerIdResponse>> GetShppingDeliveryCarriersByCustomerId(int customerId);
        Task<List<GetDeliveryMethodsCustomerIdResponse>> GetDeliveryMethodsCustomerId(int customerId);
        Task<AddEntityDTO<int>> UpdateDeliveryMethods(CustomerDeliveryMethodsDTO updateDeliveryMethods);
        Task<AddEntityDTO<int>> DeleteCustomerDeliveryCarriersById(int customerDeliveryCarrierId, int deletedBy);
        Task<AddEntityDTO<int>> DeleteCustomerDeliveryMethodsById(int customerDeliveryMethodId, int deletedBy);
        Task<AddEntityDTO<int>> AddShppingDeliveryCarriers(CustomerShppingDeliveryCarriersDTO carriers);
        Task<AddEntityDTO<int>> AddDeliveryMethods(CustomerDeliveryMethodsDTO deliveryMethods);
        Task<GetCustomerDeliveryCarriersByCustomerDeliveryCarrierIdResponse> GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId(int customerDeliveryCarrierId);
        Task<GetCustomerDeliveryMethodByCustomerDeliveryMethodIdResponse> GetCustomerDeliveryMethodByCustomerDeliveryMethodId(int customerDeliveryCarrierId);
    }
}