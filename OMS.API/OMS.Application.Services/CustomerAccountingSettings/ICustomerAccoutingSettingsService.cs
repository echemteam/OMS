using OMS.Domain.Entities.API.Request.CustomerAccountingNotes;
using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services
{
    public interface ICustomerAccoutingSettingsService
    {
        Task<GetDetailsByCustomerIdResponse> GetDetailsbyCustomerID(int customerId);
        Task<AddEntityDTO<int>> AddEditCustomerSettings(AddEditCustomerSettingRequest requestData, short currentUserId);
        Task<AddEntityDTO<int>> AddCustomerShppingDeliveryCarriersAndDeliveryMethods(AddCustomerShppingDeliveryCarriersAndDeliveryMethodsRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateShppingDeliveryCarriers(UpdateShppingDeliveryCarriersRequest requestData, short CurrentUserId);
        Task<List<GetShppingDeliveryCarriersByCustomerIdResponse>> GetShppingDeliveryCarriersByCustomerId(int customerid);
        Task<List<GetDeliveryMethodsCustomerIdResponse>> GetDeliveryMethodsCustomerId(int customerid);
        Task<AddEntityDTO<int>> UpdateDeliveryMethods(UpdateDeliveryMethodsRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> DeleteCustomerDeliveryCarriersById(int customerDeliveryCarrierId, int deletedBy);
        Task<AddEntityDTO<int>> DeleteCustomerDeliveryMethodsById(int customerDeliveryMethodId, int deletedBy);
    }
}