using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("EmailTemplates")]
    public class EmailTemplates
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? EmailTemplateId { get; set; }
        [Column("EmailTemplateName")]
        public string? EmailTemplateName { get; set; }
        [Column("Subject")]
        public string? Subject { get; set; }
        [Column("EmailBody")]
        public string? EmailBody { get; set; }
        [Column("IsActive")]
        public bool? IsActive { get; set; }
        [Column("CreatedAt")]
        public DateTime? CreatedAt { get; set; }
        [Column("UpdatedAt")]
        public DateTime? UpdatedAt { get; set; }
        [Column("CreatedBy")]
        public short? CreatedBy { get; set; }
        [Column("UpdatedBy")]
        public short? UpdatedBy { get; set; }
    }
}
