using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerAccountingSettings;

namespace OMS.Domain.Repository.Contract
{
    public interface ICustomerAccountingSettingsRepository
    {
        Task<AddEntityDTO<int>> AddEditCustomerSettings(CustomerAccountingSettingsDTO customerAccountingSettingsDTO);
        Task<GetDetailsByCustomerIdResponse> GetDetailsbyCustomerID(int customerId);
        Task<AddEntityDTO<int>> DeleteCustomerDeliveryCarriersById(int customerDeliveryCarrierId, int deletedBy);
        Task<AddEntityDTO<int>> DeleteCustomerDeliveryMethodsById(int customerDeliveryMethodId, int deletedBy);
    }
}