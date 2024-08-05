namespace OMS.Domain.Entities.Entity.CustomerAccountingSettings
{
    public class BaseCustomerAccountingSettingsDTO
    {
        public int? CustomerAccountingSettingId { get; set; }
        public short? PaymentTermId { get; set; }
        public decimal? CreditLimit { get; set; }
        public short? DeliveryMethodId { get; set; }
        public int? DeliveryAccountId { get; set; }
        public short? CarrierId { get; set; }
        public int? CustomerId { get; set; }
        public string? InvoiceSubmissionMethod { get; set; }
        public short? PaymentMethodId { get; set; }
        public string? InvoiceSubmissionInstruction { get; set; }
        public string? BillingCurrency { get; set; }
    }
}
