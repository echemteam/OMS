using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.Test
{
    public class TestDto : ITest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public byte Id { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("Name")]
        public string? Name { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("City")]
        public string? City { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("State")]
        public string? State { get; set; }
    }
}
