using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.User
{
    public class UserDto : IUser, IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public short? UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string? UserName { get; set; }

        [Required]
        [Column("FirstName")]
        public string? FirstName { get; set; }

        [Required]
        [Column("LastName")]
        public string? LastName { get; set; }

        [Required]
        [Column("Password")]
        public string? Password { get; set; }

        [Column("PasswordSalt")]
        public string? PasswordSalt { get; set; }

        [Required]
        [Column("HashedPassword")]
        public string? HashedPassword { get; set; }

        [Required]
        [Column("IsActive")]
        public bool IsActive { get; set; }

        [Required]
        [Column("IsBLAdmin")]
        public bool IsBLAdmin { get; set; }
        public string? FullName { get; set; }

        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}
