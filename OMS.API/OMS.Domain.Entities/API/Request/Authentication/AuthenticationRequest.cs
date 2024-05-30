using System.ComponentModel.DataAnnotations;

namespace OMS.Domain.Entities.API.Request.Authentication
{
    public class AuthenticationRequest
    {
        [Required]
        [StringLength(50)]
        public string? UserName { get; set; }

        [Required]
        [StringLength(100)]
        public string? Password { get; set; }
    }
}
