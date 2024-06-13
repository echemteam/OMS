
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Request.CustomerAccountingNotes;
using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services
{
    public interface ICustomerAccoutingSettingsService
    {
        Task<GetDetailsByCustomerIdResponse> GetDetailsbyCustomerID(int customerId);
        Task<AddEntityDTO<int>> AddEditCustomerSettings(AddEditCustomerSettingRequest requestData, short currentUserId);
    }
}