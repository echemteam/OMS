namespace OMS.Domain.Entities.API.Request.CustomerAccountingNotes
{
    public class AddEditCustomerSettingRequest
    {
        public int? CustomerAccountingSettingId { get; set; }
        public int? CustomerId { get; set; }
        public short? PaymentTermId { get; set; }
        public decimal? CreditLimit { get; set; }
        public short? PaymentMethodId { get; set; }
        public string? InvoiceSubmissionInstruction { get; set; }
        public string? BillingCurrency { get; set; }
        public decimal? SalesTax { get; set; }
        public bool? ExemptSalesTax { get; set; }
        public decimal? CardProcessingCharges { get; set; }
        public decimal? BankWireFee { get; set; }
    }
}
