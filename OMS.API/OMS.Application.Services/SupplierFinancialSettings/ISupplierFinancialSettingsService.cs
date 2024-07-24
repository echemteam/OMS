using OMS.Domain.Entities.API.Request.SupplierAccoutingSetting;
using OMS.Domain.Entities.API.Request.supplierPaymentSettings;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.SupplierAccoutingSetting
{
    public interface ISupplierFinancialSettingsService
    {
        Task<AddEntityDTO<int>> AddEditACHWire(AddEditACHWireRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> AddEditCreditCard(AddEditCreditCardRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> AddEditCheck(AddEditCheckRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> AddEditOther(AddEditOtherRequest requestData, short CurrentUserId);

    }
}
