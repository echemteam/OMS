using OMS.Domain.Entities.API.Response.SupplierFinancialSettings;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierAccoutingSetting;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierFinancialSettingsRepository
    {
        Task<AddEntityDto<int>> AddEditSupplierFinancialSettings(SupplierAccoutingSettingDto requestData);
        Task<GetSupplierFinancialSettingsBySupplierIdResponse> GetSupplierFinancialSettingsBySupplierId(int supplierId);
    }
}
