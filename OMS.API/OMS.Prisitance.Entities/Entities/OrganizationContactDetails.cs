using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("OrganizationContactDetails")]
    public class OrganizationContactDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public short? OrganizationContactDetailId { get; set; }
        [Column("CompanyWebsite")]
        public string? CompanyWebsite { get; set; }
        [Column("SalesEmail")]
        public string? SalesEmail { get; set; }
        [Column("AccountsEmail")]
        public string? AccountsEmail { get; set; }
        [Column("PurchaseEmail")]
        public string? PurchaseEmail { get; set; }
        [Column("CustomerServiceEmail")]
        public string? CustomerServiceEmail { get; set; }
        [Column("SalesPhone")]
        public string? SalesPhone { get; set; }
        [Column("AccountsPhone")]
        public string? AccountsPhone { get; set; }
        [Column("TollFreePhone")]
        public string? TollFreePhone { get; set; }
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
