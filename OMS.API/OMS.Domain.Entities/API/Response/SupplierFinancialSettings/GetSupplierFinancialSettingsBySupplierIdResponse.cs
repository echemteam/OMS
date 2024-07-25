namespace OMS.Domain.Entities.API.Response.SupplierFinancialSettings
{
    public class GetSupplierFinancialSettingsBySupplierIdResponse
    {
        public int? SupplierAccountingSettingId { get; set; }
        public bool? IsActive { get; set; }
        public string? PoDeliveryMethod { get; set; }
        public byte? PoDeliveryMethodId { get; set; }
        public int? SupplierId { get; set; }
        public string? PaymentTerm { get; set; }
        public byte? PaymentTermId { get; set; }
        public byte? InvoiceSubmissionMethod { get; set; }
        public string? Method { get; set; }
    }
}
