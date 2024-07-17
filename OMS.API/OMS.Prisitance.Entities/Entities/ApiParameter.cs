using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("ApiParameter")]
    public class ApiParameter
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? ParameterId { get; set; }
        [Column("EndpointId")]
        public int? EndpointId { get; set; }
        [Column("Name")]
        public string? Name { get; set; }
        [Column("DataType")]
        public string? DataType { get; set; }
        [Column("DefaultValue")]
        public string? DefaultValue { get; set; }
        [Column("IsRequired")]
        public bool? IsRequired { get; set; }
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
