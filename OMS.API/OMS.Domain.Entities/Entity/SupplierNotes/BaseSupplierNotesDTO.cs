using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.SupplierNotes
{
    public class BaseSupplierNotesDto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? SupplierNoteId { get; set; }
        public string? Note { get; set; }
        public int? SupplierId { get; set; }
    }
}
