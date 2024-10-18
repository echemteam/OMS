using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Prisitance.Entities.Entities
{
    
    [Table("Snippet")]
    public class Snippet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public byte? SnippetId { get; set; }

        [Column("Name")]
        public string? Name { get; set; }

        [Column("Hashtag")]
        public string? Hashtag { get; set; }

        [Column("Body")]
        public string? Body { get; set; }

        [Column("IsActive")]
        public bool? IsActive { get; set; }

        [Column("CreatedBy")]
        public short? CreatedBy { get; set; }

        [Column("CreatedAt")]
        public DateTime? CreatedAt { get; set; }

        [Column("UpdatedBy")]
        public short? UpdatedBy { get; set; }

        [Column("UpdatedAt")]
        public DateTime? UpdatedAt { get; set; }

        [Column("DeletedBy")]
        public short? DeletedBy { get; set; }

        [Column("DeletedAt")]
        public DateTime? DeletedAt { get; set; }

    }
}
