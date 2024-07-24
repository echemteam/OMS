using OMS.Domain.Entities.API.Request.SupplierFinancialSettings;

namespace OMS.Domain.Entities.API.Request.supplierPaymentSettings
{
    public class AddEditOtherRequest
    {
        public SupplierFinancialSettingsRequest? SupplierFinancialSettings { get; set; }
        public int? SupplierPaymentSettingId { get; set; }
        public int? SupplierId { get; set; }
        public string? OtherNote { get; set; }
    }
}
