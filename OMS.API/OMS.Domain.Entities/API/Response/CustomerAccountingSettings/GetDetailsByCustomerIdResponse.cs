namespace OMS.Domain.Entities.API.Response.CustomerAccountingSettings
{
    public class GetDetailsByCustomerIdResponse
    {
        public int? CustomerAccountingSettingId { get; set; }
        public short? PaymentTermId { get; set; }
        public short? PaymentMethodId { get; set; }
        public decimal? CreditLimit { get; set; }
        public string? BillingCurrency { get; set; }
        public string? InvoiceSubmissionInstruction { get; set; }
        public decimal? SalesTax { get; set; }
        public bool? ExemptSalesTax { get; set; }
        public decimal? CardProcessingCharges { get; set; }
        public decimal? BankFee { get; set; }
    }
}
