using OMS.Domain.Entities.API.Request.CustomerAccountingNotes;
using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services
{
    public interface ICustomerAccoutingSettingsService
    {
        Task<GetDetailsByCustomerIdResponse> GetDetailsbyCustomerID(int customerId);
        Task<AddEntityDto<int>> AddEditCustomerSettings(AddEditCustomerSettingRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> AddCustomerShppingDeliveryCarriersAndDeliveryMethods(AddCustomerShppingDeliveryCarriersAndDeliveryMethodsRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> UpdateShppingDeliveryCarriers(UpdateShppingDeliveryCarriersRequest requestData, short CurrentUserId);
        Task<GetShppingDeliveryCarrierAndDeliveryMethodsByIdResponse> GetShppingDeliveryCarrierAndDeliveryMethodsById(int customerId);
        Task<AddEntityDto<int>> UpdateDeliveryMethods(UpdateDeliveryMethodsRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> DeleteCustomerDeliveryCarriersById(int customerDeliveryCarrierId, int deletedBy);
        Task<AddEntityDto<int>> DeleteCustomerDeliveryMethodsById(int customerDeliveryMethodId, int deletedBy);
        Task<AddEntityDto<int>> AddShppingDeliveryCarriers(AddShppingDeliveryCarriersRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> AddDeliveryMethods(AddDeliveryMethodsRequest requestData, short CurrentUserId);
        Task<GetCustomerDeliveryCarriersByCustomerDeliveryCarrierIdResponse> GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId(int customerDeliveryCarrierId);
        Task<GetCustomerDeliveryMethodByCustomerDeliveryMethodIdResponse> GetCustomerDeliveryMethodByCustomerDeliveryMethodId(int customerDeliveryMethodId);
    }
}