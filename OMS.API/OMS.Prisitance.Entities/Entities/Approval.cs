using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("ChecklistEvents")]
    public class Approval
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? EventId { get; set; }
        public string? EventName { get; set; }
    }
}
