namespace OMS.Domain.Entities.API.Request.SupplierFinancialSettings
{
    public class SupplierFinancialSettingsRequest
    {
        public int? SupplierAccountingSettingId { get; set; }
        public byte? PaymentTermId { get; set; }
        public int? SupplierId { get; set; }
        public byte? InvoiceSubmissionMethod { get; set; }
        public byte? PoDeliveryMethodId { get; set; }
        public bool? IsActive { get; set; }
    }
}
