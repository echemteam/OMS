using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.API.Response.SuppierBankDetails;
using OMS.Domain.Entities.API.Response.supplierPaymentSettings;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierPaymentSettings;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierPaymentSettingsRepository
    {
        Task<AddEntityDto<int>> AddEditCreditCard(SupplierPaymentSettingsDto requestData);
        Task<AddEntityDto<int>> AddEditCheck(SupplierPaymentSettingsDto requestData);
        Task<AddEntityDto<int>> AddEditOther(SupplierPaymentSettingsDto requestData);
        Task<GetACHWireBySupplierIdResponse> GetACHWireBySupplierId(int supplierId);
        Task<GetPaymentSettingsBySupplierIdResponse> GetPaymentSettingsBySupplierId(int supplierId);
        Task<GetAddressResponse> GetAddressByAddressId(int? addressId);

    }
}
