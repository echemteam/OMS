using System.ComponentModel.DataAnnotations;

namespace OMS.Domain.Entities.Entity.Test
{
    public class BaseTestDto
    {


        [Required]
        [MaxLength(50)]
        public string? Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string? City { get; set; }

        [Required]
        [MaxLength(50)]
        public string? State { get; set; }
    }
}
