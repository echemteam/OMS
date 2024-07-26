using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("ApiEvent")]
    public class ApiEvent
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? ApiEventId { get; set; }
        public string? EventName { get; set; }
        public string? Description { get; set; }
    }
}
