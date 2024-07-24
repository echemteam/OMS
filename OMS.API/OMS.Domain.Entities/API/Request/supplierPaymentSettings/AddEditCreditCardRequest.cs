using OMS.Domain.Entities.API.Request.SupplierFinancialSettings;

namespace OMS.Domain.Entities.API.Request.supplierPaymentSettings
{
    public class AddEditCreditCardRequest
    {
        public SupplierFinancialSettingsRequest? SupplierFinancialSettings { get; set; }
        public int? SupplierPaymentSettingId { get; set; }
        public int? SupplierId { get; set; }
        public string? CCNote { get; set; }
        public bool? IsCCExistsOnFile { get; set; }
    }
}
