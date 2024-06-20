using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("SupplierDocuements")]
    public class SupplierDocuements
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? SupplierDocumentId { get; set; }
        [Column("Name")]
        public string? Name { get; set; }
        [Column("DocumentTypeId")]
        public byte? DocumentTypeId { get; set; }
        [Column("CustomerId")]
        public int? SupplierId { get; set; }
        [Column("StatusId")]
        public short? StatusId { get; set; }
        [Column("Attachment")]
        public string? Attachment { get; set; }
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
        [Column("ApprovedAt")]
        public DateTime? ApprovedAt { get; set; }
        [Column("ApprovedBy")]
        public short? ApprovedBy { get; set; }
    }
}
