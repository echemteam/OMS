using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.CustomerNotes
{
    public class BaseCustomerNotesDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? CustomerNoteId { get; set; }
        public string? Note { get; set; }
        public int? CustomerId { get; set; }
    }
}
