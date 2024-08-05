using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("OrganizationBankDetails")]
    public class OrganizationBankDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public byte? OrganizationBankDetailId { get; set; }
        [Column("BeneficiaryName")]
        public string? BeneficiaryName { get; set; }
        [Column("CheckingAccountNumber")]
        public string? CheckingAccountNumber { get; set; }
        [Column("RoutingAccountNumber")]
        public string? RoutingAccountNumber { get; set; }
        [Column("SwiftCode")]
        public string? SwiftCode { get; set; }
        [Column("BankAddress")]
        public string? BankAddress { get; set; }
        [Column("BankBranch")]
        public string? BankBranch { get; set; }
        [Column("CreatedAt")]
        public DateTime? CreatedAt { get; set; }
        [Column("CreatedBy")]
        public short? CreatedBy { get; set; }
        [Column("UpdatedAt")]
        public DateTime? UpdatedAt { get; set; }
        [Column("UpdatedBy")]
        public short? UpdatedBy { get; set; }
        [Column("DeletedAt")]
        public DateTime? DeletedAt { get; set; }
        [Column("DeletedBy")]
        public short? DeletedBy { get; set; }
    }
}
