using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("ApiEventMapping")]
    public class ApiEventMapping
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? ApiEventMappingId { get; set; }
        public int? ApiEventId { get; set; }
        public int? ProviderId { get; set; }
        public int? EndpointId { get; set; }
        public string? Description { get; set; }
    }
}
