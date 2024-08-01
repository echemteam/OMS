using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("User")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [Column("UserName")]
        public string? UserName { get; set; }

        [Column("HashedPassword")]
        public string? HashedPassword { get; set; }

        [Column("PasswordSalt")]
        public string? PasswordSalt { get; set; }

        [Column("UserActivaitonDate")]
        public DateTime? UserActivaitonDate { get; set; }
        [Column("UserLoginTime")]
        public DateTime? UserLoginTime { get; set; }

        [Column("IsActive")]
        public bool? IsActive { get; set; }
        [Column("IsResetPassword ")]
        public bool? IsResetPassword { get; set; }

        [Column("FirstName")]
        public string? FirstName { get; set; }

        [Column("LastName")]
        public string? LastName { get; set; }

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
