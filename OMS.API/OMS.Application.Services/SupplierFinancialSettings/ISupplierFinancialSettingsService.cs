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
        Task<AddEntityDto<int>> AddEditACHWire(AddEditACHWireRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> AddEditCreditCard(AddEditCreditCardRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> AddEditCheck(AddEditCheckRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> AddEditOther(AddEditOtherRequest requestData, short CurrentUserId);
        Task<GetSupplierFinancialSettingsBySupplierIdResponse> GetSupplierFinancialSettingsBySupplierId(int supplierId);
        Task<GetACHWireBySupplierIdResponse> GetACHWireBySupplierId(int supplierId);
        Task<GetPaymentSettingsBySupplierIdResponse> GetPaymentSettingsBySupplierId(int supplierId);
        //Task<GetSupplierFinancialSettingsWithACHWireBySupplierIdResponse> GetSupplierFinancialSettingsWithACHWireBySupplierId(int supplierId);
    }
}
