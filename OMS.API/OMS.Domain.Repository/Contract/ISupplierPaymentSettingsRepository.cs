using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierPaymentSettings;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierPaymentSettingsRepository
    {
        Task<AddEntityDTO<int>> AddEditCreditCard(SupplierPaymentSettingsDTO requestData);
        Task<AddEntityDTO<int>> AddEditCheck(SupplierPaymentSettingsDTO requestData);
        Task<AddEntityDTO<int>> AddEditOther(SupplierPaymentSettingsDTO requestData);

    }
}
