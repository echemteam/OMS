using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("CustomerAccoutingSettings")]
    public class CustomerAccountingsettings
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? CustomerAccountingSettingId { get; set; }
        public short? PaymentTermId { get; set; }
        public decimal? CreditLimit { get; set; }
        public short? DeliveryMethodId { get; set; }
        public int? DeliveryAccountId { get; set; }
        public short? CarrierId { get; set; }
        public int? CustomerId { get; set; }
        public string? InvoiceSubmissionMethod { get; set; }
        public short? PaymentMethodId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public string? InvoiceSubmissionInstruction { get; set; }
        public string? BillingCurrency { get; set; }
    }
}
