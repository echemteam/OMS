using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("OrganizationOtherCharges")]
    public class OrganizationOtherCharges
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public byte? OrganizationOtherChargeId { get; set; }
        [Column("HandlingFees")]
        public decimal? HandlingFees { get; set; }
        [Column("BankWireFees")]
        public decimal? BankWireFees { get; set; }
        [Column("CreditCardServiceFees")]
        public decimal? CreditCardServiceFees { get; set; }
        [Column("ColdBoxFees")]
        public decimal? ColdBoxFees { get; set; }
        [Column("ITNFees")]
        public decimal? ITNFees { get; set; }
        [Column("DefaultPaymentTerms")]
        public byte? DefaultPaymentTerms { get; set; }
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
