using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("OrganizationLogisticDetails")]
    public class OrganizationLogisticDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public byte? OrganizationLogisticDetailId { get; set; }
        [Column("FedExAccount")]
        public string? FedExAccount { get; set; }
        [Column("DHLAccount")]
        public string? DHLAccount { get; set; }
        [Column("UPSAccount")]
        public string? UPSAccount { get; set; }
        [Column("USPSAccount")]
        public string? USPSAccount { get; set; }
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
