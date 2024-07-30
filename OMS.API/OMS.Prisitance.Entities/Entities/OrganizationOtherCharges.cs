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
        public short? OrganizationOtherChargeId { get; set; }
        [Column("HandlingFees")]
        public float? HandlingFees { get; set; }
        [Column("BankWireFees")]
        public float? BankWireFees { get; set; }
        [Column("CreditCardServiceFees")]
        public float? CreditCardServiceFees { get; set; }
        [Column("ColdBoxFees")]
        public float? ColdBoxFees { get; set; }
        [Column("ITNFees")]
        public float? ITNFees { get; set; }
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
