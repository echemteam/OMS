using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.API.Response.SuppierBankDetails;
using OMS.Domain.Entities.API.Response.supplierPaymentSettings;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierPaymentSettings;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierPaymentSettingsRepository
    {
        Task<AddEntityDTO<int>> AddEditCreditCard(SupplierPaymentSettingsDTO requestData);
        Task<AddEntityDTO<int>> AddEditCheck(SupplierPaymentSettingsDTO requestData);
        Task<AddEntityDTO<int>> AddEditOther(SupplierPaymentSettingsDTO requestData);
        Task<GetACHWireBySupplierIdResponse> GetACHWireBySupplierId(int supplierId);
        Task<GetPaymentSettingsBySupplierIdResponse> GetPaymentSettingsBySupplierId(int supplierId);
        Task<GetAddressResponse> GetAddressByAddressId(int? addressId);

    }
}
