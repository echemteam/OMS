using OMS.Domain.Entities.API.Request.SupplierAccoutingSetting;
using OMS.Domain.Entities.API.Request.supplierPaymentSettings;
using OMS.Domain.Entities.API.Response.SuppierBankDetails;
using OMS.Domain.Entities.API.Response.SupplierFinancialSettings;
using OMS.Domain.Entities.API.Response.supplierPaymentSettings;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.SupplierAccoutingSetting
{
    public interface ISupplierFinancialSettingsService
    {
        Task<AddEntityDTO<int>> AddEditACHWire(AddEditACHWireRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> AddEditCreditCard(AddEditCreditCardRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> AddEditCheck(AddEditCheckRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> AddEditOther(AddEditOtherRequest requestData, short CurrentUserId);
        Task<GetSupplierFinancialSettingsBySupplierIdResponse> GetSupplierFinancialSettingsBySupplierId(int supplierId);
        Task<GetACHWireBySupplierIdResponse> GetACHWireBySupplierId(int supplierId);
        Task<GetPaymentSettingsBySupplierIdResponse> GetPaymentSettingsBySupplierId(int supplierId);
    }
}
