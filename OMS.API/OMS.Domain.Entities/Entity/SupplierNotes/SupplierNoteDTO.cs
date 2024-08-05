using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.SupplierNotes
{
    public class SupplierNoteDTO : IBaseCreateEntity, IBaseUpdateEntity, ISupplierNotes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? SupplierNoteId { get; set; }
        public string? Note { get; set; }
        public int? SupplierId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }

    }
}
