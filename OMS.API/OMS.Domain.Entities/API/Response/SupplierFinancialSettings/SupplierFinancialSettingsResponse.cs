namespace OMS.Domain.Entities.API.Response.SupplierFinancialSettings
{
    public class SupplierFinancialSettingsResponse
    {
        public int? SupplierAccountingSettingId { get; set; }
        public byte? PaymentTermId { get; set; }
        public string? PaymentTerm { get; set; }
        public int? SupplierId { get; set; }
        public byte? InvoiceSubmissionMethod { get; set; }
        public string? PaymentMethod { get; set; }
        public byte? PoDeliveryMethodId { get; set; }
        public string? PODeliveryMethod { get; set; }
        public bool? IsActive { get; set; }
    }
}
