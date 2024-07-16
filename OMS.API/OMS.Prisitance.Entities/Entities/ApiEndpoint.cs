using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("ApiEndpoint")]
    public class ApiEndpoint
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? EndpointId { get; set; }
        [Column("ProviderId")]
        public int? ProviderId { get; set; }
        [Column("Name")]
        public string? Name { get; set; }
        [Column("Path")]
        public string? Path { get; set; }
        [Column("Method")]
        public string? Method { get; set; }
        [Column("Description")]
        public string? Description { get; set; }
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
