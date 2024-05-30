using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("SecurityPermissions")]
    public class SecurityPermissions
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SecurityPermissionID { get; set; }

        [Required]
        [Column("SecuritySettingID")]
        public int SecuritySettingID { get; set; }

        [Required]
        [Column("SecurityKeyID")]
        public int SecurityKeyID { get; set; }

        [Required]
        [Column("GroupID")]
        public int GroupID { get; set; }
    }
}
