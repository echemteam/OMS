using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("SuppierBankDetails")]
    public class SuppierBankDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? SupplierBankDetailsId { get; set; }

        [Column("BankAddressId")]
        public int? BankAddressId { get; set; }

        [Column("RecipientAddressId")]
        public int? RecipientAddressId { get; set; }

        [Column("MessageToRecipient")]
        public string? MessageToRecipient { get; set; }

        [Column("SupplierId")]
        public int? SupplierId { get; set; }

        [Column("IsAddressInUs")]
        public bool? IsAddressInUs { get; set; }

        [Column("RecipientPhoneNumber")]
        public string? RecipientPhoneNumber { get; set; }

        [Column("PaymentTermId")]
        public byte? PaymentTermId { get; set; }

        [Column("MessageToRecipientBank")]
        public string? MessageToRecipientBank { get; set; }

        [Column("BeneficiaryName")]
        public string? BeneficiaryName { get; set; }

        [Column("BankName")]
        public string? BankName { get; set; }

        [Column("AccountType")]
        public string? AccountType { get; set; }

        [Column("AccountNumber")]
        public string? AccountNumber { get; set; }

        [Column("BranchCode")]
        public string? BranchCode { get; set; }

        [Column("IbanNumber")]
        public int? IbanNumber { get; set; }

        [Column("SwiftCode")]
        public string? SwiftCode { get; set; }

        [Column("RoutingNumber")]
        public string? RoutingNumber { get; set; }

        [Column("SortCode")]
        public string? SortCode { get; set; }

        [Column("BsbNumber")]
        public string? BsbNumber { get; set; }

        [Column("CreatedAt")]
        public DateTime? CreatedAt { get; set; }

        [Column("UpdatedAt")]
        public DateTime? UpdatedAt { get; set; }

        [Column("DeletedAt")]
        public DateTime? DeletedAt { get; set; }

        [Column("CreatedBy")]
        public short? CreatedBy { get; set; }

        [Column("UpdatedBy")]
        public short? UpdatedBy { get; set; }

        [Column("DeletedBy")]
        public short? DeletedBy { get; set; }

        [Column("IsActive")]
        public bool? IsActive { get; set; }
    }
}
