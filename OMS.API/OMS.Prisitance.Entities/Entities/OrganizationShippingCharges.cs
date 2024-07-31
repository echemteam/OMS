using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("OrganizationShippingCharges")]
    public class OrganizationShippingCharges
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public byte? OrganizationShippingChargeId { get; set; }
        [Column("DomesticOvernight")]
        public decimal? DomesticOvernight { get; set; }
        [Column("DomesticSecondDay")]
        public decimal? DomesticSecondDay { get; set; }
        [Column("DomesticGround")]
        public decimal? DomesticGround { get; set; }
        [Column("InternationalPriority")]
        public decimal? InternationalPriority { get; set; }
        [Column("InternationalEconomy")]
        public decimal? InternationalEconomy { get; set; }
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
