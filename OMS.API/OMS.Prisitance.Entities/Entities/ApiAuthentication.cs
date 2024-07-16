using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("ApiAuthentication")]
    public class ApiAuthentication
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? AuthId { get; set; }
        [Column("ProviderId")]
        public int? ProviderId { get; set; }
        [Column("AuthKey")]
        public string? AuthKey { get; set; }
        [Column("ClientId")]
        public string? ClientId { get; set; }
        [Column("ClientSecret")]
        public string? ClientSecret { get; set; }
        [Column("TokenEndpoint")]
        public string? TokenEndpoint { get; set; }
        [Column("TokenExpires")]
        public DateTime? TokenExpires { get; set; }
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
